/**
 * @class Ext.dom.AbstractElement
 * @extend Ext.Base
 * @private
 */
(function() {

var document = window.document,
    trimRe = /^\s+|\s+$/g,
    whitespaceRe = /\s/;

if (!Ext.cache){
    Ext.cache = {};
}

Ext.define('Ext.dom.AbstractElement', {

    inheritableStatics: {

        /**
         * Retrieves Ext.dom.Element objects. {@link Ext#get} is alias for {@link Ext.dom.Element#get}.
         *
         * **This method does not retrieve {@link Ext.Component Component}s.** This method retrieves Ext.dom.Element
         * objects which encapsulate DOM elements. To retrieve a Component by its ID, use {@link Ext.ComponentManager#get}.
         *
         * Uses simple caching to consistently return the same object. Automatically fixes if an object was recreated with
         * the same id via AJAX or DOM.
         *
         * @param {String/HTMLElement/Ext.Element} el The id of the node, a DOM Node or an existing Element.
         * @return {Ext.dom.Element} The Element object (or null if no matching element was found)
         * @static
         * @inheritable
         */
        get: function(el) {
            var me = this,
                El = Ext.dom.Element,
                cache,
                extEl,
                dom,
                id;

            if (!el) {
                return null;
            }

            if (typeof el == "string") { // element id
                if (el == Ext.windowId) {
                    return El.get(window);
                } else if (el == Ext.documentId) {
                    return El.get(document);
                }
                
                cache = Ext.cache[el];
                // This code is here to catch the case where we've got a reference to a document of an iframe
                // It getElementById will fail because it's not part of the document, so if we're skipping
                // GC it means it's a window/document object that isn't the default window/document, which we have
                // already handled above
                if (cache && cache.skipGarbageCollection) {
                    extEl = cache.el;
                    return extEl;
                }
                
                if (!(dom = document.getElementById(el))) {
                    return null;
                }

                if (cache && cache.el) {
                    extEl = cache.el;
                    extEl.dom = dom;
                } else {
                    extEl = new El(dom);
                }
                return extEl;
            } else if (el.tagName) { // dom element
                if (!(id = el.id)) {
                    id = Ext.id(el);
                }
                if (Ext.cache[id] && Ext.cache[id].el) {
                    extEl = Ext.cache[id].el;
                    extEl.dom = el;
                } else {
                    extEl = new El(el);
                }
                return extEl;
            } else if (el instanceof me) {
                if (el != me.docEl && el != me.winEl) {
                    // refresh dom element in case no longer valid,
                    // catch case where it hasn't been appended
                    el.dom = document.getElementById(el.id) || el.dom;
                }
                return el;
            } else if (el.isComposite) {
                return el;
            } else if (Ext.isArray(el)) {
                return me.select(el);
            } else if (el === document) {
                // create a bogus element object representing the document object
                if (!me.docEl) {
                    me.docEl = Ext.Object.chain(El.prototype);
                    me.docEl.dom = document;
                    me.docEl.id = Ext.id(document);
                    me.addToCache(me.docEl);
                }
                return me.docEl;
            } else if (el === window) {
                if (!me.winEl) {
                    me.winEl = Ext.Object.chain(El.prototype);
                    me.winEl.dom = window;
                    me.winEl.id = Ext.id(window);
                    me.addToCache(me.winEl);
                }
                return me.winEl;
            }
            return null;
        },

        addToCache: function(el, id) {
            if (el) {
                id = id || el.id;
                el.$cache = Ext.cache[id] || (Ext.cache[id] = {
                    data: {},
                    events: {}
                });
                
                // Inject the back link from the cache in case the cache entry
                // had already been created by Ext.fly. Ext.fly creates a cache entry with no el link.
                el.$cache.el = el;
            }
            return el;
        },

        // private method for getting and setting element data
        data: function(el, key, value) {
            el = this.get(el);
            if (!el) {
                return null;
            }
            var c = Ext.cache[el.id].data;
            if (!c) {
                c = Ext.cache[el.id].data = {};
            }
            if (arguments.length == 2) {
                return c[key];
            } else {
                return (c[key] = value);
            }
        },

        addMethods: function() {
            this.override.apply(this, arguments);
        },

        /**
         * <p>Returns an array of unique class names based upon the input strings, or string arrays.</p>
         * <p>The number of parameters is unlimited.</p>
         * <p>Example</p><code><pre>
// Add x-invalid and x-mandatory classes, do not duplicate
myElement.dom.className = Ext.core.Element.mergeClsList(this.initialClasses, 'x-invalid x-mandatory');
</pre></code>
         * @param {Mixed} clsList1 A string of class names, or an array of class names.
         * @param {Mixed} clsList2 A string of class names, or an array of class names.
         * @return {Array} An array of strings representing remaining unique, merged class names. If class names were added to the first list, the <code>changed</code> property will be <code>true</code>.
         */
        mergeClsList: function() {
            var clsList, clsHash = {},
                i, length, j, listLength, clsName, result = [],
                changed = false;

            for (i = 0, length = arguments.length; i < length; i++) {
                clsList = arguments[i];
                if (Ext.isString(clsList)) {
                    clsList = clsList.replace(trimRe, '').split(whitespaceRe);
                }
                if (clsList) {
                    for (j = 0, listLength = clsList.length; j < listLength; j++) {
                        clsName = clsList[j];
                        if (!clsHash[clsName]) {
                            if (i) {
                                changed = true;
                            }
                            clsHash[clsName] = true;
                        }
                    }
                }
            }

            for (clsName in clsHash) {
                result.push(clsName);
            }
            result.changed = changed;
            return result;
        },

        /**
         * <p>Returns an array of unique class names deom the first parameter with all class names
         * from the second parameter removed.</p>
         * <p>Example</p><code><pre>
// Remove x-invalid and x-mandatory classes if present.
myElement.dom.className = Ext.core.Element.removeCls(this.initialClasses, 'x-invalid x-mandatory');
</pre></code>
         * @param {Mixed} existingClsList A string of class names, or an array of class names.
         * @param {Mixed} removeClsList A string of class names, or an array of class names to remove from <code>existingClsList</code>.
         * @return {Array} An array of strings representing remaining class names. If class names were removed, the <code>changed</code> property will be <code>true</code>.
         */
        removeCls: function(existingClsList, removeClsList) {
            var clsHash = {},
                i, length, clsName, result = [],
                changed = false;

            if (existingClsList) {
                if (Ext.isString(existingClsList)) {
                    existingClsList = existingClsList.replace(trimRe, '').split(whitespaceRe);
                }
                for (i = 0, length = existingClsList.length; i < length; i++) {
                    clsHash[existingClsList[i]] = true;
                }
            }
            if (removeClsList) {
                if (Ext.isString(removeClsList)) {
                    removeClsList = removeClsList.split(whitespaceRe);
                }
                for (i = 0, length = removeClsList.length; i < length; i++) {
                    clsName = removeClsList[i];
                    if (clsHash[clsName]) {
                        changed = true;
                        delete clsHash[clsName];
                    }
                }
            }
            for (clsName in clsHash) {
                result.push(clsName);
            }
            result.changed = changed;
            return result;
        },

        /**
         * @property
         * Visibility mode constant for use with {@link Ext.dom.Element#setVisibilityMode}. Use visibility to hide element
         * @static
         */
        VISIBILITY: 1,

        /**
         * @property
         * Visibility mode constant for use with {@link Ext.dom.Element#setVisibilityMode}. Use display to hide element
         * @static
         */
        DISPLAY: 2,

        /**
         * @property
         * Visibility mode constant for use with {@link Ext.dom.Element#setVisibilityMode}. Use offsets to hide element
         * @static
         */
        OFFSETS: 3
    },

    constructor: function(element, forceNew) {
        var me = this,
            dom = typeof element == 'string'
                ? document.getElementById(element)
                : element,
            id;

        if (!dom) {
            return null;
        }

        id = dom.id;
        if (!forceNew && id && Ext.cache[id]) {
            // element object already exists
            return Ext.cache[id].el;
        }

        /**
         * @property {HTMLElement} dom
         * The DOM element
         */
        me.dom = dom;

        /**
         * @property {String} id
         * The DOM element ID
         */
        me.id = id || Ext.id(dom);

        me.self.addToCache(me);
    },

    /**
     * Sets the passed attributes as attributes of this element (a style attribute can be a string, object or function)
     * @param {Object} o The object with the attributes
     * @param {Boolean} [useSet=true] false to override the default setAttribute to use expandos.
     * @return {Ext.dom.Element} this
     */
    set: function(o, useSet) {
         var el = this.dom,
             attr,
             value;

         for (attr in o) {
             if (o.hasOwnProperty(attr)) {
                 value = o[attr];
                 if (attr == 'style') {
                     this.applyStyles(value);
                 }
                 else if (attr == 'cls') {
                     el.className = value;
                 }
                 else if (useSet !== false) {
                     if (value === undefined) {
                         el.removeAttribute(attr);
                     } else {
                        el.setAttribute(attr, value);
                     }
                 }
                 else {
                     el[attr] = value;
                 }
             }
         }
         return this;
     },

    /**
     * @property {String} defaultUnit
     * The default unit to append to CSS values where a unit isn't provided.
     */
    defaultUnit: "px",

    /**
     * Returns true if this element matches the passed simple selector (e.g. div.some-class or span:first-child)
     * @param {String} selector The simple selector to test
     * @return {Boolean} True if this element matches the selector, else false
     */
    is: function(simpleSelector) {
        return Ext.DomQuery.is(this.dom, simpleSelector);
    },

    /**
     * Returns the value of the "value" attribute
     * @param {Boolean} asNumber true to parse the value as a number
     * @return {String/Number}
     */
    getValue: function(asNumber) {
        var val = this.dom.value;
        return asNumber ? parseInt(val, 10) : val;
    },

    /**
     * Removes this element's dom reference. Note that event and cache removal is handled at {@link Ext#removeNode
     * Ext.removeNode}
     */
    remove: function() {
        var me = this,
        dom = me.dom;

        if (dom) {
            Ext.removeNode(dom);
            delete me.dom;
        }
    },

    /**
     * Returns true if this element is an ancestor of the passed element
     * @param {HTMLElement/String} el The element to check
     * @return {Boolean} True if this element is an ancestor of el, else false
     */
    contains: function(el) {
        if (!el) {
            return false;
        }

        var me = this,
            dom = el.dom || el;

        // we need el-contains-itself logic here because isAncestor does not do that:
        return (dom === me.dom) || Ext.dom.AbstractElement.isAncestor(me.dom, dom);
    },

    /**
     * Returns the value of an attribute from the element's underlying DOM node.
     * @param {String} name The attribute name
     * @param {String} [namespace] The namespace in which to look for the attribute
     * @return {String} The attribute value
     */
    getAttribute: function(name, ns) {
        var dom = this.dom;
        return dom.getAttributeNS(ns, name) || dom.getAttribute(ns + ":" + name) || dom.getAttribute(name) || dom[name];
    },

    /**
     * Update the innerHTML of this element
     * @param {String} html The new HTML
     * @return {Ext.dom.Element} this
     */
    update: function(html) {
        if (this.dom) {
            this.dom.innerHTML = html;
        }
        return this;
    },


    /**
    * Set the innerHTML of this element
    * @param {String} html The new HTML
    * @return {Ext.Element} this
     */
    setHTML: function(html) {
        if(this.dom) {
            this.dom.innerHTML = html;
        }
        return this;
    },

    /**
     * Returns the innerHTML of an Element or an empty string if the element's
     * dom no longer exists.
     */
    getHTML: function() {
        return this.dom ? this.dom.innerHTML : '';
    },

    /**
     * Hide this element - Uses display mode to determine whether to use "display" or "visibility". See {@link #setVisible}.
     * @param {Boolean/Object} animate (optional) true for the default animation or a standard Element animation config object
     * @return {Ext.Element} this
     */
    hide: function() {
        this.setVisible(false);
        return this;
    },

    /**
     * Show this element - Uses display mode to determine whether to use "display" or "visibility". See {@link #setVisible}.
     * @param {Boolean/Object} animate (optional) true for the default animation or a standard Element animation config object
     * @return {Ext.Element} this
     */
    show: function() {
        this.setVisible(true);
        return this;
    },

    /**
     * Sets the visibility of the element (see details). If the visibilityMode is set to Element.DISPLAY, it will use
     * the display property to hide the element, otherwise it uses visibility. The default is to hide and show using the visibility property.
     * @param {Boolean} visible Whether the element is visible
     * @param {Boolean/Object} animate (optional) True for the default animation, or a standard Element animation config object
     * @return {Ext.Element} this
     */
    setVisible: function(visible, animate) {
        var me = this,
            statics = me.self,
            mode = me.getVisibilityMode(),
            prefix = Ext.baseCSSPrefix;

        switch (mode) {
            case statics.VISIBILITY:
                me.removeCls([prefix + 'hidden-display', prefix + 'hidden-offsets']);
                me[visible ? 'removeCls' : 'addCls'](prefix + 'hidden-visibility');
            break;

            case statics.DISPLAY:
                me.removeCls([prefix + 'hidden-visibility', prefix + 'hidden-offsets']);
                me[visible ? 'removeCls' : 'addCls'](prefix + 'hidden-display');
            break;

            case statics.OFFSETS:
                me.removeCls([prefix + 'hidden-visibility', prefix + 'hidden-display']);
                me[visible ? 'removeCls' : 'addCls'](prefix + 'hidden-offsets');
            break;
        }

        return me;
    },

    getVisibilityMode: function() {
        var data = (this.$cache || this).data,
            mode = data.visibilityMode;

        if (mode === undefined) {
            data.visibilityMode = (mode = this.self.DISPLAY);
        }

        return mode;
    },

    /**
     * Use this to change the visisbiliy mode between {@link #VISIBILITY}, {@link #DISPLAY} or {@link #OFFSETS}.
     */
    setVisibilityMode: function(mode) {
        (this.$cache || this).data.visibilityMode = mode;
        return this;
    }
}, function() {
    var AbstractElement = this,
        validIdRe = /^[a-z0-9_\-]+$/i;

    Ext.getDetachedBody = function () {
        var detachedEl = AbstractElement.detachedBodyEl;

        if (!detachedEl) {
            detachedEl = document.createElement('div');
            AbstractElement.detachedBodyEl = detachedEl = new AbstractElement.Fly(detachedEl);
            detachedEl.isDetachedBody = true;
        }

        return detachedEl;
    };

    Ext.getElementById = function (id) {
        var el = document.getElementById(id),
            detachedBodyEl;

        if (!el && (detachedBodyEl = AbstractElement.detachedBodyEl) && validIdRe.test(id)) {
            el = detachedBodyEl.dom.querySelector('#' + id);
        }

        return el;
    };

    /**
     * @member Ext
     * @method get
     * @inheritdoc Ext.dom.Element#get
     */
    Ext.get = function(el) {
        return Ext.dom.Element.get(el);
    };

    this.addStatics({
        Fly: new Ext.Class({
            extend: AbstractElement,

            constructor: function(dom) {
                this.dom = dom;
            },
            
            attach: function (dom) {
                var me = this;
                me.dom = dom;
                me.id = dom.id;
                return me;
            }
        }),

        _flyweights: {},

        /**
         * Gets the globally shared flyweight Element, with the passed node as the active element. Do not store a reference
         * to this element - the dom node can be overwritten by other code. {@link Ext#fly} is alias for
         * {@link Ext.dom.AbstractElement#fly}.
         *
         * Use this to make one-time references to DOM elements which are not going to be accessed again either by
         * application code, or by Ext's classes. If accessing an element which will be processed regularly, then {@link
         * Ext#get Ext.get} will be more appropriate to take advantage of the caching provided by the Ext.dom.Element
         * class.
         *
         * @param {String/HTMLElement} el The dom node or id
         * @param {String} [named] Allows for creation of named reusable flyweights to prevent conflicts (e.g.
         * internally Ext uses "_global")
         * @return {Ext.dom.Element} The shared Element object (or null if no matching element was found)
         * @static
         */
        fly: function(el, named) {
            var fly = null,
                _flyweights = AbstractElement._flyweights;

            named = named || '_global';

            el = Ext.getDom(el);

            if (el) {
                fly = _flyweights[named] || (_flyweights[named] = new AbstractElement.Fly());
                fly.dom = el;
                fly.data = {};
            }
            return fly;
        }
    });

    /**
     * @member Ext
     * @method fly
     * @inheritdoc Ext.dom.AbstractElement#fly
     */
    Ext.fly = function() {
        return AbstractElement.fly.apply(AbstractElement, arguments);
    };

    (function (proto) {
        /**
         * @method destroy
         * @member Ext.dom.AbstractElement
         * @inheritdoc Ext.dom.AbstractElement#remove
         * Alias to {@link #remove}.
         */
        proto.destroy = proto.remove;

        /**
         * Returns a child element of this element given its `id`.
         * @method getById
         * @member Ext.dom.AbstractElement
         * @param {String} id The id of the desired child element.
         * @param {Boolean} [asDom=false] True to return the DOM element, false to return a
         * wrapped Element object.
         */
        if (document.querySelector) {
            proto.getById = function (id, asDom) {
                // for normal elements getElementById is the best solution, but if the el is
                // not part of the document.body, we have to resort to querySelector
                var dom = document.getElementById(id) ||
                          (validIdRe.test(id) ? this.dom.querySelector('#'+id) : null);
                return asDom ? dom : (dom ? Ext.get(dom) : null);
            };
        } else {
            proto.getById = function (id, asDom) {
                var dom = document.getElementById(id);
                return asDom ? dom : (dom ? Ext.get(dom) : null);
            };
        }
    })(this.prototype);
});

})();
