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
    var partieEnCours = false;

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
  
     
      if (!interactionAutorisee || card.classList.contains('matched')) {
        return;
      }
  
      card.classList.add('flip');
      selectedCards.push(card);
  
      if(selectedCards.length == 2){
        interactionAutorisee = false; 
        setTimeout(() => {
          if(selectedCards[0].dataset.value == selectedCards[1].dataset.value){
        
            selectedCards[0].classList.add("matched");
            selectedCards[1].classList.add("matched");
            selectedCards = [];
            const allCardsNotMatched = document.querySelectorAll('.card:not(.matched)');
            if(allCardsNotMatched.length == 0){
            
              alert("Bravo, vous avez gagné !");
            }
          }
          else{
           
            selectedCards[0].classList.remove("flip");
            selectedCards[1].classList.remove("flip");
            selectedCards = [];
          }
          interactionAutorisee = true;
        }, 1000);
      }
    }
  
    function nouvellePartie() {
      debutPartie = new Date();
      interactionAutorisee = true;
      tempsEcouleElement.textContent = "Temps écoulé: 0 secondes";
  
    
      gameBoard.innerHTML = '';
  
      let allCards = duplicateArray(cards);
   
      allCards = shuffleArray(allCards);
      allCards.forEach(card => {
        const cardHtml = createCard(card);
        gameBoard.appendChild(cardHtml);
      });
  
      lancerChronometre();
    }
  
    function terminerPartie() {
      finPartie = new Date();
      var differenceTemps = finPartie - debutPartie;
      var tempsEnSecondes = differenceTemps / 1000;
      tempsEcouleElement.textContent = "Temps écoulé: " + tempsEnSecondes + " secondes";
  
 
      document.cookie = "score=" + tempsEnSecondes;
    }
  
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
  

    nouvellePartie();
  });
