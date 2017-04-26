// Script for converting Tweets into textItems for the classifier

import fs from 'fs'

if(process.argv.length < 3){
    console.error("Usage: node convertTweets.js tweetFile.json");
    process.exit(1);
}

const INPUT_FILE = process.argv[2];
const OUTPUT_FILE = "./conf/data.json";
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