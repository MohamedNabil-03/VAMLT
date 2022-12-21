// Dark Mode

let darkModeToggle = document.getElementById("dark-mode-toggle");
darkModeToggle.onclick = function () {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    darkModeToggle.src = "../images/sun.png";
    darkModeToggle.title = "الوضع العادي";
  } else {
    darkModeToggle.src = "../images/moon.png";
    darkModeToggle.title = "الوضع الداكن";
  }
};

// Sub Menu

function toggleMenu() {
  subMenu.classList.toggle("open-menu");
}