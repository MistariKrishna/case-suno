import crypto from "node:crypto";

export const makeToken = () => crypto.randomBytes(24).toString("base64url");

export const makeReference = () => {
  const year = new Date().getFullYear();
  const code = crypto.randomBytes(4).toString("hex").slice(0, 6).toUpperCase();
  return `CS-${year}-${code}`;
};