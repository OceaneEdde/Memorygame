// Tableau contenant les URLs des images des cartes
const cards = [
  'https://picsum.photos/id/106/100/100',
  'https://picsum.photos/id/152/100/100',
  'https://picsum.photos/id/306/100/100',
  'https://picsum.photos/id/360/100/100',
  'https://picsum.photos/id/365/100/100',
  'https://picsum.photos/id/654/100/100',
  'https://picsum.photos/id/696/100/100',
  'https://picsum.photos/id/798/100/100'
];

// Sélection de l'élément HTML avec l'ID 'game-board'
const gameBoard = document.getElementById('game-board');

// Tableau pour stocker les cartes sélectionnées
let selectedCards = [];

// Événement DOMContentLoaded, exécute le code lorsque le document HTML est complètement chargé
document.addEventListener('DOMContentLoaded', function () {

  // Variables pour le chronomètre
  var debutPartie, finPartie;
  var interactionAutorisee = true;
  var tempsEcouleElement = document.getElementById('tempsEcoule');

  // Fonction pour créer une carte HTML avec une image
  function createCard(cardUrl) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = cardUrl;

    const cardContent = document.createElement('img');
    cardContent.classList.add('card-content');
    cardContent.src = cardUrl;

    card.appendChild(cardContent);

    card.addEventListener('click', onCardClick);
    return card;
  }

  // Fonction pour dupliquer un tableau
  function duplicateArray(arraySimple) {
    let arrayDouble = [];
    arrayDouble.push(...arraySimple);
    arrayDouble.push(...arraySimple);
    return arrayDouble;
  }

  // Fonction pour mélanger un tableau
  function shuffleArray(arrayToshuffle) {
    const arrayShuffled = arrayToshuffle.sort(() => 0.5 - Math.random());
    return arrayShuffled;
  }

  // Fonction appelée lorsqu'une carte est cliquée
  function onCardClick(e) {
    const card = e.target.parentElement;

    // Vérifie si l'interaction est autorisée et si la carte n'est pas déjà appariée
    if (!interactionAutorisee || card.classList.contains('matched')) {
      return;
    }

    // Ajoute la classe 'flip' à la carte et l'ajoute au tableau des cartes sélectionnées
    card.classList.add('flip');
    selectedCards.push(card);

    // Vérifie si deux cartes sont sélectionnées
    if (selectedCards.length == 2) {
      interactionAutorisee = false;

      // Délai avant de vérifier si les cartes sont appariées
      setTimeout(() => {
        if (selectedCards[0].dataset.value == selectedCards[1].dataset.value) {
          // Les cartes sont appariées
          selectedCards[0].classList.add("matched");
          selectedCards[1].classList.add("matched");
          selectedCards = [];

          // Vérifie si toutes les cartes ont été appariées
          const allCardsNotMatched = document.querySelectorAll('.card:not(.matched)');
          if (allCardsNotMatched.length == 0) {
            alert("Bravo, vous avez gagné !");
          }
        } else {
          // Les cartes ne sont pas appariées, retourne les cartes
          selectedCards[0].classList.remove("flip");
          selectedCards[1].classList.remove("flip");
          selectedCards = [];
        }

        // Autorise à nouveau l'interaction après le délai
        interactionAutorisee = true;
      }, 1000);
    }
  }

  // Fonction pour créer une nouvelle partie
  function nouvellePartie() {
    debutPartie = new Date();
    interactionAutorisee = true;
    tempsEcouleElement.textContent = "Temps écoulé: 0 secondes";

    // Efface le contenu du plateau de jeu
    gameBoard.innerHTML = '';

    // Duplique et mélange le tableau des cartes
    let allCards = duplicateArray(cards);
    allCards = shuffleArray(allCards);

    // Crée les cartes et les ajoute au plateau de jeu
    allCards.forEach(card => {
      const cardHtml = createCard(card);
      gameBoard.appendChild(cardHtml);
    });

    // Lance le chronomètre
    lancerChronometre();
  }

  // Fonction pour terminer la partie et enregistrer le temps
  function terminerPartie() {
    finPartie = new Date();
    var differenceTemps = finPartie - debutPartie;
    var tempsEnSecondes = differenceTemps / 1000;
    tempsEcouleElement.textContent = "Temps écoulé: " + tempsEnSecondes + " secondes";

    // Enregistre le temps dans un cookie (vous pourriez vouloir utiliser une méthode plus sécurisée)
    document.cookie = "score=" + tempsEnSecondes;
  }

  // Fonction pour lancer le chronomètre et mettre à jour l'affichage du temps écoulé
  function lancerChronometre() {
    setInterval(() => {
      if (debutPartie) {
        var maintenant = new Date();
        var differenceTemps = maintenant - debutPartie;
        var tempsEnSecondes = Math.floor(differenceTemps / 1000);
        tempsEcouleElement.textContent = "Temps écoulé: " + tempsEnSecondes + " secondes";
      }
    }, 1000);
  }

  // Sélectionne le bouton 'Nouvelle partie' et ajoute un écouteur d'événements
  var btnRecommencer = document.getElementById('btnRecommencer');
  if (btnRecommencer) {
    btnRecommencer.addEventListener('click', function () {
      nouvellePartie();
    });
  }

});