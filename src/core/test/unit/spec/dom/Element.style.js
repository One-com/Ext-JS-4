describe("Ext.Element.style", function() {
    var testEl;
    
    beforeEach(function() {
        testEl = Ext.getBody().createChild({
            id      : 'ExtElementHelper',
            style   : 'position:absolute;'
        });
    });
    
    afterEach(function() {
        testEl.remove();
    });
    
    describe('addCls', function () {
        xit('should add one class', function () {
            testEl.addCls('foo');
            expect(testEl.dom.className).toEqual('foo');
        });

        it('should add two class', function () {
            testEl.addCls('foo').addCls('bar');
            expect(testEl.dom.className).toEqual('foo bar');
        });

        xit('should add one class when given duplicates', function () {
            testEl.addCls('foo').addCls('foo');
            expect(testEl.dom.className).toEqual('foo');
        });

        xit('should add two class at once', function () {
            testEl.addCls('foo bar').addCls('bar');
            expect(testEl.dom.className).toEqual('foo bar');
        });

        xit('should add two class at once and handle duplicates', function () {
            testEl.addCls('foo bar').addCls('bar foo');
            expect(testEl.dom.className).toEqual('foo bar');
        });
    });

    describe('removeCls', function () {
        it('should remove nothing if no classes', function () {
            testEl.removeCls('bar');
            expect(testEl.dom.className).toEqual('');
        });

        it('should remove nothing if class is not present', function () {
            testEl.dom.className = 'foo bar';
            testEl.removeCls('fbar');
            expect(testEl.dom.className).toEqual('foo bar');
        });

        it('should remove only class', function () {
            testEl.dom.className = 'foo';
            testEl.removeCls('foo');
            expect(testEl.dom.className).toEqual('');
        });

        it('should remove last class', function () {
            testEl.dom.className = 'foo bar';
            testEl.removeCls('bar');
            expect(testEl.dom.className).toEqual('foo');
        });

        it('should remove first class', function () {
            testEl.dom.className = 'foo bar';
            testEl.removeCls('bar');
            expect(testEl.dom.className).toEqual('foo');
        });

        it('should remove middle class', function () {
            testEl.dom.className = 'foo bar jazz';
            testEl.removeCls('bar');
            expect(testEl.dom.className).toEqual('foo jazz');
        });

        it('should remove multiple classes', function () {
            testEl.dom.className = 'foo bar jazz spud';
            testEl.removeCls('jazz bar fff');
            expect(testEl.dom.className).toEqual('foo spud');
        });

        it('should remove multiple classes sequentially', function () {
            testEl.dom.className = 'foo bar jazz spud';
            testEl.removeCls('jazz').removeCls('bar').removeCls('fff');
            expect(testEl.dom.className).toEqual('foo spud');
        });
    })
}, "/src/dom/Element.style.js");
