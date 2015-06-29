describe('Markalytics w/ GTM', function () {
    it('can identify the GA object', function (callback) {
        setTimeout(function () {
            expect(markalytics.options.gaParent[markalytics.options.gaName])
                .toEqual(jasmine.any(Function));

            callback();
        }, 600);
    });

    it('can identify the GTM-named tracker', function () {
        expect(markalytics.options.gaTrackerName)
            .toEqual(jasmine.stringMatching(/^gtm[0-9]+$/));
    });

    it('can send properly-formatted events', function () {
        var gaSpy = spyOn(markalytics.options.gaParent, markalytics.options.gaName);

        var trackerCommand = markalytics.options.gaTrackerName + '.send';
        var hitType = 'event';
        var hitArgs = jasmine.objectContaining({
            hitType: 'event',
            hitCallback: jasmine.any(Function),
            eventCategory: jasmine.any(String),
            eventLabel: jasmine.any(String),
            eventAction: jasmine.any(String)
        });

        var e = document.createEvent('MouseEvent');
        e.initMouseEvent('click', true, true);

        document.querySelector('#click-test').dispatchEvent(e);
        expect(gaSpy).toHaveBeenCalledWith(trackerCommand, hitType, hitArgs);
    });
});
