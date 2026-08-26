import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges conditional CSS classes and resolves Tailwind CSS class conflicts.
 *
 * @param inputs - List of class names, arrays, or conditional class objects
 * @returns Combined and deduplicated class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}