function setup() {
    createCanvas(windowWidth, windowHeight);  // Set canvas size to match the window
    noStroke();  // Optional: remove the border of the shapes
  }
  
  function draw() {
    background(0);  // Black background
  
    let cols = 10;  // Number of columns in the grid
    let rows = 10;  // Number of rows in the grid
    let ellipseSize = 50;  // Size of each ellipse
  
    // Use two for loops to create a grid of ellipses
    for (let i = 0; i < cols; i++) {  // Loop through columns
      for (let j = 0; j < rows; j++) {  // Loop through rows
        let x = i * (ellipseSize + 10) + 50;  // X position
        let y = j * (ellipseSize + 10) + 50;  // Y position
  
        // Alternate between pink and green based on row + column index
        if ((i + j) % 2 === 0) {
          fill(255, 105, 180);  // Pink color (RGB)
        } else {
          fill(0, 255, 0);  // Green color (RGB)
        }
  
        ellipse(x, y, ellipseSize, ellipseSize);  // Draw ellipse at position (x, y)
      }
    }
  }
  