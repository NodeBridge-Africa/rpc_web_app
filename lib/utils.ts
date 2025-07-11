import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Removes all spaces from a string
 * @param str - The string to remove spaces from
 * @returns The string with all spaces removed
 */
export function removeSpaces(str: string): string {
  return str.replace(/\s+/g, "");
}

/**
 * Adds spaces before capital letters in camelCase/PascalCase strings
 * @param str - The camelCase/PascalCase string to add spaces to
 * @returns The string with spaces added before capital letters
 * @example addSpacesToCamelCase("AssetChain") returns "Asset Chain"
 * @example addSpacesToCamelCase("ethereumMainnet") returns "ethereum Mainnet"
 */
export function addSpacesToCamelCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, "$1 $2");
}
