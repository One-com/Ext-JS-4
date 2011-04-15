
/**
 * @class Ext.grid.plugin.Editing
 * <p>This class provides cell editing on selected {@link Ext.grid.column.Column columns}.
 * The editable columns are specified by providing an {@link Ext.grid.column.Column#editor editor}
 * in the {@link Ext.grid.column.Column column configuration}.</p>
 * <p>Editability of columns may be controlled programatically by inserting an implementation
 * of {@link Ext.grid.column.Column#isCellEditable isCellEditable} into the {@link Ext.grid.column.Column Header}.</p>
 * <p>Editing is performed on the value of the <i>field</i> specified by the column's
 * <tt>{@link Ext.grid.column.Column#dataIndex dataIndex}</tt> in the backing {@link Ext.data.Store Store}
 * (so if you are using a {@link Ext.grid.column.Column#setRenderer renderer} in order to display
 * transformed data, this must be accounted for).</p>
 * <p>If a value-to-description mapping is used to render a column, then a {@link Ext.form.field.Field#ComboBox ComboBox}
 * which uses the same {@link Ext.form.field.Field#valueField value}-to-{@link Ext.form.field.Field#displayFieldField description}
 * mapping would be an appropriate editor.</p>
 * If there is a more complex mismatch between the visible data in the grid, and the editable data in
 * the {@link Ext.data.Store Store}, then code to transform the data both before and after editing can be
 * injected using the {@link #beforeedit} and {@link #afteredit} events.
 * @constructor
 * @param {Object} config The config object
 * @xtype editorgrid
 */
Ext.define('Ext.grid.plugin.Editing', {
    alias: 'editing.editing',
    
    mixins: {
        observable: 'Ext.util.Observable'
    },
    
    /**
     * @cfg {Number} clicksToEdit
     * <p>The number of clicks on a cell required to display the cell's editor (defaults to 2).</p>
     * <p>Setting this option to 'auto' means that mousedown <i>on the selected cell</i> starts
     * editing that cell.</p>
     */
    clicksToEdit: 2,

    /**
    * @cfg {Boolean} forceValidation
    * True to force validation even if the value is unmodified (defaults to false)
    */
    forceValidation: false,

    // private - replaced by  isEditable on Grid.
    //isEditor : true,
    // private
    //detectEdit: false,

    /**
     * @cfg {Boolean} autoEncode
     * True to automatically HTML encode and decode values pre and post edit (defaults to false)
     */
    autoEncode : false,

    // cell, row, form
    editStyle: '',

    /**
     * @cfg {Boolean} trackMouseOver @hide
     * Not implemented.
     */
    // private

    // Not implemented atm.
    //trackMouseOver: false, // causes very odd FF errors
    activeEditor: false,

    constructor: function(config) {
        this.mixins.observable.constructor.call(this, config);
    },

    // private
    init: function(grid){
        this.grid = grid;
        // Marks the grid as editable, so that the SelectionModel
        // can make appropriate decisions during navigation
        grid.isEditable = true;
        grid.editingPlugin = grid.view.editingPlugin = this;

        grid.on('render', this.afterRender, this, {buffer: 50, single: true});
        this.mon(grid, 'resize', this.onGridResize, this);

        this.activeEditor = null;

        grid.addEvents(
            /**
             * @event beforeedit
             * Fires before cell editing is triggered. The edit event object has the following properties <br />
             * <ul style="padding:5px;padding-left:16px;">
             * <li>grid - This grid</li>
             * <li>record - The record being edited</li>
             * <li>field - The field name being edited</li>
             * <li>value - The value for the field being edited.</li>
             * <li>row - The grid row index</li>
             * <li>column - The grid column index</li>
             * <li>cancel - Set this to true to cancel the edit or return false from your handler.</li>
             * </ul>
             * @param {Object} e An edit event (see above for description)
             */
            "beforeedit",
            /**
             * @event afteredit
             * Fires after a cell is edited. The edit event object has the following properties <br />
             * <ul style="padding:5px;padding-left:16px;">
             * <li>grid - This grid</li>
             * <li>record - The record being edited</li>
             * <li>field - The field name being edited</li>
             * <li>value - The value being set</li>
             * <li>originalValue - The original value for the field, before the edit.</li>
             * <li>row - The grid row index</li>
             * <li>column - The grid column index</li>
             * </ul>
             *
             * <pre><code>
grid.on('afteredit', afterEdit, this );

function afterEdit(e) {
    // execute an XHR to send/commit data to the server, in callback do (if successful):
    e.record.commit();
};
             * </code></pre>
             * @param {{@link Ext.grid.plugin.Editing}} editor
             * @param {Object} e An edit event (see above for description)
             */
            "afteredit",
            /**
             * @event validateedit
             * Fires after a cell is edited, but before the value is set in the record. Return false
             * to cancel the change. The edit event object has the following properties <br />
             * <ul style="padding:5px;padding-left:16px;">
             * <li>grid - This grid</li>
             * <li>record - The record being edited</li>
             * <li>field - The field name being edited</li>
             * <li>value - The value being set</li>
             * <li>originalValue - The original value for the field, before the edit.</li>
             * <li>row - The grid row index</li>
             * <li>column - The grid column index</li>
             * <li>cancel - Set this to true to cancel the edit or return false from your handler.</li>
             * </ul>
             * Usage example showing how to remove the red triangle (dirty record indicator) from some
             * records (not all).  By observing the grid's validateedit event, it can be cancelled if
             * the edit occurs on a targeted row (for example) and then setting the field's new value
             * in the Record directly:
             * <pre><code>
grid.on('validateedit', function(e) {
  var myTargetRow = 6;

  if (e.row == myTargetRow) {
    e.cancel = true;
    e.record.data[e.field] = e.value;
  }
});
             * </code></pre>
             * @param {Object} e An edit event (see above for description)
             */
            "validateedit"
        );
    },

    /**
     * @private
     * AbstractComponent calls destroy on all its plugins at destroy time.
     */
    destroy: function() {

        // Free all interlinked references
        delete this.grid.editingPlugin;
        delete this.grid.view.editingPlugin;
        delete this.grid;

        this.editors.each(Ext.destroy, Ext);
        this.editors.clear();
    },

    // key getter for this.editors MixedCollection
    getKey: function(obj) {
        return obj.name;
    },

    // Retrieve an individual editor and create it
    // if it doesn't already exist.
    getEditor: function(name, dontCreate) {
        var ed = this.editors.get(name);
        if (!ed) {
            return false;
        }
        if (ed.events || dontCreate) {
            return ed;
        } else {
            ed = Ext.ComponentManager.create(ed, 'textfield');
            this.editors.add(ed);
            return ed;
        }
    },

    setEditor: function(name, ed) {
        // destroy the existing editor if its already been created
        // 2nd arg indicates not to wrap the configuration so that
        // we don't create and then immediately destroy.
        var oldEd = this.getEditor(name, true);
        if (oldEd.destroy) {
            oldEd.destroy();
        }

        this.editors.add(ed);
    },
    
    afterRender: function() {
        this.initCancelTrigger();
        this.initEditTrigger();
    },

    // private
    preEditValue : function(record, field){
        var value = record.data[field];
        return this.autoEncode && Ext.isString(value) ? Ext.util.Format.htmlDecode(value) : value;
    },

    // private
    postEditValue : function(value, originalValue, r, field){
        return this.autoEncode && Ext.isString(value) ? Ext.util.Format.htmlEncode(value) : value;
    },

    /**
     * User overrideable to provide custom editing available logic.
     */
    isFieldEditable: function(record, field) {
        return true;
    },
    
    beforeEdit: function() {
        
    },

    /**
     * Starts editing the specified for the specified row/column
     * @param {Number} rowIndex
     * @param {Number} colIndex
     */
    startEditing : function(record, dataIndex, location){
        if (this.beforeEdit(record) === false) {
            return;
        }
        this.stopEditing(true);

        if (!location) {
            location = this.calculateLocation(record, dataIndex);
        }

        var grid = this.grid,
            view = grid.view,
            e = {
                grid: grid,
                record: record,
                field: dataIndex,
                value: record.data[dataIndex],
                //row: row,
                //column: col,
                cancel:false
            };


        if (this.isFieldEditable(record, dataIndex)) {
            //this.ensureVisible(record, dataIndex);

            if (grid.fireEvent("beforeedit", e) !== false && !e.cancel) {
                this.editing = true;
                this.currRecord = record;
                // this could become out of sync
                // if add/removing records!
                this.currDataIndex = dataIndex;
                this.performEdit(record, dataIndex, location, e);
            }
        }
    },

    // Sets up event handlers to cancel the editing on scrolling/columnresize
    initCancelTrigger: function() {
        var me   = this,
            grid = me.grid,
            el   = grid.getEditorParent();
            
        el.on('mousewheel', me.cancelEdit, me);
        grid.on('columnresize', me.cancelEdit, me);
        grid.on('headermove', me.cancelEdit, me);
    },


    // @abstract
    // Individual subclasses should provide event binding here to trigger
    // editing; the bound method should invoke startEditing(record, dataIdx, location)
    initEditTrigger: function() {

    },

    // @abstract
    // Hand control over to the user and allow them to begin the editing process
    performEdit: function(record, dataIndex, location, e) {

    },

    // @abstract
    // calculate the location if its not provided that the
    // editor should overlay on top of
    calculateLocation: function(record, dataIndex) {

    },

    // @abstract
    // stop the Editing process, passing a cancel arg of true
    // will cancel any pending changes.
    stopEditing: function(cancel) {

    },

    // @abstract
    onGridResize : function(){

    },

    // @abstract
    onEditComplete: function(ed, value, startValue) {

    }
});
