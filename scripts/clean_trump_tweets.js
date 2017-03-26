import fs from 'fs'

const TWEETS_INPUT_DIR = "/Users/davidmerrick/projects/trump-tweet-archive/data/realdonaldtrump";
const TWEETS_FILENAME = "2017.json";

const INPUT_FILE = TWEETS_INPUT_DIR + "/" + TWEETS_FILENAME;
const OUTPUT_FILE = "/Users/davidmerrick/projects/naive-bayes-trainer/conf/data.json";
try {
    let tweetTexts = [];
    let data = fs.readFileSync(INPUT_FILE, 'utf8');
    let dataObject = JSON.parse(data);
    dataObject.forEach(tweet => {
        tweetTexts.push(tweet.text);
    });
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(tweetTexts), 'utf8');
    console.log(`Wrote Tweets to file: ${OUTPUT_FILE}`);
} catch(e) {
    console.log('Error:', e.stack);
}