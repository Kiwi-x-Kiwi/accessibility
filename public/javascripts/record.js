let recording = [];
let mediaRecorder;

const startElem = document.getElementById("start");
const stopElem = document.getElementById("stop");
const clientSiteForm = document.getElementById("client-site-form");
const clientSite = document.getElementById("client-site");
const siteLink = document.getElementById("site-link");
const enterpriseID = document.getElementById("hidden").getAttribute("alt");

var displayMediaOptions = {
  video: {
    cursor: "never"
  },
  audio: true
};

stopElem.addEventListener("click", function (evt) {
  stopCapture();
}, false);

startElem.addEventListener("click", function (evt) {
  startCapture();
}, false);


function stopCapture(evt) {
  download();
}

async function startCapture(evt){
  try {
    startCapturing();
  } catch (err) {
    console.error("Error: " + err);
  }
}

async function startCapturing() {
  console.log('Start capturing.');

  recording = [];
  const stream = await navigator.mediaDevices.getDisplayMedia({video: true});
  mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
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
    console.log(enterpriseID);
    axios.post(`/upload/${enterpriseID}`, {blob: base64data})
      // .then(mediaRecorder.stop())
      .then(console.log("Success"))
      .catch(err => console.error(err))
  }
}

window.onload = function () {
  startElem.click();

  clientSiteForm.addEventListener("submit", function(e){
    e.preventDefault();
    clientSite.setAttribute("src", siteLink.value)
  })

}
