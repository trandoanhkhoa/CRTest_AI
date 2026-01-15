import React from 'react';

const MailIcon = () => (
  <svg
    className="w-16 h-16 text-blue-500"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" ry="2" />
    <path d="M22 6l-10 7L2 6" />
  </svg>
);

const RegisterSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 px-4">
      <div className="relative bg-white max-w-md w-full p-8 rounded-3xl shadow-xl text-center">
        {/* Badge */}
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 
                        bg-blue-500 text-white text-sm font-semibold 
                        px-4 py-1 rounded-full shadow"
        >
          Đăng ký thành công
        </div>

        {/* Icon */}
        <div className="flex justify-center mt-6 mb-4">
          <MailIcon />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Chúc mừng bạn đã đăng ký thành công!
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          Hệ thống đã gửi thông tin tài khoản khảo sát đến email của bạn.
          <br />
          <span className="font-medium text-gray-700">
            Vui lòng kiểm tra hộp thư (bao gồm cả Spam)
          </span>
          <br />
          để đăng nhập và bắt đầu làm khảo sát.
        </p>

        {/* Divider */}
        <div className="h-px bg-gray-200 mb-6" />

        {/* Button */}
        <a
          href="/login"
          className="w-full inline-block border border-gray-300 py-2.5 rounded-xl 
                     font-medium text-gray-700 hover:bg-gray-100 transition"
        >
          Về trang chủ
        </a>
      </div>
    </div>
  );
};

export default RegisterSuccess;
