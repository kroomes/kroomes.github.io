let img;

function setup() {
  // Create the canvas
  createCanvas(800, 600);

  // Load an image using createImg()
  img = createImg('thunderbolts poster.jpg');  // Adjust the path as necessary
  img.size(200, 200);  // Resize the image
  img.position(100, 100);  // Position the image on the screen
}

function draw() {
  background(220);
  
  // You can also use image manipulation here, but createImg() is for adding to the page directly.
}

