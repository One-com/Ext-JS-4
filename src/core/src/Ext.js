/**
 * @class Ext
 * @singleton
 */
(function() {
    var global = this,
        objectPrototype = Object.prototype,
        enumerables = true,
        enumerablesTest = { toString: 1 },
        i;

    if (typeof Ext === 'undefined') {
        global.Ext = {};
    }

    Ext.global = global;

    for (i in enumerablesTest) {
        enumerables = null;
    }

    if (enumerables) {
        enumerables = ['hasOwnProperty', 'valueOf', 'isPrototypeOf', 'propertyIsEnumerable',
                       'toLocaleString', 'toString', 'constructor'];
    }

    /**
     * Put it into Ext namespace so that we can reuse outside this
     * @type Array
     */
    Ext.enumerables = enumerables;

    /**
     * Copies all the properties of config to the specified object.
     * IMPORTANT: Note that it doesn't take care of recursive merging and cloning without referencing the original objects / arrays
     * Use Ext.merge instead if you need that.
     * @param {Object} object The receiver of the properties
     * @param {Object} config The source of the properties
     * @param {Object} defaults A different object that will also be applied for default values
     * @return {Object} returns obj
     */
    Ext.apply = function(object, config, defaults) {
        if (defaults) {
            Ext.apply(object, defaults);
        }

        if (object && config && typeof config === 'object') {
            var i, j, k;

            for (i in config) {
                object[i] = config[i];
            }

            if (enumerables) {
                for (j = enumerables.length; j--;) {
                    k = enumerables[j];
                    if (config.hasOwnProperty(k)) {
                        object[k] = config[k];
                    }
                }
            }
        }

        return object;
    };

    Ext.buildSettings = Ext.apply({
        baseCSSPrefix: 'x-',
        scopeResetCSS: false
    }, Ext.buildSettings || {});

    Ext.apply(Ext, {
        /**
         * A reusable empty function
         */
        emptyFn: function() {},

        baseCSSPrefix: Ext.buildSettings.baseCSSPrefix,

        /**
         * Copies all the properties of config to object if they don't already exist.
         * @function
         * @param {Object} object The receiver of the properties
         * @param {Object} config The source of the properties
         * @return {Object} returns obj
         */
        applyIf: function(object, config) {
            var property;

            if (object) {
                for (property in config) {
                    if (object[property] === undefined) {
                        object[property] = config[property];
                    }
                }
            }

            return object;
        },

        /**
         * Iterates either the elements in an array, or the properties in an object.
         * @param {Object/Array} object The object or array to be iterated
         * @param {Function} fn The function to be called for each iteration.
         * The iteration will stop if the supplied function returns false, or
         * all array elements / object properties have been covered. The signature
         * varies depending on the type of object being interated:
         * <ul>
         * <li>Arrays : <tt>(Object item, Number index, Array allItems)</tt>
         * When iterating an array, the supplied function is called with each item.
         * </li>
         * <li>Objects : <tt>(String key, Object value, Object)</tt>
         * When iterating an object, the supplied function is called with each key-value pair in
         * the object, and the iterated object
         * </li>
         * </ul>
         * @param {Object} scope The scope (<tt>this</tt> reference) in which the specified function is executed. Defaults to
         * the <tt>object</tt> being iterated.
         */
        each: function(obj, fn, scope) {
            if (Ext.isEmpty(obj)) {
                return;
            }

            if (Ext.isIterable(obj)) {
                Ext.Array.each.apply(this, arguments);
            }
            else {
                Ext.Object.each.apply(this, arguments);
            }
        }
    });

    Ext.apply(Ext, {

        /**
         * Since Core version 4 this method is meant to be used internally only. Use {@link Ext#define Ext.define} instead.
         * @function
         * @param {Function} superclass
         * @param {Object} overrides
         * @return {Function} The subclass constructor from the <tt>overrides</tt> parameter, or a generated one if not provided.
         * @deprecated Use {@link Ext#define Ext.define} instead
         */
        extend: function() {
            // inline overrides
            var objectConstructor = objectPrototype.constructor,
                inlineOverrides = function(o) {
                for (var m in o) {
                    if (!o.hasOwnProperty(m)) {
                        continue;
                    }
                    this[m] = o[m];
                }
            };

            return function(subclass, superclass, overrides) {
                // First we check if the user passed in just the superClass with overrides
                if (Ext.isObject(superclass)) {
                    overrides = superclass;
                    superclass = subclass;
                    subclass = overrides.constructor !== objectConstructor ? overrides.constructor : function() {
                        superclass.apply(this, arguments);
                    };
                }

                if (!superclass) {
                    throw "Attempting to extend from a class which has not been loaded on the page.";
                }

                // We create a new temporary class
                var F = function() {},
                    subclassProto, superclassProto = superclass.prototype;

                F.prototype = superclassProto;
                subclassProto = subclass.prototype = new F();
                subclassProto.constructor = subclass;
                subclass.superclass = superclassProto;

                if (superclassProto.constructor === objectConstructor) {
                    superclassProto.constructor = superclass;
                }

                subclass.override = function(overrides) {
                    Ext.override(subclass, overrides);
                };

                subclassProto.override = inlineOverrides;
                subclassProto.proto = subclassProto;

                subclass.override(overrides);
                subclass.extend = function(o) {
                    return Ext.extend(subclass, o);
                };

                return subclass;
            };
        }(),

        /**
         * Proxy to {@link Ext.Base#override}. Please refer {@link Ext.Base#override} for further details.

    Ext.define('My.cool.Class', {
        sayHi: function() {
            alert('Hi!');
        }
    }

    Ext.override(My.cool.Class, {
        sayHi: function() {
            alert('About to say...');

            this.callOverridden();
        }
    });

    var cool = new My.cool.Class();
    cool.sayHi(); // alerts 'About to say...'
                  // alerts 'Hi!'

         * Please note that `this.callOverridden()` only works if the class was created with {@link Ext#define)
         *
         * @param {Object} origclass The class to override
         * @param {Object} overrides The list of functions to add to origClass. This should be specified as an object literal
         * containing one or more methods.
         * @method override
         * @markdown
         */
        override: function(origclass, overrides) {
            if (origclass.prototype.$className) {
                return origclass.override(overrides);
            }
            else {
                Ext.apply(origclass.prototype, overrides);
            }
        }
    });

    /**
     * A full set of static methods to do type checking
     * @ignore
     */
    Ext.apply(Ext, {

        /**
         * Returns true if the passed value is empty. The value is deemed to be empty if it is:
         * <ul>
         * <li>null</li>
         * <li>undefined</li>
         * <li>an empty array</li>
         * <li>a zero length string (Unless the <tt>allowBlank</tt> parameter is <tt>true</tt>)</li>
         * </ul>
         * @param {Mixed} value The value to test
         * @param {Boolean} allowBlank (optional) true to allow empty strings (defaults to false)
         * @return {Boolean}
         */
        isEmpty: function(value, allowBlank) {
            return (value === null) || (value === undefined) || ((Ext.isArray(value) && !value.length)) || (!allowBlank ? value === '' : false);
        },

        /**
         * Returns true if the passed value is a JavaScript Array, false otherwise.
         * @param {Mixed} target The target to test
         * @return {Boolean}
         */
        isArray: function(value) {
            return objectPrototype.toString.apply(value) === '[object Array]';
        },

        /**
         * Returns true if the passed value is a JavaScript Date object, false otherwise.
         * @param {Object} object The object to test
         * @return {Boolean}
         */
        isDate: function(value) {
            return objectPrototype.toString.apply(value) === '[object Date]';
        },

        /**
         * Returns true if the passed value is a JavaScript Object, false otherwise.
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isObject: function(value) {
            return !!value && !value.tagName && objectPrototype.toString.call(value) === '[object Object]';
        },

        /**
         * Returns true if the passed value is a JavaScript 'primitive', a string, number or boolean.
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isPrimitive: function(value) {
            return Ext.isString(value) || Ext.isNumber(value) || Ext.isBoolean(value);
        },

        /**
         * Returns true if the passed value is a JavaScript Function, false otherwise.
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isFunction: function(value) {
            return objectPrototype.toString.apply(value) === '[object Function]';
        },

        /**
         * Returns true if the passed value is a number. Returns false for non-finite numbers.
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isNumber: function(value) {
            return objectPrototype.toString.apply(value) === '[object Number]' && isFinite(value);
        },

        /**
         * Validates that a value is numeric.
         * @param {Mixed} value Examples: 1, '1', '2.34'
         * @return {Boolean} True if numeric, false otherwise
         */
        isNumeric: function(value) {
            return !isNaN(parseFloat(value)) && isFinite(value);
        },

        /**
         * Returns true if the passed value is a string.
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isString: function(value) {
            return typeof value === 'string';
        },

        /**
         * Returns true if the passed value is a boolean.
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isBoolean: function(value) {
            return objectPrototype.toString.apply(value) === '[object Boolean]';
        },

        /**
         * Returns true if the passed value is an HTMLElement
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isElement: function(value) {
            return value ? !! value.tagName : false;
        },

        /**
         * Returns true if the passed value is defined.
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isDefined: function(value) {
            return typeof value !== 'undefined';
        },

        /**
         * Returns true if the passed value is iterable, false otherwise
         * @param {Mixed} value The value to test
         * @return {Boolean}
         */
        isIterable: function(value) {
            if (!value) {
                return false;
            }
            //check for array or arguments
            if (Ext.isArray(value) || value.callee) {
                return true;
            }
            //check for node list type
            if (/NodeList|HTMLCollection/.test(objectPrototype.toString.call(value))) {
                return true;
            }

            //NodeList has an item and length property
            //IXMLDOMNodeList has nextNode method, needs to be checked first.
            return ((typeof value.nextNode !== 'undefined' || value.item) && Ext.isNumber(value.length)) || false;
        }
    });

    Ext.apply(Ext, {

        /**
         * Clone almost any type of variable including array, object, DOM nodes and Date without keeping the old reference
         * @param {Mixed} item The variable to clone
         * @return {Mixed} clone
         */
        clone: function(item) {
            if (!item) {
                return item;
            }

            // DOM nodes
            // TODO proxy this to Ext.Element.clone to handle automatic id attribute changing
            // recursively
            if (item.nodeType && item.cloneNode) {
                return item.cloneNode(true);
            }

            // Date
            if (item instanceof Date) {
                return new Date(item.getTime());
            }

            var i, j, k, clone, key;

            // Array
            if (Ext.isArray(item)) {
                i = item.length;

                clone = new Array(i);

                while (i--) {
                    clone[i] = Ext.clone(item[i]);
                }
            }
            // Object
            else if (Ext.isObject(item) && item.constructor === Object) {
                clone = {};

                for (key in item) {
                    clone[key] = Ext.clone(item[key]);
                }

                if (enumerables) {
                    for (j = enumerables.length; j--;) {
                        k = enumerables[j];
                        clone[k] = item[k];
                    }
                }
            }

            return clone || item;
        },

        /**
         * @private
         * Generate a unique reference of Ext in the global scope, useful for sandboxing
         */
        getUniqueGlobalNamespace: function() {
            if (!this.uniqueGlobalNamespace) {
                var i = 0;

                do {
                    this.uniqueGlobalNamespace = 'ExtSandbox' + (++i);
                } while (typeof Ext.global[this.uniqueGlobalNamespace] !== 'undefined');

                Ext.global[this.uniqueGlobalNamespace] = Ext;
            }

            return this.uniqueGlobalNamespace;
        },

        /**
         * @private
         */
        functionFactory: function() {
            var args = Array.prototype.slice.call(arguments);

            if (args.length > 0) {
                args[args.length - 1] = 'var Ext=window.' + this.getUniqueGlobalNamespace() + ';' +
                    args[args.length - 1];
            }

            return Function.prototype.constructor.apply(Function.prototype, args);
        }
    });

})();
