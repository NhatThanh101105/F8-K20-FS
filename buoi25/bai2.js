const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirm-password');
const submitBtn = document.getElementById('submit-btn');
const form = document.getElementById('register-form');

const errors = {
  username: document.getElementById('username-error'),
  email: document.getElementById('email-error'),
  password: document.getElementById('password-error'),
  'confirm-password': document.getElementById('confirm-password-error'),
};

const touched = {
  username: false,
  email: false,
  password: false,
  'confirm-password': false,
};

const validity = {
  username: false,
  email: false,
  password: false,
  'confirm-password': false,
};

function validateUsername(value) {
  if (value.length < 4) return 'Tên đăng nhập phải có ít nhất 4 ký tự.';
  if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Chỉ được chứa chữ, số và dấu gạch dưới.';
  return '';
}

function validateEmail(value) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(value)) return 'Email không đúng định dạng.';
  return '';
}

function validatePassword(value) {
  if (value.length < 8) return 'Mật khẩu phải có ít nhất 8 ký tự.';
  if (!/\d/.test(value)) return 'Mật khẩu phải chứa ít nhất 1 chữ số.';
  return '';
}

function validateConfirm(value, passwordValue) {
  if (value !== passwordValue) return 'Mật khẩu nhập lại không khớp.';
  return '';
}

function applyResult(field, message) {
  validity[field] = message === '';
  errors[field].textContent = touched[field] ? message : '';
}

function updateSubmitState() {
  submitBtn.disabled = !Object.values(validity).every(Boolean);
}

function checkUsername() {
  applyResult('username', validateUsername(usernameInput.value));
  updateSubmitState();
}
function checkEmail() {
  applyResult('email', validateEmail(emailInput.value));
  updateSubmitState();
}
function checkPassword() {
  applyResult('password', validatePassword(passwordInput.value));
  applyResult('confirm-password', validateConfirm(confirmInput.value, passwordInput.value));
  updateSubmitState();
}
function checkConfirm() {
  applyResult('confirm-password', validateConfirm(confirmInput.value, passwordInput.value));
  updateSubmitState();
}

usernameInput.addEventListener('input', () => { touched.username = true; checkUsername(); });
emailInput.addEventListener('input', () => { touched.email = true; checkEmail(); });
passwordInput.addEventListener('input', () => { touched.password = true; checkPassword(); });
confirmInput.addEventListener('input', () => { touched['confirm-password'] = true; checkConfirm(); });

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!Object.values(validity).every(Boolean)) return;
  alert('Đăng ký thành công!');
});