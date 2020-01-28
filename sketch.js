var video;
var resolution = { h: 1080, v: 1920 };

let playing = false;
let fingers;
let button;

(function () {
  function docReady(fn) {
    if (
      document.readyState === "loading" ||
      document.readyState === "interactive"
    ) {
      setTimeout(fn, 250);
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }
  docReady(function () {
    function animateCSS(element, animationName, callback) {
      element.classList.add("animated", animationName);
      function handleAnimationEnd() {
        element.classList.remove("animated", animationName);
        element.removeEventListener("animationend", handleAnimationEnd);
        if (typeof callback === "function") callback();
      }
      element.addEventListener("animationend", handleAnimationEnd);
    }

    // save screenshot
    function saveScreenshot() {
      html2canvas(document.getElementById('screenshot'), {
        dpi: 192,
        onrendered: function (canvas) {
          const dataUrl = canvas.toDataURL("image/png");
          //console.log(dataUrl)
          const sendEmail = document.getElementById('sendEmail');
          const encodedUrl = encodeURIComponent(dataUrl);
          let embedded =
            `mailto:odiaz.dw@gmail.com?subject=Check%20this%20out!&body=%3Cp%3EHi%3C%2Fp%3E%3Cimg%20src%3D%22${encodedUrl}`;
          sendEmail.href = embedded;
          // sendEmail.addEventListener('click', (ev) => {
          //   ev.preventDefault();
          // })
        }
      });
    }

    // selection logic
    let number = 4;
    const counter = document.getElementById("counter");
    const ready = document.getElementById("ready");
    const backdrop = document.getElementById("backdrop");

    animateCSS(ready, "fadeInLeft");
    animateCSS(counter, "fadeOutRight");

    //set webcam
    setTimeout(() => {
      Webcam.set({
        width: 640,
        height: 480,
        image_format: "jpeg"
      });
      Webcam.attach('#teamVideo');
    }, 500);

    teamVideo.hide

    const sendEmail = document.getElementById('send-email');
    sendEmail.style.display = 'none';

    setTimeout(() => {
      teamVideo.hide();
      backdrop.style.opacity = 0.3;
      setTimeout(() => {
        teamVideo.play();
        setTimeout(() => {
          const interval = setInterval(() => {
            number = number - 1;
            if (number === 0) {
              counter.style.display = "none";
              animateCSS(ready, "fadeOutDown");
              animateCSS(backdrop, "fadeOutDown");
              setTimeout(() => {
                ready.style.display = "none";
              }, 800);
              setTimeout(() => {
                backdrop.style.display = "";
                backdrop.style.opacity = 1;
                animateCSS(backdrop, "fadeInUp");
                setTimeout(() => {
                  Webcam.snap(function (data_uri) {
                    animateCSS(backdrop, "zoomIn");
                    backdrop.style.display = "none";
                    // display results in page
                    const screenshot = document.getElementById("screenshot");
                    screenshot.style.display = "";
                    screenshot.innerHTML =
                      '<img src="' +
                      data_uri +
                      '" style="width: 640px; height: 480px;"/>' +
                      '<img src="../assets/finalfinal.png" width="640" style="margin: -460px -30px;">';
                    animateCSS(screenshot, "flip", () => {
                      saveScreenshot();
                      sendEmail.style.display = '';
                    });
                  });
                }, 2000);
              }, 1200);
              clearInterval(interval);
            } else {
              animateCSS(counter, "fadeOutRight");
              counter.innerHTML = number;
            }
          }, 1000);
        }, 5000);
      }, 2000);
    }, 2000);
  });
})();

function setup() {
  // Team greenscreen video
  teamVideo = createVideo(["../assets/sideplayer2.mp4"]);
  teamVideo.id("teamVideo");

  //button = createButton('play');
  //button.mousePressed(toggleVid);

  //Camera video
  canvas = createCanvas(resolution.h, resolution.v, WEBGL);
  canvas.id("p5canvas");
  background(51);
  video = createCapture(VIDEO);
  video.size(800, 1200);
  video.id("p5video");

  // Seriously effect
  var seriously = new Seriously();
  var src = seriously.source("#teamVideo");
  var target = seriously.target("#p5canvas");
  target.width = 1080;
  target.height = 1920;

  var chromaKey = seriously.effect("chroma");
  chromaKey.source = src;
  target.source = chromaKey;

  var r = 0 / 255;
  var g = 152 / 255;
  var b = 81 / 255;
  chromaKey.screen = [r, g, b, 1];

  seriously.go();
}

function toggleVid() {
  if (playing) {
    teamVideo.pause();
    button.html("play");
  } else {
    teamVideo.loop();
    button.html("pause");
  }
  playing = !playing;
}

// function draw() {
//   // put drawing code here
// }
