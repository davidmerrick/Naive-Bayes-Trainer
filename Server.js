import express from 'express'
import BodyParser from 'body-parser'
import Endpoints from './src/constants/Endpoints'

const app = express();

app.use(express.static("public"));
app.use(express.static("node_modules/bootstrap/dist"));
app.use(BodyParser.urlencoded({ extended: true }));

app.post(Endpoints.CLASSIFICATIONS, (req, res) => {
    res.send("foo");
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});