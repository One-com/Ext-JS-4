/**
 * @class Ext.grid.property.Grid
 * @extends Ext.grid.Panel
 * A specialized grid implementation intended to mimic the traditional property grid as typically seen in
 * development IDEs.  Each row in the grid represents a property of some object, and the data is stored
 * as a set of name/value pairs in {@link Ext.grid.property.Property Properties}.  Example usage:
 * <pre><code>
var grid = new Ext.grid.property.Grid({
    title: 'Properties Grid',
    width: 300,
    renderTo: 'grid-ct',
    source: {
        "(name)": "My Object",
        "Created": Ext.Date.parse('10/15/2006', 'm/d/Y'),
        "Available": false,
        "Version": .01,
        "Description": "A test object"
    }
});
</code></pre>
 * @constructor
 * @param {Object} config The grid config object
 */
Ext.define('Ext.grid.property.Grid', {

    extend: 'Ext.grid.Panel',

    alternateClassName: 'Ext.grid.PropertyGrid',

    uses: [
       'Ext.grid.plugin.CellEditing',
       'Ext.grid.property.Store',
       'Ext.grid.property.HeaderContainer',
       'Ext.XTemplate',
       'Ext.grid.CellEditor',
       'Ext.form.field.Date',
       'Ext.form.field.Text',
       'Ext.form.field.Number'
    ],

   /**
    * @cfg {Object} propertyNames An object containing custom property name/display name pairs.
    * If specified, the display name will be shown in the name column instead of the property name.
    */

    /**
    * @cfg {Object} source A data object to use as the data source of the grid (see {@link #setSource} for details).
    */

    /**
    * @cfg {Object} customEditors An object containing name/value pairs of custom editor type definitions that allow
    * the grid to support additional types of editable fields.  By default, the grid supports strongly-typed editing
    * of strings, dates, numbers and booleans using built-in form editors, but any custom type can be supported and
    * associated with a custom input control by specifying a custom editor.  The name of the editor
    * type should correspond with the name of the property that will use the editor.  Example usage:
    * <pre><code>
var grid = new Ext.grid.property.Grid({

    // Custom editors for certain property names
    customEditors: {
        evtStart: Ext.create('Ext.form.TimeField' {selectOnFocus:true})
    },

    // Displayed name for property names in the source
    propertyNames: {
        evtStart: 'Start Time'
    },

    // Data object containing properties to edit
    source: {
        evtStart: '10:00 AM'
    }
});
</code></pre>
    */

    /**
    * @cfg {Object} source A data object to use as the data source of the grid (see {@link #setSource} for details).
    */

    /**
    * @cfg {Object} customRenderers An object containing name/value pairs of custom renderer type definitions that allow
    * the grid to support custom rendering of fields.  By default, the grid supports strongly-typed rendering
    * of strings, dates, numbers and booleans using built-in form editors, but any custom type can be supported and
    * associated with the type of the value.  The name of the renderer type should correspond with the name of the property
    * that it will render.  Example usage:
    * <pre><code>
var grid = Ext.create('Ext.grid.property.Grid', {
    customRenderers: {
        Available: function(v){
            if (v) {
                return '<span style="color: green;">Yes</span>';
            } else {
                return '<span style="color: red;">No</span>';
            }
        }
    },
    source: {
        Available: true
    }
});
</code></pre>
    */

    // private config overrides
    enableColumnMove: false,
    stripeRows: false,
    trackMouseOver: false,
    clicksToEdit: 1,
    enableHdMenu: false,

    // private
    initComponent : function(){
        var me = this;

        me.plugins = me.plugins || [];

        // Enable cell editing. Inject a custom startEdit which always edits column 1 regardless of which column was clicked.
        me.plugins.push(Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: me.clicksToEdit,

            // Inject a startEdit which always edits the value column
            startEdit: function(record, column) {
                Ext.grid.plugin.CellEditing.prototype.startEdit.call(this, record, me.headerCt.child('#value')); // Maintainer: Do not change this 'this' to 'me'! It is the CellEditing object's own scope.
            }
        }));

        me.selModel = {
            selType: 'cellmodel'
        };
        me.customRenderers = me.customRenderers || {};
        me.customEditors = me.customEditors || {};
        me.propStore = me.store = Ext.create('Ext.grid.property.Store', me, me.source);
        me.store.sort('name', 'ASC');
        me.columns = Ext.create('Ext.grid.property.HeaderContainer', me, me.store);

        me.addEvents(
            /**
             * @event beforepropertychange
             * Fires before a property value changes.  Handlers can return false to cancel the property change
             * (this will internally call {@link Ext.data.Record#reject} on the property's record).
             * @param {Object} source The source data object for the grid (corresponds to the same object passed in
             * as the {@link #source} config property).
             * @param {String} recordId The record's id in the data store
             * @param {Mixed} value The current edited property value
             * @param {Mixed} oldValue The original property value prior to editing
             */
            'beforepropertychange',
            /**
             * @event propertychange
             * Fires after a property value has changed.
             * @param {Object} source The source data object for the grid (corresponds to the same object passed in
             * as the {@link #source} config property).
             * @param {String} recordId The record's id in the data store
             * @param {Mixed} value The current edited property value
             * @param {Mixed} oldValue The original property value prior to editing
             */
            'propertychange'
        );
        me.callParent();

        // Inject a custom implementation of walkCells which only goes up or down
        me.getView().walkCells = this.walkCells;

        // Set up our default editor set for the 4 atomic data types
        this.editors = {
            'date'    : Ext.create('Ext.grid.CellEditor', { field: Ext.create('Ext.form.field.Date',   {selectOnFocus: true})}),
            'string'  : Ext.create('Ext.grid.CellEditor', { field: Ext.create('Ext.form.field.Text',   {selectOnFocus: true})}),
            'number'  : Ext.create('Ext.grid.CellEditor', { field: Ext.create('Ext.form.field.Number', {selectOnFocus: true})}),
            'boolean' : Ext.create('Ext.grid.CellEditor', { field: Ext.create('Ext.form.field.ComboBox', {
                editable: false,
                store: [[ true, this.headerCt.trueText ], [false, this.headerCt.falseText ]]
            })})
        };
    },

    // Custom implementation of walkCells which only goes up and down.
    walkCells: function(pos, direction, e, preventWrap, verifierFn, scope) {
        if (direction == 'left') {
            direction = 'up';
        } else if (direction == 'right') {
            direction = 'down';
        }
        var pos = Ext.view.Table.prototype.walkCells.call(this, pos, direction, e, preventWrap, verifierFn, scope);
        if (!pos.column) {
            pos.column = 1;
        }
        return pos;
    },

    // private
    // returns the correct editor type for the property type, or a custom one keyed by the property name
    getCellEditor : function(record, column) {
        var propName = record.data.name, 
            val = record.data.value,
            editor = this.customEditors[propName];

        // A custom editor was found. If not already wrapped with a CellEditor, wrap it, and stash it back
        // If it's not even a Field, just a config object, instantiate it before wrapping it.
        if (editor) {
            if (!(editor instanceof Ext.grid.CellEditor)) {
                if (!(editor instanceof Ext.form.field.Base)) {
                    editor = Ext.ComponentManager.create(editor, 'textfield');
                }
                editor = this.customEditors[propName] = Ext.create('Ext.grid.CellEditor', { field: editor });
            }
        } else if (Ext.isDate(val)) {
            editor = this.editors.date;
        } else if (Ext.isNumber(val)) {
            editor = this.editors.number;
        } else if (Ext.isBoolean(val)) {
            editor = this.editors['boolean'];
        } else {
            editor = this.editors.string;
        }

        // Give the editor a unique ID because the CellEditing plugin caches them
        editor.editorId = propName;
        return editor;
    },

    beforeDestroy: function() {
        var me = this;
        me.callParent();
        me.destroyEditors(me.editors);
        me.destroyEditors(me.customEditors);
        delete me.source;
    },

    destroyEditors: function (editors) {
        for (var ed in editors) {
            Ext.destroy(editors[ed]);
        }
    },

    /**
     * Sets the source data object containing the property data.  The data object can contain one or more name/value
     * pairs representing all of the properties of an object to display in the grid, and this data will automatically
     * be loaded into the grid's {@link #store}.  The values should be supplied in the proper data type if needed,
     * otherwise string type will be assumed.  If the grid already contains data, this method will replace any
     * existing data.  See also the {@link #source} config value.  Example usage:
     * <pre><code>
grid.setSource({
    "(name)": "My Object",
    "Created": Ext.Date.parse('10/15/2006', 'm/d/Y'),  // date type
    "Available": false,  // boolean type
    "Version": .01,      // decimal type
    "Description": "A test object"
});
</code></pre>
     * @param {Object} source The data object
     */
    setSource: function(source) {
        this.propStore.setSource(source);
    },

    /**
     * Gets the source data object containing the property data.  See {@link #setSource} for details regarding the
     * format of the data object.
     * @return {Object} The data object
     */
    getSource: function() {
        return this.propStore.getSource();
    },

    /**
     * Sets the value of a property.
     * @param {String} prop The name of the property to set
     * @param {Mixed} value The value to test
     * @param {Boolean} create (Optional) True to create the property if it doesn't already exist. Defaults to <tt>false</tt>.
     */
    setProperty: function(prop, value, create) {
        this.propStore.setValue(prop, value, create);
    },

    /**
     * Removes a property from the grid.
     * @param {String} prop The name of the property to remove
     */
    removeProperty: function(prop) {
        this.propStore.remove(prop);
    }

    /**
     * @cfg store
     * @hide
     */
    /**
     * @cfg colModel
     * @hide
     */
    /**
     * @cfg cm
     * @hide
     */
    /**
     * @cfg columns
     * @hide
     */
});