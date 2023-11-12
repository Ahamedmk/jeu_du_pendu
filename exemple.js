const mots = ["champagne","table","passoir","ecole","manga","sarbacane","fruit","naruto","itachi"];

let alphabet = document.querySelector('#alphabet');
let dataLetter = alphabet.querySelectorAll("[data-id]");
let motComplet = document.querySelector('#mot');
let motTrouver = document.querySelector('button');
let image = document.querySelector('.img_pendu');
let nbreImage = 1 ;

// Nombre de tentatives restantes
let attempts = 6;

// Sélection aléatoire d'un mot à deviner
let selectMot = mots[Math.floor(Math.random() * mots.length)];

// Création d'un tableau pour afficher les lettres du mot
 let wordToGuess = selectMot.split('');
 
//let wordToGuess = Array.from(selectMot);
let guessedWord = new Array(wordToGuess.length).fill("_");


// Fonction pour réinitialiser le jeu
function resetGame() {
    selectMot = mots[Math.floor(Math.random() * mots.length)];
     wordToGuess = Array.from(selectMot);
    guessedWord = new Array(wordToGuess.length).fill("_");
    attempts = 6;
    usedLetters = [];
    nbreImage = 1;
    updateDisplay();
}

//fonction pour deviner le mot 
function motDeviner(){
    let deviner = prompt("Quel est votre mot ?: ")
    if (deviner == selectMot) {
        confetti();
        setTimeout(() =>{alert("Félicitations ! Vous avez gagné !")},1000);
        setTimeout(() =>{resetGame()},2000);
    }else{
        attempts--;
        nbreImage++;
        updateDisplay();
    }

}

// Fonction pour mettre à jour l'affichage
function updateDisplay() {
    document.getElementById("mot").textContent = guessedWord.join(" ");
     document.getElementById("attempts").textContent = attempts;
     image.innerHTML = `<img src="/images/${nbreImage}.png" alt="le_pendu">`;
    // document.getElementById("used-letters").textContent = usedLetters.join(", ");
}

// Liste des lettres déjà utilisées
let usedLetters = [];

// Fonction pour deviner une lettre
function guessLetter(letter) {
  // Vérifier si la lettre a déjà été devinée
  if (usedLetters.includes(letter)) {
      alert("Vous avez déjà tapé cette lettre.");
      return;
  } else {
      usedLetters.push(letter);
  };

   // Vérifier si la lettre est dans le mot
   if (wordToGuess.includes(letter)) {
    for (let i = 0; i < wordToGuess.length; i++) {
        if (wordToGuess[i] === letter) {
            guessedWord[i] = letter;
        }
    }
} else {
    attempts--;
    nbreImage++;
}
console.log(attempts)
// Mettre à jour l'affichage
 updateDisplay();

// Vérifier si le jeu est terminé
if (attempts === 0) {
    setTimeout(() =>{alert("Vous avez perdu. Le mot était : " + selectMot)},1000);
    setTimeout(() =>{resetGame()},2000);
} else if (!guessedWord.includes("_")) {
    setTimeout(() =>{alert("Félicitations ! Vous avez gagné !")},1000);
    confetti({
        particleCount: 150
      });
    setTimeout(() =>{resetGame()},2000);
}
}

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

//Ajoutez un gestionnaire d'evènements au clic du boutton
motTrouver.addEventListener("click",motDeviner)

updateDisplay();

