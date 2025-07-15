window.addEventListener("load", function () {
  const loader = document.querySelector(".loader");
  const video = document.querySelector(".video-loader");
  setTimeout(() => {
    loader.classList.add("hidden");
    if (video) {
      video.pause();
    }

    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, 0);
});

function getReCaptchaToken() {
  grecaptcha.ready(function () {
    grecaptcha
      .execute("6Lf7poErAAAAAMzv-1uM9l-mtbQnMTBxC1KUAWkN", { action: "test" })
      .then(function (token) {
        document.getElementById("result").textContent =
          "reCAPTCHA Token: " + token;
      });
  });
}

const menu1 = document.querySelector(".list-menu1");
const box_menu = document.querySelector(".box-menu");
const menu2 = document.querySelector(".list-menu2");
menu1.addEventListener("click", function (event) {
  event.preventDefault();
  box_menu.classList.add("selecter");
});
menu2.addEventListener("click", function (event) {
  event.preventDefault();
  box_menu.classList.remove("selecter");
});

const law1 = document.querySelector(".law-1");
law1.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "/html/law1.html";
});

const law2 = document.querySelector(".law-2");
law2.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "/html/law2.html";
});

const home = document.querySelector(".menu-bt5");
home.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "/html/index.html";
});

const form_login_register = document.querySelector(".menu-bt3");
form_login_register.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "/html/account.html";
});
