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
const gameBoard = document.getElementById('game-board');
let selectedCards = [];

document.addEventListener('DOMContentLoaded', function(){
    var debutPartie, finPartie;
    var interactionAutorisee = true;
    var tempsEcouleElement = document.getElementById('tempsEcoule');
    var gameBoard = document.getElementById('game-board');
    var selectedCards = [];
  
    function createCard(cardUrl){
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
  
    function duplicateArray(arraySimple){
      let arrayDouble = [];
      arrayDouble.push(...arraySimple);
      arrayDouble.push(...arraySimple);
      return arrayDouble;
    }
  
    function shuffleArray(arrayToshuffle){
      const arrayShuffled = arrayToshuffle.sort(() => 0.5 - Math.random());
      return arrayShuffled;
    }
  
    function onCardClick(e){
      const card = e.target.parentElement;
  
      // Vérifier si les clics sont autorisés
      if (!interactionAutorisee || card.classList.contains('matched')) {
        return;
      }
  
      card.classList.add('flip');
      selectedCards.push(card);
  
      if(selectedCards.length == 2){
        interactionAutorisee = false; // Bloquer les clics pendant la seconde d'attente
        setTimeout(() => {
          if(selectedCards[0].dataset.value == selectedCards[1].dataset.value){
            // On a trouvé une paire
            selectedCards[0].classList.add("matched");
            selectedCards[1].classList.add("matched");
            selectedCards = [];
            const allCardsNotMatched = document.querySelectorAll('.card:not(.matched)');
            if(allCardsNotMatched.length == 0){
              // Le joueur a gagné
              alert("Bravo, vous avez gagné !");
            }
          }
          else{
            // On s'est trompé
            selectedCards[0].classList.remove("flip");
            selectedCards[1].classList.remove("flip");
            selectedCards = [];
          }
          interactionAutorisee = true; // Réactiver les clics après la seconde d'attente
        }, 1000);
      }
    }
  
    function nouvellePartie() {
      debutPartie = new Date();
      interactionAutorisee = true; // Assurer que les clics sont autorisés
      tempsEcouleElement.textContent = "Temps écoulé: 0 secondes";
  
      // Retirer les cartes du plateau
      gameBoard.innerHTML = '';
  
      let allCards = duplicateArray(cards);
      // Mélanger le tableau
      allCards = shuffleArray(allCards);
      allCards.forEach(card => {
        const cardHtml = createCard(card);
        gameBoard.appendChild(cardHtml);
      });
  
      // Lancer le chronomètre
      lancerChronometre();
    }
  
    function terminerPartie() {
      finPartie = new Date();
      var differenceTemps = finPartie - debutPartie;
      var tempsEnSecondes = differenceTemps / 1000;
      tempsEcouleElement.textContent = "Temps écoulé: " + tempsEnSecondes + " secondes";
  
      // Stocker le score en cookie
      document.cookie = "score=" + tempsEnSecondes;
    }
  
    function lancerChronometre() {
      // Mettre en place le chronomètre
      setInterval(() => {
        if (debutPartie) {
          var maintenant = new Date();
          var differenceTemps = maintenant - debutPartie;
          var tempsEnSecondes = Math.floor(differenceTemps / 1000);
          tempsEcouleElement.textContent = "Temps écoulé: " + tempsEnSecondes + " secondes";
        }
      }, 1000); // Mettre à jour toutes les secondes
    }
  
    // Commencer une nouvelle partie au chargement de la page
    nouvellePartie();
  });