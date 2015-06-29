describe('Markalytics w/o GA', function () {
    it('initializes without errors', function () {
        expect(markalytics).toEqual(jasmine.any(Object));
    });

    it('has default config', function () {
        expect(markalytics.options).toEqual(jasmine.any(Object));

        expect(markalytics.options.gaParent).toEqual(jasmine.any(Object));
        expect(markalytics.options.gaName).toEqual(jasmine.any(String));
        expect(markalytics.options.gaTrackerName).toEqual(jasmine.any(String));
    });

    it('attaches blur listeners', function () {
        spyOn(console, 'warn');

        var e = document.createEvent('Event');
        e.initEvent('blur', true, true);

        document.querySelector('#blur-test').dispatchEvent(e);

        expect(console.warn).toHaveBeenCalled();
    });

    it('attaches click listeners', function () {
        spyOn(console, 'warn');

        var e = document.createEvent('MouseEvent');
        e.initMouseEvent('click', true, true);

        document.querySelector('#click-test').dispatchEvent(e);

        expect(console.warn).toHaveBeenCalled();
    });

    it('attaches focus listeners', function () {
        spyOn(console, 'warn');

        var e = document.createEvent('Event');
        e.initEvent('focus', true, true);

        document.querySelector('#focus-test').dispatchEvent(e);

        expect(console.warn).toHaveBeenCalled();
    });

    it('attaches mouseenter listeners', function () {
        spyOn(console, 'warn');

        var e = document.createEvent('MouseEvent');
        e.initMouseEvent('mouseenter', true, true);

        document.querySelector('#mouseenter-test').dispatchEvent(e);

        expect(console.warn).toHaveBeenCalled();
    });

    it('attaches mouseleave listeners', function () {
        spyOn(console, 'warn');

        var e = document.createEvent('MouseEvent');
        e.initMouseEvent('mouseleave', true, true);

        document.querySelector('#mouseleave-test').dispatchEvent(e);

        expect(console.warn).toHaveBeenCalled();
    });
});
