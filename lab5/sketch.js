let resultGame;
let questions;
let characters;
let currentQuestion = 0;
let scores = {};
let resultCharacter = null;
let resultImg;
let resultDesc;

function preload() {
  questions = loadJSON("questions.json");
  characters = loadJSON("characters.json");
}

function setup() {
  createCanvas(600, 600).parent(document.body);
  textAlign(CENTER, CENTER);
  textSize(18);
  fill(255);

  characters.characters.forEach(c => scores[c.name] = 0);

  createQuestionUI();
}

function createQuestionUI() {
  clearUI();

  // Create a centered container
  let container = createDiv().id("questionContainer");
  container.style('position', 'absolute');
  container.style('top', '100px');
  container.style('left', '50%');
  container.style('transform', 'translateX(-50%)');
  container.style('width', '100%');
  container.style('text-align', 'center');

  // Question text
  let questionP = createP(questions.questions[currentQuestion].question);
  questionP.parent(container);
  questionP.id("question");

  // Option buttons (one per row, centered)
  questions.questions[currentQuestion].options.forEach((option) => {
    let btn = createButton(option.text);
    btn.parent(container);
    btn.style('display', 'block'); // stack vertically
    btn.style('margin', '10px auto'); // center horizontally
    btn.style('padding', '12px 24px');
    btn.style('font-size', '16px');
    btn.style('border-radius', '8px');
    btn.style('background', '#ffffffcc');
    btn.style('border', 'none');
    btn.style('color', '#333');
    btn.mouseOver(() => btn.style('background', '#ffdb58'));
    btn.mouseOut(() => btn.style('background', '#ffffffcc'));

    btn.mousePressed(() => {
      scores[option.character]++;
      currentQuestion++;
      if (currentQuestion < questions.questions.length) {
        createQuestionUI();
      } else {
        showResult();
      }
    });
  });
}


function showResult() {
  clearUI();

  let top = Object.entries(scores).reduce((a, b) => a[1] > b[1] ? a : b);
  let character = characters.characters.find(c => c.name === top[0]);

  resultCharacter = character.name;
  resultGame = character.game;
  resultDesc = character.description;
  resultImg = loadImage(character.image);
}

function draw() {
  background(30, 30, 60);

  if (resultCharacter && resultImg) {
    imageMode(CENTER);
    image(resultImg, width / 2, 180, 220, 220);

    fill(255);
    textAlign(CENTER);
    
    textSize(24);
    text(resultCharacter, width / 2, 380);

    textSize(18);
    text(resultGame, width / 2, 410);

    textSize(16);
    textAlign(CENTER, TOP); 
   let textBoxWidth = 400;
let x = (width - textBoxWidth) / 2;
textAlign(LEFT, TOP);
text(resultDesc, x, 450, textBoxWidth);

  }
}

function clearUI() {
  let container = select('#questionContainer');
  if (container) container.remove();
  selectAll('p').forEach(el => el.remove());
  selectAll('button').forEach(el => el.remove());
}

