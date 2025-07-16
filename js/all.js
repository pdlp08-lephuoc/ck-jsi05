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

//law
const law1 = document.querySelector(".law-1");
const law2 = document.querySelector(".law-2");
law1.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "/html/law1.html";
});
law2.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "/html/law2.html";
});

//menu
const home = document.querySelector(".menu-bt5");
const form_login_register = document.querySelector(".menu-bt3");
const logout = document.querySelector(".menu-bt4");

home.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "/html/index.html";
});

form_login_register.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "/html/account.html";
});

function updateAuthUI() {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (storedUser) {
    if (logout) {
      logout.classList.add("menu-bt4-active");
    }
    if (form_login_register) {
      form_login_register.classList.remove("menu-bt3-active");
      form_login_register.style.display = "none";
    }
  } else {
    if (logout) {
      logout.classList.remove("menu-bt4-active");
      logout.style.display = "none";
    }
    if (form_login_register) {
      form_login_register.classList.add("menu-bt3-active");
    }
  }
}

window.addEventListener("load", updateAuthUI);

if (logout) {
  logout.addEventListener("click", function (event) {
    const confirm_logout = confirm("bạn có chắc muốn đăng xuất?");
    event.preventDefault();
    if (confirm_logout) {
      localStorage.removeItem("user");
      updateAuthUI();
      window.location.href = "/html/account.html";
    } else {
      alert("đăng xuất thất bại hoặc đã bị hủy");
    }
  });
}
