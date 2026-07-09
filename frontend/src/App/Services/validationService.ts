const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): string | null {
  if (!email.trim()) return "L'email est requis.";
  if (!EMAIL_REGEX.test(email)) return "Format d'email invalide.";
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return "Le mot de passe est requis.";
  if (password.length < 8) return "Le mot de passe doit contenir au moins 8 caractères.";
  return null;
}

export function validateDisplayName(displayName: string): string | null {
  if (!displayName.trim()) return "Le nom est requis.";
  if (displayName.length > 50) return "Le nom ne doit pas dépasser 50 caractères.";
  return null;
}
