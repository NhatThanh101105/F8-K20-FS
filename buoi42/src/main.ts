/**
 * Module Xử Lý Thanh Toán Đơn Hàng - Ứng dụng TypeScript
 */
import "./style.css";
import type { PaymentReceipt, PaymentRequest, PaymentResult } from "./types/payment.types";
import { isPaymentRequest, getPaymentValidationErrors } from "./guards/payment.guard";
import {
  PaymentProcessor,
  CodPaymentProcessor,
  BankTransferProcessor,
  EWalletPaymentProcessor,
} from "./processors";
import { findById } from "./utils/generic.utils";
import { formatCurrency, formatMethodLabel } from "./utils/format.utils";

// ==========================================
// 1. Quản lý State phiên làm việc
// ==========================================
const receiptsState: PaymentReceipt[] = [];

// ==========================================
// 2. DOM Elements Selection với generic type
// ==========================================
const paymentForm = document.querySelector<HTMLFormElement>("#payment-form");
const orderIdInput = document.querySelector<HTMLInputElement>("#order-id");
const amountInput = document.querySelector<HTMLInputElement>("#amount");
const paymentMethodSelect = document.querySelector<HTMLSelectElement>("#payment-method");
const btnResetForm = document.querySelector<HTMLButtonElement>("#btn-reset-form");

const validationErrorBox = document.querySelector<HTMLDivElement>("#validation-error-box");
const validationErrorList = document.querySelector<HTMLUListElement>("#validation-error-list");
const paymentResultBox = document.querySelector<HTMLDivElement>("#payment-result-box");

const searchReceiptInput = document.querySelector<HTMLInputElement>("#search-receipt-id");
const btnSearchReceipt = document.querySelector<HTMLButtonElement>("#btn-search-receipt");
const searchResultBox = document.querySelector<HTMLDivElement>("#search-result-box");

const receiptsList = document.querySelector<HTMLDivElement>("#receipts-list");
const emptyReceiptsState = document.querySelector<HTMLDivElement>("#empty-receipts-state");
const receiptCountBadge = document.querySelector<HTMLSpanElement>("#receipt-count-badge");

// Nút kiểm thử nhanh
const btnScenarioCod = document.querySelector<HTMLButtonElement>("#scenario-cod");
const btnScenarioBank = document.querySelector<HTMLButtonElement>("#scenario-bank");
const btnScenarioWallet = document.querySelector<HTMLButtonElement>("#scenario-wallet");
const btnScenarioErrOrder = document.querySelector<HTMLButtonElement>("#scenario-err-order");
const btnScenarioErrAmount = document.querySelector<HTMLButtonElement>("#scenario-err-amount");
const btnScenarioErrMethod = document.querySelector<HTMLButtonElement>("#scenario-err-method");

// ==========================================
// 3. Kiểm tra tính tồn tại của phần tử DOM
// ==========================================
if (
  !paymentForm ||
  !orderIdInput ||
  !amountInput ||
  !paymentMethodSelect ||
  !btnResetForm ||
  !validationErrorBox ||
  !validationErrorList ||
  !paymentResultBox ||
  !searchReceiptInput ||
  !btnSearchReceipt ||
  !searchResultBox ||
  !receiptsList ||
  !emptyReceiptsState ||
  !receiptCountBadge
) {
  throw new Error("Không thể tìm thấy các phần tử DOM cần thiết trên giao diện.");
}

// ==========================================
// 4. Render Helpers
// ==========================================

function getMethodBadgeClass(method: string): string {
  switch (method) {
    case "COD":
      return "cod";
    case "BANK_TRANSFER":
      return "bank";
    case "E_WALLET":
      return "wallet";
    default:
      return "";
  }
}

/**
 * Hiển thị thông báo lỗi xác thực từ Type Guard
 */
function displayValidationErrors(errors: string[]): void {
  if (!validationErrorBox || !validationErrorList) return;

  validationErrorList.innerHTML = "";
  errors.forEach((err) => {
    const li = document.createElement("li");
    li.textContent = err;
    validationErrorList.appendChild(li);
  });

  validationErrorBox.style.display = "block";
}

function clearValidationErrors(): void {
  if (!validationErrorBox || !validationErrorList) return;
  validationErrorList.innerHTML = "";
  validationErrorBox.style.display = "none";
}

/**
 * Hiển thị kết quả thanh toán vừa tạo
 */
function displayPaymentResult(result: PaymentResult): void {
  if (!paymentResultBox) return;

  if (result.status === "error") {
    paymentResultBox.innerHTML = `
      <div class="alert alert-error">
        <div class="alert-header">
          <span class="alert-icon">❌</span>
          <strong>Lỗi thanh toán:</strong>
        </div>
        <p>${result.message}</p>
      </div>
    `;
    paymentResultBox.style.display = "block";
    return;
  }

  const receipt = result.data;
  const badgeClass = getMethodBadgeClass(receipt.method);
  const methodLabel = formatMethodLabel(receipt.method);

  paymentResultBox.innerHTML = `
    <div class="receipt-result-card">
      <div class="receipt-result-header">
        <span class="status-badge success">✔ Thanh toán thành công</span>
        <span class="receipt-id-tag">Mã biên nhận: #${receipt.id}</span>
      </div>
      <table class="receipt-details-table">
        <tbody>
          <tr>
            <td>Mã đơn hàng:</td>
            <td><strong>#${receipt.orderId}</strong></td>
          </tr>
          <tr>
            <td>Số tiền:</td>
            <td><strong style="color: #059669; font-size: 1.05rem;">${formatCurrency(receipt.amount)}</strong></td>
          </tr>
          <tr>
            <td>Phương thức:</td>
            <td>
              <span class="method-pill ${badgeClass}">${methodLabel}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="receipt-message-banner">
        <strong>Thông báo:</strong> ${receipt.message}
      </div>
    </div>
  `;
  paymentResultBox.style.display = "block";
}

function hidePaymentResult(): void {
  if (!paymentResultBox) return;
  paymentResultBox.style.display = "none";
  paymentResultBox.innerHTML = "";
}

/**
 * Cập nhật giao diện danh sách biên nhận
 */
function updateReceiptsView(): void {
  if (!receiptsList || !emptyReceiptsState || !receiptCountBadge) return;

  const total = receiptsState.length;
  receiptCountBadge.textContent = `${total} biên nhận`;

  if (total === 0) {
    emptyReceiptsState.style.display = "block";
    receiptsList.innerHTML = "";
    return;
  }

  emptyReceiptsState.style.display = "none";
  receiptsList.innerHTML = "";

  receiptsState.forEach((receipt) => {
    const card = document.createElement("div");
    card.className = "receipt-item-card";
    const badgeClass = getMethodBadgeClass(receipt.method);
    const methodLabel = formatMethodLabel(receipt.method);

    card.innerHTML = `
      <div class="receipt-item-top">
        <span class="receipt-id-tag">ID: #${receipt.id}</span>
        <span class="method-pill ${badgeClass}">${methodLabel}</span>
      </div>
      <div class="receipt-item-info">
        <span>Đơn hàng: <strong>#${receipt.orderId}</strong></span>
        <span class="receipt-item-amount">${formatCurrency(receipt.amount)}</span>
      </div>
      <div class="receipt-item-msg">
        ${receipt.message}
      </div>
      <div class="receipt-item-actions">
        <button type="button" class="btn-quick-find" data-receipt-id="${receipt.id}">
          🔍 Tra cứu biên nhận này
        </button>
      </div>
    `;

    // Gắn sự kiện click tìm nhanh cho từng biên nhận
    const quickFindBtn = card.querySelector<HTMLButtonElement>(".btn-quick-find");
    if (quickFindBtn) {
      quickFindBtn.addEventListener("click", () => {
        if (searchReceiptInput) {
          searchReceiptInput.value = String(receipt.id);
          executeReceiptSearch();
        }
      });
    }

    receiptsList.appendChild(card);
  });
}

/**
 * Thực hiện tìm kiếm biên nhận theo Generic findById
 */
function executeReceiptSearch(): void {
  if (!searchReceiptInput || !searchResultBox) return;

  const rawInput = searchReceiptInput.value.trim();

  if (rawInput === "") {
    searchResultBox.innerHTML = `
      <div class="search-result-container">
        <div class="search-not-found">
          <span class="search-not-found-icon">ℹ️</span>
          <div>Vui lòng nhập mã biên nhận ID cần tìm.</div>
        </div>
      </div>
    `;
    searchResultBox.style.display = "block";
    return;
  }

  const searchId = Number(rawInput);
  if (!Number.isInteger(searchId) || searchId <= 0) {
    searchResultBox.innerHTML = `
      <div class="search-result-container">
        <div class="search-not-found" style="background: #fef2f2; border-color: #fecaca; color: #991b1b;">
          <span class="search-not-found-icon">⚠️</span>
          <div>Mã biên nhận cần tìm phải là một số nguyên dương hợp lệ.</div>
        </div>
      </div>
    `;
    searchResultBox.style.display = "block";
    return;
  }

  // SỬ DỤNG HÀM GENERIC findById THEO YÊU CẦU PHẦN 3
  const found = findById<PaymentReceipt>(receiptsState, searchId);

  if (found) {
    const badgeClass = getMethodBadgeClass(found.method);
    const methodLabel = formatMethodLabel(found.method);

    searchResultBox.innerHTML = `
      <div class="search-result-container">
        <div class="receipt-result-card" style="border-color: #6366f1;">
          <div class="receipt-result-header">
            <span class="status-badge" style="background: #e0e7ff; color: #3730a3;">✔ Đã tìm thấy biên nhận</span>
            <span class="receipt-id-tag">ID: #${found.id}</span>
          </div>
          <table class="receipt-details-table">
            <tbody>
              <tr>
                <td>Mã đơn hàng:</td>
                <td><strong>#${found.orderId}</strong></td>
              </tr>
              <tr>
                <td>Số tiền:</td>
                <td><strong style="color: #059669; font-size: 1.05rem;">${formatCurrency(found.amount)}</strong></td>
              </tr>
              <tr>
                <td>Phương thức:</td>
                <td>
                  <span class="method-pill ${badgeClass}">${methodLabel}</span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="receipt-message-banner" style="background: #eef2ff; border-color: #c7d2fe; color: #3730a3;">
            <strong>Nội dung:</strong> ${found.message}
          </div>
        </div>
      </div>
    `;
  } else {
    searchResultBox.innerHTML = `
      <div class="search-result-container">
        <div class="search-not-found">
          <span class="search-not-found-icon">❌</span>
          <div>
            <strong>Không tìm thấy biên nhận!</strong><br />
            Không tồn tại biên nhận nào có ID <strong>#${searchId}</strong> trong danh sách hiện tại.
          </div>
        </div>
      </div>
    `;
  }

  searchResultBox.style.display = "block";
}

// ==========================================
// 5. Xử lý Form Submit & Xác thực Type Guard
// ==========================================
paymentForm.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault();

  // Kiểm tra type guard cho event.target
  if (!(event.target instanceof HTMLFormElement)) {
    return;
  }

  clearValidationErrors();
  hidePaymentResult();

  // 1. Lấy dữ liệu thô từ các trường form
  const rawOrderIdStr = orderIdInput.value.trim();
  const rawAmountStr = amountInput.value.trim();
  const rawMethod = paymentMethodSelect.value;

  // Chuyển đổi sang number nếu có thể
  const parsedOrderId = rawOrderIdStr === "" ? undefined : Number(rawOrderIdStr);
  const parsedAmount = rawAmountStr === "" ? undefined : Number(rawAmountStr);

  // 2. Tạo dữ liệu dưới dạng UNKNOWN theo đúng yêu cầu Phần 2:
  // "Trước khi xử lý thanh toán, tạo dữ liệu từ các trường form dưới dạng unknown và dùng type guard để xác thực."
  const rawPayload: unknown = {
    orderId: parsedOrderId,
    amount: parsedAmount,
    method: rawMethod,
  };

  // 3. Sử dụng Type Guard isPaymentRequest để xác thực
  if (!isPaymentRequest(rawPayload)) {
    // Dữ liệu KHÔNG hợp lệ -> Hiển thị thông báo lỗi và KHÔNG gọi bộ xử lý thanh toán
    const errorDetails = getPaymentValidationErrors(rawPayload);
    displayValidationErrors(errorDetails);
    return;
  }

  // 4. Khi isPaymentRequest(rawPayload) là true, TypeScript tự động thu hẹp sang PaymentRequest
  const paymentRequest: PaymentRequest = rawPayload;

  // 5. Khởi tạo instance của class phù hợp và gọi pay() thông qua kiểu cha PaymentProcessor (Phần 4)
  let processor: PaymentProcessor;

  switch (paymentRequest.method) {
    case "COD":
      processor = new CodPaymentProcessor(paymentRequest.orderId, paymentRequest.amount);
      break;
    case "BANK_TRANSFER":
      processor = new BankTransferProcessor(paymentRequest.orderId, paymentRequest.amount);
      break;
    case "E_WALLET":
      processor = new EWalletPaymentProcessor(paymentRequest.orderId, paymentRequest.amount);
      break;
  }

  // Gọi phương thức trừu tượng pay() thông qua kiểu cha PaymentProcessor
  const result: PaymentResult = processor.pay();

  // 6. Xử lý kết quả trả về
  if (result.status === "success") {
    // Thêm biên nhận vào danh sách trên giao diện
    receiptsState.unshift(result.data);
    updateReceiptsView();
    displayPaymentResult(result);
  } else {
    displayPaymentResult(result);
  }
});

// Nút làm mới form
btnResetForm.addEventListener("click", () => {
  orderIdInput.value = "";
  amountInput.value = "";
  paymentMethodSelect.value = "COD";
  clearValidationErrors();
  hidePaymentResult();
});

// Nút tìm kiếm biên nhận
btnSearchReceipt.addEventListener("click", () => {
  executeReceiptSearch();
});

// Tìm kiếm khi nhấn Enter trong ô tìm kiếm
searchReceiptInput.addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.key === "Enter") {
    e.preventDefault();
    executeReceiptSearch();
  }
});

// ==========================================
// 6. Gắn sự kiện các nút Quick Test Scenarios (Phần 6)
// ==========================================
function fillFormAndTrigger(orderId: string, amount: string, method: string): void {
  if (!orderIdInput || !amountInput || !paymentMethodSelect || !paymentForm) {
    return;
  }
  orderIdInput.value = orderId;
  amountInput.value = amount;
  paymentMethodSelect.value = method;

  // Kích hoạt submit form tự động
  paymentForm.requestSubmit();
}

btnScenarioCod?.addEventListener("click", () => {
  fillFormAndTrigger("1001", "250000", "COD");
});

btnScenarioBank?.addEventListener("click", () => {
  fillFormAndTrigger("1002", "500000", "BANK_TRANSFER");
});

btnScenarioWallet?.addEventListener("click", () => {
  fillFormAndTrigger("1003", "120000", "E_WALLET");
});

btnScenarioErrOrder?.addEventListener("click", () => {
  fillFormAndTrigger("-10", "250000", "COD");
});

btnScenarioErrAmount?.addEventListener("click", () => {
  fillFormAndTrigger("1004", "-50000", "COD");
});

btnScenarioErrMethod?.addEventListener("click", () => {
  fillFormAndTrigger("1005", "300000", "CRYPTO_UNKNOWN");
});

// Khởi tạo hiển thị danh sách biên nhận ban đầu
updateReceiptsView();
