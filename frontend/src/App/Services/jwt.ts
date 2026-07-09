import type { User } from "../Models/User";

type JwtPayload = Record<string, string>;

const CLAIM_NAME_IDENTIFIER = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";
const CLAIM_EMAIL = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress";
const CLAIM_NAME = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name";

export function decodeJwt(token: string): JwtPayload {
  const payload = token.split(".")[1];
  const json = decodeURIComponent(
    atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
      .split("")
      .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
      .join("")
  );
  return JSON.parse(json);
}

export function decodeUserFromToken(token: string): User {
  const payload = decodeJwt(token);
  return {
    id: payload[CLAIM_NAME_IDENTIFIER],
    email: payload[CLAIM_EMAIL],
    displayName: payload[CLAIM_NAME],
  };
}
