/**
 * @class Ext.Object
 *
 * A collection of useful static methods to deal with objects
 * @singleton
 */

Ext.Object = {

    /**
     * Takes an object and converts it to an encoded URL.
     * <pre><code>
Ext.Object.toQueryString({foo: 1, bar: 2}); // returns "foo=1&bar=2"
     * </code></pre>
     * Optionally, property values can be arrays, instead of keys and the resulting string that's returned
     * will contain a name/value pair for each array value.
     *
     * @param {Object} object The object to encode
     * @param {String} pre (optional) A prefix to add to the url encoded string
     * @return {String}
     */
    toQueryString: function(object, pre) {
        var encode = window.encodeURIComponent,
            buf = [],
            empty = Ext.isEmpty,
            result;

        Ext.iterate(object, function(key, item){
            if (!empty(item)) {
                Ext.each(item, function(val){
                    result = '';
                    if (!empty(val)) {
                        result = Ext.isDate(val) ? Ext.JSON.encode(val).replace(/"/g, '') : encode(val);
                    }
                    buf.push('&', encode(key), '=', result);
                });
            } else {
                buf.push('&', encode(key), '=');
            }
        });

        if (!pre) {
            buf.shift();
            pre = '';
        }

        return pre + buf.join('');
    },

    /**
     * Iterate through an object
     *
     * @param {Object} obj The object to iterate
     * @param {Function} fn The callback function. Passed arguments for each iteration are:
     * <ul>
     * <li><tt>{String}</tt> key</li>
     * <li><tt>{Mixed}</tt> value</li>
     * <li><tt>{Object}</tt> object The object itself</li>
     * </ul>
     * @param {Object} scope The execution scope (<tt>this</tt>) of the callback function
     */
    each: function(obj, fn, scope) {
        var prop;

        scope = scope || obj;

        for (prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                if (fn.call(scope || obj, prop, obj[prop], obj) === false) {
                    return;
                }
            }
        }
    },

    /**
     * Merges any number of objects recursively without referencing them or their children.
     * @param {Object} source,...
     * @return {Object} merged The object that is created as a result of merging all the objects passed in.
     */
    merge: function(source, key, value) {
        if (Ext.isString(key)) {
            if (Ext.isObject(value) && Ext.isObject(source[key])) {
                if (value.constructor === Object) {
                    Ext.Object.merge(source[key], value);
                } else {
                    source[key] = value;
                }
            }
            else if (Ext.isObject(value) && value.constructor !== Object){
                source[key] = value;
            }
            else {
                source[key] = Ext.clone(value);
            }

            return source;
        }

        var i = 1,
            len = arguments.length,
            obj, prop;

        for (; i < len; i++) {
            obj = arguments[i];
            for (prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    Ext.Object.merge(source, prop, obj[prop]);
                }
            }
        }

        return source;
    },

    /**
     * Finds the first matching key that has a particular value. Uses strict type matching.
     * If no value is found, null is returned.
     * @param {Object} object
     * @param {Object} value The value to find
     */
    keyOf: function(object, value) {
        for (var prop in object) {
            if (object.hasOwnProperty(prop) && object[prop] === value) {
                return prop;
            }
        }
        return null;
    },

    /**
     * Gets a list of values from the passed object.
     * @param {Object} object
     * @return {Array} An array of values from the object
     */
    getValues: function(object) {
        var values = [], prop;

        for (prop in object) {
            if (object.hasOwnProperty(prop)) {
                values.push(object[prop]);
            }
        }
        return values;
    },

    /**
     * Gets a list of keys from the passed object.
     * @param {Object} object
     * @return {Array} An array of keys from the object
     */
    getKeys: function(object) {
        var keys = [], prop;

        for (prop in object) {
            if (object.hasOwnProperty(prop)) {
                keys.push(prop);
            }
        }
        return keys;
    },

    /**
     * Gets the total number of properties of this object
     * @param {Object} object
     * @return {Number} size
     */
    getSize: function(object) {
        var size = 0, prop;

        for (prop in object) {
            if (object.hasOwnProperty(prop)) {
                size++;
            }
        }

        return size;
    }
};


/**
 * A convenient alias method for {@link Ext.Object#merge}
 * @member Ext
 * @method merge
 */
Ext.merge = function() {
    return Ext.Object.merge.apply(Ext.Object, arguments);
};

//Ext.deprecate('core', '4.0dev', function() {
//    Ext.urlEncode = function() {
//        console.warn("[DEPRECATED][core][4.0dev][Ext.urlEncode] please use Ext.Object.toQueryString instead");
//        return Ext.Object.toQueryString.apply(Ext.Object, arguments);
//    };
//});
