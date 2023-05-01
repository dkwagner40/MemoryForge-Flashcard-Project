const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'myproject';
const collectionName = 'nodes';

app.get('/node/:id', function(req, res) {
    const nodeId = req.params.id;

    MongoClient.connect(url, function(err, client) {
        if (err) {
            console.log(err);
            return;
        }

        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        collection.findOne({ id: nodeId }, function(err, node) {
            if (err) {
                console.log(err);
                return;
            }
    
        // Generate the HTML content for hte node using the data
        const html = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-Wz6HwGztJScL69PjtWFlfSl0tgF7ZbaPzYXc8WFO1zgfB4w4b1U6LntR6DTxRx6vP7S3SPf5l1l6G3OqsdV7mQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script> <!-- Axios library-->
            <link rel="stylesheet" href="styles.css">
            <title>Flashcards</title>
        </head>
        <body>
        
          <main>
            
            <header>
              <div id="header">
                <h1><a href="index.html">MemoryForge</a></h1>
                  <ul>
                    <li><a href="main.html"><button id="return"><i class="fas fa-arrow-left"> Return</i></button></li></a>
                    <li>About</li>
                    <li><a href="sets.html">Sets</a></li>
                  </ul>
              </div>
        
            </header>
        
            <section class="create">
              <div>
                <button id="show_card_box">+</button>
              </div>
              <div>
                <button id="delete_cards">Delete Cards</button>
                <button id="add_to_set">Add to Set</button>
              </div>
            </section>
        
            <section>
              <div class="container">
                <div id="create_card">
                  <h2>Create Flashcard</h2>
                  <label for="front">Front</label>
                  <textarea id="front" maxlength="280"></textarea>
                  <label for="back" maxlength="280">Back</label>
                  <br>
                  <textarea id="back"></textarea>
                  <div>
                    <button id="save_card">Save</button> <button id="close_card_box">Close</button>
                  </div>
                </div>
              </div>
            </section>
        
            <section>
              <div class="card-container" id="card-container" hidden>
                  <div class="card" id="flashcard" hidden>
                    <div class="front" id="front-side" hidden>
                      <h1 id="front-text">Front Side</h1>
                    </div>
                    <div class="back" id="back-side" hidden>
                      <h1 id="back-text">Back Side</h1>
                    </div>
                  </div>
              </div>
            </section>
            <br>
        
          </main>
        
          <script src="script.js"></script>
          <script src="hide.js"></script>
          <script src="sets.js"></script>
          <script src="mongo.js"></script>
        </body>
        </html>
        `;

            res.send(node);
            client.close();
        });
    });
});

app.listen(300, function() {
    console.log('App listening on port 3000!');
});