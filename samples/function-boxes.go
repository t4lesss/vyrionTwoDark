package samples

// func em comentários ou strings conserva seu estilo.
const example = "func help() {}"

func help() string {
	return "Olá, Tales!"
}

type Reference struct{ Name string }

func (r Reference) Describe() string {
	return r.Name
}
