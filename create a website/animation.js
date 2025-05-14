let particles = [];
let mode = 'day';
let toggleButton;
let cnv;
let treeSwayAngle = 0;
let bunny;

function setup() {
  cnv = createCanvas(400, 400);
  noStroke();

  for (let i = 0; i < 30; i++) {
    particles.push(new Particle(random(width), random(-height, 0)));
  }

  toggleButton = createButton('🌙 Switch to Night Mode');
  toggleButton.style('padding', '8px 12px');
  toggleButton.style('font-size', '14px');

  setTimeout(() => {
    toggleButton.position(
      cnv.position().x + (width / 2) - (toggleButton.size().width / 2),
      cnv.position().y + height + 10
    );
    toggleButton.mousePressed(toggleMode);
  }, 100);

  // Create the bunny
  bunny = new Bunny(-40, height - 30);
}

function draw() {
  drawSky();
  drawHills();
  drawGlowingTree();

  bunny.move();
  bunny.display();

  for (let p of particles) {
    p.move();
    p.display();
  }

  // Faster sway speed
  treeSwayAngle += 0.03;
}

function toggleMode() {
  if (mode === 'day') {
    mode = 'night';
    toggleButton.html('☀️ Switch to Day Mode');
  } else {
    mode = 'day';
    toggleButton.html('🌙 Switch to Night Mode');
  }
}

function drawSky() {
  let topColor = mode === 'day' ? color('#fceabb') : color('#1c1c2b');
  let bottomColor = mode === 'day' ? color('#ffccff') : color('#3a2e4f');

  for (let y = 0; y < height; y++) {
    let c = lerpColor(topColor, bottomColor, y / height);
    stroke(c);
    line(0, y, width, y);
  }

  if (mode === 'night') {
    for (let i = 0; i < 40; i++) {
      fill(255, 255, 255, random(100, 180));
      noStroke();
      ellipse(random(width), random(height / 2), 1.5, 1.5);
    }
  }
}

function drawHills() {
  noStroke();
  fill(mode === 'day' ? '#8c7b75' : '#50403a');
  ellipse(width * 0.3, height + 40, 400, 120);
  ellipse(width * 0.7, height + 30, 300, 100);
}

function drawGlowingTree() {
  push();
  translate(width / 2, height - 60);
  rotate(sin(treeSwayAngle) * 0.07); // sway speed increased

  if (mode === 'night') {
    for (let r = 60; r > 20; r -= 5) {
      fill(100, 255, 180, 10);
      ellipse(0, -50, r * 2);
    }
  }

  fill('#8B5A2B');
  rect(-5, 0, 10, 40);

  fill(mode === 'day' ? '#4CAF50' : '#86ffb0');
  ellipse(0, -20, 60, 60);
  ellipse(-20, -10, 40, 40);
  ellipse(20, -10, 40, 40);
  pop();
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.depth = random(0.3, 1.0);
    this.size = map(this.depth, 0.3, 1.0, 10, 24);
    this.speed = map(this.depth, 0.3, 1.0, 0.3, 1.5);
    this.swing = random(0.5, 2);
    this.angle = random(TWO_PI);
    this.shapeType = random(['leaf', 'petal']);
    this.color = this.randomColor();
  }

  randomColor() {
    return this.shapeType === 'leaf'
      ? random(['#8FBC8F', '#A0522D', '#C3B091'])
      : random(['#FFC0CB', '#FFFACD', '#FFDAB9']);
  }

  move() {
    this.y += this.speed;
    this.x += sin(this.angle) * this.swing * 0.1;
    this.angle += 0.01;

    if (this.y > height + this.size) {
      this.y = random(-100, -10);
      this.x = random(width);
    }
  }

  display() {
    fill(this.color);
    if (this.shapeType === 'leaf') {
      ellipse(this.x, this.y, this.size, this.size * 0.5);
    } else {
      push();
      translate(this.x, this.y);
      rotate(sin(this.angle) * 0.5);
      ellipse(0, 0, this.size * 0.8, this.size * 0.5);
      pop();
    }
  }
}

// 🐇 Bunny class
class Bunny {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 0.5;
  }

  move() {
    this.x += this.speed;
    if (this.x > width + 40) {
      this.x = -40;
    }
  }

  display() {
    push();
    translate(this.x, this.y);
    scale(1);

    // body
    fill('#f0e6d6');
    ellipse(0, 0, 28, 18);

    // head
    ellipse(-15, -5, 14, 14);

    // ears
    fill('#f0e6d6');
    ellipse(-17, -15, 5, 15);
    ellipse(-12, -15, 5, 15);

    // tail
    fill('#fff');
    ellipse(12, 2, 6, 6);

    pop();
  }
}
