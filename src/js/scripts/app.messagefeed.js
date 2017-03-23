class MessageFeed {
    constructor() {
        this.messages = [];
        this.$container = null;
    }

    getName() {
        return 'messagefeed';
    }

    create(container) {
        this.$container = container;
        this.messages.forEach((message) => {
            this.addMessage(message);
        });
        this.trimMessageStream();
    }

    destroy() {
        this.$container.empty();
        this.$container = null;
    }

    onData(command, data) {
        switch(command) {
            case 'messages':
            this.messages = data;
            if(this.$container !== null) {
                this.messages.forEach((message) => {
                    this.renderMessage(message);
                });
                this.trimMessageStream();
            }
            break;
            case 'message':
            this.messages.push(data);
            if(this.$container !== null) {
                this.renderMessage(data);
                this.trimMessageStream();
            }
            break;
        }
    }

    renderMessage(message) {
        // TODO switch on message.type to get correct template
        $.get('tmpl/tweet.html', (template) => {
            let renderHtml = Mustache.render(template, message);
            this.$container.addClass('tweetstream--new');
            this.$container.prepend(renderHtml);
            setTimeout(() => { this.$container.removeClass('tweetstream--new'); }, 100);
        });
    }

    trimMessageStream() {
        const limit = 10;
        if(this.$container.children().length > limit) {
            this.$container.children().filter(
                `:nth-child(n+${limit + 1})`).remove();
        }
        if (this.messages.length > limit) {
            this.messages = this.messages.slice(-limit);
        }
    }
}
