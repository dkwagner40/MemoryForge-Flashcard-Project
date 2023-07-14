const addCardButton = document.getElementById("show_card_box");
const createCardSection = document.getElementById("create_card");
const deleteCard = document.getElementById("delete_cards");
const closeCardButton = document.getElementById("close_card_box");
const frontTextArea = document.getElementById("front");
const frontText = document.getElementById("front-text");
const backTextArea = document.getElementById("back");
const backText = document.getElementById("back-text");
const saveCardButton = document.getElementById("save_card");
const flashcard = document.getElementById("flashcard");
const addSet = document.getElementById("add_to_set");

function flip() {
  flashcard.classList.toggle('flipped');
  if (flashcard.classList.contains('flipped')) {
    frontText.style.display = 'none';
    backText.style.display = 'block';
  } else {
    frontText.style.display = 'block';
    backText.style.display = 'none';
  }
}

saveCardButton.addEventListener("click", function() {
  frontText.innerText = frontTextArea.value;
  backText.innerText = backTextArea.value;
  createCardSection.style.display = "none";
  addCardButton.style.display = "block";
  deleteCard.style.display = "inline";
  addSet.style.display = "inline";
  flashcard.classList.remove("flipped");
});

flashcard.addEventListener("click", flip);

addCardButton.addEventListener("click", function() {
  addCardButton.style.display = "none";
  deleteCard.style.display = "none";
  addSet.style.display = "none";
  createCardSection.style.display = "block";
});

closeCardButton.addEventListener("click", function() {
  createCardSection.style.display = "none";
  addCardButton.style.display = "block";
  deleteCard.style.display = "inline";
  addSet.style.display = "inline";
  flashcard.classList.remove("flipped");
});

saveButton.addEventListener('click', function() {
  const cardContainer = document.getElementById('card-container');
  const newCard = document.createElement('div');
  newCard.classList.add('card');
  newCard.innerHTML = `
    <div class="front">
      <h1 class="card-text">${frontTextArea.value}</h1>
    </div>
    <div class="back">
      <h1 class="card-text">${backTextArea.value}</h1>
    </div>
  `;
  cardContainer.appendChild(newCard);
  newCard.addEventListener('click', function() {
    newCard.classList.toggle('flipped');
  });
});

deleteCard.addEventListener('click', function() {
  const cardContainer = document.getElementById('card-container');
  const cards = cardContainer.querySelectorAll('.card');
  cards.forEach(function(card) {
    cardContainer.removeChild(card);
  });
});

window.addEventListener('load', function() {
  frontText.innerText = '';
  backText.innerText = '';
});