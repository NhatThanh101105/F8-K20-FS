const createCalculator = function () {
  return {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => (b === 0 ? "Lỗi: chia cho 0" : a / b),
  };
};

function average(...numbers) {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, n) => acc + n, 0);
  return sum / numbers.length;
}

function applyDiscount(price, discountPercent = 10) {
  if (!Number.isFinite(price)) return "Giá không hợp lệ";
  const finalPrice = price - (price * discountPercent) / 100;
  return Math.floor(finalPrice);
}

function safeCalculate(operation, ...numbers) {
  let result;
  switch (operation) {
    case "add":
      result = numbers.reduce((acc, n) => acc + n, 0);
      break;
    case "subtract":
      result = numbers.reduce((acc, n, i) => (i === 0 ? n : acc - n));
      break;
    case "multiply":
      result = numbers.reduce((acc, n) => acc * n, 1);
      break;
    case "average":
      result = average(...numbers);
      break;
    default:
      return "Phép tính không được hỗ trợ";
  }
  if (Number.isNaN(result)) return "Kết quả không hợp lệ";
  return result;
}