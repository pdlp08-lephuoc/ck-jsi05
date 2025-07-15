const free = document.querySelector("#free");
const endown = document.querySelector(".endown");

function checkemailendown(input) {
  input.value = input.value.trim();
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (input.value.length === 0) {
    alert("Vui lòng nhập email!");
    return false;
  }
  if (!regexEmail.test(input.value)) {
    alert("Email không hợp lệ!");
    return false;
  }

  return true;
}

endown.addEventListener("click", function (event) {
  event.preventDefault();

  if (!checkemailendown(free)) {
    return;
  }

  const recaptchaResponse = grecaptcha.getResponse();
  const recapcha_container = document.querySelector(".recapcha-container");

  if (recaptchaResponse.length === 0) {
    recapcha_container.classList.add("recapcha-container-active");
    return;
  }

  alert("Từ giờ các ưu đãi sẽ được gửi qua email của bạn!");
  recapcha_container.classList.remove("recapcha-container-active");
  free.value = "";
  grecaptcha.reset();
});
