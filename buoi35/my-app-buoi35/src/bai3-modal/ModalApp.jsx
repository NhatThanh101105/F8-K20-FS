import { useRef, useState } from "react";
import Modal from "./Modal";

export default function ModalApp() {
  const modalRef = useRef(null);
  const [agreed, setAgreed] = useState(false);

  const handleOpen = () => {
    modalRef.current.open();
  };

  const handleAgree = () => {
    setAgreed(true);
    modalRef.current.close();
  };

  const handleClose = () => {
    modalRef.current.close();
  };

  return (
    <div className="min-h-[85vh] bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto mb-5 bg-blue-50 rounded-2xl flex items-center justify-center">
          <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Điều khoản sử dụng
        </h2>
        <p className="text-gray-400 text-sm mb-8 leading-relaxed max-w-xs mx-auto">
          Vui lòng đọc và đồng ý với các điều khoản trước khi sử dụng dịch vụ
        </p>

        {agreed ? (
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-50 border border-green-200 rounded-xl text-green-600 font-semibold text-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Bạn đã đồng ý điều khoản
          </div>
        ) : (
          <button
            onClick={handleOpen}
            className="px-8 py-3.5 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 active:scale-95 transition-all cursor-pointer shadow-lg shadow-blue-500/25 text-sm"
          >
            Mở bảng điều khoản
          </button>
        )}

        {/* Explanation */}
        <div className="mt-10 p-4 bg-gray-900 rounded-xl text-left">
          <p className="text-gray-500 text-[10px] uppercase tracking-widest font-semibold mb-2">
            Cách hoạt động
          </p>
          <code className="text-green-400 text-xs font-mono">
            modalRef.current.<span className="text-yellow-300">open</span>()
          </code>
          <span className="text-gray-500 text-xs mx-2">/</span>
          <code className="text-green-400 text-xs font-mono">
            modalRef.current.<span className="text-yellow-300">close</span>()
          </code>
          <p className="text-gray-500 text-[11px] mt-2.5 leading-relaxed">
            Parent không quản lý state <code className="text-orange-300">isOpen</code> — Modal tự quản lý với <code className="text-orange-300">useImperativeHandle</code>
          </p>
        </div>
      </div>

      {/* Modal */}
      <Modal ref={modalRef} title="Điều khoản sử dụng">
        <div className="space-y-4">
          <div className="max-h-56 overflow-y-auto pr-2 space-y-3 text-gray-600 text-sm leading-relaxed">
            <p>
              <strong className="text-gray-800">1. Chấp nhận điều khoản:</strong>{" "}
              Bằng việc sử dụng dịch vụ, bạn đồng ý tuân thủ tất cả các điều khoản và điều kiện.
            </p>
            <p>
              <strong className="text-gray-800">2. Quyền riêng tư:</strong>{" "}
              Chúng tôi cam kết bảo vệ thông tin cá nhân. Dữ liệu sẽ được mã hóa và không chia sẻ cho bên thứ ba.
            </p>
            <p>
              <strong className="text-gray-800">3. Quyền sở hữu trí tuệ:</strong>{" "}
              Tất cả nội dung và tài liệu trên nền tảng thuộc quyền sở hữu trí tuệ của chúng tôi.
            </p>
            <p>
              <strong className="text-gray-800">4. Hạn chế sử dụng:</strong>{" "}
              Không được sao chép, phân phối nội dung cho mục đích thương mại mà chưa được ủy quyền.
            </p>
            <p>
              <strong className="text-gray-800">5. Trách nhiệm:</strong>{" "}
              Chúng tôi không chịu trách nhiệm về thiệt hại phát sinh từ việc sử dụng dịch vụ.
            </p>
            <p>
              <strong className="text-gray-800">6. Thay đổi điều khoản:</strong>{" "}
              Chúng tôi có quyền thay đổi điều khoản bất cứ lúc nào.
            </p>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={handleClose}
              className="flex-1 py-2.5 border border-gray-300 text-gray-600 font-medium rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Đóng
            </button>
            <button
              onClick={handleAgree}
              className="flex-1 py-2.5 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 active:scale-95 transition-all cursor-pointer shadow-md shadow-blue-500/20"
            >
              Đồng ý
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
