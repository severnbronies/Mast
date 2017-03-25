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
            this.timeAgoClock();
        }).on('load resize', () => {
            this.resolution();
            //this.positionTweetstream();
            //this.positionSchedule();
        });
    }

    createAppUIs() {
        this.apps.getApp('messagefeed').create($('#tweetstream'));
        this.apps.getApp('viewer').create($('#viewer'));
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

    timeAgoClock() {
        setInterval(() => {
            $.timeago.settings.allowFuture = true;
            $.timeago.settings.strings = {
                prefixAgo: null,
                prefixFromNow: null,
                suffixAgo: "",
                suffixFromNow: "",
                seconds: "1m",
                minute: "1m",
                minutes: "%dm",
                hour: "1h",
                hours: "%dh",
                day: "1d",
                days: "%dd",
                month: "1mo",
                months: "%dmo",
                year: "1yr",
                years: "%dyr",
                wordSeparator: " ",
                numbers: []
            };
            $('time[datetime]').timeago();
        }, 250);
    }
}
