import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(
  bytes: number,
  opts: {
    decimals?: number;
    sizeType?: "accurate" | "normal";
  } = {},
) {
  const { decimals = 0, sizeType = "normal" } = opts;

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"];
  if (bytes === 0) return "0 Byte";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
    sizeType === "accurate" ? accurateSizes[i] ?? "Bytest" : sizes[i] ?? "Bytes"
  }`;
}

export function getInitials(name: string): string {
  if (!name) {
    return " ";
  }

  const nameParts = name.trim().split(" ");

  const validNameParts = nameParts.filter((part) => part.length > 0);

  if (validNameParts.length === 1) {
    return validNameParts[0]?.charAt(0).toUpperCase() ?? "";
  }

  const firstInitial = validNameParts[0]?.charAt(0).toUpperCase() ?? "";
  const lastInitial = validNameParts[validNameParts.length - 1]
    ?.charAt(0)
    .toUpperCase();

  return firstInitial + lastInitial;
}

export async function copyTextToClipboard(text: string) {
  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand("copy", true, text);
  }
}
