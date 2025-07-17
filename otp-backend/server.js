require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors"); // Để xử lý CORS
const bodyParser = require("body-parser");

const app = express();
const port = 3000; // Hoặc cổng nào bạn muốn

// Middleware
app.use(cors()); // Cho phép các yêu cầu từ frontend của bạn
app.use(bodyParser.json()); // Để đọc dữ liệu JSON từ request body

// Lưu trữ OTP tạm thời (trong môi trường thực tế nên dùng database như Redis, MongoDB, PostgreSQL)
const otpStorage = {}; // { email: { otp: '...', expires: timestamp } }

// Cấu hình Nodemailer
let transporter = nodemailer.createTransport({
  service: "gmail", // Hoặc dịch vụ email của bạn
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Endpoint để gửi OTP
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email là bắt buộc." });
  }

  // Tạo OTP 6 chữ số
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = Date.now() + 5 * 60 * 1000; // OTP hết hạn sau 5 phút

  otpStorage[email] = { otp, expires };
  console.log(`OTP cho ${email}: ${otp}`); // Để debug trên console server

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Mã OTP đặt lại mật khẩu của bạn",
    html: `<p>Mã OTP của bạn là: <strong>${otp}</strong></p><p>Mã này sẽ hết hạn sau 5 phút.</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({
      success: true,
      message: "Mã OTP đã được gửi đến email của bạn.",
    });
  } catch (error) {
    console.error("Lỗi gửi email:", error);
    res.status(500).json({
      success: false,
      message: "Không thể gửi mã OTP. Vui lòng thử lại.",
    });
  }
});

// Endpoint để xác minh OTP
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res
      .status(400)
      .json({ success: false, message: "Email và OTP là bắt buộc." });
  }

  const storedOtpData = otpStorage[email];

  if (!storedOtpData) {
    return res.status(400).json({
      success: false,
      message: "Không tìm thấy mã OTP cho email này.",
    });
  }

  if (Date.now() > storedOtpData.expires) {
    delete otpStorage[email]; // Xóa OTP đã hết hạn
    return res
      .status(400)
      .json({ success: false, message: "Mã OTP đã hết hạn." });
  }

  if (otp === storedOtpData.otp) {
    delete otpStorage[email]; // Xóa OTP sau khi sử dụng thành công
    res.json({
      success: true,
      message: "Mã OTP hợp lệ. Bạn có thể tiến hành đặt lại mật khẩu.",
    });
  } else {
    res.status(400).json({
      success: false,
      message: "Mã OTP không đúng. Vui lòng kiểm tra lại.",
    });
  }
});

app.listen(port, () => {
  console.log(`Backend server đang chạy tại http://localhost:${port}`);
});
