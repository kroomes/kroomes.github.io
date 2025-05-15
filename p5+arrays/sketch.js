// Reference 1: https://p5js.org/reference/#/p5/ellipse (for drawing)
// Reference 2: https://www.w3schools.com/js/js_arrays.asp (for array basics)

let bubbles = []; // This array will hold all bubble objects

function setup() {
  createCanvas(600, 400); // Set up the canvas
  bubbles.push(new Bubble(width / 2, height)); // Add one starting bubble

  // DOM: Clear Bubbles Button
  let clearButton = select('#clearBtn');
  clearButton.mousePressed(() => {
    bubbles = []; // Clears the entire bubble array
  });
}

function draw() {
  background(0, 119, 190); // Ocean blue background

  // Loop through the bubbles array backward to allow safe removal
  for (let i = bubbles.length - 1; i >= 0; i--) {
    bubbles[i].move();    // Update position
    bubbles[i].display(); // Show bubble

    // Remove bubble if it's off-screen
    if (bubbles[i].y < -bubbles[i].size) {
      bubbles.splice(i, 1);
    }
  }
}

// This function adds a new bubble where you click
function mousePressed() {
  bubbles.push(new Bubble(mouseX, mouseY));
}

// Bubble class
class Bubble {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(10, 30);
    this.speed = random(1, 2);
  }

  move() {
    this.y -= this.speed; // Float upward
  }

  display() {
    noStroke();
    fill(255, 180); // Transparent white
    ellipse(this.x, this.y, this.size);
  }
}
