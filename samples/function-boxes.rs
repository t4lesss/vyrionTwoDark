// fn em comentários ou strings conserva seu estilo.
const EXAMPLE: &str = "fn help() {}";

fn help() -> &'static str {
    "Olá, Tales!"
}

async fn lookup(name: &str) -> &str {
    name
}
