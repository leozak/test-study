export function sanitizeStr(str: string): string {
  const cleanStr =
    !str || typeof str !== "string" ? "" : str.trim().normalize();
  return cleanStr;
}
