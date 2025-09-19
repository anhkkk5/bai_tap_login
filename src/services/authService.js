const USERS_KEY = "auth_users";
const REMEMBER_KEY = "auth_remember";

function readUsers() {
  const raw = localStorage.getItem(USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function writeUsers(list) {
  localStorage.setItem(USERS_KEY, JSON.stringify(list));
}

export async function registerUser({ name, email, password }) {
  const users = readUsers();
  const exists = users.some(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (exists) {
    return { ok: false, error: "Email đã tồn tại" };
  }
  const id = users.length ? Math.max(...users.map((u) => u.id || 0)) + 1 : 1;
  users.push({ id, name, email, password });
  writeUsers(users);
  return { ok: true };
}

export async function loginUser({ email, password, remember }) {
  const users = readUsers();
  const user = users.find(
    (u) =>
      u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!user) return { ok: false, error: "Sai email hoặc mật khẩu" };
  const token = `${user.id}-${Date.now()}`;
  localStorage.setItem("auth_token", token);
  localStorage.setItem(
    "auth_user",
    JSON.stringify({ id: user.id, name: user.name, email: user.email })
  );
  if (remember) {
    localStorage.setItem(REMEMBER_KEY, JSON.stringify({ email, password }));
  } else {
    localStorage.removeItem(REMEMBER_KEY);
  }
  return {
    ok: true,
    token,
    user: { id: user.id, name: user.name, email: user.email },
  };
}

export function getRemembered() {
  const raw = localStorage.getItem(REMEMBER_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function logoutUser() {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_user");
}

export async function resetPassword({ email, newPassword }) {
  const users = readUsers();
  const idx = users.findIndex(
    (u) => u.email.toLowerCase() === email.toLowerCase()
  );
  if (idx === -1) return { ok: false, error: "Email không tồn tại" };
  users[idx].password = newPassword;
  writeUsers(users);
  return { ok: true };
}

// OTP flow (mock): store OTP codes in localStorage with short TTL
const OTP_STORE_KEY = "auth_otp_codes";

function readOtps() {
  const raw = localStorage.getItem(OTP_STORE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function writeOtps(list) {
  localStorage.setItem(OTP_STORE_KEY, JSON.stringify(list));
}

export async function requestPasswordOtp(email) {
  const users = readUsers();
  const exists = users.some(
    (u) => u.email.toLowerCase() === String(email).toLowerCase()
  );
  if (!exists) return { ok: false, error: "Email không tồn tại" };
  const code = String(Math.floor(100000 + Math.random() * 900000));
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
  const list = readOtps().filter((o) => o.email !== email);
  list.push({ email, code, expiresAt });
  writeOtps(list);
  // In real app, send code via email. Here we return it for demo/testing.
  return { ok: true, code };
}

export async function confirmPasswordOtpAndReset({ email, code, newPassword }) {
  const list = readOtps();
  const found = list.find((o) => o.email === email && o.code === code);
  if (!found) return { ok: false, error: "Mã OTP không hợp lệ" };
  if (Date.now() > found.expiresAt)
    return { ok: false, error: "Mã OTP đã hết hạn" };
  // Reset password
  const reset = await resetPassword({ email, newPassword });
  if (!reset.ok) return reset;
  // Remove OTP after success
  writeOtps(list.filter((o) => !(o.email === email && o.code === code)));
  return { ok: true };
}
