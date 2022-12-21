// Login & Register Form

const loginText = document.querySelector(".title-text .login"),
  loginForm = document.querySelector("form.login"),
  loginBtn = document.querySelector("label.login"),
  signupBtn = document.querySelector("label.signup"),
  signupLink = document.querySelector("form .signup-link a"),
  subMenu = document.getElementById("subMenu");

signupBtn.onclick = () => {
  loginForm.style.marginRight = "-50%";
  loginText.style.marginRight = "-50%";
};

loginBtn.onclick = () => {
  loginForm.style.marginRight = "0%";
  loginText.style.marginRight = "0%";
};

signupLink.onclick = () => {
  signupBtn.click();
  return false;
};
