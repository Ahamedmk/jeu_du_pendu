const mots = ["champagne","table","passoir","ecole","liberté","sarbacane"];

// Sélection aléatoire d'un mot à deviner
let selectMot = mots[Math.floor(Math.random() * mots.length)];
console.log(`le mot selectionné est ${selectMot}`);

// Création d'un tableau pour afficher les lettres du mot
 let wordToGuess = selectMot.split('');
//let wordToGuess = Array.from(selectMot);
console.log(`le tableau est ${wordToGuess}`)
let guessedWord = new Array(wordToGuess.length).fill("_");
console.log(`le mot selectionné avec trait est ${guessedWord}`)

// Fonction pour réinitialiser le jeu
function resetGame() {
    selectMot = mots[Math.floor(Math.random() * mots.length)];
    wordToGuess = Array.from(selectMot);
    guessedWord = new Array(wordToGuess.length).fill("_");
    attempts = 6;
    usedLetters = [];
    updateDisplay();
}


// Fonction pour mettre à jour l'affichage
function updateDisplay() {
    document.getElementById("mot").textContent = guessedWord.join(" ");
    // document.getElementById("attempts").textContent = attempts;
    // document.getElementById("used-letters").textContent = usedLetters.join(", ");
}
// Nombre de tentatives restantes
let attempts = 6;
console.log(`nombre de tentative ${attempts}`)

// Liste des lettres déjà utilisées
let usedLetters = [];

// Fonction pour deviner une lettre
function guessLetter(letter) {
  // Vérifier si la lettre a déjà été devinée
  if (usedLetters.includes(letter)) {
      alert("Vous avez déjà deviné cette lettre.");
      return;
  }

   // Vérifier si la lettre est dans le mot
   if (wordToGuess.includes(letter)) {
    for (let i = 0; i < wordToGuess.length; i++) {
        if (wordToGuess[i] === letter) {
            guessedWord[i] = letter;
        }
    }
} else {
    attempts--;
}
console.log(attempts)
// Mettre à jour l'affichage
 updateDisplay();

// Vérifier si le jeu est terminé
if (attempts === 0) {
    alert("Vous avez perdu. Le mot était : " + selectMot);
    resetGame();
} else if (!guessedWord.includes("_")) {
    alert("Félicitations ! Vous avez gagné !");
    resetGame();
}
}



let alphabet = document.querySelector('#alphabet');
let dataLetter = alphabet.querySelectorAll("[data-id]");
let motComplet = document.querySelector('#mot');

// Fonction pour gérer le clic sur les lettres
function handleClick(event) {
  const clickedLetter = event.target.dataset.id;
  console.log("Lettre cliquée : " + clickedLetter);
  guessLetter(clickedLetter);
}

// Ajoutez un gestionnaire d'événements au clic pour chaque lettre
 dataLetter.forEach((letter) => {
  letter.addEventListener("click", handleClick);
  
});

updateDisplay();

