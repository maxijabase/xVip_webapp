// src/lib/auth.ts
import { jwtDecode } from "jwt-decode";
import type { WebUser } from "./webUser";

export function decodeToken(token: string): WebUser | null {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
}