$(document).ready(function () {
  const word = document.getElementById("word");
  const text = document.getElementById("text");
  const scoreEl = document.getElementById("score");
  const timeEl = document.getElementById("time");
  const settingsBtn = document.getElementById("settings-btn");
  const settings = document.getElementById("settings");
  const startBtn = document.getElementById("start-btn");
  const typeArea = document.getElementById("typeArea");
  const difficultyForm = document.getElementById("difficulty-form");
  const difficultyArea = document.getElementById("difficultyArea");
  const difficulty = document.getElementById("difficulty");
  const enterInitialsForm = document.getElementById("enter-initials-form");
  const enterInitialsArea = document.getElementById("enterInitialsArea");
  const initialsHeader = document.getElementById("enterInitialsHeader");
  const highScoreArea = document.getElementById("highScoresArea");
  const highScoreList = document.getElementById("high-score-list");
  const btnHighScoreModal = document.getElementById("btn-hs-modal");
  const modalHighScoreList = document.getElementById("modal-high-scores-list");

  let diffculty_level;
  let randomWord;
  let score = 0;
  let time = 10;
  let wordsArr = [];

  // Creating "init" function that will hide the other elements upon page load
  function init() {
    $(typeArea).css("display", "none");
    $(difficultyArea).css("display", "none");
    $(enterInitialsArea).css("display", "none");
    $(highScoreArea).css("display", "none");
    $("select").formSelect();
  }

  init();

  // Add listener to "Start" button to have the user choose "difficulty level" of the game
  startBtn.addEventListener("click", start);

  function start() {
    $(difficultyArea).css("display", "block");
    $(startBtn).css("display", "none");
    myMusic = new sound("./audio/Dark Souls - Menu Theme.mp3");
    myMusic.play();
  }

  // Add event listener when user selects the difficulty level

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
        enterInitials();
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

  function enterInitials() {
    initialsHeader.innerHTML = `
    <h1>Time ran out</h1>
    <br>
    <i class="fas fa-skull-crossbones fa-5x"></i>
    <br>
    <p>Your final score is ${score}</p>
    <br>
    `;
    $(enterInitialsArea).css("display", "block");
  }

  enterInitialsForm.addEventListener("submit", function test(e) {
    e.preventDefault();
    const player = $("#initials").val();
    submitPlayerScore(player, score);
  });

  function submitPlayerScore(player, score) {
    const playerData = {
      player: player,
      score: score
    };

    $.ajax({
      method: "POST",
      url: "/api/player",
      data: playerData
    }).then(response => {
      getHighScores();
    });
  }

  function getHighScores() {
    $.ajax({
      method: "GET",
      url: "/api/player/scores"
    }).then(response => {
      displayHighScores(response);
    });
  }

  function displayHighScores(highscores) {
    $(enterInitialsArea).css("display", "none");
    $(typeArea).css("display", "none");
    $(highScoreArea).css("display", "block");

    let html = "";

    highscores.forEach((highscore, idx) => {
      html += `
            <li class="collection-item">${idx + 1}. ${highscore.player} - ${
        highscore.score
      }</li>
      `;
    });

    highScoreList.innerHTML = html;
  }

  function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function() {
      this.sound.play();
    };
    this.stop = function() {
      this.sound.pause();
    };
  }

  settingsBtn.addEventListener("click", () => {
    settings.classList.toggle("hide");
  });

  $(".restart").on("click", function() {
    window.location.reload();
  });

  $(btnHighScoreModal).on("click", function() {
    $.ajax({
      method: "GET",
      url: "/api/player/scores"
    }).then(response => {
      let html = "";

      response.forEach((highscore, idx) => {
        html += `
              <li class="collection-item">${idx + 1}. ${highscore.player} - ${
          highscore.score
        }</li>
        `;
      });
      modalHighScoreList.innerHTML = html;
    });
  });
});
