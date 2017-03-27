class StreamUI {
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
            this.timeAgoClock();
        }).on('load resize', () => {
            this.resolution();
            this.positionMessageFeed();
            this.positionSchedule();
        });
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

    positionMessageFeed() {
        let positionBottom = 0,
            elementHeight = $(window).innerHeight() - $('.viewer').outerHeight();
        if(!this.widescreen) {
            positionBottom = $('.schedule').outerHeight();
            elementHeight = $(window).innerHeight() - $('.viewer').outerHeight() - positionBottom;
        }
        $('.tweetstream').css({ 'height': elementHeight, 'bottom': positionBottom });
    }

    positionSchedule() {
        let elementHeight = '';
        let listHeight = '';
        if(this.widescreen) {
            elementHeight = $(window).innerHeight() - $('.tweetstream').outerHeight();
            listHeight = elementHeight - $('.schedule__title').outerHeight();
        }
        $('.schedule').css({ 'height': elementHeight });
        $('.schedule__list').css({ 'height': listHeight });
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
