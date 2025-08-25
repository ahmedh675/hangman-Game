let lettersString = Array.from({ length: 26 }, (_, i) => String.fromCharCode(i + 65));

let categories = {
    movies: ["Inception", "The Matrix", "Interstellar", "Avatar", "Titanic", "Star Wars", "Pulp Fiction", "Forrest Gump", "Gladiator", "Jurassic Park" , "The Godfather", "Fight Club",  "Harry Potter", "The Avengers"],
    countries: ["Canada", "Australia", "Germany", "France", "Japan", "Brazil", "India" , "Italy", "Spain", "United Kingdom", "United States" , "China", "Russia", "South Africa", "Mexico", "Argentina", "Sweden", "Norway", "Finland", "Denmark"],
    fruits: ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape" , "Honeydew", "Kiwi", "Lemon", "Mango", "Nectarine", "Orange", "Papaya", "Quince", "Raspberry", "Strawberry", "Tangerine", "Ugli fruit", "Watermelon"],
    animals: ["Lion", "Tiger", "Elephant", "Giraffe", "Zebra", "Kangaroo", "Panda" , "Koala", "Penguin", "Dolphin", "Whale", "Shark", "Crocodile", "Alligator", "Bear", "Wolf", "Fox", "Deer", "Rabbit", "Squirrel"]
}

let letters = document.querySelector(".letters");
let numOfFoundLetters = 0;
let successAttempts = 0;

lettersString.forEach((letter) => {
    let span = document.createElement("span");
    let theLetter = document.createTextNode(letter);
    span.appendChild(theLetter);
    span.className = "letter-box";
    letters.appendChild(span);
});

// Get Random Category
let randomCategory = Object.keys(categories)[Math.floor(Math.random() * Object.keys(categories).length)];
let randomValue = categories[randomCategory][Math.floor(Math.random() * categories[randomCategory].length)];

let letterAndSpaces = Array.from(randomValue);
let categoryName = document.querySelector(".categorys span");
categoryName.innerHTML = randomCategory.charAt(0).toUpperCase() + randomCategory.slice(1) + " | " + randomValue.length + ` ,${randomValue}`;

// Select Letters Guess Element
let lettersGuess = document.querySelector(".letters-guess");
// Create Empty Array
let guessLetters = [];
// Create Spans Based on Random Value Length
letterAndSpaces.forEach((letter) => {
    let emptySpan = document.createElement("span");
    if (letter === " ") {
        emptySpan.className = "with-space";
        successAttempts++;
    }
    lettersGuess.appendChild(emptySpan);
});

let theLettersSpan = document.querySelectorAll(".letters-guess span");
let theLettersFound = document.querySelectorAll(".letters-guess span .found");

let wrongAttempts = 0;
let theDraw = document.querySelector(".hangman-image");

// Handle Clicking on Letters
document.addEventListener("click", (e) => {
    if (e.target.className === "letter-box") {
        e.target.classList.add("clicked");
        let clickedLetter = e.target.innerHTML.toLowerCase();
        let found = false;
        letterAndSpaces.forEach((wordletter, index) => {
            if (wordletter.toLowerCase() === clickedLetter ) {
                theLettersSpan[index].innerHTML = wordletter;
                e.target.classList.add("found");
                theLettersSpan[index].classList.add("found");
                successAttempts++;
                if(successAttempts === letterAndSpaces.length){
                    success()
                }
                found = true;
            }
        });
        
        if (!found ) {
            e.target.classList.add("not-found");
            wrongAttempts++;
            theDraw.classList.add(`wrong-${wrongAttempts}`);
            if (wrongAttempts === 8) {
                endGame();
            }
        }
    }
});

function endGame() {
    let div = document.createElement("div");
    div.className = "popup";
    div.innerHTML = `<h2>Game Over</h2><p>The correct word was: <span>${letterAndSpaces.join("")}</span></p>`;
    document.body.appendChild(div);
    // Disable clicking on letters
    letters.classList.add("finished");
}

function success() {
    let div = document.createElement("div");
    div.className = "popup";
    div.innerHTML = `<h2>Congratulations!</h2>`;
    document.body.appendChild(div);
    theLettersSpan.forEach((span) => {
        if (span.classList.contains("with-space")) {
            return;
        }
        span.classList.add("green");
    });
    // Disable clicking on letters
    letters.classList.add("finished");
}

