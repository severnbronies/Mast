class Schedule {
    constructor(maxlength) {
        this.events = new ListView('tmpl/schevent.html');
        this.maxlength = maxlength;
    }

    getName() {
        return 'schedule';
    }

    create(container) {
        this.events.setContainer(container);
    }

    destroy() {
        this.events.clearContainer();
    }

    onData(command, data) {
        switch(command) {
            case 'events':
            this.events.updateAll(data.slice(-this.maxlength));
            break;
            case 'event':
            this.events.push(data);
            while(this.events.length > this.maxlength) {
                this.events.shift();
            }
            break;
        }
    }
}
