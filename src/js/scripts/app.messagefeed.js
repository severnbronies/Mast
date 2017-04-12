class MessageFeed {
    constructor(container, maxlength) {
        this.messages = new ListView('tweet.njk');
        this.messages.setContainer(container);
        this.maxlength = maxlength;
    }

    getName() {
        return 'messagefeed';
    }

    onData(command, data) {
        switch(command) {
            case 'messages':
            data.reverse();
            this.messages.updateAll(data.slice(0, this.maxlength));
            break;
            case 'message':
            this.messages.unshift(data);
            while(this.messages.length > this.maxlength) {
                this.messages.pop();
            }
            break;
        }
        $('time[datetime]').timeago();
    }
}
