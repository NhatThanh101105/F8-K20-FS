/**
 * validators.js — validate cơ bản ở phía client trước khi gọi API.
 * Trả về chuỗi lỗi (string) nếu không hợp lệ, hoặc "" nếu hợp lệ.
 */

function validateRequired(value, label) {
  if (!value || !String(value).trim()) return `${label} không được để trống.`;
  return "";
}

function validateEmail(value) {
  if (!value || !String(value).trim()) return "Email không được để trống.";
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(value)) return "Email không đúng định dạng.";
  return "";
}

function validateUsername(value) {
  if (!value || !String(value).trim()) return "Tên đăng nhập không được để trống.";
  if (value.length < 3) return "Tên đăng nhập phải có ít nhất 3 ký tự.";
  if (!/^[a-zA-Z0-9_.]+$/.test(value)) {
    return "Tên đăng nhập chỉ gồm chữ, số, dấu chấm và gạch dưới.";
  }
  return "";
}

function validatePassword(value) {
  if (!value) return "Mật khẩu không được để trống.";
  if (value.length < 8) return "Mật khẩu phải có ít nhất 8 ký tự.";
  if (!/[A-Z]/.test(value)) return "Mật khẩu cần ít nhất 1 chữ hoa.";
  if (!/[0-9]/.test(value)) return "Mật khẩu cần ít nhất 1 chữ số.";
  return "";
}

function validateConfirmPassword(password, confirm) {
  if (!confirm) return "Vui lòng nhập lại mật khẩu.";
  if (password !== confirm) return "Mật khẩu nhập lại không khớp.";
  return "";
}

/**
 * Gắn lỗi vào 1 field: thêm class field--invalid cho input và
 * điền text lỗi vào phần tử [data-error-for="<name>"].
 */
function setFieldError(inputEl, message) {
  inputEl.classList.toggle("!border-[#ff6b6b]", Boolean(message));
  const errorEl = document.querySelector(`[data-error-for="${inputEl.name}"]`);
  if (errorEl) errorEl.textContent = message || "";
}
