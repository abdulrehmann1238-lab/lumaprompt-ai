export function isValidEmail(email: string): boolean {
  const trimmed = email.trim();
  if (!trimmed) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

export function isValidUrl(url: string): boolean {
  const trimmed = url.trim();
  if (!trimmed) return true; // optional field when empty
  return /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/.*)?$/i.test(trimmed);
}

