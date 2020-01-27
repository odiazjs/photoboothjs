(function() {
  function docReady(fn) {
    // see if DOM is already available
    if (
      document.readyState === "loading" ||
      document.readyState === "interactive"
    ) {
      // call on next available tick
      setTimeout(fn, 250);
    } else {
      document.addEventListener("DOMContentLoaded", fn);
    }
  }
  docReady(function() {
    function animateCSS(element, animationName, callback) {
      element.classList.add("animated", animationName);

      function handleAnimationEnd() {
        element.classList.remove("animated", animationName);
        element.removeEventListener("animationend", handleAnimationEnd);

        if (typeof callback === "function") callback();
      }

      element.addEventListener("animationend", handleAnimationEnd);
    }

    const playerContainers = document.querySelectorAll(".box-row.circles");

    playerContainers.forEach(container => {
      container.addEventListener("click", ev => {
        ev.preventDefault();
        animateCSS(container, "heartBeat", () => {
          container.classList.add("grow");
        });
      });
    });

    const clearBtn = document.getElementById("clear");
    const startBtn = document.getElementById("start");

    clearBtn.addEventListener("click", ev => {
      const playerContainers = document.querySelectorAll(".box-row.circles");

      playerContainers.forEach(container => {
        if (container.classList.contains("grow")) {
          container.classList.remove("grow");
        }
      });
    });

    startBtn.addEventListener("click", ev => {
      const playerContainers = document.querySelectorAll(".box-row.circles");

      playerContainers.forEach(container => {
        if (container.classList.contains("grow")) {
            animateCSS(container, 'fadeOutRight', () => {
                window.location.href = window.location.href.replace('selection.html', 'photo.html');
            });
        }
      });
    });

  });
})();
