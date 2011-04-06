/**
 * @author Jacky Nguyen <jacky@sencha.com>
 * @docauthor Jacky Nguyen <jacky@sencha.com>
 * @class Ext.Base
 *
 * The root of all classes created with {@link Ext#define}
 * All prototype and static members of this class are inherited by any other class
 *
 */
(function(flexSetter) {

var Base = Ext.Base = function() {};
    Base.prototype = {
        $className: 'Ext.Base',

        $class: Base,

        /**
         * Get the reference to the current class from which this object was instantiated. Unlike {@link Ext.Base#statics},
         * `this.self` is scope-dependent and it's meant to be used for dynamic inheritance. See {@link Ext.Base#statics}
         * for a detailed comparison

    Ext.define('My.Cat', {
        statics: {
            speciesName: 'Cat' // My.Cat.speciesName = 'Cat'
        },

        constructor: function() {
            alert(this.self.speciesName); / dependent on 'this'

            return this;
        },

        clone: function() {
            return new this.self();
        }
    });


    Ext.define('My.SnowLeopard', {
        extend: 'My.Cat',
        statics: {
            speciesName: 'Snow Leopard'         // My.SnowLeopard.speciesName = 'Snow Leopard'
        }
    });

    var cat = new My.Cat();                     // alerts 'Cat'
    var snowLeopard = new My.SnowLeopard();     // alerts 'Snow Leopard'

    var clone = snowLeopard.clone();
    alert(Ext.getClassName(clone));             // alerts 'My.SnowLeopard'

         * @type Class
         * @protected
         * @markdown
         */
        self: Base,

        /**
         * Default constructor, simply returns `this`
         *
         * @constructor
         * @protected
         * @return {Object} this
         */
        constructor: function() {
            return this;
        },

        /**
         * Initialize configuration for this class. a typical example:

    Ext.define('My.awesome.Class', {
        // The default config
        config: {
            name: 'Awesome',
            isAwesome: true
        },

        constructor: function(config) {
            this.initConfig(config);

            return this;
        }
    });

    var awesome = new My.awesome.Class({
        name: 'Super Awesome'
    });

    alert(awesome.getName()); // 'Super Awesome'

         * @protected
         * @param {Object} config
         * @return {Object} mixins The mixin prototypes as key - value pairs
         * @markdown
         */
        initConfig: function(config) {
            if (!this.$configInited) {
                this.config = Ext.Object.merge({}, this.config || {}, config || {});

                this.applyConfig(this.config);

                this.$configInited = true;
            }

            return this;
        },

        /**
         * @private
         */
        setConfig: function(config) {
            this.applyConfig(config || {});

            return this;
        },

        /**
         * @private
         */
        applyConfig: flexSetter(function(name, value) {
            var setter = 'set' + Ext.String.capitalize(name);

            if (typeof this[setter] === 'function') {
                this[setter].call(this, value);
            }

            return this;
        }),

        /**
         * Call the overridden superclass' method. For example:

    Ext.define('My.own.A', {
        constructor: function(test) {
            alert(test);
        }
    });

    Ext.define('My.own.B', {
        constructor: function(test) {
            alert(test);

            this.callParent([test + 1]);
        }
    });

    var a = new My.own.A(1); // alerts '1'
    var b = new My.own.B(1); // alerts '1', then alerts '2'

         * @protected
         * @param {Array/Arguments} args The arguments, either an array or the `arguments` object
         * from the current method, for example: `this.callParent(arguments)`
         * @return {Mixed} Returns the result from the superclass' method
         * @markdown
         */
        callParent: function(args) {
            var method = this.callParent.caller,
                parentClass, methodName;

            if (!method.$owner) {
                //<debug error>
                if (!method.caller) {
                    throw new Error("[" + Ext.getClassName(this) + "#callParent] Calling a protected method from the public scope");
                }
                //</debug>

                method = method.caller;
            }

            parentClass = method.$owner.superclass;
            methodName = method.$name;

            //<debug error>
            if (!(methodName in parentClass)) {
                throw new Error("[" + Ext.getClassName(this) + "#" + methodName + "] this.callParent() was called but there's no such method (" + methodName + ") found in the parent class (" +
                                (Ext.getClassName(parentClass) || 'Object') + ")");
            }
            //</debug>

            return parentClass[methodName].apply(this, args || []);
        },


        /**
         * Get the reference to the class from which this object was instantiated. Note that unlike {@link Ext.Base#self},
         * `this.statics()` is scope-independent and it always returns the class from which it was called, regardless of what
         * `this` points to during run-time

    Ext.define('My.Cat', {
        statics: {
            totalCreated: 0,
            speciesName: 'Cat' // My.Cat.speciesName = 'Cat'
        },

        constructor: function() {
            var statics = this.statics();

            alert(statics.speciesName);     // always equals to 'Cat' no matter what 'this' refers to
                                            // equivalent to: My.Cat.speciesName

            alert(this.self.speciesName);   // dependent on 'this'

            statics.totalCreated++;

            return this;
        },

        clone: function() {
            var cloned = new this.self;                      // dependent on 'this'

            cloned.groupName = this.statics().speciesName;   // equivalent to: My.Cat.speciesName

            return cloned;
        }
    });


    Ext.define('My.SnowLeopard', {
        extend: 'My.Cat',

        statics: {
            speciesName: 'Snow Leopard'     // My.SnowLeopard.speciesName = 'Snow Leopard'
        },

        constructor: function() {
            this.callParent();
        }
    });

    var cat = new My.Cat();                 // alerts 'Cat', then alerts 'Cat'

    var snowLeopard = new My.SnowLeopard(); // alerts 'Cat', then alerts 'Snow Leopard'

    var clone = snowLeopard.clone();
    alert(Ext.getClassName(clone));         // alerts 'My.SnowLeopard'
    alert(clone.groupName);                 // alerts 'Cat'

    alert(My.Cat.totalCreated);             // alerts 3

         * @protected
         * @return {Class}
         * @markdown
         */
        statics: function() {
            var method = this.statics.caller,
                self = this.self;

            if (!method) {
                return self;
            }

            return method.$owner;
        },

        /**
         * Call the original method that was previously overridden with {@link Ext.Base#override}

    Ext.define('My.Cat', {
        constructor: function() {
            alert("I'm a cat!");

            return this;
        }
    });

    My.Cat.override({
        constructor: function() {
            alert("I'm going to be a cat!");

            var instance = this.callOverridden();

            alert("Meeeeoooowwww");

            return instance;
        }
    });

    var kitty = new My.Cat(); // alerts "I'm going to be a cat!"
                              // alerts "I'm a cat!"
                              // alerts "Meeeeoooowwww"

         * @param {Array/Arguments} args The arguments, either an array or the `arguments` object
         * @return {Mixed} Returns the result after calling the overridden method
         * @markdown
         */
        callOverridden: function(args) {
            var method = this.callOverridden.caller;

            //<debug error>
            if (!method.$owner) {
                throw new Error("[" + Ext.getClassName(this) + "#callOverridden] Calling a protected method from the " +
                                "public scope");
            }

            if (!method.$previous) {
                throw new Error("[" + Ext.getClassName(this) + "] this.callOverridden was called in '" + method.$name +
                                "' but this method has never been overridden");
            }
            //</debug>

            return method.$previous.apply(this, args || []);
        },

        destroy: function() {}
    };

    // These static properties will be copied to every newly created class with {@link Ext#define}
    Ext.apply(Ext.Base, {

        /**
         * @private
         */
        ownMethod: function(name, fn) {
            var originalFn, className;

            if (fn === Ext.emptyFn) {
                this.prototype[name] = fn;
                return;
            }

            if (fn.$isOwned) {
                originalFn = fn;

                fn = function() {
                    return originalFn.apply(this, arguments);
                };
            }

            //<debug>
            className = Ext.getClassName(this);
            if (className) {
                fn.displayName = className + '#' + name;
            }
            //</debug>
            fn.$owner = this;
            fn.$name = name;
            fn.$isOwned = true;

            this.prototype[name] = fn;
        },

        /**
         * @private
         */
        borrowMethod: function(name, fn) {
            if (!fn.$isOwned) {
                this.ownMethod(name, fn);
            }
            else {
                this.prototype[name] = fn;
            }
        },

        /**
         * Add / override static properties of this class. This method is a {@link Ext.Function#flexSetter flexSetter}.
         * It can either accept an object of key - value pairs or 2 arguments of name - value.

    Ext.define('My.cool.Class', {
        ...
    });

    My.cool.Class.addStatics({
        someProperty: 'someValue',      // My.cool.Class.someProperty = 'someValue'
        method1: function() { ... },    // My.cool.Class.method1 = function() { ... };
        method2: function() { ... }     // My.cool.Class.method2 = function() { ... };
    });

    My.cool.Class.addStatics('method3', function(){ ... }); // My.cool.Class.method3 = function() { ... };

         * @property extend
         * @static
         * @type Function
         * @param {String/Object} name See {@link Ext.Function#flexSetter flexSetter}
         * @param {Mixed} value See {@link Ext.Function#flexSetter flexSetter}
         * @markdown
         */
        addStatics: flexSetter(function(name, value) {
            this[name] = value;
        }),

        /**
         * Add / override prototype properties of this class. This method is a {@link Ext.Function#flexSetter flexSetter}.
         * It can either accept an object of key - value pairs or 2 arguments of name - value.

    Ext.define('My.cool.Class', {
        ...
    });

    // Object with key - value pairs
    My.cool.Class.extend({
        someProperty: 'someValue',
        method1: function() { ... },
        method2: function() { ... }
    });

    var cool = new My.cool.Class();
    alert(cool.someProperty); // alerts 'someValue'
    cool.method1();
    cool.method2();

    // name - value arguments
    My.cool.Class.extend('method3', function(){ ... });
    cool.method3();

         * @property implement
         * @static
         * @type Function
         * @param {String/Object} name See {@link Ext.Function#flexSetter flexSetter}
         * @param {Mixed} value See {@link Ext.Function#flexSetter flexSetter}
         * @markdown
         */
        extend: flexSetter(function(name, value) {
            if (Ext.isObject(this.prototype[name]) && Ext.isObject(value)) {
                Ext.Object.merge(this.prototype[name], value);
            }
            else if (Ext.isFunction(value)) {
                this.ownMethod(name, value);
            }
            else {
                this.prototype[name] = value;
            }
        }),

        //<debug>
        /**
         * This method is deprecated, please use {@link Ext.Base#extend} instead
         */
        implement: function() {
            if (Ext.isDefined(Ext.global.console)) {
                Ext.global.console.warn("[DEPRECATED][Ext.Base] Class.implement is deprecated, please use Class.extend instead");
                return this.extend.apply(this, arguments);
            }
        },
        //</debug>

        /**
         * Add / override prototype properties of this class. This method is similar to {@link Ext.Base#extend},
         * except that it stores the reference of the overridden method which can be called later on via {@link Ext.Base#callOverridden}

    Ext.define('My.Cat', {
        constructor: function() {
            alert("I'm a cat!");

            return this;
        }
    });

    My.Cat.override({
        constructor: function() {
            alert("I'm going to be a cat!");

            var instance = this.callOverridden();

            alert("Meeeeoooowwww");

            return instance;
        }
    });

    var kitty = new My.Cat(); // alerts "I'm going to be a cat!"
                              // alerts "I'm a cat!"
                              // alerts "Meeeeoooowwww"

         * @property override
         * @static
         * @type Function
         * @param {String/Object} name See {@link Ext.Function#flexSetter flexSetter}
         * @param {Mixed} value See {@link Ext.Function#flexSetter flexSetter}
         * @markdown
         */
        override: flexSetter(function(name, value) {
            if (Ext.isObject(this.prototype[name]) && Ext.isObject(value)) {
                Ext.Object.merge(this.prototype[name], value);
            }
            else if (Ext.isFunction(value)) {
                if (Ext.isFunction(this.prototype[name])) {
                    var previous = this.prototype[name];
                    this.ownMethod(name, value);
                    this.prototype[name].$previous = previous;
                }
                else {
                    this.ownMethod(name, value);
                }
            }
            else {
                this.prototype[name] = value;
            }
        }),

       /**
         * Used internally by the mixins pre-processor
         * @private
         */
        mixin: flexSetter(function(name, cls) {
            var mixinPrototype = cls.prototype,
                myPrototype = this.prototype,
                i;

            for (i in mixinPrototype) {
                if (mixinPrototype.hasOwnProperty(i)) {
                    if (myPrototype[i] === undefined) {
                        if (Ext.isFunction(mixinPrototype[i])) {
                            this.borrowMethod(i, mixinPrototype[i]);
                        }
                        else {
                            myPrototype[i] = mixinPrototype[i];
                        }
                    }
                    else if (i === 'config' && Ext.isObject(myPrototype[i]) && Ext.isObject(mixinPrototype[i])) {
                        Ext.Object.merge(myPrototype[i], mixinPrototype[i]);
                    }
                }
            }

            if (!myPrototype.mixins) {
                myPrototype.mixins = {};
            }

            myPrototype.mixins[name] = mixinPrototype;
        }),

        /**
         * Get the current class' name in string format.

    Ext.define('My.cool.Class', {
        constructor: function() {
            alert(this.self.getName()); // alerts 'My.cool.Class'
        }
    });

         * @return {String} className
         * @markdown
         */
        getName: function() {
            return Ext.getClassName(this);
        },

        /**
         * Create aliases for current prototype methods. Example:

    Ext.define('My.cool.Class', {
        method1: function() { ... },
        method2: function() { ... }
    });

    var test = new My.cool.Class();

    My.cool.Class.createAlias({
        method3: 'method1',
        method4: 'method2'
    });

    test.method3(); // test.method1()

    My.cool.Class.createAlias('method5', 'method3');

    test.method5(); // test.method3() -> test.method1()

         * @property createAlias
         * @static
         * @type Function
         * @param {String/Object} alias The new method name, or an object to set multiple aliases. See
         * {@link Ext.Function#flexSetter flexSetter}
         * @param {String/Object} origin The original method name
         * @markdown
         */
        createAlias: flexSetter(function(alias, origin) {
            this.prototype[alias] = this.prototype[origin];
        })
    });

})(Ext.Function.flexSetter);
