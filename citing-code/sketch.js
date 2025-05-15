// Tutorial 1 from p5js.org - https://p5js.org/tutorials/variables-and-change/
let x = 0;
let speed = 2;
let ballColor;

function setup() {
  createCanvas(400, 200);
  ballColor = color(255, 100, 100); // initial color
}

function draw() {
  background(0);
  fill(ballColor);
  ellipse(x, height / 2, 50, 50);
  x += speed;

  if (x > width) {
    x = 0;
  }
}

// Tutorial 2 from W3Schools - https://www.w3schools.com/js/js_events.asp
// Button event listener to trigger reset and color change
document.getElementById("resetBtn").addEventListener("click", resetCircle);

// My addition: Reset x position and change color randomly
function resetCircle() {
  x = 0;
  // My code: assign a new random color
  ballColor = color(random(255), random(255), random(255));
}

// My addition: Control speed using arrow keys
function keyPressed() {
  if (keyCode === RIGHT_ARROW) {
    speed += 1; // speed up
  } else if (keyCode === LEFT_ARROW) {
    speed = max(1, speed - 1); // slow down but don't go below 1
  }
}
