export const staffSessionKey = "medivault-staff-session";

export function signIn(username, password) {
  if (username === "admin" && password === "MediVault@2026") {
    window.sessionStorage.setItem(staffSessionKey, "admin");
    return true;
  }
  return false;
}

export function signOut() {
  window.sessionStorage.removeItem(staffSessionKey);
}

export function getStaffUser() {
  return window.sessionStorage.getItem(staffSessionKey);
}
