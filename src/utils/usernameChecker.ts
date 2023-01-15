export const isValidUsername = (username: string): boolean => {
  if (username.toLowerCase() === "admin") return false;
  if (username.toLowerCase().includes("admin/")) return false;
  return true;
};
