// Video Upload

let file = document.getElementById("upload");
let button = document.getElementsByTagName("button");
let progress = document.querySelector("progress");
let p_i = document.querySelector("progress-indicator");
let load;
let process = "";

file.oninput = () => {
  let filename = file.files[0].name;
  let extention = filename.split(".").pop();
  let filesize = file.files[0].size;

  if (filesize <= 1000000) {
    filesize = (filesize / 1000).toFixed(2) + "KB";
  }
  if (filesize == 1000000 || filesize <= 1000000000) {
    filesize = (filesize / 1000000).toFixed(2) + "MB";
  }
  if (filesize == 1000000000 || filesize <= 1000000000000) {
    filesize = (filesize / 1000000000).toFixed(2) + "GB";
  }
  document.querySelector(".select-file").innerText = filename;
  document.querySelector(".extention").innerText = extention;
  document.querySelector(".size").innerText = filesize;
  getFile(filename);
};

let upload = () => {
  if (load >= 100) {
    clearInterval(process);
    p_i.innerHTML = "100%" + "Upload Completed";
    button[0].classList.remove("active");
  } else {
    load++;
    progress.value = load;
    p_i.innerHTML = "Upload";
    button[1].onclick = (e) => {
      e.preventDefault();
      clearInterval(process);
      document.querySelector(".progress-section").style.display = "none";
      button[1].style.visibility = "hidden";
      button[0].classList.remove("active");
    };
  }
};

function getFile(fileName) {
  if (fileName) {
    document.querySelector(".progress-section").style.display = "block";
    load = 0;
    progress.value = 0;
    // p_i.innerText = ;
    button[0].onclick = (e) => {
      e.preventDefault();
      button[0].classList.add("active");
      button[1].style.visibility = "visible";
      process = setInterval(upload, 100);
    };
  }
}