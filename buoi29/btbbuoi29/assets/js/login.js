document.addEventListener("DOMContentLoaded", () => {
  // Nếu đã đăng nhập mà vào lại trang login -> điều hướng về trang chủ
  if (isLoggedIn()) {
    window.location.href = "index.html";
    return;
  }

  const form = document.querySelector("#login-form");
  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");
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
      ? '<span class="inline-block w-[16px] h-[16px] rounded-full border-2 border-[#17070c55] border-t-[#17070c] animate-spin-fast align-[-2px] mr-[8px]"></span>Đang đăng nhập...'
      : "Đăng nhập";
  }

  function validate() {
    const emailError = validateEmail(emailInput.value.trim());
    const passwordError = validateRequired(passwordInput.value, "Mật khẩu");
    setFieldError(emailInput, emailError);
    setFieldError(passwordInput, passwordError);
    return !emailError && !passwordError;
  }

  [emailInput, passwordInput].forEach((input) => {
    input.addEventListener("input", () => setFieldError(input, ""));
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideAlert();

    if (!validate()) return;

    setLoading(true);
    try {
      const json = await Api.login({
        email: emailInput.value.trim(),
        password: passwordInput.value,
      });

      const { accessToken, refreshToken } = extractTokens(json);
      const user = extractUser(json);

      if (!accessToken) {
        throw new Error("Đăng nhập thất bại: máy chủ không trả về access token.");
      }

      setSession({ accessToken, refreshToken, user });
      window.location.href = "index.html";
    } catch (err) {
      showAlert(err.message || "Đăng nhập thất bại. Vui lòng thử lại.");
      setLoading(false);
    }
  });
});
