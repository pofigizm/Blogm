const express = require('express');
const path = require('path');
const fs = require('fs');
var bodyParser = require('body-parser');

const app = express();
const port = 5000;



console.log(`Server has ${port} port.`);

app.use(express.static(path.join(__dirname, 'react-in-node', 'build')));

app.use (function (req, res, next) {
    res.header('Content-Type', 'application/json');
    res.header ('Access-Control-Allow-Origin', '*');
    res.header ('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'react-in-node','build', 'index.html'));
});

app.get('/:id', function(req, res) {
    res.sendFile(path.join(__dirname, 'react-in-node','build', 'index.html'));
});

app.get('/api/:id', function(req, res) {
    const id = req.params.id;

    if (id === 'defpag121') {
        fs.readdir(__dirname + '/json/pages/', (err, files) => {
            const result = JSON.stringify({
                files: files.map(file => file.split('.')[0])
            })
            res.send(result);
        })
    } else {
        fs.exists(__dirname + '/json/pages/' + id + '.json', (exist) => {
            if (!exist) {
                res.sendFile(__dirname + '/json/error.json');
                return;
            }

            res.sendFile(__dirname + '/json/pages/' + id + '.json');
        })
    }
});

app.post('/api/add', function(req, res) {
    var namefile = __dirname + '/json/pages/' + req.body.id + '.json'
    var json = JSON.stringify(req.body)
    fs.writeFile(namefile, json)
});

app.post('/api/delete', function(req, res) {
    var namefile = __dirname + '/json/pages/' + req.body.delete + '.json'
    fs.unlink(namefile)
});

app.listen(port);
