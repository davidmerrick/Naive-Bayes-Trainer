Provides a UI for training a naive Bayes classifier on a set of text items. 

Takes a list of items to classify, options by which to classify them, and presents the user with a UI for classifying.

When the user is done, they can export their classifier settings to JSON.

# Usage

1. Install dependencies with 'npm install'.
2. Put your JSON array of data to classify in conf/data.json. There is a set of Trump Tweets there as an example.
3. In src/Constants, replace the OPTIONS object with the categories for classification. 
4. Run the app with 'npm start'.
5. In your browser, visit http://localhost:3000
6. Classify some text. 
7. Profit!

# Scripts

I included a script for converting Tweets to text items. Invoke it with:
```
npm run convert-tweets -- /path/to/tweets.json
```

![UI screenshot](/img/ui.png)