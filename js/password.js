const circle_1 = document.querySelector(".circle-1");
const circle_2 = document.querySelector(".circle-2");
const circle_3 = document.querySelector(".circle-3");

const line_link_1 = document.querySelector(".line-link-1");
const line_link_2 = document.querySelector(".line-link-2");

const otp_input = document.querySelector("#otp-input");
const verify_confirm_email = document.querySelector("#verify-confirm-email");
const btn_verify_email = document.querySelector(".btn-verify-email");
const verify_email_section = document.querySelector(".verify-email");
const accept_recapcha = document.querySelector(".accept-recapcha");
const masage_otp = document.querySelector(".masage-otp");
const btn_verify_otp = document.querySelector(".btn-verify-otp");
const newPasswordForm = document.querySelector(".new-password-form");

const BACKEND_URL = "http://localhost:3000";

let isEmailSentSuccessfully = false;
let isOtpVerifiedSuccessfully = false;

circle_1.addEventListener("click", function (event) {
  event.preventDefault();
  console.log("Clicked circle 1 - Điều hướng UI đến bước nhập email.");

  isEmailSentSuccessfully = false;
  isOtpVerifiedSuccessfully = false;

  line_link_1.classList.remove("line-link-1-active");
  line_link_2.classList.remove("line-link-2-active");

  verify_email_section.classList.remove("verify-email-active");
  accept_recapcha.classList.remove("accept-recapcha-active");

  masage_otp.classList.remove("masage-otp-active");
  if (newPasswordForm) {
    newPasswordForm.style.display = "none";
  }
});

circle_2.addEventListener("click", function (event) {
  event.preventDefault();
  console.log("Clicked circle 2 - Điều hướng UI đến bước xác minh OTP.");

  if (!isEmailSentSuccessfully) {
    alert("Vui lòng nhập email và gửi mã OTP trước!");
    return;
  }

  line_link_1.classList.add("line-link-1-active");
  line_link_2.classList.remove("line-link-2-active");

  verify_email_section.classList.add("verify-email-active");
  accept_recapcha.classList.add("accept-recapcha-active");
  masage_otp.classList.add("masage-otp-active");

  if (newPasswordForm) {
    newPasswordForm.style.display = "none";
  }
});

circle_3.addEventListener("click", function (event) {
  event.preventDefault();
  console.log("Clicked circle 3 - Điều hướng UI đến bước cập nhật mật khẩu.");

  if (!isOtpVerifiedSuccessfully) {
    alert("Vui lòng xác minh mã OTP trước khi cập nhật mật khẩu!");
    return;
  }

  line_link_1.classList.add("line-link-1-active");
  line_link_2.classList.add("line-link-2-active");

  verify_email_section.classList.add("verify-email-active");
  accept_recapcha.classList.add("accept-recapcha-active");
  masage_otp.classList.remove("masage-otp-active");

  if (newPasswordForm) {
    newPasswordForm.style.display = "block";
  }
});

btn_verify_email.addEventListener("click", async function (event) {
  event.preventDefault();
  console.log("btn_verify_email clicked: Attempting to send OTP");

  const emailValue = verify_confirm_email.value.trim();
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const recaptchaResponse = grecaptcha.getResponse();

  if (emailValue === "") {
    alert("Vui lòng nhập email của bạn!");
    return;
  } else if (!regexEmail.test(emailValue)) {
    alert("Email không hợp lệ!");
    return;
  } else if (!recaptchaResponse) {
    alert("Vui lòng xác minh reCAPTCHA!");
    return;
  }

  try {
    const backendResponse = await fetch(`${BACKEND_URL}/send-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: emailValue }),
    });

    const data = await backendResponse.json();

    if (data.success) {
      alert(data.message);
      isEmailSentSuccessfully = true;
      isOtpVerifiedSuccessfully = false;

      line_link_1.classList.add("line-link-1-active");
      line_link_2.classList.remove("line-link-2-active");
      verify_email_section.classList.add("verify-email-active");
      accept_recapcha.classList.add("accept-recapcha-active");
      masage_otp.classList.add("masage-otp-active");
      if (newPasswordForm) {
        newPasswordForm.style.display = "none";
      }
      grecaptcha.reset();
      otp_input.value = "";
    } else {
      alert(data.message);
      grecaptcha.reset();
    }
  } catch (error) {
    console.error("Lỗi khi gửi OTP đến backend:", error);
    alert("Đã xảy ra lỗi khi gửi mã OTP. Vui lòng thử lại sau.");
    grecaptcha.reset();
  }
});

btn_verify_otp.addEventListener("click", async function (event) {
  event.preventDefault();
  console.log("btn_verify_otp clicked: Attempting to verify OTP");

  const emailValue = verify_confirm_email.value.trim();
  const OTP_valid = otp_input.value.trim();

  if (OTP_valid === "") {
    alert("Vui lòng nhập mã OTP gửi qua email của bạn.");
    return;
  }
  if (emailValue === "") {
    alert("Email không được để trống.");
    return;
  }

  try {
    const backendResponse = await fetch(`${BACKEND_URL}/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: emailValue, otp: OTP_valid }),
    });

    const data = await backendResponse.json();

    if (data.success) {
      alert(data.message);
      isOtpVerifiedSuccessfully = true;

      line_link_1.classList.add("line-link-1-active");
      line_link_2.classList.add("line-link-2-active");
      verify_email_section.classList.add("verify-email-active");
      accept_recapcha.classList.add("accept-recapcha-active");
      masage_otp.classList.remove("masage-otp-active");

      if (newPasswordForm) {
        newPasswordForm.style.display = "block";
      }
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Lỗi khi xác minh OTP với backend:", error);
    alert("Đã xảy ra lỗi khi xác minh mã OTP. Vui lòng thử lại.");
  }
});
