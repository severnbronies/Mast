class MessageFeed {
    constructor(maxlength) {
        this.messages = new ListView('tmpl/tweet.html');
        this.maxlength = maxlength;
    }

    getName() {
        return 'messagefeed';
    }

    create(container) {
        this.messages.setContainer(container);
    }

    destroy() {
        this.messages.clearContainer();
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
    }
}
