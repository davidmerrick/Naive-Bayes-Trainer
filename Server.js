import express from "express";
import BodyParser from "body-parser";
import Endpoints from "./src/constants/Endpoints";
import bayes from "bayes";
import fs from "fs";
import TextItem from "./src/models/TextItem";
import uuidV4 from "uuid/v4";
import http from "http";
import io from "socket.io";
import Constants from "./src/constants/Constants";
import SocketEvents from "./src/constants/SocketEvents";

const app = express();
const server = http.createServer(app);
const ioServer = io(server);

app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(BodyParser.json());


// Todo: Index all texts by ID, for easy lookup.
let texts = [];

try {
    let data = fs.readFileSync("conf/data.json", 'utf8');
    let dataObject = JSON.parse(data);
    dataObject.forEach(text => {
         let id = uuidV4();
         let textItem = new TextItem(id, text);
         texts.push(textItem);
    });
} catch(e) {
    console.log('Error reading conf/data.json file:', e.stack);
    process.exit();
}

function getTrainedClassifier(){
    let classifier = bayes();
    texts
        .filter(item => item.classification != null)
        .forEach(item => {
            classifier.learn(item.text, item.classification);
        });
    return classifier;
}

function getCount(){
    let classifiedLength = texts.filter(item => item.classification != null).length;
    let count = {
        classified: classifiedLength,
        total: texts.length,
        remaining: texts.length - classifiedLength
    }
    return count;
}

app.get(`${Endpoints.TEXTS}/count`, (req, res) => {
    let count = getCount();

    res.json(count);
});

app.get(`${Endpoints.TEXTS}/next`, (req, res) => {
    let nonClassifiedTexts = texts.filter(item => item.classification == null);
    let random = Math.floor(Math.random() * nonClassifiedTexts.length);
    res.json(nonClassifiedTexts[random]);
});

app.get(`${Endpoints.CLASSIFICATIONS}`, (req, res) => {
    let classifier = getTrainedClassifier();
    let classifierJson = classifier.toJson();

    res.json(JSON.parse(classifierJson));
});

app.get(Endpoints.CLASSIFICATIONS, (req, res) => {
    res.json(classifications);
});

app.put(`${Endpoints.TEXTS}/:id`, (req, res) => {
    let id = req.params.id;
    let textItem = req.body;

    let index = texts.findIndex(item => item.id === id);
    texts[index] = textItem;

    // Push updated count to connected client(s)
    let count = getCount();
    ioServer.emit(SocketEvents.UPDATE_COUNT, { count: count.classified, remaining: count.remaining });

    console.log(`New classification added: ${textItem.text}, ${textItem.classification}`);
    res.json(textItem);
});

app.post(`${Endpoints.TEXTS}`, (req, res) => {
    let id = uuidV4();
    let textItem = req.body;
    textItem.id = id;

    texts.push(textItem);

    // Push updated count to connected client(s)
    let count = getCount();
    ioServer.emit(SocketEvents.UPDATE_COUNT, { count: count.classified, remaining: count.remaining });

    console.log(`New classification added: ${textItem.text}, ${textItem.classification}`);
    res.json(textItem);
});

app.post(Endpoints.TEST, (req, res) => {
    let jsonData = req.body;
    let testText = jsonData.text;

    let classifier = getTrainedClassifier();
    let result = classifier.categorize(testText);
    let responseObject = {
        text: testText,
        result: result
    };
    res.send(responseObject);
});

// Always return the main index.html, so react-router render the route in the client
app.get('*', function(req, res) {
    res.sendfile('public/index.html'); // load our public/index.html file
});

// Add WebSocket server for sending the count back
ioServer.on('connection', socket => {
    console.log('WebSocket client connected');

    let count = getCount();
    ioServer.emit(SocketEvents.UPDATE_COUNT, { count: count.classified, remaining: count.remaining });

    socket.on('disconnect', () => {
        console.log('WebSocket client disconnected');
    })
});

server.listen(Constants.PORT, () => {
    console.log(`Web server started. Listening on http://localhost:${Constants.PORT}`);
});