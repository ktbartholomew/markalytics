var Markalytics = function () {
    var DOCUMENT_EVENTS = [
        'blur',
        'click',
        'focus',
        'mouseover',
        'mouseleave',
        'scroll'
    ];

    this.options = {
        gaParent: window, // Google's default
        gaName: 'ga', // Google's default
        gaTrackerName: 't0' // Google's default
    };

    DOCUMENT_EVENTS.forEach((function (event, index, scope) {
        document.addEventListener(event, this.handleEvent.bind(this));
    }).bind(this));
};

Markalytics.prototype.configure = function (options) {
    for(var prop in options) {
        if(!options.hasOwnProperty(prop)) {
            return;
        }

        this.options[prop] = options[prop];
    }
};

Markalytics.prototype.sendBeacon = function (data, callback) {
    callback = callback || function () {};
    data = data || {};

    if(!data.hitType) {
        throw 'data.hitType is required to send GA Beacons';
    }

    var ga = this.options.gaParent[this.options.gaName];
    var sendCommand = this.options.gaTrackerName + '.send';

    ga(sendCommand, data.hitType, data);
};

Markalytics.prototype.handleEvent = function (event) {
    if(event.target instanceof HTMLElement === false) {
        return;
    }
    if(! event.target.hasAttribute('data-ga-' + event.type.toLowerCase())) {
        return;
    }

    this.sendBeacon(this.processAttributes(event));
};

Markalytics.prototype.processAttributes = function (event) {
    var hitType, hitCallback, beaconData;

    if(event.target.hasAttribute('href') && event.type.toLowerCase() === 'click') {
        event.preventDefault();
        hitCallback = function () {
            // mimic the behavior that clicking the href would have had before
            // we stepped in.

            // window.location = event.target.getAttribute('href');
        };
    }

    hitType = event.target.getAttribute('data-ga-' + event.type.toLowerCase());
    hitCallback = hitCallback || function () {};


    if(hitType === 'event') {
        beaconData = {
            hitType: 'event',
            hitCallback: hitCallback,
            eventCategory: event.target.getAttribute('data-category'),
            eventLabel: event.target.getAttribute('data-label'),
            eventAction: event.target.getAttribute('data-action'),
            eventValue: event.target.getAttribute('data-value')
        };
    }

    console.log(beaconData);

    return beaconData;
};

// Markalytics.prototype.handleScroll = function (event) {
//     console.log(event.target);
// };
var markalytics = Object.create(Markalytics.prototype);

Markalytics.call(markalytics);
