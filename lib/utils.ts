import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateTime() {
  const d = new Date();

  const day = d.getDate().toString().padStart(2, "0");

  const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const weekday = weekdays[d.getDay()];

  let hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours === 0 ? 12 : hours;
  const h = hours.toString().padStart(2, "0");

  return `${day} ${weekday} ${h}:${minutes} ${ampm}`;
}

export function extractDomain(input: string): string {
  const targets = ["thelastofinusa.vercel.app", "localhost:3000"];

  let url: URL | null = null;

  try {
    if (input.startsWith("http://") || input.startsWith("https://")) {
      url = new URL(input);
    } else {
      url = new URL("http://" + input);
    }
  } catch {
    return input;
  }

  const host = url.host;
  const path = url.pathname.replace(/^\/+/, "");

  const matchesTarget = targets.includes(host);

  if (matchesTarget) return path;

  const slash = input.indexOf("/");
  if (slash < 0) return host;
  return host;
}

export function isActivePath(path: string, pathname: string): boolean {
  if (path === "/") return pathname === "/";
  return pathname.startsWith(path);
}

export function assertValue<T>(
  v: T | undefined,
  errorMessage?: string,
): NonNullable<T> {
  if (v === undefined || v === null) {
    throw new Error(errorMessage ?? "Missing property");
  }
  return v;
}
