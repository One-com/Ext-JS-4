/**
 * @class Ext.Version
 */
(function() {

// Current core version
var version = '4.0.0beta1',
    Version = Ext.Version = Ext.extend(Object, {

        /**
         * A utility class that wrap around a string version number and provide convenient
         * method to do comparison. See also: {@link Ext.Version#compare compare}. Example:
         * <pre><code>
         * var version = new Ext.Version('1.0.2beta');
         * console.log("Version is " + version); // Version is 1.0.2beta
         *
         * console.log(version.getMajor()); // 1
         * console.log(version.getMinor()); // 0
         * console.log(version.getPatch()); // 2
         * console.log(version.getBuild()); // 0
         * console.log(version.getRelease()); // beta
         *
         * console.log(version.gt('1.0.1')); // True
         * console.log(version.gt('1.0.2alpha')); // True
         * console.log(version.gt('1.0.2RC')); // False
         * console.log(version.gt('1.0.2')); // False
         *
         * console.log(version.match(1.0)); // True
         * console.log(version.match('1.0.2')); // True
         * </code></pre>
         *
         * @constructor
         * @param {String/Number} version The version number in the follow standard format: major[.minor[.patch[.build[release]]]]
         * Examples: 1.0 or 1.2.3beta or 1.2.3.4RC
         * @return {Ext.Version} this
         */
        constructor: function(version) {
            var parts, releaseStartIndex;

            if (version instanceof Version) {
                return version;
            }

            this.version = this.simplified = String(version).toLowerCase().replace(/_/g, '.').replace(/[\-+]/g, '');

            releaseStartIndex = this.version.search(/([^\d\.])/);

            if (releaseStartIndex !== -1) {
                this.release = this.version.substr(releaseStartIndex, version.length);
                this.simplified = this.version.substr(0, releaseStartIndex);
            }

            this.simplified = this.simplified.replace(/[^\d]/g, '');

            parts = this.version.split('.');

            this.major = parseInt(parts.shift(), 10);
            this.minor = parseInt(parts.shift(), 10);
            this.patch = parseInt(parts.shift(), 10);
            this.build = parseInt(parts.shift(), 10);

            return this;
        },

        /**
         * Override the native toString method
         * @private
         * @return {String} version
         */
        toString: function() {
            return this.version;
        },

        /**
         * Override the native valueOf method
         * @private
         * @return {String} version
         */
        valueOf: function() {
            return this.version;
        },

        /**
         * Returns the major component value
         * @return {Number} major
         */
        getMajor: function() {
            return this.major || 0;
        },

        /**
         * Returns the minor component value
         * @return {Number} minor
         */
        getMinor: function() {
            return this.minor || 0;
        },

        /**
         * Returns the patch component value
         * @return {Number} patch
         */
        getPatch: function() {
            return this.patch || 0;
        },

        /**
         * Returns the build component value
         * @return {Number} build
         */
        getBuild: function() {
            return this.build || 0;
        },

        /**
         * Returns the release component value
         * @return {Number} release
         */
        getRelease: function() {
            return this.release || '';
        },

        /**
         * Returns whether this version if greater than the supplied argument
         * @param {String/Number} target The version to compare with
         * @return {Boolean} True if this version if greater than the target, false otherwise
         */
        isGreaterThan: function(target) {
            return Version.compare(this.version, target) === 1;
        },

        /**
         * Convenient shortcut for {@link Ext.Version#isGreaterThan isGreaterThan}
         * @param {String/Number} target The version to compare with
         * @return {Boolean} True if this version if greater than the target, false otherwise
         */
        gt: function() {
            return this.isGreaterThan.apply(this, arguments);
        },

        /**
         * Returns whether this version if smaller than the supplied argument
         * @param {String/Number} target The version to compare with
         * @return {Boolean} True if this version if smaller than the target, false otherwise
         */
        isSmallerThan: function(target) {
            return Version.compare(this.version, target) === -1;
        },

        /**
         * Convenient shortcut for {@link Ext.Version#isSmallerThan isSmallerThan}
         * @param {String/Number} target The version to compare with
         * @return {Boolean} True if this version if smaller than the target, false otherwise
         */
        lt: function() {
            return this.isSmallerThan.apply(this, arguments);
        },

        /**
         * Returns whether this version equals to the supplied argument
         * @param {String/Number} target The version to compare with
         * @return {Boolean} True if this version equals to the target, false otherwise
         */
        equals: function(target) {
            return Version.compare(this.version, target) === 0;
        },

        /**
         * Convenient shortcut for {@link Ext.Version#equals equals}
         * @param {String/Number} target The version to compare with
         * @return {Boolean} True fs this version equals to the target, false otherwise
         */
        eq: function() {
            return this.equals.apply(this, arguments);
        },

        /**
         * Returns whether this version matches the supplied argument. Example:
         * <pre><code>
         * var version = new Ext.Version('1.0.2beta');
         * console.log(version.match(1)); // True
         * console.log(version.match(1.0)); // True
         * console.log(version.match('1.0.2')); // True
         * console.log(version.match('1.0.2RC')); // False
         * </code></pre>
         * @param {String/Number} target The version to compare with
         * @return {Boolean} True if this version matches the target, false otherwise
         */
        match: function(target) {
            target = String(target);
            return this.version.substr(0, target.length) === target;
        },

        /**
         * Returns this format: [major, minor, patch, build, release]. Useful for comparison
         * @return {Array}
         */
        toArray: function() {
            return [this.getMajor(), this.getMinor(), this.getPatch(), this.getBuild(), this.getRelease()];
        },

        /**
         * Returns simplified version without dots and release
         * @return {String}
         */
        getSimplified: function() {
            return this.simplified;
        }
    });

    Ext.apply(Version, {
        // @private
        releaseValueMap: {
            'dev': -6,
            'alpha': -5,
            'a': -5,
            'beta': -4,
            'b': -4,
            'rc': -3,
            '#': -2,
            'p': -1,
            'pl': -1
        },

        /**
         * Converts a version component to a comparable value
         * @param {Mixed} value The value to convert
         * @return {Mixed}
         */
        getComponentValue: function(value) {
            return !value ? 0 : (isNaN(value) ? this.releaseValueMap[value] || value : parseInt(value, 10));
        },

        /**
         * Compare 2 specified versions, starting from left to right. If a part contains special version strings,
         * they are handled in the following order:
         * 'dev' < 'alpha' = 'a' < 'beta' = 'b' < 'RC' = 'rc' < '#' < 'pl' = 'p' < 'anything else'
         * @param {String} current The current version to compare to
         * @param {String} target The target version to compare to
         * @return {Number} Returns -1 if the current version is smaller than the target version, 1 if greater, and 0 if they're equivalent
         */
        compare: function(current, target) {
            var currentValue, targetValue, i;

            current = new Version(current).toArray();
            target = new Version(target).toArray();

            for (i = 0; i < Math.max(current.length, target.length); i++) {
                currentValue = this.getComponentValue(current[i]);
                targetValue = this.getComponentValue(target[i]);

                if (currentValue < targetValue) {
                    return -1;
                } else if (currentValue > targetValue) {
                    return 1;
                }
            }

            return 0;
        }
    });

    Ext.apply(Ext, {
        // @private
        versions: {},

        /**
         * Set version number of the supplied package name.
         * Note: This is not meant to be called from the application-level, only from framework-level
         * @param {String} packageName The package name, for example: 'core', 'touch', 'extjs'
         * @param {String} version The version, for example: '1.2.3alpha', '2.4.0-dev'
         * @return {Ext}
         */
        setVersion: function(packageName, version) {
            Ext.versions[packageName] = new Version(version);

            return this;
        },

        /**
         * Get the version number of the supplied package name
         * @param {String} packageName The package name, for example: 'core', 'touch', 'extjs'
         * @return {Ext.Version} The version
         */
        getVersion: function(packageName) {
            return Ext.versions[packageName];
        },

        /**
         * Create a closure for deprecated code. Note that for max performance, this will be stripped out automatically
         * when being built with JSBuilder
         * @param {String} packageName The package name
         * @param {String} since The last version before it's deprecated
         * @param {Function} closure The callback function to be executed with the specified version is less than the current version
         * @param {Object} scope The execution scope (<tt>this</tt>) if the closure
         */
        deprecate: function(packageName, since, closure, scope) {
            if (Version.compare(Ext.getVersion(packageName), since) < 1) {
                closure.call(scope);
            }
        }
    }); // End Versioning
    
    Ext.setVersion('core', version);

})();
