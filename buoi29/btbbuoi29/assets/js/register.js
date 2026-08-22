document.addEventListener("DOMContentLoaded", () => {
  if (isLoggedIn()) {
    window.location.href = "index.html";
    return;
  }

  const form = document.querySelector("#register-form");
  const fields = {
    display_name: document.querySelector("#display_name"),
    username: document.querySelector("#username"),
    email: document.querySelector("#email"),
    password: document.querySelector("#password"),
    confirm_password: document.querySelector("#confirm_password"),
    country: document.querySelector("#country"),
    bio: document.querySelector("#bio"),
  };
  const submitBtn = document.querySelector("#submit-btn");
  const submitLabel = document.querySelector("#submit-label");
  const alertBox = document.querySelector("#form-alert");
  const alertText = document.querySelector("#form-alert-text");

  function hideAlert() {
    alertBox.classList.add("hidden");
  }
  function showAlert(message) {
    alertText.textContent = message;
    alertBox.classList.remove("hidden");
  }

  function setLoading(isLoading) {
    submitBtn.disabled = isLoading;
    submitLabel.innerHTML = isLoading
      ? '<span class="inline-block w-[16px] h-[16px] rounded-full border-2 border-[#17070c55] border-t-[#17070c] animate-spin-fast align-[-2px] mr-[8px]"></span>Đang tạo tài khoản...'
      : "Tạo tài khoản";
  }

  function validate() {
    const errors = {
      display_name: validateRequired(fields.display_name.value.trim(), "Tên hiển thị"),
      username: validateUsername(fields.username.value.trim()),
      email: validateEmail(fields.email.value.trim()),
      password: validatePassword(fields.password.value),
      confirm_password: validateConfirmPassword(fields.password.value, fields.confirm_password.value),
      country: validateRequired(fields.country.value.trim(), "Quốc gia"),
    };
    Object.entries(errors).forEach(([name, message]) => setFieldError(fields[name], message));
    return Object.values(errors).every((m) => !m);
  }

  Object.values(fields).forEach((input) => {
    input.addEventListener("input", () => setFieldError(input, ""));
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideAlert();

    if (!validate()) return;

    setLoading(true);
    const email = fields.email.value.trim();
    const password = fields.password.value;

    try {
      const registerJson = await Api.register({
        username: fields.username.value.trim(),
        email,
        password,
        display_name: fields.display_name.value.trim(),
        bio: fields.bio.value.trim(),
        country: fields.country.value.trim(),
      });

      // Một số API trả token/user ngay khi đăng ký, một số khác chỉ trả
      // thông báo thành công và yêu cầu đăng nhập riêng. Xử lý cả 2 trường
      // hợp để chắc chắn người dùng luôn được đưa thẳng vào trang chủ.
      let { accessToken, refreshToken } = extractTokens(registerJson);
      let user = extractUser(registerJson);

      if (!accessToken) {
        const loginJson = await Api.login({ email, password });
        ({ accessToken, refreshToken } = extractTokens(loginJson));
        user = extractUser(loginJson) || user;
      }

      if (!accessToken) {
        throw new Error("Tạo tài khoản thành công nhưng không thể tự động đăng nhập. Vui lòng đăng nhập thủ công.");
      }

      setSession({ accessToken, refreshToken, user });
      window.location.href = "index.html";
    } catch (err) {
      showAlert(err.message || "Đăng ký thất bại. Vui lòng thử lại.");
      setLoading(false);
    }
  });
});
