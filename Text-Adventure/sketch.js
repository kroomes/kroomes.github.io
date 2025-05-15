let input;
let button;
let slider;
let poem = "";
let scrambledPoem = "";

function setup() {
  createCanvas(600, 400);
  
  // Text input for user input
  input = createInput();
  input.position(20, 65);
  
  // Button to scramble the poem text
  button = createButton('Scramble Text');
  button.position(20, 100);
  button.mousePressed(scrambleText); // Global callback function
  
  // Slider to control animation speed
  slider = createSlider(1, 10, 5);
  slider.position(20, 140);
  
  // Instruction text
  textSize(20);
  text('Enter your poem and click "Scramble Text"', 20, 30);
}

function draw() {
  background(220);
  
  // Display the inputted text in a dynamic way
  let animationSpeed = slider.value();
  textSize(30);
  textAlign(CENTER, CENTER);
  fill(0);
  
  if (poem !== "") {
    text(scrambledPoem, width / 2, height / 2 + sin(frameCount / animationSpeed) * 20); // Animation effect
  }
}

function scrambleText() {
  // Scramble the poem inputted by the user
  let inputText = input.value();
  scrambledPoem = shuffle(inputText.split('')).join('');
  poem = inputText;
}

// Handle keyPressed to add a bonus feature
function keyPressed() {
  if (key === 'S' || key === 's') {
    scrambletext();
  }
}
