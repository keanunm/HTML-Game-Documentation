let button = document.getElementById("button"); // This gets the button we created
let correctButtonQuiz1 = document.getElementById("correct1");
let wrongButtonsQuiz1 = document.getElementsByClassName("wrong1");
let changeStyleButton = document.getElementById("enable");
let borderRadius = document.getElementById("borderRadius");
let padding = document.getElementById("padding");
let background = document.getElementById("background");

let audioCtx = new (window.AudioContext || window.webkitAudioContext)();

let styleEnabled = 0;
let quiz1done = false;

button.removeAttribute("style"); // No more style
changeStyleButton.addEventListener("click", change);
button.addEventListener("click", disappear)
correctButtonQuiz1.addEventListener("click", correct1)
for (let i = 0; i < wrongButtonsQuiz1.length; i++) {
    wrongButtonsQuiz1[i].addEventListener("click", wrong1);
}

function disappear() {
    button.style.opacity = 0; // Poof! Our button vanished from existence!
    setTimeout(function() {
        button.style.opacity = 1; // Back into existence!
    }, 2000); // Wait for 2 seconds then run function "Back into existence!".
}

function change() {
    if (styleEnabled == 0) {
        button.style.padding = (padding.value || "7") + "px";
        button.style.backgroundColor = background.value || "gray";
        button.style.color = "#d4d4d4"
        button.style.borderRadius = (borderRadius.value || "8") + "px";
        styleEnabled = 1;
    } else {
        button.removeAttribute("style");
        styleEnabled = 0;
    }
}

function correct1() {
    if (!quiz1done) {
        correctButtonQuiz1.style.backgroundColor = "green"
        playBeep(700);
        quiz1done = true;
    }
}

function wrong1() {
    if (!quiz1done) {
        for (let i = 0; i < wrongButtonsQuiz1.length; i++) {
            wrongButtonsQuiz1[i].style.backgroundColor = "red"
        }
        correctButtonQuiz1.style.backgroundColor = "green"
        playBeep(350);
        quiz1done = true;
    }
}

function playBeep(pitch) {
  if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      // Create and play the beep!
      let beep = audioCtx.createOscillator();
      beep.frequency.value = pitch; // Pitch
      beep.connect(audioCtx.destination); // Connect to speakers
      
      beep.start();
      beep.stop(audioCtx.currentTime + 0.1); // Stop after 0.1 seconds
}

//Not showing up<
let simulation = document.getElementById("simulation");
let simon = false;

// Canvas buttons
let right = document.getElementById("right");
let left = document.getElementById("left");
let mycanvas = document.getElementById("mycanvas");
let ctx = mycanvas.getContext("2d");
// Values
let bx = 50;
let by = 50;

// EventListeners
right.addEventListener("click", function() {
    bx += 5;
});

left.addEventListener("click", function() {
    bx -= 5;
});

simulation.addEventListener("click", function() {
    simon = !simon;
    if (simon) {
        bx = 50;
        by = 50;
        draw();
    }
});

function draw() {
    ctx.clearRect(0, 0, 100, 100);
    ctx.fillStyle = "red";
    ctx.fillRect(bx, by, 10, 10);
    if (simon) {
        requestAnimationFrame(draw);
    } else {
        ctx.clearRect(0, 0, 100, 100);
    }
}

let start = document.getElementById("start");
let on = false;

start.addEventListener("click", function() {
    on = !on;
    if (on) {
        bx = 50;
        by = 50;
        gameLoop();
    }
});

// Get our canvas
let canvas = document.getElementById("keyPresses");
let ctx1 = canvas.getContext("2d");
// Variables
let W = false;
let S = false;
let A = false;
let D = false;

let px = 50;
let py = 50;
// Add event listeners
document.addEventListener("keydown", function(event) {
    if (event.key === "w") {
        W = true;
    }
    if (event.key === "s") {
        S = true;
    }
    if (event.key === "a") {
        A = true; 
    }
    if (event.key === "d") {
        D = true;
    }
});
document.addEventListener("keyup", function(event) {
    if (event.key === "w") {
        W = false;
    }
    if (event.key === "s") {
        S = false;
    }
    if (event.key === "a") {
        A = false; 
    }
    if (event.key === "d") {
        D = false;
    }
});

function gameLoop() {
    if (W) {
        py -= 1;
    }
    if (S) {
        py += 1;
    }
    if (A) {
        px -= 1;
    }
    if (D) {
        px += 1;
    }

    ctx1.fillStyle = "red";
    ctx1.clearRect(0, 0, 100, 100);
    ctx1.fillRect(px, py, 10, 10)

    if (on) {requestAnimationFrame(gameLoop)} else {
        ctx1.clearRect(0, 0, 100, 100);
    }
    
}