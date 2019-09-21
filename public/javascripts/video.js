const videoElem = document.getElementById("video");
const logElem = document.getElementById("log");
const startElem = document.getElementById("start");
const stopElem = document.getElementById("stop");
let recording = [];
// Options for getDisplayMedia()

var displayMediaOptions = {
  video: {
    cursor: "never"
  },
  audio: false
};

// Set event listeners for the start and stop buttons
startElem.addEventListener("click", function (evt) {
  startCapture();
}, false);

stopElem.addEventListener("click", function (evt) {
  stopCapture();
}, false);


console.log = msg => logElem.innerHTML += `${msg}<br>`;
console.error = msg => logElem.innerHTML += `<span class="error">${msg}</span><br>`;
console.warn = msg => logElem.innerHTML += `<span class="warn">${msg}<span><br>`;
console.info = msg => logElem.innerHTML += `<span class="info">${msg}</span><br>`;

async function startCapture() {
  logElem.innerHTML = "";

  try {
    startCapturing();
  } catch (err) {
    console.error("Error: " + err);
  }
}

function stopCapture(evt) {
  download();
}


async function startCapturing(e) {
  console.log('Start capturing.');

  recording = [];
  const stream = await navigator.mediaDevices.getDisplayMedia({video: true});
  let mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
  mediaRecorder.addEventListener('dataavailable', event => {
    if (event.data && event.data.size > 0) {
      recording.push(event.data);
      console.log("hih");
      
    }
  });
  mediaRecorder.start(10);
}

function download() {
  // mediaRecorder.stop();
  var blob = new Blob(recording, {
    type: 'video/webm'
  });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  document.body.appendChild(a);
  a.style = 'display: none';
  a.href = url;
  a.download = 'test.webm';
  a.click();
  window.URL.revokeObjectURL(url);
}