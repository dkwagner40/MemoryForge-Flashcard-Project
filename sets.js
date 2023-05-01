const cardList = document.getElementById('card-list');

cards.forEach(function(card) {
  const newCard = document.createElement('li');
  newCard.innerHTML = `
    <div class="card">
      <div class="front">
        <h3>${card.front}</h3>
      </div>
      <div class="back">
        <h3>${card.back}</h3>
      </div>
    </div>
  `;
  cardList.appendChild(newCard);
  newCard.addEventListener('click', function() {
    newCard.classList.toggle('flipped');
  });
});