import {
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { db } from "./firebaseconfig.js";
import { updateProfile } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { auth } from "./firebaseconfig.js";

const tran_login = document.querySelector(".tran-login");
const tran_register = document.querySelector(".tran-register");
const text_neo_rgt = document.querySelector(".text-neo-rgt");
const form_login = document.querySelector(".form-login");
const form_register = document.querySelector(".form-register");
const user_register = document.querySelector("#user-register");
const email_register = document.querySelector("#email-register");
const password_register = document.querySelector("#password-register");
const confirm_password = document.querySelector("#confirm-password");
const phone_register = document.querySelector("#phone");
const legalCheckbox = document.querySelector("#legal-btn");
const email_login = document.querySelector("#email-login");
const password_login = document.querySelector("#password-login");

tran_register.addEventListener("click", function (event) {
  event.preventDefault();
  form_login.classList.remove("login-active");
  form_register.classList.remove("register-active");
  text_neo_rgt.classList.remove("text-neo-rgt-active");
});

tran_login.addEventListener("click", function (event) {
  event.preventDefault();
  form_login.classList.add("login-active");
  form_register.classList.add("register-active");
  text_neo_rgt.classList.add("text-neo-rgt-active");
});
////////
function error(input, message) {
  const parent = input.parentElement;
  const small = parent.querySelector(".error");
  parent.classList.add("error-input");
  small.innerText = message;
}

function success(input) {
  const parent = input.parentElement;
  const small = parent.querySelector(".error");
  parent.classList.remove("error-input");
  small.innerText = "";
}

function checklength(input, min, max) {
  input.value = input.value.trim();
  if (input.value.length < min) {
    error(input, `cần ít nhất ${min} kí tự`);
    return false;
  }
  if (input.value.length > max) {
    error(input, `Không được vượt quá ${max} kí tự`);
    return false;
  }
  success(input);
  return true;
}

function passwordMatch(passwordInput, confirmPasswordInput) {
  if (confirmPasswordInput.value.trim() === "") {
    error(confirmPasswordInput, "Vui lòng nhập xác nhận mật khẩu!");
    return false;
  }
  if (passwordInput.value !== confirmPasswordInput.value) {
    error(confirmPasswordInput, "Mật khẩu không khớp!");
    return false;
  }
  success(confirmPasswordInput);
  return true;
}

function checkEmail(input) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  input.value = input.value.trim();
  if (!regexEmail.test(input.value)) {
    error(input, "Email không hợp lệ!");
    return false;
  }
  success(input);
  return true;
}

function checkPhone(input) {
  const regexPhone = /^[0-9]{9,11}$/;
  input.value = input.value.trim();
  if (!regexPhone.test(input.value)) {
    error(input, "Số điện thoại không hợp lệ!");
    return false;
  }
  success(input);
  return true;
}

function checksimilar(input) {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const email = input.value.trim();

  if (storedUser && storedUser.email === email) {
    error(input, "Email đã được đăng ký!");
    return false;
  }
  success(input);
  return true;
}

form_register.addEventListener("submit", function (event) {
  event.preventDefault();
  const emailvalid = checkEmail(email_register);
  const checklengthuser = checklength(user_register, 3, 20);
  const checklengthpassword = checklength(password_register, 6, 20);
  const checkmatch = passwordMatch(password_register, confirm_password);
  const phonevalid = checkPhone(phone_register);
  const emailsimilar = emailvalid ? checksimilar(email_register) : false;
  const legalacccept = legalCheckbox.checked;
  const btnRegister = document.getElementById("btn-register");
  const spanRegister = btnRegister.querySelector("span");
  if (
    emailvalid &&
    checklengthuser &&
    checklengthpassword &&
    checkmatch &&
    phonevalid &&
    emailsimilar && // Lưu ý: Hàm này hiện đang kiểm tra localStorage, không phải Firebase Auth.
    legalacccept
  ) {
    btnRegister.disabled = true;
    spanRegister.innerHTML = `<span class="btn-spinner"></span>`;

    createUserWithEmailAndPassword(
      auth,
      email_register.value.trim(),
      password_register.value.trim()
    )
      .then(async (userCredential) => {
        const user = userCredential.user;

        const userdata = {
          username: user.displayName || user.email, // Vẫn dùng user.displayName ban đầu nếu chưa có
        };
        localStorage.setItem("user", JSON.stringify(userdata));

        await updateProfile(user, {
          displayName: user_register.value.trim(),
        });

        // Sau khi updateProfile hoàn tất, user.displayName đã được cập nhật
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          username: user.displayName, // Sử dụng user.displayName đã được cập nhật
          email: email_register.value.trim(),
          phone: phone_register.value.trim(),
          createdAt: new Date().toISOString(),
        });

        alert("Đăng ký thành công!");
        btnRegister.disabled = false;
        spanRegister.innerText = "Đăng ký";

        console.log("User đăng ký:", user);
        window.location.href = "/html/index.html";
      })
      .catch((error) => {
        btnRegister.disabled = false;
        spanRegister.innerText = "Đăng ký";

        alert("Lỗi đăng ký: " + error.message);
      });
  } else if (!legalacccept) {
    alert("Vui lòng đồng ý với điều khoản");
  }
});
form_login.addEventListener("submit", function (e) {
  e.preventDefault();
  const email = email_login.value.trim();
  const password = password_login.value.trim();
  const btnlogin = document.getElementById("btn-login");
  const spanlogin = btnlogin.querySelector("span");
  const remember = document.querySelector("#remember_me");
  const checkbox = remember.checked;

  if (email === "" || password === "") {
    alert("Vui lòng nhập đầy đủ thông tin");
    return;
  }
  btnlogin.disabled = true;
  spanlogin.innerHTML = `<span class="btn-spinner"></span>`;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert("Đăng nhập thành công!");
      console.log("User đăng nhập:", userCredential.user);
      window.location.href = "/html/index.html";
      const userdata = {
        username: userCredential.user.displayName || userCredential.user.email,
      };
      localStorage.setItem("user", JSON.stringify(userdata));
      if (checkbox) {
        const userdata = {
          username:
            userCredential.user.displayName || userCredential.user.email,
        };
        localStorage.setItem("remember", JSON.stringify(userdata));
      }
    })
    .catch((error) => {
      btnlogin.disabled = false;
      spanlogin.innerText = "Đăng nhập";

      alert("Lỗi đăng nhập: " + error.message);
    });
});

const reset_password = document.querySelector(".reset-password");
reset_password.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "/html/password.html";
});
