export function isPalindrome(text: string): boolean {
  const normalized = text.replace(/\s+/g, '').toLowerCase();
  if (normalized.length === 0) {
    throw new Error('EMPTY_STRING');
  }
  return normalized === [...normalized].reverse().join('');
}
