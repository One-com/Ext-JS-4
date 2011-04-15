/**
 * @author Ed Spencer
 * @class Ext.data.Model
 * @extends Ext.util.Stateful
 *
 * <p>A Model represents some object that your application manages. For example, one might define a Model for Users, Products,
 * Cars, or any other real-world object that we want to model in the system. Models are registered via the {@link Ext.ModelManager model manager},
 * and are used by {@link Ext.data.Store stores}, which are in turn used by many of the data-bound components in Ext.</p>
 *
 * <p>Models are defined as a set of fields and any arbitrary methods and properties relevant to the model. For example:</p>
 *
<pre><code>
Ext.regModel('User', {
    fields: [
        {name: 'name',  type: 'string'},
        {name: 'age',   type: 'int'},
        {name: 'phone', type: 'string'},
        {name: 'alive', type: 'boolean', defaultValue: true}
    ],

    changeName: function() {
        var oldName = this.get('name'),
            newName = oldName + " The Barbarian";

        this.set('name', newName);
    }
});
</code></pre>
*
* <p>The fields array is turned into a {@link Ext.util.MixedCollection MixedCollection} automatically by the {@link Ext.ModelManager ModelManager}, and all
* other functions and properties are copied to the new Model's prototype.</p>
*
* <p>Now we can create instances of our User model and call any model logic we defined:</p>
*
<pre><code>
var user = Ext.ModelManager.create({
    name : 'Conan',
    age  : 24,
    phone: '555-555-5555'
}, 'User');

user.changeName();
user.get('name'); //returns "Conan The Barbarian"
</code></pre>
 *
 * <p><u>Validations</u></p>
 *
 * <p>Models have built-in support for validations, which are executed against the validator functions in
 * {@link Ext.data.validations} ({@link Ext.data.validations see all validation functions}). Validations are easy to add to models:</p>
 *
<pre><code>
Ext.regModel('User', {
    fields: [
        {name: 'name',     type: 'string'},
        {name: 'age',      type: 'int'},
        {name: 'phone',    type: 'string'},
        {name: 'gender',   type: 'string'},
        {name: 'username', type: 'string'},
        {name: 'alive',    type: 'boolean', defaultValue: true}
    ],

    validations: [
        {type: 'presence',  field: 'age'},
        {type: 'length',    field: 'name',     min: 2},
        {type: 'inclusion', field: 'gender',   list: ['Male', 'Female']},
        {type: 'exclusion', field: 'username', list: ['Admin', 'Operator']},
        {type: 'format',    field: 'username', matcher: /([a-z]+)[0-9]{2,3}/}
    ]
});
</code></pre>
 *
 * <p>The validations can be run by simply calling the {@link #validate} function, which returns a {@link Ext.data.Errors}
 * object:</p>
 *
<pre><code>
var instance = Ext.ModelManager.create({
    name: 'Ed',
    gender: 'Male',
    username: 'edspencer'
}, 'User');

var errors = instance.validate();
</code></pre>
 *
 * <p><u>Associations</u></p>
 *
 * <p>Models can have associations with other Models via {@link Ext.data.BelongsToAssociation belongsTo} and
 * {@link Ext.data.HasManyAssociation hasMany} associations. For example, let's say we're writing a blog administration
 * application which deals with Users, Posts and Comments. We can express the relationships between these models like this:</p>
 *
<pre><code>
Ext.regModel('Post', {
    fields: ['id', 'user_id'],

    belongsTo: 'User',
    hasMany  : {model: 'Comment', name: 'comments'}
});

Ext.regModel('Comment', {
    fields: ['id', 'user_id', 'post_id'],

    belongsTo: 'Post'
});

Ext.regModel('User', {
    fields: ['id'],

    hasMany: [
        'Post',
        {model: 'Comment', name: 'comments'}
    ]
});
</code></pre>
 *
 * <p>See the docs for {@link Ext.data.BelongsToAssociation} and {@link Ext.data.HasManyAssociation} for details on the usage
 * and configuration of associations. Note that associations can also be specified like this:</p>
 *
<pre><code>
Ext.regModel('User', {
    fields: ['id'],

    associations: [
        {type: 'hasMany', model: 'Post',    name: 'posts'},
        {type: 'hasMany', model: 'Comment', name: 'comments'}
    ]
});
</code></pre>
 *
 * <p><u>Using a Proxy</u></p>
 *
 * <p>Models are great for representing types of data and relationships, but sooner or later we're going to want to
 * load or save that data somewhere. All loading and saving of data is handled via a {@link Ext.data.proxy.Proxy Proxy},
 * which can be set directly on the Model:</p>
 *
<pre><code>
Ext.regModel('User', {
    fields: ['id', 'name', 'email'],

    proxy: {
        type: 'rest',
        url : '/users'
    }
});
</code></pre>
 *
 * <p>Here we've set up a {@link Ext.data.proxy.Rest Rest Proxy}, which knows how to load and save data to and from a
 * RESTful backend. Let's see how this works:</p>
 *
<pre><code>
var user = Ext.ModelManager.create({name: 'Ed Spencer', email: 'ed@sencha.com'}, 'User');

user.save(); //POST /users
</code></pre>
 *
 * <p>Calling {@link #save} on the new Model instance tells the configured RestProxy that we wish to persist this
 * Model's data onto our server. RestProxy figures out that this Model hasn't been saved before because it doesn't
 * have an id, and performs the appropriate action - in this case issuing a POST request to the url we configured
 * (/users). We configure any Proxy on any Model and always follow this API - see {@link Ext.data.proxy.Proxy} for a full
 * list.</p>
 *
 * <p>Loading data via the Proxy is equally easy:</p>
 *
<pre><code>
//get a reference to the User model class
var User = Ext.ModelManager.getModel('User');

//Uses the configured RestProxy to make a GET request to /users/123
User.load(123, {
    success: function(user) {
        console.log(user.getId()); //logs 123
    }
});
</code></pre>
 *
 * <p>Models can also be updated and destroyed easily:</p>
 *
<pre><code>
//the user Model we loaded in the last snippet:
user.set('name', 'Edward Spencer');

//tells the Proxy to save the Model. In this case it will perform a PUT request to /users/123 as this Model already has an id
user.save({
    success: function() {
        console.log('The User was updated');
    }
});

//tells the Proxy to destroy the Model. Performs a DELETE request to /users/123
user.destroy({
    success: function() {
        console.log('The User was destroyed!');
    }
});
</code></pre>
 *
 * <p><u>Usage in Stores</u></p>
 *
 * <p>It is very common to want to load a set of Model instances to be displayed and manipulated in the UI. We do this
 * by creating a {@link Ext.data.Store Store}:</p>
 *
<pre><code>
var store = new Ext.data.Store({
    model: 'User'
});

//uses the Proxy we set up on Model to load the Store data
store.load();
</code></pre>
 *
 * <p>A Store is just a collection of Model instances - usually loaded from a server somewhere. Store can also maintain
 * a set of added, updated and removed Model instances to be synchronized with the server via the Proxy. See the
 * {@link Ext.data.Store Store docs} for more information on Stores.</p>
 *
 * @constructor
 * @param {Object} data An object containing keys corresponding to this model's fields, and their associated values
 * @param {Number} id Optional unique ID to assign to this model instance
 */
Ext.define('Ext.data.Model', {
    extend: 'Ext.util.Stateful',
    alternateClassName: 'Ext.data.Record',

    requires: [
        'Ext.ModelManager',
        'Ext.data.Field',
        'Ext.data.Errors',
        'Ext.data.Operation',
        'Ext.data.validations',
        'Ext.data.proxy.Ajax'
    ],

    onClassExtended: function(cls, data) {
        var name = cls.$className,
            prototype = cls.prototype,
            superCls = cls.prototype.superclass,

            validations = data.validations || [],
            fields = data.fields || [],
            associations = data.associations || [],
            belongsTo = data.belongsTo,
            hasMany = data.hasMany,

            fieldsMixedCollection = Ext.create('Ext.util.MixedCollection', false, function(field) {
                return field.name;
            }),

            associationsMixedCollection = Ext.create('Ext.util.MixedCollection', false, function(association) {
                return association.name;
            }),

            superValidations = superCls.validations,
            superFields = superCls.fields,
            superAssociations = cls.prototype.superclass.associations,

            association, i, ln;

        // Save modelName on class and its prototype
        cls.modelName = name;
        prototype.modelName = name;

        // Merge the validations of the superclass and the new subclass
        if (superValidations) {
            validations = superValidations.concat(validations);
        }
        data.validations = validations;

        // Merge the fields of the superclass and the new subclass
        if (superFields) {
            fields = superFields.items.concat(fields);
        }
        for (i = 0, ln = fields.length; i < ln; ++i) {
            fieldsMixedCollection.add(Ext.create('Ext.data.Field', fields[i]));
        }

        data.fields = fieldsMixedCollection;

        //associations can be specified in the more convenient format (e.g. not inside an 'associations' array).
        //we support that here
        if (belongsTo) {
            belongsTo = Ext.Array.from(belongsTo);

            for (i = 0, ln = belongsTo.length; i < ln; ++i) {
                association = belongsTo[i];
                if (!Ext.isObject(association)) {
                    association = {model: association};
                }
                Ext.apply(association, {type: 'belongsTo'});
                associations.push(association);
            }
            delete data.belongsTo;
        }

        if (hasMany) {
            hasMany = Ext.Array.from(hasMany);
            for (i = 0, ln = hasMany.length; i < ln; ++i) {
                association = hasMany[i];
                if (!Ext.isObject(association)) {
                    association = {model: association};
                }
                Ext.apply(association, {type: 'hasMany'});
                associations.push(association);
            }
            delete data.hasMany;
        }

        if (superAssociations) {
            associations = superAssociations.items.concat(associations);
        }

        Ext.ModelManager.registerType(name, cls);

        for (i = 0, ln = associations.length; i < ln; ++i) {
            association = associations[i];
            Ext.apply(association, {
                ownerModel: name,
                associatedModel: association.model
            });

            if (Ext.ModelManager.getModel(association.model) === undefined) {
                Ext.ModelManager.registerDeferredAssociation(association);
            } else {
                associationsMixedCollection.add(Ext.data.Association.create(association));
            }
        }
        data.associations = associationsMixedCollection;
    },

    onAfterClassExtended: function(cls, data) {
        cls.setProxy(cls.prototype.proxy || cls.prototype.defaultProxyType);

        // Fire the onModelDefined template method on ModelManager
        Ext.ModelManager.onModelDefined(cls);
    },

    inheritableStatics: {
        /**
         * Sets the Proxy to use for this model. Accepts any options that can be accepted by {@link Ext#createByAlias Ext.createByAlias}
         * @param {String/Object/Ext.data.proxy.Proxy} proxy The proxy
         * @static
         */
        setProxy: function(proxy) {
            //make sure we have an Ext.data.proxy.Proxy object
            if (!proxy.isProxy) {
                if (typeof proxy == "string") {
                    proxy = {
                        type: proxy
                    };
                }
                proxy = Ext.createByAlias("proxy." + proxy.type, proxy);
            }
            proxy.setModel(this);
            this.proxy = this.prototype.proxy = proxy;

            return proxy;
        },

        /**
         * Returns the configured Proxy for this Model
         * @return {Ext.data.proxy.Proxy} The proxy
         */
        getProxy: function() {
            return this.proxy;
        },

        /**
         * <b>Static</b>. Asynchronously loads a model instance by id. Sample usage:
    <pre><code>
    MyApp.User = Ext.regModel('User', {
        fields: [
            {name: 'id', type: 'int'},
            {name: 'name', type: 'string'}
        ]
    });

    MyApp.User.load(10, {
        scope: this,
        failure: function(record, operation) {
            //do something if the load failed
        },
        success: function(record, operation) {
            //do something if the load succeeded
        },
        callback: function(record, operation) {
            //do something whether the load succeeded or failed
        }
    });
    </code></pre>
         * @param {Number} id The id of the model to load
         * @param {Object} config Optional config object containing success, failure and callback functions, plus optional scope
         * @member Ext.data.Model
         * @method load
         * @static
         */
        load: function(id, config) {
            config = Ext.apply({}, config);
            config = Ext.applyIf(config, {
                action: 'read',
                id    : id
            });

            var operation  = Ext.create('Ext.data.Operation', config),
                scope      = config.scope || this,
                record     = null,
                callback;

            callback = function(operation) {
                if (operation.wasSuccessful()) {
                    record = operation.getRecords()[0];
                    Ext.callback(config.success, scope, [record, operation]);
                } else {
                    Ext.callback(config.failure, scope, [record, operation]);
                }
                Ext.callback(config.callback, scope, [record, operation]);
            };

            this.proxy.read(operation, callback, this);
        }
    },

    statics: {
        PREFIX : 'ext-record',
        AUTO_ID: 1,
        EDIT   : 'edit',
        REJECT : 'reject',
        COMMIT : 'commit',

        /**
         * Generates a sequential id. This method is typically called when a record is {@link #create}d
         * and {@link #Record no id has been specified}. The id will automatically be assigned
         * to the record. The returned id takes the form:
         * <tt>&#123;PREFIX}-&#123;AUTO_ID}</tt>.<div class="mdetail-params"><ul>
         * <li><b><tt>PREFIX</tt></b> : String<p class="sub-desc"><tt>Ext.data.Model.PREFIX</tt>
         * (defaults to <tt>'ext-record'</tt>)</p></li>
         * <li><b><tt>AUTO_ID</tt></b> : String<p class="sub-desc"><tt>Ext.data.Model.AUTO_ID</tt>
         * (defaults to <tt>1</tt> initially)</p></li>
         * </ul></div>
         * @param {Ext.data.Model} rec The record being created.  The record does not exist, it's a {@link #phantom}.
         * @return {String} auto-generated string id, <tt>"ext-record-i++'</tt>;
         * @static
         */
        id: function(rec) {
            var id = [Ext.data.Model.PREFIX, '-', Ext.data.Model.AUTO_ID++].join('');
            rec.phantom = true;
            rec.internalId = id;
            return id;
        }
    },

    evented: false,
    isModel: true,

    /**
     * <tt>true</tt> when the record does not yet exist in a server-side database (see
     * {@link #setDirty}).  Any record which has a real database pk set as its id property
     * is NOT a phantom -- it's real.
     * @property phantom
     * @type {Boolean}
     */
    phantom : false,

    /**
     * @cfg {String} idProperty The name of the field treated as this Model's unique id (defaults to 'id').
     */
    idProperty: 'id',

    /**
     * The string type of the default Model Proxy. Defaults to 'ajax'
     * @property defaultProxyType
     * @type String
     */
    defaultProxyType: 'ajax',

    /**
     * An array of the fields defined on this model
     * @property fields
     * @type {Array}
     */

    constructor: function(data, id) {
        data = data || {};

        /**
         * An internal unique ID for each Model instance, used to identify Models that don't have an ID yet
         * @property internalId
         * @type String
         * @private
         */
        this.internalId = (id || id === 0) ? id : Ext.data.Model.id(this);

        this.callParent();

        //add default field values if present
        var fields = this.fields.items,
            length = fields.length,
            field, name, i;

        for (i = 0; i < length; i++) {
            field = fields[i];
            name  = field.name;
            
            if (data[name] === undefined) {
                data[name] = field.defaultValue;
            }
        }

        this.set(data);
        // clear any dirty/modified since we're initializing
        this.dirty = false;
        this.modified = {};

        if (this.getId()) {
            this.phantom = false;
        }

        if (typeof this.init == 'function') {
            this.init();
        }

        this.id = this.modelName + '-' + this.internalId;

        Ext.ModelManager.register(this);
    },

    /**
     * Sets the Proxy to use for this model. Accepts any options that can be accepted by {@link Ext#createByAlias Ext.createByAlias}
     * @param {String/Object/Ext.data.proxy.Proxy} proxy The proxy
     * @static
     */
    setProxy: function(proxy) {
        //make sure we have an Ext.data.proxy.Proxy object
        if (!proxy.isProxy) {
            if (typeof proxy == "string") {
                proxy = {
                    type: proxy
                };
            }
            proxy = Ext.createByAlias("proxy." + proxy.type, proxy);
        }
        proxy.setModel(this.self);
        this.proxy = proxy;

        return proxy;
    },

    /**
     * Returns the configured Proxy for this Model
     * @return {Ext.data.proxy.Proxy} The proxy
     */
    getProxy: function() {
        return this.proxy;
    },

    /**
     * Validates the current data against all of its configured {@link #validations} and returns an
     * {@link Ext.data.Errors Errors} object
     * @return {Ext.data.Errors} The errors object
     */
    validate: function() {
        var errors      = Ext.create('Ext.data.Errors'),
            validations = this.validations,
            validators  = Ext.data.validations,
            length, validation, field, valid, type, i;

        if (validations) {
            length = validations.length;

            for (i = 0; i < length; i++) {
                validation = validations[i];
                field = validation.field || validation.name;
                type  = validation.type;
                valid = validators[type](validation, this.get(field));

                if (!valid) {
                    errors.add({
                        field  : field,
                        message: validation.message || validators[type + 'Message']
                    });
                }
            }
        }

        return errors;
    },

    /**
     * Checks if the model is valid. See {@link #validate}.
     * @return {Boolean} True if the model is valid.
     */
    isValid: function(){
        return this.validate().isValid();
    },

    /**
     * Saves the model instance using the configured proxy
     * @param {Object} options Options to pass to the proxy
     * @return {Ext.data.Model} The Model instance
     */
    save: function(options) {
        options = Ext.apply({}, options);

        var me     = this,
            action = me.phantom ? 'create' : 'update',
            record = null,
            scope  = options.scope || me,
            operation,
            callback;

        Ext.apply(options, {
            records: [me],
            action : action
        });

        operation = Ext.create('Ext.data.Operation', options);

        callback = function(operation) {
            if (operation.wasSuccessful()) {
                record = operation.getRecords()[0];
                //we need to make sure we've set the updated data here. Ideally this will be redundant once the
                //ModelCache is in place
                me.set(record.data);
                record.dirty = false;

                Ext.callback(options.success, scope, [record, operation]);
            } else {
                Ext.callback(options.failure, scope, [record, operation]);
            }

            Ext.callback(options.callback, scope, [record, operation]);
        };

        me.getProxy()[action](operation, callback, me);

        return me;
    },

    /**
     * Destroys the model using the configured proxy
     * @param {Object} options Options to pass to the proxy
     * @return {Ext.data.Model} The Model instance
     */
    destroy: function(options){
        options = Ext.apply({}, options);

        var me     = this,
            record = null,
            scope  = options.scope || me,
            operation,
            callback;

        Ext.apply(options, {
            records: [me],
            action : 'destroy'
        });

        operation = Ext.create('Ext.data.Operation', options);
        callback = function(operation) {
            if (operation.wasSuccessful()) {
                Ext.callback(options.success, scope, [record, operation]);
            } else {
                Ext.callback(options.failure, scope, [record, operation]);
            }
            Ext.callback(options.callback, scope, [record, operation]);
        };

        me.getProxy().destroy(operation, callback, me);
        return me;
    },

    /**
     * Returns the unique ID allocated to this model instance as defined by {@link #idProperty}
     * @return {Number} The id
     */
    getId: function() {
        return this.get(this.idProperty);
    },

    /**
     * Sets the model instance's id field to the given id
     * @param {Number} id The new id
     */
    setId: function(id) {
        this.set(this.idProperty, id);
    },

    /**
     * Tells this model instance that it has been added to a store
     * @param {Ext.data.Store} store The store that the model has been added to
     */
    join : function(store) {
        /**
         * The {@link Ext.data.Store} to which this Record belongs.
         * @property store
         * @type {Ext.data.Store}
         */
        this.store = store;
    },

    /**
     * Tells this model instance that it has been removed from the store
     */
    unjoin: function() {
        delete this.store;
    },

    /**
     * @private
     * If this Model instance has been {@link #join joined} to a {@link Ext.data.Store store}, the store's
     * afterEdit method is called
     */
    afterEdit : function() {
        this.callStore('afterEdit');
    },

    /**
     * @private
     * If this Model instance has been {@link #join joined} to a {@link Ext.data.Store store}, the store's
     * afterReject method is called
     */
    afterReject : function() {
        this.callStore("afterReject");
    },

    /**
     * @private
     * If this Model instance has been {@link #join joined} to a {@link Ext.data.Store store}, the store's
     * afterCommit method is called
     */
    afterCommit: function() {
        this.callStore('afterCommit');
    },

    /**
     * @private
     * Helper function used by afterEdit, afterReject and afterCommit. Calls the given method on the
     * {@link Ext.data.Store store} that this instance has {@link #join joined}, if any. The store function
     * will always be called with the model instance as its single argument.
     * @param {String} fn The function to call on the store
     */
    callStore: function(fn) {
        var store = this.store;

        if (store !== undefined && typeof store[fn] == "function") {
            store[fn](this);
        }
    },

    /**
     * Gets all of the data from this Models *loaded* associations.
     * It does this recursively - for example if we have a User which
     * hasMany Orders, and each Order hasMany OrderItems, it will return an object like this:
     * {
     *     orders: [
     *         {
     *             id: 123,
     *             status: 'shipped',
     *             orderItems: [
     *                 ...
     *             ]
     *         }
     *     ]
     * }
     * @return {Object} The nested data set for the Model's loaded associations
     */
    getAssociatedData: function(){
        return this.prepareAssociatedData(this, [], null);
    },

    /**
     * @private
     * This complex-looking method takes a given Model instance and returns an object containing all data from
     * all of that Model's *loaded* associations. See (@link #getAssociatedData}
     * @param {Ext.data.Model} record The Model instance
     * @param {Array} ids PRIVATE. The set of Model instance internalIds that have already been loaded
     * @param {String} associationType (optional) The name of the type of association to limit to.
     * @return {Object} The nested data set for the Model's loaded associations
     */
    prepareAssociatedData: function(record, ids, associationType) {
        //we keep track of all of the internalIds of the models that we have loaded so far in here
        var associations     = record.associations.items,
            associationCount = associations.length,
            associationData  = {},
            associatedStore, associatedName, associatedRecords, associatedRecord,
            associatedRecordCount, association, id, i, j, type, allow;

        for (i = 0; i < associationCount; i++) {
            association = associations[i];
            type = association.type;
            allow = true;
            if (associationType) {
                allow = type == associationType;
            }
            if (allow && type == 'hasMany') {

                //this is the hasMany store filled with the associated data
                associatedStore = record[association.storeName];

                //we will use this to contain each associated record's data
                associationData[association.name] = [];

                //if it's loaded, put it into the association data
                if (associatedStore && associatedStore.data.length > 0) {
                    associatedRecords = associatedStore.data.items;
                    associatedRecordCount = associatedRecords.length;

                    //now we're finally iterating over the records in the association. We do this recursively
                    for (j = 0; j < associatedRecordCount; j++) {
                        associatedRecord = associatedRecords[j];
                        // Use the id, since it is prefixed with the model name, guaranteed to be unique
                        id = associatedRecord.id;

                        //when we load the associations for a specific model instance we add it to the set of loaded ids so that
                        //we don't load it twice. If we don't do this, we can fall into endless recursive loading failures.
                        if (Ext.Array.indexOf(ids, id) == -1) {
                            ids.push(id);

                            associationData[association.name][j] = associatedRecord.data;
                            Ext.apply(associationData[association.name][j], this.prepareAssociatedData(associatedRecord, ids, type));
                        }
                    }
                }
            } else if (allow && type == 'belongsTo') {
                associatedRecord = record[association.instanceName];
                if (associatedRecord !== undefined) {
                    id = associatedRecord.id;
                    if (Ext.Array.indexOf(ids, id) == -1) {
                        ids.push(id);
                        associationData[association.name] = associatedRecord.data;
                        Ext.apply(associationData[association.name], this.prepareAssociatedData(associatedRecord, ids, type));
                    }
                }
            }
        }

        return associationData;
    }
});
