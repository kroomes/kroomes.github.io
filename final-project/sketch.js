let usedWords = [];
let score = 0;
let totalWords = 0;

let input;
let submitButton;
let feedback = "";

let wordList;
let currentWord = "";
let scrambledWord = "";

function preload() {
  wordList = loadJSON("words.json");
}

function setup() {
  createCanvas(600, 400);
  textAlign(CENTER, CENTER);
  textSize(32);

  // Create input
  input = createInput();
  input.size(200);
  input.position(width / 2 - 100, 250);

  // Create submit button
  submitButton = createButton('Submit');
  submitButton.size(80, 30);
  submitButton.position(width / 2 + 110, 250);
  submitButton.mousePressed(checkAnswer);

  // Create skip button
  let skipButton = createButton('Skip');
  skipButton.size(80, 30);
  skipButton.position(width / 2 - 190, 250);
  skipButton.mousePressed(() => {
    totalWords++;
    input.value("");
    feedback = "Skipped!";
    pickNewWord();

    setTimeout(() => {
      feedback = "";
    }, 2000);
  });

  // Create reset button
  let resetButton = createButton('Reset');
  resetButton.size(80, 30);
  resetButton.position(width / 2 - 40, 300);
  resetButton.mousePressed(() => {
    usedWords = [];
    score = 0;
    totalWords = 0;
    input.value("");
    feedback = "Game reset!";
    pickNewWord();

    setTimeout(() => {
      feedback = "";
    }, 2000);
  });

  pickNewWord();
}

function checkAnswer() {
  let guess = input.value().toLowerCase();
  if (guess === currentWord) {
    score++;
    totalWords++;
    feedback = "Correct!";
    input.value("");
    pickNewWord();
  } else {
    feedback = "Try again!";
  }

  setTimeout(() => {
    feedback = "";
  }, 2000);
}

function draw() {
  background(30);

  fill(255);
  text("Unscramble this word:", width / 2, 100);
  text(scrambledWord, width / 2, 180);

  // Score & total words
  textSize(20);
  textAlign(LEFT, TOP);
  fill(255);
  text("Score: " + score, 20, 20);
  text("Words Solved: " + totalWords, 20, 50);

  // Feedback
  textSize(20);
  textAlign(CENTER, TOP);
  fill(200);
  text(feedback, width / 2, 320);
}

function pickNewWord() {
  let words = wordList.words;

  // All words used — end game
  if (usedWords.length === words.length) {
    currentWord = "";
    scrambledWord = "";
    feedback = "You've completed all the words!";
    return;
  }

  // Pick a new unused word
  let newWord;
  do {
    newWord = random(words);
  } while (usedWords.includes(newWord));

  usedWords.push(newWord);
  currentWord = newWord;
  scrambledWord = shuffleWord(currentWord);
}

function shuffleWord(word) {
  let arr = word.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(random(i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
}
