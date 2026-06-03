/**
 * Simple helper to merge Tailwind CSS classes conditionally
 * @param {...string} classes - List of class names to merge
 * @returns {string} - Merged class string
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
