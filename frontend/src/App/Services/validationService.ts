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

export function validateRequired(value: string, label: string, maxLength?: number): string | null {
  if (!value.trim()) return `${label} est requis.`;
  if (maxLength && value.length > maxLength) return `${label} ne doit pas dépasser ${maxLength} caractères.`;
  return null;
}

export function validateFutureDate(date: string): string | null {
  if (!date) return "La date est requise.";
  if (new Date(date) <= new Date()) return "La date doit être dans le futur.";
  return null;
}

export function validateCoordinate(value: number, min: number, max: number, label: string): string | null {
  if (Number.isNaN(value)) return `${label} est requise.`;
  if (value < min || value > max) return `${label} doit être comprise entre ${min} et ${max}.`;
  return null;
}
