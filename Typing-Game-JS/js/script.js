// Selectors
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreElement = document.getElementById("score");
const timeElement = document.getElementById("time");
const endGameElement = document.getElementById("end-game-container");
const settingBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const difficultySelect = document.getElementById("difficulty");
const startbtn = document.getElementById("start-game");
var scoreTable= [0,0,0];
if(localStorage.getItem("quentinTarantino")){
  console.log("hbsadb")
  scoreTable= JSON.parse(localStorage.getItem("quentinTarantino"));
}


// list of words for game
const words = [
  "came",
  "come",
  "letter",
  "end",
  "I",
  "all",
  "number",
  "oil",
  "within",
  "now",
  "right",
  "feet",
  "leave",
  "what",
  "now",
  "fall",
  "came",
  "live",
  "year",
  "about",
  "got",
  "came",
  "set",
  "were",
  "follow",
  "study",
  "day",
  "eye",
  "over",
  "why",
  "why",
  "talk",
  "soon",
  "because",
  "eye",
  "watch",
  "year",
  "her",
  "any",
  "by",
  "I",
  "both",
  "around",
  "book",
  "line",
  "mother",
  "open",
  "now",
  "that",
  "mile",
  "go",
  "by",
  "found",
  "said",
  "eye",
  "come",
  "so",
  "place",
  "food",
  "got",
  "city",
  "always",
  "these",
  "any",
  "use",
  "been",
  "was",
  "read",
  "their",
  "without",
  "as",
  "change",
  "leave",
  "can",
  "they",
  "those",
  "eat",
  "never",
  "no",
  "eat",
  "story",
];
console.log("hello")
// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

// Set difficulty
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// set difficulty select value
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";
var timeInterval;
function start(){
  // focus on text on start
  console.log(scoreTable);
  text.focus();
  highscoref();

// count down
  timeInterval = setInterval(updateTime, 1000);
  startbtn.style.display="none";
  startbtnbg.style.display="none";
}

// Random words generator from Array
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// update score
function updateScore() {
  score++;
  scoreElement.innerHTML = score;
}

// update time
function updateTime() {
  time--;
  timeElement.innerHTML = time + "s";

  if (time === 0) {
    clearInterval(timeInterval);

    //   game over
    gameOver();
    highscoref();
  }
}


  function highscoref(){
    scoreTable = JSON.parse(localStorage.getItem("quentinTarantino"));
    
    scoreTable.sort(function(a,b){return a-b});
    scoreTable.reverse();
    document.getElementById("highscore").innerHTML=`
    <h1>First : ${scoreTable[0]}</h1>
    <h1>Second : ${scoreTable[1]}</h1>
    <h1>Third : ${scoreTable[2]}</h1>
    `;

  }
  
function gameOver() {
  
  scoreTable.push(score);
  localStorage.setItem("quentinTarantino", JSON.stringify(scoreTable));
  scoreTable = JSON.parse(localStorage.getItem("quentinTarantino"));
  let m = parseInt(Math.max(...scoreTable));
  
  


  if(score >= m){
  endGameElement.innerHTML = `
  <h1>Time ran out</h1>
  <p style="font-size:1.5rem; font-weight:600;">Hurray!!! High score: ${score}</p>
  <button onclick="location.reload()" style="
  background: red; color: #fff;">Reload</button>
    `;
  endGameElement.style.backgroundColor = "Gold";
  endGameElement.style.display = "flex";
  }
  else{
  endGameElement.innerHTML = `
  <h1>Time ran out</h1>
  <p>Your final score is : ${score}</p>
  <button onclick="location.reload()" style="
  background: #4e5e73; color: #fff;">Reload</button>
    `;

  endGameElement.style.display = "flex";
  }
  
  
}

addWordToDOM();

// Typing Event
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
 
  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    e.target.value = "";

    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
  
});

// Settings btn
settingBtn.addEventListener("click", () => settings.classList.toggle("hide"));
startbtn.addEventListener("click",start);
// setting select
difficultySelect.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
