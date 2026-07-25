class TypeValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "TypeValidationError";
    this.field = field;
  }
}

class RangeValidationError extends Error {
  constructor(message, field, value) {
    super(message);
    this.name = "RangeValidationError";
    this.field = field;
    this.value = value;
  }
}

class InvalidEmailError extends Error {
  constructor(message, value) {
    super(message);
    this.name = "InvalidEmailError";
    this.value = value;
  }
}

class WeakPasswordError extends Error {
  constructor(message, value) {
    super(message);
    this.name = "WeakPasswordError";
    this.value = value;
  }
}

function registerUser(data) {
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    throw new TypeValidationError("Dữ liệu truyền vào phải là một object", "data");
  }

  const { username, age, email, password } = data;

  if (typeof username !== "string") {
    throw new TypeValidationError("username phải là kiểu string", "username");
  }

  if (typeof age !== "number") {
    throw new TypeValidationError("age phải là kiểu number", "age");
  }

  if (age < 13 || age > 120) {
    throw new RangeValidationError("age phải nằm trong khoảng 13 - 120", "age", age);
  }

  if (typeof email !== "string" || !email.includes("@")) {
    throw new InvalidEmailError("email không hợp lệ (thiếu ký tự @)", email);
  }

  if (typeof password !== "string" || password.length < 8) {
    throw new WeakPasswordError("password phải có độ dài tối thiểu 8 ký tự", password);
  }

  return { success: true, message: "Đăng ký thành công" };
}

function handleRegister(data) {
  try {
    const result = registerUser(data);
    console.log(result);
  } catch (error) {
    if (error instanceof TypeValidationError) {
      console.log(`Lỗi sai kiểu dữ liệu ở trường "${error.field}": ${error.message}`);
    } else if (error instanceof RangeValidationError) {
      console.log(`Lỗi vượt phạm vi ở trường "${error.field}" (giá trị: ${error.value}): ${error.message}`);
    } else if (error instanceof InvalidEmailError) {
      console.log(`Lỗi email không hợp lệ (giá trị: "${error.value}"): ${error.message}`);
    } else if (error instanceof WeakPasswordError) {
      console.log(`Lỗi mật khẩu quá ngắn: ${error.message}`);
    } else {
      console.log("Lỗi không xác định:", error.message);
    }
  } finally {
    console.log("Quá trình xử lý đăng ký đã kết thúc.");
  }
}

handleRegister();
handleRegister({ username: 123, age: 20, email: "a@b.com", password: "12345678" });
handleRegister({ username: "an", age: 8, email: "a@b.com", password: "12345678" });
handleRegister({ username: "an", age: 20, email: "abgmail.com", password: "12345678" });
handleRegister({ username: "an", age: 20, email: "a@b.com", password: "123" });
handleRegister({ username: "an", age: 20, email: "a@b.com", password: "12345678" });