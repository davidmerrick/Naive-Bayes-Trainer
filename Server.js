import express from 'express'
import BodyParser from 'body-parser'
import Endpoints from './src/constants/Endpoints'
import Classification from './src/models/Classification'

const app = express();

app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(BodyParser.urlencoded({ extended: true }));

app.post(Endpoints.CLASSIFICATIONS, (req, res) => {
    let tweetText = req.body.tweetText;
    let option = req.body.option;

    let myClassification = new Classification(tweetText, option);

    res.json(myClassification);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});