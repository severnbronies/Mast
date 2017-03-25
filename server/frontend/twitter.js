var Twitter = require("twitter");

class TwitterFront {
    constructor(settings, messageFeed) {
        this.twitter = new Twitter({
            consumer_key: settings.twitterConsumerKey,
            consumer_secret: settings.twitterConsumerSecret,
            access_token_key: settings.twitterAccessKey,
            access_token_secret: settings.twitterAccessSecret
        });
        this.twitterSearchArchive = settings.twitterSearchArchive;
        this.twitterSearchLive = settings.twitterSearchLive;
        this.twitterId = settings.twitterId;
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
