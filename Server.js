import express from "express";
import BodyParser from "body-parser";
import Endpoints from "./src/constants/Endpoints";
import bayes from "bayes";
import fs from "fs";
import TextItem from "./src/models/TextItem";
import uuidV4 from "uuid/v4";
import http from "http";
import io from "socket.io";
import Constants from './src/constants/Constants'
import SocketEvents from './src/constants/SocketEvents'

const app = express();
const server = http.createServer(app);
const ioServer = io(server);

app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(BodyParser.json());

let classifications = [];
let textItems = [];

try {
    let data = fs.readFileSync("conf/data.json", 'utf8');
    let dataObject = JSON.parse(data);
    dataObject.forEach(text => {
         let id = uuidV4();
         let textItem = new TextItem(id, text);
         textItems.push(textItem);
    });
} catch(e) {
    console.log('Error reading conf/data.json file:', e.stack);
    process.exit();
}

app.get(`${Endpoints.CLASSIFICATIONS}/count`, (req, res) => {
    res.send(`${classifications.length}`);
});

app.get(`${Endpoints.TEXTS}/next`, (req, res) => {
    let random = Math.floor(Math.random() * textItems.length);
    res.json(textItems[random]);
});

app.get(`${Endpoints.CLASSIFICATIONS}/export`, (req, res) => {
    let classifier = bayes();
    classifications.forEach(item => {
        classifier.learn(item.textItem.text, item.option);
    });

    let classifierJson = classifier.toJson();

    res.json(JSON.parse(classifierJson));
});

// Endpoint to just dump the raw classification array. This is for fixing a case where a mistake was made.
app.get(`${Endpoints.CLASSIFICATIONS}/export-raw`, (req, res) => {
    res.json(classifications);
});


app.get(Endpoints.CLASSIFICATIONS, (req, res) => {
    res.json(classifications);
});

app.post(Endpoints.CLASSIFICATIONS, (req, res) => {
    let newClassification = req.body;
    classifications.push(newClassification);

    // Remove the item from the array
    let index = textItems.findIndex(item => item.id === newClassification.textItem.id)
    textItems.splice(index, 1);

    // Push updated count to connected client(s)
    ioServer.emit(SocketEvents.UPDATE_COUNT, { count: classifications.length, remaining: textItems.length });

    console.log(`New classification added: ${newClassification.textItem.text}, ${newClassification.option}`);
    res.json(newClassification);
});

// Add WebSocket server for sending the count back
ioServer.on('connection', socket => {
    console.log('WebSocket client connected');

    ioServer.emit(SocketEvents.UPDATE_COUNT, { count: classifications.length, remaining: textItems.length });

    socket.on('disconnect', () => {
        console.log('WebSocket client disconnected');
    })
});

server.listen(Constants.PORT, () => {
    console.log(`Web server started. Listening on http://localhost:${Constants.PORT}`);
});