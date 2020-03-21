const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game
const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
];

//db->table w/ id column difficulty column & words column (3 columns: id, diff., and words)
//get route to bring in words from db//
//need to query words @ random - another way? 

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

// Set difficulty to value in ls or medium
let difficulty =
    localStorage.getItem('difficulty') !== null ?
    localStorage.getItem('difficulty') :
    'medium';

// Set difficulty select value
difficultySelect.value =
    localStorage.getItem('difficulty') !== null ?
    localStorage.getItem('difficulty') :
    'medium';

// Focus on text on start
text.focus();



// Generate random word from array
function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

// Add word to DOM
function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

// Update score
function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}



$(document).ready(function(){
    $('select').formSelect();
  });

  var startButton = document.getElementById('start-btn');
  var containerElement = document.getElementById('typeArea');
  var myMusic;

  function start() {
    containerElement.style.display="none"
  }

  function startGame() {
      myMusic = new sound('./audio/Dark Souls - Menu Theme.mp3');
      myMusic.play();
      console.log('Started');
      startButton.classList.add('hide');
      containerElement.style.display="block";
      const timeInterval = setInterval(updateTime, 1000); 

      // Update time
      function updateTime() {
          time--;
          timeEl.innerHTML = time + 's';
      
          if (time === 0) {
              clearInterval(timeInterval);
              // end game
              gameOver();
          }
      }

      text.addEventListener('input', e => {
        const insertedText = e.target.value;
    
        if (insertedText === randomWord) {
            addWordToDOM();
            updateScore();
    
            // Clear
            e.target.value = '';
    
            if (difficulty === 'hard') {
                time += 2;
            } else if (difficulty === 'medium') {
                time += 3;
            } else {
                time += 5;
            }
    
            updateTime();
        }
    });
    $("#text").focus();
  }

  function sound(src) {
      this.sound = document.createElement("audio");
      this.sound.src = src;
      this.sound.setAttribute("preload", "auto");
      this.sound.setAttribute("controls", "none");
      this.sound.style.display = "none";
      document.body.appendChild(this.sound);
      this.play = function(){
          this.sound.play();
      }
      this.stop = function(){
          this.sound.pause();
      }
  }

// Game over, show end screen
function gameOver() {
    endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <i class="fas fa-skull-crossbones fa-5x"></i>
    <p>Your final score is ${score}</p>
    <a onclick="location.reload()" class="waves-effect waves-light teal lighten-3 btn-large">Reload</a>
  `;

    endgameEl.style.display = 'flex';

// Alert with Giphy
}

//POST route to post User score and name to db

addWordToDOM();

// Event listeners

// Settings btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Settings select
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
});