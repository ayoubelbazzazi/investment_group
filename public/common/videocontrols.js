const video = document.querySelector("video"),
  videoContainer = document.querySelector(".video-container"),
  videoControls = document.querySelector(".video-controls-container"),
  videoMobileControls = document.querySelector(".video-mobile-controls"),
  preControls = document.querySelector(".pre-controls"),
  volumeBtn = document.querySelector(".volume-btn"),
  fullScreenBtn = document.querySelectorAll(".full-screen-btn"),
  volumeSlider = document.querySelector(".volume-slider"),
  volumeIndicator = document.querySelector(".volume-indicator"),
  speedBtn = document.querySelectorAll(".speed-btn"),
  captionsBtn = document.querySelectorAll(".captions-btn"),
  miniPlayerBtn = document.querySelector(".mini-player-btn"),
  playPauseBtn = document.querySelector(".play-pause-btn"),
  playPauseBtnMobile = document.querySelector(".play-pause-btn-mobile"),
  totalTime = document.querySelectorAll(".total-time"),
  currentTime = document.querySelectorAll(".current-time"),
  timeline = document.querySelector(".timeline"),
  timelineContainer = document.querySelector(".timeline-container"),
  fastForward = document.querySelector(".fast-forward"),
  fastForwardTimer = fastForward.querySelector(".timer"),
  rewind = document.querySelector(".rewind"),
  rewindTimer = rewind.querySelector(".timer"),
  timelineContainerMobile = document.querySelector(
    ".timeline-container-mobile"
  ),
  timelineMobile = document.querySelector(".timeline-mobile");

let isTouchScreen = Boolean(
  /Mobi|Android|iPhone|IEMobile|Opera Mini/i.test(navigator.userAgent)
);

window.addEventListener("resize", () => {
  isTouchScreen = Boolean(
    /Mobi|Android|iPhone|IEMobile|Opera Mini/i.test(navigator.userAgent)
  );
});

// keyboard shortcuts controls

let isScrubbing = false;
let wasPlaying = false;
const threshold = 300;

document.addEventListener("keydown", (e) => {
  if (isTouchScreen) return;
  if (!Array.from(videoContainer.classList).includes("allow-keyboard-events"))
    return;
  const tagName = document.activeElement.tagName.toLowerCase();
  switch (e.key.toLowerCase()) {
    case " ":
      const videoTop = video.getBoundingClientRect().top;
      const videoBottom = video.getBoundingClientRect().bottom;
      const preventDefaultCondition = Boolean(
        Boolean(videoTop > 0 && videoTop < window.innerHeight) ||
          Boolean(videoBottom > 0 && videoBottom < window.innerHeight)
      );
      if (preventDefaultCondition && tagName !== "button") e.preventDefault();
      if (!preventDefaultCondition && !document.fullscreenElement) return;
      if (tagName === "button") return;
    case "k":
      togglePlay();
      break;
    case "m":
      toggleMute();
      break;
    case "f":
      toggleFullScreen();
      break;
    case "c":
      captionsBtn.forEach((btn) => toggleCaptions(btn));
      break;
    case "arrowleft":
      rewinding();
      break;
    case "arrowright":
      fastForwarding();
      break;
    default:
      break;
  }
});

// play pause controls

video.addEventListener("click", videoClick);

playPauseBtn.addEventListener("click", togglePlay);

video.addEventListener("ended", () => {
  wasPlaying = false;
});

function togglePlay() {
  video.paused ? video.play() : video.pause();
}

video.addEventListener("play", () => {
  videoContainer.classList.remove("paused");
});

video.addEventListener("pause", () => {
  videoContainer.classList.add("paused");
});

function videoClick() {
  if (isTouchScreen) return;
  if (clickCounter < 1) {
    clickCounter += 1;
    firstTimeClick = new Date().getTime();
    fullScreenTimeout = setTimeout(() => {
      togglePlay();
      clickCounter = 0;
    }, threshold);
    return;
  }
  const now = new Date().getTime();
  if (now - firstTimeClick > threshold) return;

  clearTimeout(fullScreenTimeout);
  toggleFullScreen();
  clickCounter = 0;
}

// fast forward/rewind

let lastTimePressRight = new Date().getTime();
let lastTimePressLeft = new Date().getTime();
let pressTimeout;
let fastForwardCounter = 0;
let rewindCounter = 0;

function fastForwarding() {
  if (video.currentTime === video.duration) return;
  rewind.classList.remove("visible");
  rewindCounter = 0;
  const currentTime = new Date().getTime();

  if (currentTime - lastTimePressRight < 1000) {
    clearTimeout(pressTimeout);
  }
  fastForwardCounter += 5;
  fastForwardTimer.innerText = `${fastForwardCounter}`;
  fastForward.classList.add("visible");
  skip(5);
  lastTimePressRight = currentTime;

  pressTimeout = setTimeout(() => {
    fastForward.classList.remove("visible");
    fastForwardCounter = 0;
  }, 1000);
}

function rewinding() {
  if (video.currentTime < 1) return;
  fastForward.classList.remove("visible");
  fastForwardCounter = 0;
  const currentTime = new Date().getTime();

  if (currentTime - lastTimePressLeft < 1000) {
    clearTimeout(pressTimeout);
  }
  rewindCounter += 5;
  rewindTimer.innerText = `${rewindCounter}`;
  rewind.classList.add("visible");
  skip(-5);
  lastTimePressLeft = currentTime;

  pressTimeout = setTimeout(() => {
    rewind.classList.remove("visible");
    rewindCounter = 0;
  }, 1000);
}

// volume controls

let isVolumeScrubbing = false;
let oldVolume = 0;
let volumeLevel = 1;

document.addEventListener("mousemove", moveIndicator);
volumeSlider.addEventListener("mousedown", (e) => {
  isVolumeScrubbing = true;
  const container = volumeSlider.getBoundingClientRect();
  volumeLevel = Math.max(
    Math.min((container.bottom - e.y) / container.height, 1),
    0
  );
  volumeIndicator.style.setProperty("--volume", volumeLevel);
  video.volume = volumeLevel;
  oldVolume = video.volume;
});

document.addEventListener("mouseup", () => {
  isVolumeScrubbing = false;
  oldVolume = !video.muted ? video.volume : oldVolume;
  volumeSlider.classList.remove("visible");
});

function moveIndicator(e) {
  if (!isVolumeScrubbing) return;
  volumeSlider.classList.add("visible");
  e.preventDefault();
  const container = volumeSlider.getBoundingClientRect();
  volumeLevel = Math.max(
    Math.min((container.bottom - e.y) / container.height, 1),
    0
  );
  volumeIndicator.style.setProperty("--volume", volumeLevel);
  video.volume = volumeLevel;
  video.muted = volumeLevel === 0;
}

function toggleMute() {
  video.muted = !video.muted;
}

volumeBtn.addEventListener("click", () => {
  if (video.muted) {
    video.volume = oldVolume;
    video.muted = !video.muted;
    return;
  }
  video.muted = !video.muted;
});

video.addEventListener("volumechange", () => {
  let volumeLevel;

  if (video.muted || video.volume === 0) {
    volumeIndicator.style.setProperty("--volume", 0);
    volumeLevel = "muted";
  } else if (video.volume > 0.5) {
    volumeLevel = "high";
    volumeIndicator.style.setProperty("--volume", video.volume);
  } else {
    volumeLevel = "low";
    volumeIndicator.style.setProperty("--volume", video.volume);
  }

  videoContainer.dataset.volumeLevel = volumeLevel;
});

// full screen controls

let firstTimeClick;
let clickCounter = 0;
let fullScreenTimeout;
fullScreenBtn.forEach((btn) => {
  btn.addEventListener("click", toggleFullScreen);
});

function toggleFullScreen() {
  if (document.fullscreenElement == null) {
    videoContainer.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
  videoControls.classList.remove("visible");
}

document.addEventListener("fullscreenchange", () => {
  videoContainer.classList.toggle("full-screen", document.fullscreenElement);
});

let showControlsTimeout;
videoContainer.addEventListener("mousemove", () => {
  clearTimeout(showControlsTimeout);
  videoControls.classList.add("visible");
  if (isScrubbing) return;
  showControlsTimeout = setTimeout(() => {
    videoControls.classList.remove("visible");
  }, [3000]);
});

// Playback speed

speedBtn.forEach((btn) => {
  btn.addEventListener("click", changePlaybackSpeed);
});

function changePlaybackSpeed() {
  let newPlayBackRate = video.playbackRate + 0.25;
  if (newPlayBackRate > 1.75) newPlayBackRate = 0.25;
  video.playbackRate = newPlayBackRate;
  speedBtn.forEach((btn) => {
    btn.textContent = `${newPlayBackRate}x`;
  });
}

// captions controls

const captions = video.textTracks[0];
captions.mode = "hidden";

captionsBtn.forEach((btn) => {
  btn.addEventListener("click", () => toggleCaptions(btn));
});

function toggleCaptions(btn) {
  const isHidden = captions.mode === "hidden";
  captions.mode = isHidden ? "showing" : "hidden";
  videoContainer.classList.toggle("captions", isHidden);
  btn.classList.toggle("captions-active");
}

// Picture in picture mode

miniPlayerBtn.addEventListener("click", toggleMiniPlayer);

function toggleMiniPlayer() {
  if (videoContainer.classList.contains("mini-player")) {
    document.exitPictureInPicture();
  } else {
    video.requestPictureInPicture();
  }
}

video.addEventListener("enterpictureinpicture", () => {
  videoContainer.classList.add("mini-player");
  videoControls.classList.add("hidden");
});

video.addEventListener("leavepictureinpicture", () => {
  videoContainer.classList.remove("mini-player");
  videoControls.classList.remove("hidden");
});

// duration

video.addEventListener("loadeddata", () => {
  totalTime.forEach((item) => {
    item.innerText = formatDuration(video.duration);
  });
});

setTimeout(() => {
  totalTime.forEach((item) => {
    item.innerText = formatDuration(video.duration);
  });
}, 1000);

video.addEventListener("timeupdate", () => {
  currentTime.forEach((item) => {
    item.innerText = formatDuration(video.currentTime);
  });
});

const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2,
});

function formatDuration(time) {
  const seconds = Math.floor(time % 60);
  const minutes = Math.floor(time / 60) % 60;
  const hours = Math.floor(time / 3600);
  if (hours === 0) {
    return `${minutes}:${leadingZeroFormatter.format(seconds)}`;
  } else {
    return `${hours}:${leadingZeroFormatter.format(
      minutes
    )}:${leadingZeroFormatter.format(seconds)}`;
  }
}

// timeline controls

video.addEventListener("timeupdate", () => {
  const progressPercent = video.currentTime / video.duration;
  timeline.style.setProperty("--progress", progressPercent);
});

timelineContainer.addEventListener("mousemove", (e) => {
  if (!isScrubbing) return;
  toggleUpdate(e);
});

timelineContainer.addEventListener("mousedown", (e) => {
  e.preventDefault();
  toggleUpdate(e);
  isScrubbing = (e.buttons & 1) === 1;
  videoContainer.classList.toggle("scrubbing", isScrubbing);
  wasPlaying = video.paused ? false : true;
});

document.addEventListener("mouseup", () => {
  if (wasPlaying) video.play();
  isScrubbing = false;
  videoContainer.classList.toggle("scrubbing", isScrubbing);
});

document.addEventListener("mousemove", (e) => {
  if (!isScrubbing) return;
  toggleUpdate(e);
});

timelineContainer.addEventListener("mouseout", (e) => {
  if (!isScrubbing) return;
  toggleUpdate(e);
});

function toggleUpdate(e) {
  const container = timelineContainer.getBoundingClientRect();
  const progressPercent = Math.min(
    Math.max((e.x - container.x) / container.width, 0),
    container.width
  );
  timeline.style.setProperty("--progress", progressPercent);
  video.currentTime = progressPercent * video.duration;
  if (isScrubbing) video.pause();
}

function skip(duration) {
  video.currentTime += duration;
}

// mobile specific controls

playPauseBtnMobile.addEventListener("click", disabledControlsAlert);
timelineContainerMobile.addEventListener("click", disabledControlsAlert);

function disabledControlsAlert() {
  if (!isTouchScreen) {
    alert("Switch to touch screen mode to enable video controls");
  }
}

const video_controls = {
  showVideoControls: false,
  isAnimating: false,
};

const doubletap = {
  left: false,
  right: false,
  doubleTapping: false,
  fastForwardTimer: 0,
  rewindTimer: 0,
  lastTapTime: 0,
};

const showControlsAnimation = gsap.timeline({ paused: true });
showControlsAnimation.to(".video-mobile-controls", {
  opacity: 1,
  duration: 0.1,
  delay: 0.3,
});

showControlsAnimation.to(".video-mobile-controls", {
  opacity: 0,
  duration: 0.1,
  delay: 5,
  onComplete: () => {
    video_controls.showVideoControls = true;
  },
});

const hideControlsAnimation = gsap.to(".video-mobile-controls", {
  opacity: 0,
  duration: 0.1,
  delay: 0.3,
  paused: true,
});

playPauseBtnMobile.addEventListener("touchstart", () => {
  if (video_controls.showVideoControls && !video_controls.isAnimating) return;
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
});

video.addEventListener("play", () => {
  if (!isTouchScreen) return;
  video_controls.showVideoControls = true;
  video_controls.isAnimating = true;
  const controlsAnimation = gsap.to(".video-mobile-controls", {
    opacity: 0,
    duration: 0.1,
    delay: 2,
    paused: true,
    onStart: () => {
      const { showVideoControls } = video_controls;
      if (showVideoControls === false) {
        controlsAnimation.kill();
      }
    },
    onComplete: () => {
      video_controls.isAnimating = false;
    },
  });
  video_controls.controlsAnimation = controlsAnimation;
  video_controls.controlsAnimation.play();
});

video.addEventListener("pause", () => {
  if (!isTouchScreen) return;
  video_controls.showVideoControls = false;
  gsap.to(".video-mobile-controls", {
    opacity: 1,
    duration: 0.1,
  });
});

function videoContainerTouch(e) {
  if (video.currentTime === 0) return;
  if (video_controls.isAnimating) {
    video_controls.controlsAnimation.kill();
    gsap.to(".video-mobile-controls", {
      opacity: 0,
      duration: 0.1,
    });
    if (video_controls.isAnimating) video_controls.isAnimating = false;
    return;
  }

  const target = e.target.tagName.toLowerCase();
  const { showVideoControls } = video_controls;
  if (["button", "svg", "path"].some((x) => x == target) && !showVideoControls)
    return;

  if (showVideoControls) {
    showControlsAnimation.restart();
  } else {
    hideControlsAnimation.restart();
  }
  video_controls.showVideoControls = !showVideoControls;
}

// fast forward/rewind

videoContainer.addEventListener("touchstart", (e) => {
  if (!isTouchScreen) return;
  const targetClassList = Array.from(e.target.classList);
  const classListReturn = [
    "timeline-container-mobile",
    "track-mobile",
    "timeline-mobile",
    "track-indicator-mobile",
    "thumb-indicator-mobile",
    "speed-btn",
    "captions-btn",
    "full-screen-btn",
  ];
  if (classListReturn.some((item) => targetClassList.includes(item))) {
    showControlsAnimation.pause();
    gsap.to(".video-mobile-controls", {
      opacity: 1,
      duration: 0.15,
    });
    return;
  }
  const event = e.touches[0];
  const containerdimensions = videoContainer.getBoundingClientRect();
  if (
    (event.clientX - containerdimensions.x) / containerdimensions.width <
    0.3
  ) {
    doubleTapLeft(e);
    return;
  } else if (
    (event.clientX - containerdimensions.x) / containerdimensions.width >
    0.6
  ) {
    doubleTapRight(e);
    return;
  } else {
    videoContainerTouch(e);
  }
});

function doubleTapLeft(e) {
  doubletap.right = false;
  doubletap.doubleTapping = false;

  const currentTime = new Date().getTime();
  if (currentTime - doubletap.lastTapTime > threshold) {
    doubletap.left = false;
  }

  setTimeout(() => {
    if (!doubletap.doubleTapping) videoContainerTouch(e);
  }, 301);

  if (!doubletap.left) {
    doubletap.left = true;
    doubletap.lastTapTime = currentTime;
    return;
  }
  if (doubletap.left) {
    rewindingMobile(currentTime);
  }
}

function doubleTapRight(e) {
  doubletap.left = false;
  doubletap.doubleTapping = false;

  const currentTime = new Date().getTime();
  if (currentTime - doubletap.lastTapTime > threshold) {
    doubletap.right = false;
  }

  setTimeout(() => {
    if (!doubletap.doubleTapping) videoContainerTouch(e);
  }, 301);

  if (!doubletap.right) {
    doubletap.right = true;
    doubletap.lastTapTime = currentTime;
    return;
  }
  if (doubletap.right) {
    fastForwardingMobile(currentTime);
  }
}

let fastForwardTimeout;
let rewindTimeout;

function fastForwardingMobile(currentTime) {
  clearTimeout(fastForwardTimeout);
  doubletap.doubleTapping = true;
  skip(5);
  fastForward.classList.add("visible");
  doubletap.lastTapTime = currentTime;
  doubletap.fastForwardTimer = doubletap.fastForwardTimer += 5;
  fastForwardTimer.innerText = `${doubletap.fastForwardTimer}`;

  fastForwardTimeout = setTimeout(async () => {
    if (new Date().getTime() - doubletap.lastTapTime > threshold)
      fastForward.classList.remove("visible");
    await delay(threshold);
    doubletap.fastForwardTimer = 0;
    fastForwardTimer.innerText = `5`;
  }, 1000);
}

function rewindingMobile(currentTime) {
  clearTimeout(rewindTimeout);
  doubletap.doubleTapping = true;
  skip(-5);
  rewind.classList.add("visible");
  doubletap.lastTapTime = currentTime;
  doubletap.rewindTimer = doubletap.rewindTimer += 5;
  rewindTimer.innerText = `${doubletap.rewindTimer}`;
  rewindTimeout = setTimeout(async () => {
    if (new Date().getTime() - doubletap.lastTapTime > threshold)
      rewind.classList.remove("visible");
    await delay(threshold);
    doubletap.rewindTimer = 0;
    rewindTimer.innerText = `5`;
  }, 1000);
}

function delay(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

// sliding controls

let isSliding = false;
let touchTimeStart = new Date().getTime();
let touchTimeEnd = new Date().getTime();
let wasPlayingMobile = false;

video.addEventListener("timeupdate", () => {
  const progressPercent = video.currentTime / video.duration;
  timelineMobile.style.setProperty("--progress", progressPercent);
});

timelineContainerMobile.addEventListener("touchstart", (e) => {
  e.preventDefault();
  touchTimeStart = new Date().getTime();
  video.paused ? (wasPlayingMobile = false) : (wasPlayingMobile = true);
  toggleUpdateMobile(e);
});

timelineContainerMobile.addEventListener("touchmove", (e) => {
  isSliding = true;
  toggleUpdateMobile(e);
});

timelineContainerMobile.addEventListener("touchend", (e) => {
  const now = new Date().getTime();
  if (now - touchTimeStart > threshold) {
    e.preventDefault();
  }
  if (wasPlayingMobile) video.play();
});

function toggleUpdateMobile(e) {
  const eventTouch = e.touches[0];
  const container = timelineContainerMobile.getBoundingClientRect();
  const progressPercent = Math.min(
    Math.max((eventTouch.clientX - container.x) / container.width, 0),
    container.width
  );
  timelineMobile.style.setProperty("--progress", progressPercent);
  video.currentTime = progressPercent * video.duration;
  if (isSliding) {
    video.pause();
    video_controls.showVideoControls = false;
  }
}
