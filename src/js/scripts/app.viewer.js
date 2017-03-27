class Viewer {
    constructor(container) {
        this.url = null;
        this.$container = container;
    }

    getName() {
        return 'viewer';
    }

    onData(command, data) {
        switch(command) {
            case 'url':
            this.url = data;
            console.log('Setting url='+this.url);
            this.$container.attr('src', this.url);
            break;
        }
    }
}
