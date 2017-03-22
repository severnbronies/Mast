class UI {
    constructor(appManager) {
        this.apps = appManager;
        this.widescreen = false;
        this.bindEvents();
    }

    getName() {
        return 'ui';
    }

    onData(command, data) {
        switch(command) {
            default:
            break;
        }
    }

    bindEvents() {
        $(window).on('load', () => {
            this.createAppUIs();
            //this.timeAgoClock();
        }).on('load resize', () => {
            this.resolution();
            //this.positionTweetstream();
            //this.positionSchedule();
        });
    }

    createAppUIs() {
        this.apps.getApp('messagefeed').create($('#tweetstream'));
    }

    resolution() {
        if(window.matchMedia(
            "only screen and (min-aspect-ratio: 13/9)"
        ).matches) {
            $('body').addClass('widescreen');
            this.widescreen = true;
        } else {
            $('body').removeClass('widescreen');
            this.widescreen = false;
        }
    }
}

apps.add(new UI(apps));
