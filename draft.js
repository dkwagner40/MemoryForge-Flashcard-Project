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

            res.send(node);
            client.close();
        });
    });
});

app.listen(3000, function() {
    console.log('App listening on port 3000!');
});
