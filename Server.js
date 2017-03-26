import express from 'express'
import BodyParser from 'body-parser'
import Endpoints from './src/constants/Endpoints'
import Classification from './src/models/Classification'
import bayes from 'bayes'

const app = express();

app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(BodyParser.urlencoded({ extended: true }));

let classifications = [];

app.get(`${Endpoints.CLASSIFICATIONS}/count`, (req, res) => {
    res.send(`${classifications.length}`);
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