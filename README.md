# ck-jsi05

This project contains a web application with frontend and backend components for account management and OTP verification.

## Project Structure

- `css/` - Stylesheets for the frontend UI
- `html/` - HTML files for various pages (account, index, law, password, etc.)
- `img/` - Image assets used in the frontend
- `js/` - JavaScript files for frontend logic and Firebase configuration
- `otp-backend/` - Backend code for OTP handling, including a Node.js server and Firebase admin configuration

## Getting Started

### Prerequisites

- Node.js (for backend)
- npm (Node package manager)

### Backend Setup

1. Navigate to the `otp-backend` directory:
   ```sh
   cd otp-backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the backend server:
   ```sh
   node server.js
   ```

### Frontend Usage

Open the HTML files in the `html/` directory in your browser. Make sure the backend server is running for OTP-related features.

## Configuration

- Update Firebase configuration in `js/firebaseconfig.js` for frontend Firebase usage.
- Backend Firebase admin credentials are stored in `otp-backend/ck-project-d8f52-firebase-adminsdk-fbsvc-96e6a40fc3.json` (do not share this file publicly).

## Scripts

- Backend server: `otp-backend/server.js`
- Frontend logic: `js/all.js`, `js/account.js`, `js/password.js`, `js/script.js`

## License

Specify your license here.

---

Feel free to update this README with more details as your project evolves.
