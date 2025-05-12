let gremlin;

function setup() {
  createCanvas(windowWidth, windowHeight);
  gremlin = new Gremlin();
}

function draw() {
  background(26, 26, 26); // dark background
  gremlin.move();
  gremlin.display();
}

function mousePressed() {
  gremlin.goCrazy();
}

class Gremlin {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = 80;
    this.color = color(0, 255, 0); // Shrek Green
    this.speedX = random(-5, 5);
    this.speedY = random(-5, 5);
    this.wiggle = 0;
  }
  
  move() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce off walls
    if (this.x < this.size/2 || this.x > width - this.size/2) {
      this.speedX *= -1;
    }
    if (this.y < this.size/2 || this.y > height - this.size/2) {
      this.speedY *= -1;
    }
    
    // Add a little "wiggle" effect to make it goofy
    this.wiggle = sin(frameCount * 0.3) * 5;
  }
  
  display() {
    push();
    translate(this.x, this.y);
    rotate(radians(this.wiggle)); // lil shaky rotate
    fill(this.color);
    stroke(0);
    strokeWeight(4);
    ellipse(0, 0, this.size, this.size);
    
    // Make goofy little "ears"
    fill(0, 255, 0);
    ellipse(-this.size/3, -this.size/2, 20, 30); // left ear
    ellipse(this.size/3, -this.size/2, 20, 30); // right ear
    
    // Gremlin eyes
    fill(0);
    ellipse(-10, -10, 10, 15);
    ellipse(10, -10, 10, 15);
    
    // Gremlin mouth (little mischievous smile)
    noFill();
    stroke(0);
    strokeWeight(3);
    arc(0, 10, 30, 20, 0, PI);
    pop();
  }
  
  goCrazy() {
    // When you click, he PANICS
    this.speedX = random(-7, 7);
    this.speedY = random(-7, 7);
    this.color = color(random(100,255), random(100,255), 0); // wild color shift
    this.size = random(60, 100); // sometimes gets bigger or smaller
  }
}

