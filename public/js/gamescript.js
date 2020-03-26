$(document).ready(function() {
  const word = document.getElementById("word");
  const text = document.getElementById("text");
  const scoreEl = document.getElementById("score");
  const timeEl = document.getElementById("time");
  const endgameEl = document.getElementById("end-game-container");
  const settingsBtn = document.getElementById("settings-btn");
  const settings = document.getElementById("settings");
  const startBtn = document.getElementById("start-btn");
  const typeArea = document.getElementById("typeArea");
  const difficultyForm = document.getElementById("difficulty-form");
  const difficultyArea = document.getElementById("difficultyArea");
  const difficulty = document.getElementById("difficulty");
  const startGameBtn = document.getElementById("start-game-button");

  let diffculty_level;
  let randomWord;
  let score = 0;
  let time = 10;
  let wordsArr = [];

  // Creating "init" function that will hide the other elements upon page load
  function init() {
    $(typeArea).css("display", "none");
    $(difficultyArea).css("display", "none");
    $("select").formSelect();
  }

  init();

  // Add listener to "Start" button to have the user choose "difficulty level" of the game
  startBtn.addEventListener("click", start);

  function start() {
    $(difficultyArea).css("display", "block");
    $(startBtn).css("display", "none");
  }

  // Add event listener when user selects the difficulty leve

  difficultyForm.addEventListener("submit", function test(e) {
    e.preventDefault();

    // Get the difficulty
    diffculty_level = $(difficulty).val();

    queryWords(diffculty_level);
  });

  function queryWords(game_difficulty) {
    $.ajax({
      method: "GET",
      url: "/api/words/difficulty/" + game_difficulty
    }).then(data => {
      // Initiate Main Game Function by passing the words categorized by difficulty
      collectWords(data);
      startGame(data);
    });
  }

  function collectWords(words) {
    words.forEach(data => {
      wordsArr.push(data.words);
    });
  }

  function getRandomWord() {
    return wordsArr[Math.floor(Math.random() * wordsArr.length)];
  }

  function addWordToDom() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
  }

  function updateScore() {
    score++;
    scoreEl.innerHTML = score;
  }

  function startGame() {
    $(difficultyArea).css("display", "none");
    $(typeArea).css("display", "block");
    $(text).focus();

    const timeInterval = setInterval(updateTime, 1000);

    function updateTime() {
      time--;
      timeEl.innerHTML = time + "s";

      if (time === 0) {
        clearInterval(timeInterval);
        gameOver();
      }
    }

    // Event Listener for user's input for the typing game
    text.addEventListener("input", e => {
      const insertedText = e.target.value;

      if (insertedText === randomWord) {
        addWordToDom();
        updateScore();
        e.target.value = "";

        if (diffculty_level === "hard") {
          time += 2;
        } else if (diffculty_level === "medium") {
          time += 3;
        } else {
          time += 5;
        }

        updateTime();
      }
    });

    // Get the random word and place it in the DOM
    addWordToDom();
  }

  function gameOver() {
    endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <i class="fas fa-skull-crossbones fa-5x"></i>
    <p>Your final score is ${score}</p>
    <a onclick="location.reload()" class="waves-effect waves-light teal lighten-3 btn-large">Reload</a>
  `;

    endgameEl.style.display = "flex";
  }

  settingsBtn.addEventListener("click", () => {
    settings.classList.toggle("hide");
  });
});
