import express from 'express'

let app = express();

let assets = express.static("public");
app.use(assets);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});