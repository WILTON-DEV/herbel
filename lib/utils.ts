import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatUGX(value: number): string {
  try {
    const formatted = new Intl.NumberFormat("en-UG", {
      style: "currency",
      currency: "UGX",
      maximumFractionDigits: 0,
    }).format(value);
    if (formatted.includes("$")) {
      return formatted.replace(/\$/g, "USh");
    }
    return formatted;
  } catch {
    return `USh ${value.toLocaleString()}`;
  }
}
