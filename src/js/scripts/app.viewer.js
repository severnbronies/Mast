class Viewer {
    constructor() {
        this.url = null;
        this.$container = null;
    }

    getName() {
        return 'viewer';
    }

    create(container) {
        // TODO Created nested iFrame inside container to ease switching between
        // youtube, generic content and whatever else we invent in the future.
        this.$container = container;
        if(this.url !== null) {
            this.$container.attr('src', this.url);
        }
    }

    destroy() {
        this.$container = null;
    }

    onData(command, data) {
        switch(command) {
            case 'url':
            this.url = data;
            if(this.$container !== null) {
                console.log('Setting url='+this.url);
                this.$container.attr('src', this.url);
            }
            break;
        }
    }
}
