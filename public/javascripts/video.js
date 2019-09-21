const stopElem = document.getElementById("stop");

let recording = [];

var displayMediaOptions = {
  video: {
    cursor: "never"
  },
  audio: true
};

stopElem.addEventListener("click", function (evt) {
  stopCapture();
}, false);

function stopCapture(evt) {
  download();
}

async function startCapturing() {
  console.log('Start capturing.');

  recording = [];
  const stream = await navigator.mediaDevices.getDisplayMedia({video: true});
  let mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
  mediaRecorder.addEventListener('dataavailable', event => {
    if (event.data && event.data.size > 0) {
      recording.push(event.data);
    }
  });
  mediaRecorder.start(10);
}

function download() {
  var blob = new Blob(recording, {
    type: 'video/webm'
  });

  var reader = new FileReader();
  reader.readAsDataURL(blob);
  console.log(blob);
  reader.onloadend = function () {
    var base64data = reader.result;
    console.log(base64data);

  axios.post('/upload', {blob: base64data})
    .then(mediaRecorder.stop())
    .catch(err => console.error(err))
  }
}

document.onload = function () {
  try {
    startCapturing();
  } catch (err) {
    console.error("Error: " + err);
  }
}
