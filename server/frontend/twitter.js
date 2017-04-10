var Twitter = require("twitter");

class TwitterFront {
    constructor(settings, messageFeed) {
        this.twitter = new Twitter({
            consumer_key: settings.twitter.consumerKey,
            consumer_secret: settings.twitter.consumerSecret,
            access_token_key: settings.twitter.accessKey,
            access_token_secret: settings.twitter.accessSecret
        });
        this.twitterSearchArchive = settings.twitter.searchArchive;
        this.twitterSearchLive = settings.twitter.searchLive;
        this.twitterId = settings.twitter.id;
        this.messageFeed = messageFeed;
    }

    initialize() {
        this.twitter.get("search/tweets", { q: this.twitterSearchArchive}, (error, tweets, response) => {
            if(error) {
                console.log("Twitter REST API returned error:", error);
            }
            tweets = tweets.statuses.reverse();
            tweets.forEach((tweet) => {
                this.sendTweet(tweet);
            });
        });

        this.twitter.stream("statuses/filter", {track: this.twitterSearchLive, follow: this.twitterId}, (stream) => {
            stream.on("data", (tweet) => {
                this.sendTweet(tweet);
            });

            stream.on("error", (error) => {
                console.log("Twitter streaming API returned error:", error);
            });
        });
    }

    sendTweet(tweet) {
        this.messageFeed.newMessage({
            type: 'tweet',
            username: tweet.user.screen_name,
            avatar: tweet.user.profile_image_url,
            timestamp: tweet.created_at,
            message: tweet.text
        });
        console.log("@" + tweet.user.screen_name + ":", tweet.text);
    }
}

module.exports = TwitterFront;
