
// Play again event.
let playAgainButton = document.getElementById("play-again");
playAgainButton.addEventListener("click", function () {
  wordAssigment();
  document.getElementById("popup-container").style.display = "none";

});


let words = ["html", "css", "javascript", "python", "cpp", "haskell", "rugby"];
let random;
let word;
let word_of_length;

let indexOfHangman;
let hangs = document.querySelectorAll(".item");

// For wrong letters.
let wrong_letters = document.getElementById("wrong-letters");
wrong_letters.style.display = "none";
let wrong_letters_element = document.getElementById("wrong-letters-letters");

let wrong_letters_text;
let wrong_number;

let correct_numbers = 0;
let correct_word = "";
let letters ;

wordAssigment();

function wordAssigment() {
  // Random word selection.
  random = Math.floor(Math.random() * words.length);
  word = words[random];
  word_of_length = word.length;

  // Chars assigments and remove old letters.
  let wordElement = document.getElementById("word");
    while (wordElement.firstChild) {
    wordElement.removeChild(wordElement.firstChild);
  }
  let letterElement = `<div class="letter"></div>`;
  for (let i = 0; i < word.length; i++) {
    wordElement.insertAdjacentHTML("afterbegin", letterElement);
  }
  letters = document.querySelectorAll(".letter");

  //For the wrong letters
  wrong_letters.style.display = "none";
  // For the hangman
  indexOfHangman = 0 ;
  hangs.forEach((hang) => (hang.style.display = "none"));
  wrong_letters_text = "";
  wrong_number = 0;

  correct_numbers =0;
  correct_word = "";
}


document.addEventListener("keydown", function (e) {
  let characterEntered = e.key;
  let indexOfCharacter = word.indexOf(characterEntered);

  const isLetter = e.key >= "a" && e.key <= "z";
  if (!isLetter && characterEntered != "F5") {
    alert("Print a character in alphabet.");
    return;
  }
  if (characterEntered == "F5") {
    return;
  }

  if (indexOfCharacter != -1 && !correct_word.includes(characterEntered)) {
    for (let i = 0; i < word.length; i++) {
      if (characterEntered == word[i]) {
        correct_word += characterEntered;
        correct_numbers++;
        letters[i].innerHTML = `<p>${characterEntered}</p>`;
        if (correct_numbers == word_of_length) {
          gameWon();
        }
      }
    }
  }
  else if(correct_word.includes(characterEntered)){
    
  } 
  else {
    if (wrong_letters_text.includes(e.key)) return;
    wrong_letters.style.display = "block";
    wrong_letters_text += characterEntered + " ";
    wrong_letters_element.innerText = wrong_letters_text;
    wrongDrawer();

    wrong_number++;
    if (wrong_number == hangs.length) {
      gameOver();
    }
  }
});

function wrongDrawer() {
  hangs[indexOfHangman].style.display = "block";
  indexOfHangman++;
}

// For pop-ups that shows game over or game won.
function gameOver() {
  document.getElementById("popup-container").style.display = "flex";
  document.getElementById("success-message").innerText = "You lost!";
}
function gameWon() {
  document.getElementById("popup-container").style.display = "flex";
  document.getElementById("success-message").innerText = "You Won!";
}
