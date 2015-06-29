describe('Markalytics w/ GA', function () {
    it('can identify the GA object', function () {
        expect(markalytics.options.gaParent[markalytics.options.gaName])
            .toEqual(jasmine.any(Function));
    });

    it('can correctly identify the GA tracker', function (callback) {
        ga(function (tracker) {
            var index,
            trackers = ga.getAll(),
            trackerNames = [];

            for(index in trackers) {
                trackerNames.push(trackers[index].get('name'));
            }
            expect(trackerNames.indexOf(markalytics.options.gaTrackerName))
                .not.toEqual(-1);
            callback();
        });
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
