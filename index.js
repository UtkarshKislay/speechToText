let showText = document.querySelector(".showText");
let microPhone = document.querySelector(".microphone i");
const speech = window.webkitSpeechRecognition;
console.log("text:" + showText.textContent);
if (speech) {
  const recog = new speech();
  recog.continuous = true;
  microPhone.addEventListener("click", (e) => {
    if (microPhone.classList.contains("fa-microphone")) {
      microPhone.classList.remove("fa-microphone");
      microPhone.classList.add("fa-microphone-slash");
      recog.start();
    } else {
      microPhone.classList.remove("fa-microphone-slash");
      microPhone.classList.add("fa-microphone");
      recog.stop();
    }

    recog.addEventListener("result", (e) => {
      let text = e.results[e.resultIndex][0].transcript.toLowerCase().trim();
      if (text === "stop recording") {
        microPhone.classList.remove("fa-microphone-slash");
        microPhone.classList.add("fa-microphone");
        recog.stop();
      } else if (text === "reset input") {
        showText.textContent = "";
      } else {
        if (showText.textContent) {
          showText.textContent += " ";
        }
        showText.textContent += text;
      }
    });
  });
} else {
  console.log("not supported speech recog");
}
