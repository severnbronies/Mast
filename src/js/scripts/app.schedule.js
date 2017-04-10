class Schedule {
    constructor(container, maxlength) {
        this.events = new ListView('tmpl/schevent.html');
        this.events.setContainer(container);
        this.maxlength = maxlength;
    }

    getName() {
        return 'schedule';
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
