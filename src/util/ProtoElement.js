/**
 * Manages certain element-like data prior to rendering. These values are passed
 * on to the render process. This is currently used to manage the "class" and "style" attributes
 * of a component's primary el as well as the bodyEl of panels. This allows things like
 * addBodyCls in Panel to share logic with addCls in AbstractComponent.
 * @private
 */
Ext.define('Ext.util.ProtoElement', function () {
    var splitWords = Ext.String.splitWords,
        toMap = Ext.Array.toMap;

    return {
        /**
         * The property name for the className on the data object passed to {@link #writeTo}.
         */
        clsProp: 'cls',

        /**
         * The property name for the style on the data object passed to {@link #writeTo}.
         */
        styleProp: 'style',

        /**
         * True if the style must be converted to text during {@link #writeTo}. When used to
         * populate tpl data, this will be true. When used to populate {@link Ext.DomHelper}
         * specs, this will be false (the default).
         */
        styleIsText: false,

        constructor: function (config) {
            var me = this;

            Ext.apply(me, config);

            me.classList = splitWords(me.cls);
            me.classMap = toMap(me.classList);

            if (Ext.isFunction(me.style)) {
                me.styleFn = me.style;
                delete me.style;
            } else if (typeof me.style == 'string') {
                me.style = Ext.Element.parseStyles(me.style);
            } else if (me.style) {
                me.style = Ext.apply({}, me.style); // don't edit the given object
            }

            delete me.cls;
        },

        /**
         * Adds class to the element.
         * @param {String} cls One or more classnames separated with spaces.
         * @return {Ext.util.ProtoElement} this
         */
        addCls: function (cls) {
            var me = this,
                add = splitWords(cls),
                length = add.length,
                list = me.classList,
                map = me.classMap,
                i, c;

            for (i = 0; i < length; ++i) {
                c = add[i];
                if (!map[c]) {
                    map[c] = true;
                    list.push(c);
                }
            }

            return me;
        },

        /**
         * True if the element has given class.
         * @param {String} cls
         * @return {Boolean}
         */
        hasCls: function (cls) {
            return cls in this.classMap;
        },

        /**
         * Removes class from the element.
         * @param {String} cls One or more classnames separated with spaces.
         * @return {Ext.util.ProtoElement} this
         */
        removeCls: function (cls) {
            var me = this,
                list = me.classList,
                newList = (me.classList = []),
                remove = toMap(splitWords(cls)),
                length = list.length,
                map = me.classMap,
                i, c;

            for (i = 0; i < length; ++i) {
                c = list[i];
                if (remove[c]) {
                    delete map[c];
                } else {
                    newList.push(c);
                }
            }

            return me;
        },

        /**
         * Adds styles to the element.
         * @param {String/Object} prop The style property to be set, or an object of multiple styles.
         * @param {String} [value] The value to apply to the given property.
         * @return {Ext.util.ProtoElement} this
         */
        setStyle: function (prop, value) {
            var me = this,
                style = me.style || (me.style = {});

            if (typeof prop == 'string') {
                if (arguments.length === 1) {
                    me.setStyle(Ext.Element.parseStyles(prop));
                } else {
                    style[prop] = value;
                }
            } else {
                Ext.apply(style, prop);
            }

            return me;
        },

        /**
         * Writes style and class properties to given object.
         * Styles will be written to #styleProp and class names to #clsProp.
         * @param {Object} to
         * @return {Object} to
         */
        writeTo: function (to) {
            var me = this,
                style;

            if (me.styleFn) {
                style = Ext.apply({}, me.styleFn());
                Ext.apply(style, me.style);
            } else {
                style = me.style;
            }

            to[me.clsProp] = me.classList.join(' ');

            if (style) {
                to[me.styleProp] = me.styleIsText ? Ext.DomHelper.generateStyles(style) : style;
            }

            return to;
        }
    };
}());
