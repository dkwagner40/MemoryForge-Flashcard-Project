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
  
      const dbName = `node_${card.id}`;
      const db = client.db(dbName);
  
      const collection = db.collection('flashcards');
      collection.insertOne(card, function(err, result) {
        if (err) throw err;
        console.log("Flashcard inserted into database");
      });
    });
  });
  