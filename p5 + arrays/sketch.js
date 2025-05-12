// Particle class - to define the properties of the particle
class Particle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.velX = random(-1, 1);
      this.velY = random(-1, 1);
      this.lifespan = 255; // Set the lifespan of the particle (opacity)
      this.color = color(random(255), random(255), random(255));
    }
  
    // Method to update the particle's position and lifespan
    update() {
      this.x += this.velX;
      this.y += this.velY;
      this.lifespan -= 2; // Reduce lifespan
      fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.lifespan);
      noStroke();
      ellipse(this.x, this.y, 10, 10);
    }
  
    // Check if the particle is "dead"
    isDead() {
      return this.lifespan <= 0;
    }
  }
  
  // Array to store the particles
  let particles = [];
  
  function setup() {
    createCanvas(600, 400);
    // Initial background color
    background(0);
  }
  
  function draw() {
    // Loop through each particle in the array
    for (let i = particles.length - 1; i >= 0; i--) {
      let p = particles[i];
      p.update(); // Update each particle
  
      // If the particle is dead, remove it from the array
      if (p.isDead()) {
        particles.splice(i, 1);
      }
    }
  }
  
  // Add a new particle when mouse is pressed
  function mousePressed() {
    let newParticle = new Particle(mouseX, mouseY);
    particles.push(newParticle); // Add new particle to the array
  
    // Example: using .concat() to add a new array of particles
    let newParticlesArray = [new Particle(mouseX + 50, mouseY + 50)];
    particles = particles.concat(newParticlesArray); // Concat new particles into main array
  }
  
  // Example using .join() to create a string from particle array data
  function keyPressed() {
    let particleData = particles.map(p => `Particle at (${p.x}, ${p.y})`);
    let particleString = particleData.join(', ');
    console.log(particleString); // Display particle data in console
  }
  