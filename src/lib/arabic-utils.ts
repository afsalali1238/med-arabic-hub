/**
 * Normalizes an Arabic string by:
 * 1. Removing diacritics (harakat / tashkeel)
 * 2. Normalizing Alif forms (أ, إ, آ -> ا)
 * 3. Normalizing Yaa forms (ى -> ي)
 * 4. Normalizing Ta Marbuta (ة -> ه)
 * 5. Removing punctuation and standardizing spaces
 * 6. Converting to lowercase (for non-Arabic characters if present)
 */
export function normalizeArabic(text: string): string {
  if (!text) return "";

  return text
    // Remove diacritics (Tashkeel)
    .replace(/[\u064B-\u065F\u0670]/g, "")
    // Normalize Alif
    .replace(/[أإآ]/g, "ا")
    // Normalize Yaa
    .replace(/ى/g, "ي")
    // Normalize Ta Marbuta
    .replace(/ة/g, "ه")
    // Remove punctuation
    .replace(/[.,/#!$%^&*;:{}=\-_`~()؟،]/g, "")
    // Normalize spaces
    .replace(/\s{2,}/g, " ")
    .trim()
    .toLowerCase();
}

/**
 * Compares two strings using Arabic fuzzy matching rules.
 * @param input The user's input string
 * @param target The target answer string
 * @returns true if they match after normalization
 */
export function fuzzyMatchArabic(input: string, target: string): boolean {
  return normalizeArabic(input) === normalizeArabic(target);
}
