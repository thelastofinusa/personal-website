import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { MessageContentType } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateTime(): string {
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

export function formatSanityDate(dateString: string) {
  const date = new Date(dateString);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export function extractDomain(input: string): string {
  const targets = ["thelastofinusa.vercel.app", "localhost:3000"];

  const parsePath = (path: string): string => {
    const clean = path.replace(/^\/+/, ""); // remove leading "/"
    let parts = clean.split("/");

    // Always return the last two segments
    if (parts.length >= 2) {
      parts = parts.slice(-2);
    }

    return parts.join(" · ");
  };

  // Case 1: raw path
  if (input.startsWith("/")) {
    return parsePath(input);
  }

  // Case 2: full URL
  let url: URL;
  try {
    url = input.startsWith("http")
      ? new URL(input)
      : new URL("http://" + input);
  } catch {
    return input;
  }

  const host = url.host;

  if (targets.includes(host)) {
    return parsePath(url.pathname);
  }

  return host;
}

export function getInitials(name: string): string {
  if (!name) return "";
  const parts = name.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0][0].toUpperCase();
  }

  const first = parts[0][0];
  const last = parts[parts.length - 1][0];

  return (first + last).toUpperCase();
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

export function hasSpecialContent(content: MessageContentType) {
  return !!(
    content.route ||
    content.link ||
    content.project ||
    (content.buttons && content.buttons.length > 0) ||
    (content.fields && content.fields.length > 0)
  );
}
