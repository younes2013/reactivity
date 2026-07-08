namespace Reactivity.Application.Common.Exceptions;

public class NotFoundException(string name, object key) : Exception($"L'entité \"{name}\" ({key}) est introuvable.");
