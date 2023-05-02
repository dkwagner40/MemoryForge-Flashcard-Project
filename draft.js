// open a connection to the database
const request = indexedDB.open('flashcard_db', 1);

// handle errors when opening the database
request.onerror = function(event) {
  console.log('Error opening database:', event.target.errorCode);
};

// create the object store to store flashcard sets
request.onupgradeneeded = function(event) {
  const db = event.target.result;
  const objectStore = db.createObjectStore('flashcard_sets', { keyPath: 'id' });
  objectStore.createIndex('name', 'name', { unique: true });
};

// add a new flashcard set to the database
function addFlashcardSet(flashcardSet) {
  const transaction = db.transaction(['flashcard_sets'], 'readwrite');
  const objectStore = transaction.objectStore('flashcard_sets');
  const request = objectStore.add(flashcardSet);
  request.onsuccess = function(event) {
    console.log('Flashcard set added to database');
  };
  request.onerror = function(event) {
    console.log('Error adding flashcard set to database:', event.target.errorCode);
  };
}

// get a flashcard set from the database
function getFlashcardSet(id, callback) {
  const transaction = db.transaction(['flashcard_sets'], 'readonly');
  const objectStore = transaction.objectStore('flashcard_sets');
  const request = objectStore.get(id);
  request.onsuccess = function(event) {
    const flashcardSet = event.target.result;
    callback(flashcardSet);
  };
  request.onerror = function(event) {
    console.log('Error getting flashcard set from database:', event.target.errorCode);
  };
}