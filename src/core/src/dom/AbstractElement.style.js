/**
 * @class Ext.dom.AbstractElement
 */
(function(){
    // local style camelizing for speed
    var Element = Ext.dom.AbstractElement,
        view = document.defaultView,
        trimRe = /^\s+|\s+$/g,
        wordsRe = /\w/g,
        spacesRe = /\s+/,
        transparentRe = /^(?:transparent|(?:rgba[(](?:\s*\d+\s*[,]){3}\s*0\s*[)]))$/i,
        hasClassList = Ext.supports.ClassList,

        PADDING = 'padding',
        MARGIN = 'margin',
        BORDER = 'border',
        LEFT_SUFFIX = '-left',
        RIGHT_SUFFIX = '-right',
        TOP_SUFFIX = '-top',
        BOTTOM_SUFFIX = '-bottom',
        WIDTH = '-width',

        supportsTransparentColor = Ext.supports.TransparentColor,

        // special markup used throughout Ext when box wrapping elements
        borders = {l: BORDER + LEFT_SUFFIX + WIDTH, r: BORDER + RIGHT_SUFFIX + WIDTH, t: BORDER + TOP_SUFFIX + WIDTH, b: BORDER + BOTTOM_SUFFIX + WIDTH},
        paddings = {l: PADDING + LEFT_SUFFIX, r: PADDING + RIGHT_SUFFIX, t: PADDING + TOP_SUFFIX, b: PADDING + BOTTOM_SUFFIX},
        margins = {l: MARGIN + LEFT_SUFFIX, r: MARGIN + RIGHT_SUFFIX, t: MARGIN + TOP_SUFFIX, b: MARGIN + BOTTOM_SUFFIX};


    Element.override({

        /**
         * This shared object is keyed by style name (e.g., 'margin-left' or 'marginLeft'). The
         * values are objects with the following properties:
         *
         *  * `name` (String) : The actual name to be presented to the DOM. This is typically the value
         *      returned by {@link #normalize}.
         *  * `get` (Function) : A hook function that will perform the get on this style. These
         *      functions receive "(dom, el)" arguments. The `dom` parameter is the DOM Element
         *      from which to get ths tyle. The `el` argument (may be null) is the Ext.Element.
         *  * `set` (Function) : A hook function that will perform the set on this style. These
         *      functions receive "(dom, value, el)" arguments. The `dom` parameter is the DOM Element
         *      from which to get ths tyle. The `value` parameter is the new value for the style. The
         *      `el` argument (may be null) is the Ext.Element.
         *
         * The `this` pointer is the object that contains `get` or `set`, which means that
         * `this.name` can be accessed if needed. The hook functions are both optional.
         * @private
         */
        styleHooks: {},

        // private
        addStyles: function(sides, styles){
            var totalSize = 0,
                sidesArr = sides.match(wordsRe),
                i = 0,
                len = sidesArr.length,
                side, size;
            for (; i < len; i++) {
                side = sidesArr[i];
                size = side && parseInt(this.getStyle(styles[side]), 10);
                if (size) {
                    totalSize += Math.abs(size);
                }
            }
            return totalSize;
        },

        /**
         * Adds one or more CSS classes to the element. Duplicate classes are automatically filtered out.
         * @param {String/String[]} className The CSS classes to add separated by space, or an array of classes
         * @return {Ext.dom.Element} this
         * @method
         */
        addCls: hasClassList ?
            function (className) {
                //<debug warn>
                if (String(className).indexOf('undefined') > -1) {
                    Ext.Logger.warn("called with an undefined className: " + className);
                }
                //</debug>
                var me = this,
                    dom = me.dom,
                    classList,
                    newCls,
                    i,
                    len,
                    cls;

                if (typeof(className) == 'string') {
                    // split string on spaces to make an array of className
                    className = className.replace(trimRe, '').split(spacesRe);
                }

                // the gain we have here is that we can skip parsing className and use the
                // classList.contains method, so now O(M) not O(M+N)
                if (dom && className && !!(len = className.length)) {
                    if (!dom.className) {
                        dom.className = className.join(' ');
                    } else {
                        classList = dom.classList;
                        for (i = 0; i < len; ++i) {
                            cls = className[i];
                            if (cls) {
                                if (!classList.contains(cls)) {
                                    if (newCls) {
                                        newCls.push(cls);
                                    } else {
                                        newCls = dom.className.replace(trimRe, '');
                                        newCls = newCls ? [newCls, cls] : [cls];
                                    }
                                }
                            }
                        }

                        if (newCls) {
                            dom.className = newCls.join(' '); // write to DOM once
                        }
                    }
                }
                return me;
            } :
            function(className) {
                //<debug warn>
                if (String(className).indexOf('undefined') > -1) {
                    Ext.Logger.warn("called with an undefined className: '" + className + "'");
                }
                //</debug>
                var me = this,
                    dom = me.dom,
                    changed,
                    elClasses;

                if (dom && className && className.length) {
                    elClasses = Ext.Element.mergeClsList(dom.className, className);
                    if (elClasses.changed) {
                        dom.className = elClasses.join(' '); // write to DOM once
                    }
                }
                return me;
            },


        /**
         * Removes one or more CSS classes from the element.
         * @param {String/String[]} className The CSS classes to remove separated by space, or an array of classes
         * @return {Ext.dom.Element} this
         */
        removeCls: function(className) {
            var me = this,
                dom = me.dom,
                len,
                elClasses;

            if (typeof(className) == 'string') {
                // split string on spaces to make an array of className
                className = className.replace(trimRe, '').split(spacesRe);
            }

            if (dom && dom.className && className && !!(len = className.length)) {
                if (len == 1 && hasClassList) {
                    if (className[0]) {
                        dom.classList.remove(className[0]); // one DOM write
                    }
                } else {
                    elClasses = Ext.Element.removeCls(dom.className, className);
                    if (elClasses.changed) {
                        dom.className = elClasses.join(' ');
                    }
                }
            }
            return me;
        },

        /**
         * Adds one or more CSS classes to this element and removes the same class(es) from all siblings.
         * @param {String/String[]} className The CSS class to add, or an array of classes
         * @return {Ext.dom.Element} this
         */
        radioCls: function(className) {
            var cn = this.dom.parentNode.childNodes,
                v;
            className = Ext.isArray(className) ? className: [className];
            for (var i = 0, len = cn.length; i < len; i++) {
                v = cn[i];
                if (v && v.nodeType == 1) {
                    Ext.fly(v, '_internal').removeCls(className);
                }
            };
            return this.addCls(className);
        },

        /**
         * Toggles the specified CSS class on this element (removes it if it already exists, otherwise adds it).
         * @param {String} className The CSS class to toggle
         * @return {Ext.dom.Element} this
         * @method
         */
        toggleCls: hasClassList ?
            function (className) {
                var me = this,
                    dom = me.dom;

                if (dom) {
                    className = className.replace(trimRe, '');
                    if (className) {
                        dom.classList.toggle(className);
                    }
                }

                return me;
            } :
            function(className) {
                var me = this;
                return me.hasCls(className) ? me.removeCls(className) : me.addCls(className);
            },

        /**
         * Checks if the specified CSS class exists on this element's DOM node.
         * @param {String} className The CSS class to check for
         * @return {Boolean} True if the class exists, else false
         * @method
         */
        hasCls: hasClassList ?
            function (className) {
                var dom = this.dom;
                return (dom && className) ? dom.classList.contains(className) : false;
            } :
            function(className) {
                var dom = this.dom;
                return dom ? className && (' '+dom.className+' ').indexOf(' '+className+' ') != -1 : false;
            },

        /**
         * Replaces a CSS class on the element with another.  If the old name does not exist, the new name will simply be added.
         * @param {String} oldClassName The CSS class to replace
         * @param {String} newClassName The replacement CSS class
         * @return {Ext.dom.Element} this
         */
        replaceCls: function(oldClassName, newClassName){
            return this.removeCls(oldClassName).addCls(newClassName);
        },

        /**
         * Checks if the current value of a style is equal to a given value.
         * @param {String} style property whose value is returned.
         * @param {String} value to check against.
         * @return {Boolean} true for when the current value equals the given value.
         */
        isStyle: function(style, val) {
            return this.getStyle(style) == val;
        },

        /**
         * Normalizes currentStyle and computedStyle.
         * @param {String} prop The style property whose value is returned.
         * @return {String} The current value of the style property for this element.
         */
        getStyle: function(prop) {
            var me = this,
                dom = me.dom,
                hook = me.styleHooks[prop],
                cs, result;

            if (dom == document) {
                return null;
            }
            if (!hook) {
                me.styleHooks[prop] = hook = { name: Element.normalize(prop) };
            }
            if (hook.get) {
                return hook.get(dom, me);
            }

            cs = view.getComputedStyle(dom, '');

            // why the dom.style lookup? It is not true that "style == computedStyle" as
            // well as the fact that 0/false are valid answers...
            result = (cs && cs[hook.name]); // || dom.style[hook.name];

            // Webkit returns rgb values for transparent.
            if (!supportsTransparentColor && result == 'rgba(0, 0, 0, 0)') {
                result = 'transparent';
            }
            // TODO - we should use isTransparent to handle this. The above is not a very
            // reliable technique depending on the intent (e.g., rgba(255,0,0,0) is also transparent)

            return result;
        },

        /**
         * Returns true if the value of the given property is visually transparent. This
         * may be due to a 'transparent' style value or an rgba value with 0 in the alpha
         * component.
         * @param {String} prop The style property whose value is to be tested.
         * @return {Boolean} True if the style property is visually transparent.
         */
        isTransparent: function (prop) {
            var value = this.getStyle(prop);
            return value ? transparentRe.test(value) : false;
        },

        /**
         * Wrapper for setting style properties, also takes single object parameter of multiple styles.
         * @param {String/Object} property The style property to be set, or an object of multiple styles.
         * @param {String} [value] The value to apply to the given property, or null if an object was passed.
         * @return {Ext.dom.Element} this
         */
        setStyle: function(prop, value) {
            var me = this,
                dom = me.dom,
                hooks = me.styleHooks,
                style = dom.style,
                name = prop,
                hook;

            // we don't promote the 2-arg form to object-form to avoid the overhead...
            if (typeof name == 'string') {
                hook = hooks[name];
                if (!hook) {
                    hooks[name] = hook = { name: Element.normalize(name) };
                }
                value = (value == null) ? '' : value;
                if (hook.set) {
                    hook.set(dom, value, me);
                } else {
                    style[hook.name] = value;
                }
            } else {
                for (name in prop) {
                    if (prop.hasOwnProperty(name)) {
                        hook = hooks[name];
                        if (!hook) {
                            hooks[name] = hook = { name: Element.normalize(name) };
                        }
                        value = prop[name];
                        value = (value == null) ? '' : value;
                        if (hook.set) {
                            hook.set(dom, value, me);
                        } else {
                            style[hook.name] = value;
                        }
                    }
                }
            }

            return me;
        },

        /**
         * Returns the offset height of the element
         * @param {Boolean} [contentHeight] true to get the height minus borders and padding
         * @return {Number} The element's height
         */
        getHeight: function(contentHeight) {
            var dom = this.dom,
                height = contentHeight ? (dom.clientHeight - this.getPadding("tb")) : dom.offsetHeight;
            return height > 0 ? height: 0;
        },

        /**
         * Returns the offset width of the element
         * @param {Boolean} [contentWidth] true to get the width minus borders and padding
         * @return {Number} The element's width
         */
        getWidth: function(contentWidth) {
            var dom = this.dom,
                width = contentWidth ? (dom.clientWidth - this.getPadding("lr")) : dom.offsetWidth;
            return width > 0 ? width: 0;
        },

        /**
         * Set the width of this Element.
         * @param {Number/String} width The new width. This may be one of:
         *
         * - A Number specifying the new width in this Element's {@link #defaultUnit}s (by default, pixels).
         * - A String used to set the CSS width style. Animation may **not** be used.
         *
         * @param {Boolean/Object} [animate] true for the default animation or a standard Element animation config object
         * @return {Ext.dom.Element} this
         */
        setWidth: function(width) {
            var me = this;
                me.dom.style.width = Element.addUnits(width);
            return me;
        },

        /**
         * Set the height of this Element.
         *
         *     // change the height to 200px and animate with default configuration
         *     Ext.fly('elementId').setHeight(200, true);
         *
         *     // change the height to 150px and animate with a custom configuration
         *     Ext.fly('elId').setHeight(150, {
         *         duration : .5, // animation will have a duration of .5 seconds
         *         // will change the content to "finished"
         *         callback: function(){ this.{@link #update}("finished"); }
         *     });
         *
         * @param {Number/String} height The new height. This may be one of:
         *
         * - A Number specifying the new height in this Element's {@link #defaultUnit}s (by default, pixels.)
         * - A String used to set the CSS height style. Animation may **not** be used.
         *
         * @param {Boolean/Object} [animate] true for the default animation or a standard Element animation config object
         * @return {Ext.dom.Element} this
         */
        setHeight: function(height) {
            var me = this;
                me.dom.style.height = Element.addUnits(height);
            return me;
        },

        /**
         * Gets the width of the border(s) for the specified side(s)
         * @param {String} side Can be t, l, r, b or any combination of those to add multiple values. For example,
         * passing `'lr'` would get the border **l**eft width + the border **r**ight width.
         * @return {Number} The width of the sides passed added together
         */
        getBorderWidth: function(side){
            return this.addStyles(side, borders);
        },

        /**
         * Gets the width of the padding(s) for the specified side(s)
         * @param {String} side Can be t, l, r, b or any combination of those to add multiple values. For example,
         * passing `'lr'` would get the padding **l**eft + the padding **r**ight.
         * @return {Number} The padding of the sides passed added together
         */
        getPadding: function(side){
            return this.addStyles(side, paddings);
        },

        margins : margins,

        /**
         * More flexible version of {@link #setStyle} for setting style properties.
         * @param {String/Object/Function} styles A style specification string, e.g. "width:100px", or object in the form {width:"100px"}, or
         * a function which returns such a specification.
         * @return {Ext.dom.Element} this
         */
        applyStyles: function(styles) {
            if (styles) {
                var i,
                    len,
                    dom = this.dom;

                if (typeof styles == 'function') {
                    styles = styles.call();
                }
                if (typeof styles == 'string') {
                    styles = Ext.util.Format.trim(styles).split(/\s*(?::|;)\s*/);
                    for (i = 0, len = styles.length; i < len;) {
                        dom.style[Element.normalize(styles[i++])] = styles[i++];
                    }
                }
                else if (typeof styles == 'object') {
                    this.setStyle(styles);
                }
            }
        },

        /**
         * Set the size of this Element. If animation is true, both width and height will be animated concurrently.
         * @param {Number/String} width The new width. This may be one of:
         *
         * - A Number specifying the new width in this Element's {@link #defaultUnit}s (by default, pixels).
         * - A String used to set the CSS width style. Animation may **not** be used.
         * - A size object in the format `{width: widthValue, height: heightValue}`.
         *
         * @param {Number/String} height The new height. This may be one of:
         *
         * - A Number specifying the new height in this Element's {@link #defaultUnit}s (by default, pixels).
         * - A String used to set the CSS height style. Animation may **not** be used.
         *
         * @param {Boolean/Object} [animate] true for the default animation or a standard Element animation config object
         * @return {Ext.dom.Element} this
         */
        setSize: function(width, height) {
            var me = this,
                style = me.dom.style;

            if (Ext.isObject(width)) {
                // in case of object from getSize()
                height = width.height;
                width = width.width;
            }

            style.width = Element.addUnits(width);
            style.height = Element.addUnits(height);
            return me;
        },

        /**
         * Returns the dimensions of the element available to lay content out in.
         *
         * If the element (or any ancestor element) has CSS style `display: none`, the dimensions will be zero.
         *
         * Example:
         *
         *     var vpSize = Ext.getBody().getViewSize();
         *
         *     // all Windows created afterwards will have a default value of 90% height and 95% width
         *     Ext.Window.override({
         *         width: vpSize.width * 0.9,
         *         height: vpSize.height * 0.95
         *     });
         *     // To handle window resizing you would have to hook onto onWindowResize.
         *
         * getViewSize utilizes clientHeight/clientWidth which excludes sizing of scrollbars.
         * To obtain the size including scrollbars, use getStyleSize
         *
         * Sizing of the document body is handled at the adapter level which handles special cases for IE and strict modes, etc.
         *
         * @return {Object} Object describing width and height.
         * @return {Number} return.width
         * @return {Number} return.height
         */
        getViewSize: function() {
            var doc = document,
                dom = this.dom;

            if (dom == doc || dom == doc.body) {
                return {
                    width: Element.getViewportWidth(),
                    height: Element.getViewportHeight()
                };
            }
            else {
                return {
                    width: dom.clientWidth,
                    height: dom.clientHeight
                };
            }
        },

        /**
         * Returns the size of the element.
         * @param {Boolean} [contentSize] true to get the width/size minus borders and padding
         * @return {Object} An object containing the element's size:
         * @return {Number} return.width
         * @return {Number} return.height
         */
        getSize: function(contentSize) {
            var dom = this.dom;
            return {
                width: Math.max(0, contentSize ? (dom.clientWidth - this.getPadding("lr")) : dom.offsetWidth),
                height: Math.max(0, contentSize ? (dom.clientHeight - this.getPadding("tb")) : dom.offsetHeight)
            };
        },

        /**
         * Forces the browser to repaint this element
         * @return {Ext.dom.Element} this
         */
        repaint: function(){
            var dom = this.dom;
            this.addCls(Ext.baseCSSPrefix + 'repaint');
            setTimeout(function(){
                Ext.fly(dom).removeCls(Ext.baseCSSPrefix + 'repaint');
            }, 1);
            return this;
        },

        /**
         * Returns an object with properties top, left, right and bottom representing the margins of this element unless sides is passed,
         * then it returns the calculated width of the sides (see getPadding)
         * @param {String} [sides] Any combination of l, r, t, b to get the sum of those sides
         * @return {Object/Number}
         */
        getMargin: function(side){
            var me = this,
                hash = {t:"top", l:"left", r:"right", b: "bottom"},
                o = {},
                key;

            if (!side) {
                for (key in me.margins){
                    o[hash[key]] = parseFloat(me.getStyle(me.margins[key])) || 0;
                }
                return o;
            } else {
                return me.addStyles.call(me, side, me.margins);
            }
        },

        /**
         * Puts a mask over this element to disable user interaction. Requires core.css.
         * This method can only be applied to elements which accept child nodes.
         * @param {String} [msg] A message to display in the mask
         * @param {String} [msgCls] A css class to apply to the msg element
         */
        mask: function(msg, msgCls, transparent) {
            var me = this,
                dom = me.dom,
                el = Ext.Element.data(dom, 'mask'),
                mask,
                size,
                cls = '',
                prefix = Ext.baseCSSPrefix;

            me.addCls(prefix + 'masked');
            if (me.getStyle("position") == "static") {
                me.addCls(prefix + 'masked-relative');
            }
            if (el) {
                el.remove();
            }
            if (Ext.isString(msgCls) && !Ext.isEmpty(msgCls)) {
                cls = ' ' + msgCls;
            }
            else {
                if (msgCls) {
                    cls = ' ' + prefix + 'mask-gray';
                }
            }

            mask = me.createChild({
                cls: prefix + 'mask' + ((transparent !== false) ? '' : (' ' + prefix + 'mask-gray')),
                html: msg ? ('<div class="' + (msgCls || (prefix + 'mask-message')) + '">' + msg + '</div>') : ''
            });

            size = me.getSize();

            Ext.Element.data(dom, 'mask', mask);

            if (dom === document.body) {
                size.height = window.innerHeight;
                if (me.orientationHandler) {
                    Ext.EventManager.unOrientationChange(me.orientationHandler, me);
                }

                me.orientationHandler = function() {
                    size = me.getSize();
                    size.height = window.innerHeight;
                    mask.setSize(size);
                };

                Ext.EventManager.onOrientationChange(me.orientationHandler, me);
            }
            mask.setSize(size);
            if (Ext.is.iPad) {
                Ext.repaint();
            }
        },

        /**
         * Removes a previously applied mask.
         */
        unmask: function() {
            var me = this,
                dom = me.dom,
                mask = Ext.Element.data(dom, 'mask'),
                prefix = Ext.baseCSSPrefix;

            if (mask) {
                mask.remove();
                Ext.Element.data(dom, 'mask', undefined);
            }
            me.removeCls([prefix + 'masked', prefix + 'masked-relative']);

            if (dom === document.body) {
                Ext.EventManager.unOrientationChange(me.orientationHandler, me);
                delete me.orientationHandler;
            }
        }
    });

    /**
     * Creates mappings for 'margin-before' to 'marginLeft' (etc.) given the output
     * map and an ordering pair (e.g., ['left', 'right']). The ordering pair is in
     * before/after order.
     */
    Element.populateStyleMap = function (map, order) {
        var baseStyles = ['margin-', 'padding-', 'border-width-'],
            beforeAfter = ['before', 'after'],
            index, style, name, i;

        for (index = baseStyles.length; index--; ) {
            for (i = 2; i--; ) {
                style = baseStyles[index] + beforeAfter[i]; // margin-before
                // ex: maps margin-before and marginBefore to marginLeft
                map[Element.normalize(style)] = map[style] = {
                    name: Element.normalize(baseStyles[index] + order[i])
                };
            }
        }
    };
})();

Ext.onReady(function () {
    var view = document.defaultView,
        Element = Ext.dom.AbstractElement,
        supports = Ext.supports;

    function fixRightMargin (dom) {
        var cs = view.getComputedStyle(dom, ''),
            result = cs ? cs.marginRight : null,
            style, display;

        // Ignore cases when the margin is correctly reported as 0, the bug only shows
        // numbers larger.
        if (result != '0px') {
            style = dom.style;
            display = style.display;
            style.display = 'inline-block';
            result = view.getComputedStyle(dom, null).marginRight;
            style.display = display;
        }

        return result;
    }

    function fixRightMarginAndInputFocus (dom) {
        var cs = view.getComputedStyle(dom, ''),
            result = cs ? cs.marginRight : null,
            style, cleaner, display;

        if (result != '0px') {
            style = dom.style;
            cleaner = Element.getRightMarginFixCleaner(dom);
            display = style.display;
            style.display = 'inline-block';
            result = view.getComputedStyle(dom, '').marginRight;
            style.display = display;
            cleaner();
        }

        return result;
    }

    var styleHooks = Element.prototype.styleHooks;

    // Populate the LTR flavors of margin-before et.al. (see Ext.rtl.AbstractElement):
    Element.populateStyleMap(styleHooks, ['left', 'right']);

    // Ext.supports needs to be initialized (we run very early in the onready sequence),
    // but it is OK to call Ext.supports.init() more times than necessary...
    if (supports.init) {
        supports.init();
    }

    // Fix bug caused by this: https://bugs.webkit.org/show_bug.cgi?id=13343
    if (!supports.RightMargin) {
        styleHooks['margin-right'] = styleHooks.marginRight = {
            name: 'marginRight',
            // TODO - Touch should use conditional compilation here or ensure that the
            //      underlying Ext.supports flags are set correctly...
            get: (supports.DisplayChangeInputSelectionBug || supports.DisplayChangeTextAreaSelectionBug) ?
                    fixRightMarginAndInputFocus : fixRightMargin
        };
    }
});
