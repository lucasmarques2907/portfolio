import { headers } from "next/headers";
import { createHash } from "node:crypto";

export async function getClientHash() {
  const h = await headers();

  const ip =
    h.get("x-forwarded-for")?.split(",")[0].trim() ||
    h.get("x-real-ip") ||
    "unknown";

  const salt = process.env.IP_SALT;

  if (!salt) {
    throw new Error("IP_SALT not defined.");
  }

  return createHash("sha256").update(`${ip}${salt}`).digest("hex");
}
