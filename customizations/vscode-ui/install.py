"""Bounded, reversible typography patch for the verified Linux VS Code build."""

import base64
import hashlib
import json
import os
from pathlib import Path
import re
import tempfile

import typer


cli = typer.Typer(no_args_is_help=True)
HERE = Path(__file__).resolve().parent
VERSION = "1.137.0"
FILES = (
    "out/vs/workbench/workbench.desktop.main.css",
    "out/vs/workbench/contrib/webview/browser/pre/index.html",
    "product.json",
)
MARKER = "/* VYRION_PLEX_UI */"


def digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def check(condition: bool, message: str) -> None:
    if not condition:
        raise typer.BadParameter(message)


def atomic_write(path: Path, data: bytes) -> None:
    mode = path.stat().st_mode & 0o777
    fd, name = tempfile.mkstemp(prefix=".vyrion-ui-", dir=path.parent)
    try:
        with os.fdopen(fd, "wb") as stream:
            stream.write(data)
            stream.flush()
            os.fsync(stream.fileno())
        os.chmod(name, mode)
        os.replace(name, path)
    finally:
        Path(name).unlink(missing_ok=True)


@cli.command()
def prepare(bundle: Path, app_root: Path = Path("/usr/share/code/resources/app")):
    """Stage originals, exact patched bytes and a reviewable manifest; no app writes."""
    check(not bundle.exists(), "Choose a new bundle directory.")
    app_root = app_root.resolve(strict=True)
    version = json.loads((app_root / "package.json").read_text())["version"]
    check(version == VERSION, f"Revalidate native assets for VS Code {version} first.")
    originals = {name: (app_root / name).read_bytes() for name in FILES}
    css = originals[FILES[0]].decode()
    check(MARKER not in css, "An existing typography patch must be restored first.")
    patched = {FILES[0]: (css + "\n" + MARKER + "\n" + (HERE / "workbench.css").read_text()).encode()}
    html = originals[FILES[1]].decode()
    matches = list(re.finditer(r'<script async type="module">([\s\S]*?)</script>', html))
    check(len(matches) == 1, "Unexpected webview bootstrap structure.")
    script = matches[0].group(1)
    script_hash = lambda value: base64.b64encode(hashlib.sha256(value.encode()).digest()).decode()
    old_hash = "'sha256-" + script_hash(script) + "'"
    check(html.count(old_hash) == 1, "Native webview CSP hash does not match its script.")
    start = script.index("defaultStyles.textContent = `")
    end = script.index("`;", start)
    extra_css = (HERE / "webview.css").read_text()
    check("`" not in extra_css and "${" not in extra_css, "CSS cannot contain JS template syntax.")
    new_script = script[:end] + "\n" + MARKER + "\n" + extra_css + script[end:]
    html = html[:matches[0].start(1)] + new_script + html[matches[0].end(1):]
    html = html.replace(old_hash, "'sha256-" + script_hash(new_script) + "'")
    patched[FILES[1]] = html.encode()
    product = json.loads(originals[FILES[2]])
    for name, data in patched.items():
        key = name.removeprefix("out/")
        if key in product["checksums"]:
            old = base64.b64encode(hashlib.sha256(originals[name]).digest()).decode().rstrip("=")
            check(product["checksums"][key] == old, f"Unexpected existing asset checksum: {name}")
            product["checksums"][key] = base64.b64encode(hashlib.sha256(data).digest()).decode().rstrip("=")
    patched[FILES[2]] = (json.dumps(product, indent=2) + "\n").encode()
    manifest = {"version": VERSION, "files": {}}
    for name in FILES:
        for folder, data in (("original", originals[name]), ("patched", patched[name])):
            dest = bundle / folder / name
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(data)
        manifest["files"][name] = {"original": digest(originals[name]), "patched": digest(patched[name])}
    (bundle / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    typer.echo(f"Prepared {bundle.resolve()} for VS Code {VERSION}; app unchanged.")


def transfer(bundle: Path, app_root: Path, restore: bool) -> None:
    app_root = app_root.resolve(strict=True)
    manifest = json.loads((bundle / "manifest.json").read_text())
    check(set(manifest["files"]) == set(FILES), "Unexpected bundle file set.")
    check(manifest["version"] == VERSION == json.loads((app_root / "package.json").read_text())["version"], "VS Code version changed.")
    source, target = ("patched", "original") if restore else ("original", "patched")
    data = {name: (bundle / target / name).read_bytes() for name in FILES}
    current = {}
    for name in FILES:
        path = app_root / name
        check(path.resolve().is_relative_to(app_root) and not path.is_symlink(), f"Unsafe target: {name}")
        check(digest(data[name]) == manifest["files"][name][target], f"Bundle bytes changed: {name}")
        current[name] = path.read_bytes()
        check(digest(current[name]) in (manifest["files"][name][source], manifest["files"][name][target]), f"App asset changed: {name}")
        check(os.access(path.parent, os.W_OK), f"Authentication required to write {path.parent}")
    changed = []
    try:
        for name in FILES:
            if current[name] != data[name]:
                check((app_root / name).read_bytes() == current[name], f"App changed during installation: {name}")
                atomic_write(app_root / name, data[name])
                changed.append(name)
        for name in FILES:
            check((app_root / name).read_bytes() == data[name], f"Readback failed: {name}")
    except BaseException:
        for name in reversed(changed):
            atomic_write(app_root / name, current[name])
        raise
    typer.echo(f"{target.capitalize()} assets verified in {app_root}; files changed: {len(changed)}.")


@cli.command()
def apply(bundle: Path, app_root: Path = Path("/usr/share/code/resources/app")):
    """Apply only if every current asset matches this prepared version."""
    transfer(bundle, app_root, False)


@cli.command()
def restore(bundle: Path, app_root: Path = Path("/usr/share/code/resources/app")):
    """Restore the exact original bytes, preserving unrelated later changes."""
    transfer(bundle, app_root, True)


if __name__ == "__main__":
    cli()
