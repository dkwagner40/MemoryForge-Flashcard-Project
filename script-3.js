function flip() {
    card.classList.toggle('flipped');
    if (card.classList.contains('flipped')) {
      frontContent.style.display = 'none';
      backContent.style.display = 'block';
    } else {
      frontContent.style.display = 'block';
      backContent.style.display = 'none';
    }
  }
  
  const cardContainer = document.getElementById('card-container');
  const saveButton = document.getElementById('save_card');
  
  saveButton.addEventListener('click', function() {
    cardContainer.removeAttribute('hidden');
  });
  