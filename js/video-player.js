// video Player

// Define Variables

const videoPlayerContainer = document.querySelector(".video-player-container"),
  mainVideo = videoPlayerContainer.querySelector("video"),
  videoTimeline = videoPlayerContainer.querySelector(".video-timeline"),
  progressBar = videoPlayerContainer.querySelector(".progress-bar"),
  volumeBtn = videoPlayerContainer.querySelector(".volume i"),
  volumeSlider = videoPlayerContainer.querySelector(".left input");
(currentVidTime = videoPlayerContainer.querySelector(".current-time")),
  (videoDuration = videoPlayerContainer.querySelector(".video-duration")),
  (skipBackward = videoPlayerContainer.querySelector(".skip-backward i")),
  (skipForward = videoPlayerContainer.querySelector(".skip-forward i")),
  (playPauseBtn = videoPlayerContainer.querySelector(".play-pause i")),
  (speedBtn = videoPlayerContainer.querySelector(".playback-speed span")),
  (speedOptions = videoPlayerContainer.querySelector(".speed-options")),
  (pipBtn = videoPlayerContainer.querySelector(".pic-in-pic span")),
  (fullScreenBtn = videoPlayerContainer.querySelector(".fullscreen i"));

// Customize Properties

let timer;

const hideControls = () => {
  if (mainVideo.paused) return;
  timer = setTimeout(() => {
    videoPlayerContainer.classList.remove("show-controls");
  }, 2000);
};
hideControls();

videoPlayerContainer.addEventListener("mousemove", () => {
  videoPlayerContainer.classList.add("show-controls");
  clearTimeout(timer);
  hideControls();
});

const formatTime = (time) => {
  let seconds = Math.floor(time % 60),
    minutes = Math.floor(time / 60) % 60,
    hours = Math.floor(time / 3600);

  seconds = seconds < 10 ? `0${seconds}` : seconds;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  hours = hours < 10 ? `0${hours}` : hours;

  if (hours == 0) {
    return `${minutes}:${seconds}`;
  }
  return `${hours}:${minutes}:${seconds}`;
};

videoTimeline.addEventListener("mousemove", (e) => {
  let timelineWidth = videoTimeline.clientWidth;
  let offsetX = e.offsetX;
  let percent = Math.floor((offsetX / timelineWidth) * mainVideo.duration);
  const progressTime = videoTimeline.querySelector("span");
  offsetX =
    offsetX < 20
      ? 20
      : offsetX > timelineWidth - 20
      ? timelineWidth - 20
      : offsetX;
  progressTime.style.left = `${offsetX}px`;
  progressTime.innerText = formatTime(percent);
});

videoTimeline.addEventListener("click", (e) => {
  let timelineWidth = videoTimeline.clientWidth;
  mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
});

mainVideo.addEventListener("timeupdate", (e) => {
  let { currentTime, duration } = e.target;
  let percent = (currentTime / duration) * 100;
  progressBar.style.width = `${percent}%`;
  currentVidTime.innerText = formatTime(currentTime);
});

mainVideo.addEventListener("loadeddata", () => {
  videoDuration.innerText = formatTime(mainVideo.duration);
});

const draggableProgressBar = (e) => {
  let timelineWidth = videoTimeline.clientWidth;
  progressBar.style.width = `${e.offsetX}px`;
  mainVideo.currentTime = (e.offsetX / timelineWidth) * mainVideo.duration;
  currentVidTime.innerText = formatTime(mainVideo.currentTime);
};

volumeBtn.addEventListener("click", () => {
  if (!volumeBtn.classList.contains("fa-volume-high")) {
    mainVideo.volume = 0.5;
    volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
  } else {
    mainVideo.volume = 0.0;
    volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
  }
  volumeSlider.value = mainVideo.volume;
});

volumeSlider.addEventListener("input", (e) => {
  mainVideo.volume = e.target.value;
  if (e.target.value == 0) {
    return volumeBtn.classList.replace("fa-volume-high", "fa-volume-xmark");
  }
  volumeBtn.classList.replace("fa-volume-xmark", "fa-volume-high");
});

speedOptions.querySelectorAll("li").forEach((option) => {
  option.addEventListener("click", () => {
    mainVideo.playbackRate = option.dataset.speed;
    speedOptions.querySelector(".active").classList.remove("active");
    option.classList.add("active");
  });
});

document.addEventListener("click", (e) => {
  if (
    e.target.tagName !== "SPAN" ||
    e.target.className !== "material-symbols-rounded"
  ) {
    speedOptions.classList.remove("show");
  }
});

fullScreenBtn.addEventListener("click", () => {
  videoPlayerContainer.classList.toggle("fullscreen");
  if (document.fullscreenElement) {
    fullScreenBtn.classList.replace("fa-compress", "fa-expand");
    return document.exitFullscreen();
  }
  fullScreenBtn.classList.replace("fa-expand", "fa-compress");
  videoPlayerContainer.requestFullscreen();
});

mainVideo.addEventListener("dblclick", () => {
  videoPlayerContainer.requestFullscreen();
  if (document.fullscreenElement) {
    fullScreenBtn.classList.replace("fa-compress", "fa-expand");
    return document.exitFullscreen();
  }
  fullScreenBtn.classList.replace("fa-expand", "fa-compress");
  videoPlayerContainer.requestFullscreen();
});

speedBtn.addEventListener("click", () => speedOptions.classList.toggle("show"));
pipBtn.addEventListener("click", () => mainVideo.requestPictureInPicture());
skipBackward.addEventListener("click", () => (mainVideo.currentTime -= 5));
skipForward.addEventListener("click", () => (mainVideo.currentTime += 5));
mainVideo.addEventListener("play", () =>
  playPauseBtn.classList.replace("fa-play", "fa-pause")
);
mainVideo.addEventListener("pause", () =>
  playPauseBtn.classList.replace("fa-pause", "fa-play")
);
playPauseBtn.addEventListener("click", () =>
  mainVideo.paused ? mainVideo.play() : mainVideo.pause()
);
mainVideo.addEventListener("click", () => {
  mainVideo.paused ? mainVideo.play() : mainVideo.pause();
});
videoTimeline.addEventListener("mousedown", () =>
  videoTimeline.addEventListener("mousemove", draggableProgressBar)
);
document.addEventListener("mouseup", () =>
  videoTimeline.removeEventListener("mousemove", draggableProgressBar)
);