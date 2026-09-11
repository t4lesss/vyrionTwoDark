"""Amostra visual: tipos, funções, parâmetros, strings e comentários."""

from dataclasses import dataclass
from pathlib import Path

DEFAULT_LIMIT = 3


@dataclass(frozen=True)
class ThemeSample:
    name: str
    enabled: bool = True

    def describe(self, limit: int = DEFAULT_LIMIT) -> str:
        # Compare este comentário com strings e identificadores.
        names = [self.name.upper() for _ in range(limit)]
        return f"{self.name}: {', '.join(names)}"


async def inspect_theme(path: Path) -> ThemeSample:
    if not path.exists():
        raise FileNotFoundError(path)
    return ThemeSample(name=path.stem, enabled=True)


NUMBER_EXAMPLES = (42, 3.14, 0xFF, 1_000)
ESCAPED_STRING = "linha um\nlinha dois\tcoluna"
