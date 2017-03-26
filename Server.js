import express from 'express'
import BodyParser from 'body-parser'
import Endpoints from './src/constants/Endpoints'
import Classification from './src/models/Classification'
import bayes from 'bayes'
import fs from 'fs'
import TextItem from './src/models/TextItem'
import uuidV4 from 'uuid/v4'

const app = express();

app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(BodyParser.urlencoded({ extended: true }));


// Todo: generate an ID for each item. Send that ID over the wire to reduce bandwidth instead of the text.

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
        classifier.learn(item.tweetText, item.option);
    });

    let classifierJson = classifier.toJson();

    res.json(JSON.parse(classifierJson));
});

app.get(Endpoints.CLASSIFICATIONS, (req, res) => {
    res.json(classifications);
});

app.post(Endpoints.CLASSIFICATIONS, (req, res) => {
    let tweetText = req.body.tweetText;
    let option = req.body.option;

    let newClassification = new Classification(tweetText, option);
    classifications.push(newClassification);

    res.json(newClassification);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});