const circle_1 = document.querySelector(".circle-1");
const circle_2 = document.querySelector(".circle-2");
const circle_3 = document.querySelector(".circle-3");

const line_link_1 = document.querySelector(".line-link-1");
const line_link_2 = document.querySelector(".line-link-2");

circle_1.addEventListener("click", function (event) {
  event.preventDefault();
  setTimeout(function () {
    line_link_1.classList.remove("line-link-1-active");
    verify_email.classList.remove("verify-email-active");
    accept_recapcha.classList.remove("accept-recapcha-active");
    masage_otp.classList.remove("masage-otp-active");
  }, 300);
  line_link_2.classList.remove("line-link-2-active");
});
circle_2.addEventListener("click", function (event) {
  event.preventDefault();
  line_link_1.classList.add("line-link-1-active");
  line_link_2.classList.remove("line-link-2-active");
  verify_email.classList.add("verify-email-active");
  accept_recapcha.classList.add("accept-recapcha-active");
  masage_otp.classList.add("masage-otp-active");
});
circle_3.addEventListener("click", function (event) {
  event.preventDefault();
  line_link_1.classList.add("line-link-1-active");
  verify_email.classList.add("verify-email-active");
  accept_recapcha.classList.add("accept-recapcha-active");
  masage_otp.classList.remove("masage-otp-active");

  setTimeout(function () {
    line_link_2.classList.add("line-link-2-active");
  }, 300);
});

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { auth } from "./firebaseconfig.js";

const verify_confirm_email = document.querySelector("#verify-confirm-email");
const btn_verify_email = document.querySelector(".btn-verify-email");
const verify_email = document.querySelector(".verify-email");
const accept_recapcha = document.querySelector(".accept-recapcha");
const masage_otp = document.querySelector(".masage-otp");

btn_verify_email.addEventListener("click", function (event) {
  event.preventDefault();
  console.log("click");

  const verify_emailvalue = verify_confirm_email.value.trim();
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (verify_emailvalue === "") {
    alert("Vui lòng nhập đầy đủ email");
    return;
  }

  if (!regexEmail.test(verify_emailvalue)) {
    alert("Email không hợp lệ");
    return;
  }

  const currentUser = auth.currentUser;
  if (!currentUser) {
    alert("Không tìm thấy người dùng đang đăng nhập!");
    return;
  }
  const response = grecaptcha.getResponse();
  if (!response) {
    alert("Vui lòng xác minh bạn không phải là robot!");
  } else {
    line_link_1.classList.add("line-link-1-active");
    line_link_2.classList.remove("line-link-2-active");
    verify_email.classList.add("verify-email-active");
    accept_recapcha.classList.add("accept-recapcha-active");
    masage_otp.classList.add("masage-otp-active");
  }
});
