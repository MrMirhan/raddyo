
const audioPlayer = document.querySelector(".player");
const volumeSlider = audioPlayer.querySelector(".player .timeline .controllers .volume-slider");
volumeSlider.addEventListener('click', e => {
  var streamUrl = document.getElementById('.player').getAttribute('aria-live');
  if (streamUrl.length > 0 ){
    var audioPlayer = document.querySelector(".player");
    const audio = exSound;
    const sliderWidth = window.getComputedStyle(volumeSlider).width;
    const newVolume = e.offsetX / parseInt(sliderWidth);
    audio.volume(newVolume);
    audioPlayer.querySelector(".player .timeline .controllers .volume-percentage").style.width = newVolume * 100 + '%';
  }
}, false)

//toggle between playing and pausing on button click
const playBtn = document.getElementById("playpause");
playBtn.addEventListener("click", async () => {
    var streamUrl = exSound
    if (streamUrl !== null){
      const audio = exSound;
      if (exSound.playing() === false) {
        await changer(1, exSound, exRadio)
        await audio.play();
        playBtn.classList.remove("play");
        playBtn.classList.add("pause");
      } else if (exSound.playing() === true) {
        await changer(0, exSound, exRadio)
        await audio.pause();
        playBtn.classList.remove("pause");
        playBtn.classList.add("play");
      }
    }
  },
  false
);

audioPlayer.querySelector(".volume-button").addEventListener("click", () => {
  var stream = exSound
    if (stream !== null){
      var audioPlayer =  document.querySelector(".player");
      const audio = exSound;
      const volumeEl = audioPlayer.querySelector(".volume-container .volume");
      if (Howler._muted) {
        volumeEl.classList.add("icono-volumeMedium");
        volumeEl.classList.remove("icono-volumeMute");
        Howler.mute(false)
      } else {
        volumeEl.classList.remove("icono-volumeMedium");
        volumeEl.classList.add("icono-volumeMute");
        Howler.mute(true)
      }
    }
});

//turn 128 seconds into 2:08
function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}