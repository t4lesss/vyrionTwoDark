enum ReferenceState { ready, missing }

/// Compare classe, construtor, tipo, campo e parâmetro nomeado.
class Reference {
  final String name;
  final ReferenceState state;

  const Reference({
    required this.name,
    this.state = ReferenceState.ready,
  });

  String describe({bool uppercase = false}) {
    final label = uppercase ? name.toUpperCase() : name;
    return '$label: ${state.name}';
  }
}

Future<Reference> loadReference(String name) async {
  return Reference(name: name);
}

void main() {
  const reference = Reference(name: 'Vyrion Two Dark');
  print(reference.describe(uppercase: true));
}
