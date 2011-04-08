/**
 * @class Ext.core.Element
 */
Ext.core.Element.addMethods(
    function() {
        var VISIBILITY      = "visibility",
            DISPLAY         = "display",
            HIDDEN          = "hidden",
            NONE            = "none",
            XMASKED         = Ext.baseCSSPrefix + "masked",
            XMASKEDRELATIVE = Ext.baseCSSPrefix + "masked-relative",
            data            = Ext.core.Element.data;

        return {
            /**
             * Checks whether the element is currently visible using both visibility and display properties.
             * @param {Boolean} deep (optional) True to walk the dom and see if parent elements are hidden (defaults to false)
             * @return {Boolean} True if the element is currently visible, else false
             */
            isVisible : function(deep) {
                var vis = !this.isStyle(VISIBILITY, HIDDEN) && !this.isStyle(DISPLAY, NONE),
                    p   = this.dom.parentNode;
                
                if (deep !== true || !vis) {
                    return vis;
                }
                
                while (p && !(/^body/i.test(p.tagName))) {
                    if (!Ext.fly(p, '_isVisible').isVisible()) {
                        return false;
                    }
                    p = p.parentNode;
                }
                return true;
            },

            /**
             * Returns true if display is not "none"
             * @return {Boolean}
             */
            isDisplayed : function() {
                return !this.isStyle(DISPLAY, NONE);
            },

            /**
             * Convenience method for setVisibilityMode(Element.DISPLAY)
             * @param {String} display (optional) What to set display to when visible
             * @return {Ext.core.Element} this
             */
            enableDisplayMode : function(display) {
                this.setVisibilityMode(Ext.core.Element.DISPLAY);
                
                if (!Ext.isEmpty(display)) {
                    data(this.dom, 'originalDisplay', display);
                }
                
                return this;
            },

            /**
             * Puts a mask over this element to disable user interaction. Requires core.css.
             * This method can only be applied to elements which accept child nodes.
             * @param {String} msg (optional) A message to display in the mask
             * @param {String} msgCls (optional) A css class to apply to the msg element
             * @return {Element} The mask element
             */
            mask : function(msg, msgCls) {
                var me  = this,
                    dom = me.dom,
                    dh  = Ext.core.DomHelper,
                    EXTELMASKMSG = Ext.baseCSSPrefix + "mask-msg",
                    el,
                    mask;

                if (!(/^body/i.test(dom.tagName) && me.getStyle('position') == 'static')) {
                    me.addCls(XMASKEDRELATIVE);
                }
                if (el = data(dom, 'maskMsg')) {
                    el.remove();
                }
                if (el = data(dom, 'mask')) {
                    el.remove();
                }

                mask = dh.append(dom, {cls : Ext.baseCSSPrefix + "mask"}, true);
                data(dom, 'mask', mask);

                me.addCls(XMASKED);
                mask.setDisplayed(true);
                
                if (typeof msg == 'string') {
                    var mm = dh.append(dom, {cls : EXTELMASKMSG, cn:{tag:'div'}}, true);
                    data(dom, 'maskMsg', mm);
                    mm.dom.className = msgCls ? EXTELMASKMSG + " " + msgCls : EXTELMASKMSG;
                    mm.dom.firstChild.innerHTML = msg;
                    mm.setDisplayed(true);
                    mm.center(me);
                }
                
                if (!Ext.supports.IncludePaddingInWidthCalculation) {
                    mask.setSize(me.getWidth(), me.getHeight());
                }
                
                // ie will not expand full height automatically
                if (Ext.isIE && !(Ext.isIE7 && Ext.isStrict) && me.getStyle('height') == 'auto') {
                    mask.setSize(undefined, me.getHeight());
                }
                
                return mask;
            },

            /**
             * Removes a previously applied mask.
             */
            unmask : function() {
                var me      = this,
                    dom     = me.dom,
                    mask    = data(dom, 'mask'),
                    maskMsg = data(dom, 'maskMsg');

                if (mask) {
                    if (maskMsg) {
                        maskMsg.remove();
                        data(dom, 'maskMsg', undefined);
                    }
                    
                    mask.remove();
                    data(dom, 'mask', undefined);
                    me.removeCls([XMASKED, XMASKEDRELATIVE]);
                }
            },
            /**
             * Returns true if this element is masked. Also re-centers any displayed message within the mask.
             * @return {Boolean}
             */
            isMasked : function() {
                var me = this,
                    mask = data(me.dom, 'mask'),
                    maskMsg = data(me.dom, 'maskMsg');

                if (mask && mask.isVisible()) {
                    if (maskMsg) {
                        maskMsg.center(me);
                    }
                    return true;
                }
                return false;
            },

            /**
             * Creates an iframe shim for this element to keep selects and other windowed objects from
             * showing through.
             * @return {Ext.core.Element} The new shim element
             */
            createShim : function() {
                var el = document.createElement('iframe'),
                    shim;
                
                el.frameBorder = '0';
                el.className = 'ext-shim';
                el.src = Ext.SSL_SECURE_URL;
                shim = Ext.get(this.dom.parentNode.insertBefore(el, this.dom));
                shim.autoBoxAdjust = false;
                return shim;
            }
        };
    }()
);