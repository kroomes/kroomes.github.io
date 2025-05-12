let circles = [];

function setup() {
  createCanvas(600, 400);
  background(255);

  // Load circles from localStorage if available
  let savedCircles = localStorage.getItem("circlesData");
  if (savedCircles) {
    circles = JSON.parse(savedCircles);
  }

  // Draw all the saved circles
  for (let circle of circles) {
    fill(circle.color);
    noStroke();
    ellipse(circle.x, circle.y, 50);
  }
}

function mousePressed() {
  // Save circle data when the user clicks
  let newCircle = {
    x: mouseX,
    y: mouseY,
    color: getRandomColor(),
  };

  // Add the new circle to the array
  circles.push(newCircle);

  // Draw the new circle on the canvas
  fill(newCircle.color);
  noStroke();
  ellipse(newCircle.x, newCircle.y, 50);

  // Save the updated circle array to localStorage
  localStorage.setItem("circlesData", JSON.stringify(circles));
}

function getRandomColor() {
  return color(random(255), random(255), random(255));
}
