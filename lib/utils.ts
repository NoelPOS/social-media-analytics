import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export function formatScore(score: number, total: number): string {
  return `${score} / ${total} (${Math.round((score / total) * 100)}%)`;
}

export const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
  .split(",")
  .map((e) => e.trim())
  .filter(Boolean);

export function isAdminEmail(email: string): boolean {
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

export const SOCIAL_MEDIA_PLATFORMS = [
  "Instagram",
  "TikTok",
  "Facebook",
  "Twitter / X",
  "LinkedIn",
  "YouTube",
  "Pinterest",
  "Snapchat",
  "Reddit",
  "BeReal",
  "Other",
];
