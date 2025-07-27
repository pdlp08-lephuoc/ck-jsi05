# ck-jsi05

Dự án này là một ứng dụng web gồm frontend và backend cho quản lý tài khoản và xác thực OTP.

## Cấu trúc dự án

- `css/` – Các file CSS cho giao diện frontend
- `html/` – Các file HTML cho các trang (account, index, law, password, ...)
- `img/` – Hình ảnh sử dụng cho frontend
- `js/` – JavaScript cho logic frontend và cấu hình Firebase
- `otp-backend/` – Backend xử lý OTP, gồm server Node.js và cấu hình Firebase admin

## Bắt đầu

### Yêu cầu

- Node.js (cho backend)
- npm (Node package manager)

### Cài đặt backend

1. Di chuyển vào thư mục `otp-backend`:
   ```sh
   cd otp-backend
   ```
2. Cài đặt các package cần thiết:

   ```sh
   npm install
   ```

3. Khởi động server backend:
   - **Cách 1 (Khuyên dùng):**
     - Mở dự án bằng Visual Studio Code.
     - Khi được hỏi, nhấn nút **"Y"** để tự động khởi động server backend qua task (không cần mở terminal thủ công).
     - Hoặc vào menu **Terminal > Run Task...** và chọn **Start OTP Server**.
   - **Cách 2 (Thủ công):**
     - Mở terminal, chạy lệnh:
       ```sh
       node server.js
       ```

### Dừng server backend

- Nếu chạy bằng VS Code Task:
  - Nhấn `Ctrl+C` trong terminal task hoặc dừng task trong menu **Terminal > Run Task...**
  - Hoặc dùng lệnh dừng task trong Command Palette:
    ```sh
    Tasks: Terminate Task
    ```
    Sau đó chọn **Start OTP Server** để dừng server.
- Nếu chạy bằng node:
  - Nhấn `Ctrl+C` trong terminal đang chạy lệnh `node server.js`.
  - Hoặc dùng lệnh sau trong Command Prompt hoặc PowerShell để dừng toàn bộ tiến trình node:
    ```sh
    taskkill /F /IM node.exe
    ```

### Sử dụng frontend

Mở các file HTML trong thư mục `html/` bằng trình duyệt. Đảm bảo backend đã chạy để sử dụng các tính năng OTP.

## Cấu hình

- Cập nhật cấu hình Firebase ở `js/firebaseconfig.js` cho frontend.
- Thông tin xác thực Firebase admin cho backend nằm ở `otp-backend/ck-project-d8f52-firebase-adminsdk-fbsvc-96e6a40fc3.json` (không chia sẻ file này công khai).

## Scripts

- Backend: `otp-backend/server.js`
- Frontend: `js/all.js`, `js/account.js`, `js/password.js`, `js/script.js`

## License

Vui lòng bổ sung thông tin giấy phép tại đây.

---

Bạn có thể cập nhật README này khi dự án phát triển thêm.
