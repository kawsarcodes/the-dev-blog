export interface Snippet {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
}

export const snippets: Snippet[] = [
  {
    id: "use-debounce-hook",
    title: "STOP HAMMERING YOUR API",
    description: "I use this hook on every search bar I build. It waits for the user to stop typing before firing the API request so you save bandwidth.",
    language: "typescript",
    code: `import { useState, useEffect } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}`
  },
  {
    id: "wait-function",
    title: "THE WAIT FUNCTION",
    description: "I got tired of writing setTimeout inside a Promise every time I needed a delay. This one liner is arguably my most used snippet.",
    language: "typescript",
    code: `export const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Usage:
// await wait(1000);`
  },
  {
    id: "cn-utility",
    title: "CLASS NAME MERGER",
    description: "If you use Tailwind you need this. It combines conditional classes and handles conflicts better than template literals.",
    language: "typescript",
    code: `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Usage:
// <div className={cn("bg-red-500", isActive && "bg-blue-500")} />`
  },
  {
    id: "slugify-string",
    title: "STRING TO URL SLUG",
    description: "How I generate the URLs for this blog. It turns a title into a clean string safe for the browser address bar.",
    language: "typescript",
    code: `export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\\w\\-]+/g, '')
    .replace(/\\-\\-+/g, '-');
}`
  },
  {
    id: "fetch-wrapper",
    title: "FETCH WITH RETRY LOGIC",
    description: "Network requests fail. This wrapper automatically retries failed requests with exponential backoff so your app feels more stable.",
    language: "typescript",
    code: `export async function fetchWithRetry(url: string, options: RequestInit = {}, retries = 3, backoff = 300) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(response.statusText);
    return await response.json();
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, backoff));
      return fetchWithRetry(url, options, retries - 1, backoff * 2);
    }
    throw error;
  }
}`
  },
  {
    id: "tailwind-grid-auto-fit",
    title: "RESPONSIVE GRID WITHOUT MEDIA QUERIES",
    description: "I hate writing media queries for simple grids. This CSS utility makes cards resize automatically based on space.",
    language: "css",
    code: `@layer utilities {
  .grid-auto-fit {
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
  }
}`
  },
  {
    id: "format-bytes",
    title: "HUMAN READABLE FILE SIZES",
    description: "Because nobody knows how big 1048576 bytes is. This converts raw numbers into KB MB or GB.",
    language: "typescript",
    code: `export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return \`\${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} \${sizes[i]}\`;
}`
  },
  {
    id: "click-outside-hook",
    title: "USE ON CLICK OUTSIDE",
    description: "Essential for modals and dropdowns. Detects when a user clicks anywhere other than the specified element.",
    language: "typescript",
    code: `import { useEffect, RefObject } from "react";

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent) => void
) {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      const el = ref?.current;
      if (!el || el.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
}`
  }
];