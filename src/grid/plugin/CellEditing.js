/**
 * @class Ext.grid.plugin.CellEditing
 * @extends Ext.grid.plugin.Editing
 *
 * The Ext.grid.plugin.CellEditing plugin injects editing at a cell level for a Grid. Only a single
 * cell will be editable at a time. The field that will be used for the editor is defined at the
 * {@link Ext.grid.column.Column#field field}. The editor can be a field instance or a field configuration.
 *
 * If an editor is not specified for a particular column then that cell will not be editable and it will
 * be skipped when activated via the mouse or the keyboard.
 *
 * The editor may be shared for each column in the grid, or a different one may be specified for each column.
 * An appropriate field type should be chosen to match the data structure that it will be editing. For example,
 * to edit a date, it would be useful to specify {@link Ext.form.field.Date} as the editor.
 *
 * {@img Ext.grid.plugin.CellEditing/Ext.grid.plugin.CellEditing.png Ext.grid.plugin.CellEditing plugin}
 *
 * ## Example Usage
 *    Ext.create('Ext.data.Store', {
 *        storeId:'simpsonsStore',
 *        fields:['name', 'email', 'phone'],
 *        data:{'items':[
 *            {"name":"Lisa", "email":"lisa@simpsons.com", "phone":"555-111-1224"},
 *            {"name":"Bart", "email":"bart@simpsons.com", "phone":"555--222-1234"},
 *            {"name":"Homer", "email":"home@simpsons.com", "phone":"555-222-1244"},
 *            {"name":"Marge", "email":"marge@simpsons.com", "phone":"555-222-1254"}
 *        ]},
 *        proxy: {
 *            type: 'memory',
 *            reader: {
 *                type: 'json',
 *                root: 'items'
 *            }
 *        }
 *    });
 *
 *    Ext.create('Ext.grid.Panel', {
 *        title: 'Simpsons',
 *        store: Ext.data.StoreManager.lookup('simpsonsStore'),
 *        columns: [
 *            {header: 'Name',  dataIndex: 'name', field: 'textfield'},
 *            {header: 'Email', dataIndex: 'email', flex:1,
 *                editor: {
 *                    xtype:'textfield',
 *                    allowBlank:false
 *                }
 *            },
 *            {header: 'Phone', dataIndex: 'phone'}
 *        ],
 *        selType: 'cellmodel',
 *        plugins: [
 *            Ext.create('Ext.grid.plugin.CellEditing', {
 *                clicksToEdit: 1
 *            })
 *        ],
 *        height: 200,
 *        width: 400,
 *        renderTo: Ext.getBody()
 *    });
 *
 */
Ext.define('Ext.grid.plugin.CellEditing', {
    alias: 'plugin.cellediting',
    extend: 'Ext.grid.plugin.Editing',
    requires: ['Ext.grid.CellEditor'],

    constructor: function() {
        /**
         * @event beforeedit
         * Fires before cell editing is triggered. The edit event object has the following properties <br />
         * <ul style="padding:5px;padding-left:16px;">
         * <li>grid - The grid</li>
         * <li>record - The record being edited</li>
         * <li>field - The field name being edited</li>
         * <li>value - The value for the field being edited.</li>
         * <li>row - The grid table row</li>
         * <li>column - The grid {@link Ext.grid.column.Column Column} defining the column that is being edited.</li>
         * <li>rowIdx - The row index that is being edited</li>
         * <li>colIdx - The column index that is being edited</li>
         * <li>cancel - Set this to true to cancel the edit or return false from your handler.</li>
         * </ul>
         * @param {Ext.grid.plugin.Editing} editor
         * @param {Object} e An edit event (see above for description)
         */
        /**
         * @event edit
         * Fires after a cell is edited. The edit event object has the following properties <br />
         * <ul style="padding:5px;padding-left:16px;">
         * <li>grid - The grid</li>
         * <li>record - The record that was edited</li>
         * <li>field - The field name that was edited</li>
         * <li>value - The value being set</li>
         * <li>originalValue - The original value for the field, before the edit.</li>
         * <li>row - The grid table row</li>
         * <li>column - The grid {@link Ext.grid.column.Column Column} defining the column that was edited.</li>
         * <li>rowIdx - The row index that was edited</li>
         * <li>colIdx - The column index that was edited</li>
         * </ul>
         *
         * <pre><code>
grid.on('edit', onEdit, this);

function onEdit(e) {
    // execute an XHR to send/commit data to the server, in callback do (if successful):
    e.record.commit();
};
         * </code></pre>
         * @param {Ext.grid.plugin.Editing} editor
         * @param {Object} e An edit event (see above for description)
         */
        /**
         * @event validateedit
         * Fires after a cell is edited, but before the value is set in the record. Return false
         * to cancel the change. The edit event object has the following properties <br />
         * <ul style="padding:5px;padding-left:16px;">
         * <li>grid - The grid</li>
         * <li>record - The record being edited</li>
         * <li>field - The field name being edited</li>
         * <li>value - The value being set</li>
         * <li>originalValue - The original value for the field, before the edit.</li>
         * <li>row - The grid table row</li>
         * <li>column - The grid {@link Ext.grid.column.Column Column} defining the column that is being edited.</li>
         * <li>rowIdx - The row index that is being edited</li>
         * <li>colIdx - The column index that is being edited</li>
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
         * @param {Ext.grid.plugin.Editing} editor
         * @param {Object} e An edit event (see above for description)
         */
        this.callParent(arguments);
        this.editors = Ext.create('Ext.util.MixedCollection', false, function(editor) {
            return editor.editorId;
        });
    },

    /**
     * @private
     * AbstractComponent calls destroy on all its plugins at destroy time.
     */
    destroy: function() {
        var me = this;
        me.editors.each(Ext.destroy, Ext);
        me.editors.clear();
        me.callParent(arguments);
    },

    // private
    // Template method called from base class's initEvents
    initCancelTriggers: function() {
        var me   = this;
            grid = me.grid,
            view   = grid.view;

        me.mon(view, {
            mousewheel: {
                element: 'el',
                fn: me.cancelEdit,
                scope: me
            }
        });
        me.mon(grid, {
            columnresize: me.cancelEdit,
            columnmove: me.cancelEdit,
            scope: me
        });
    },

    /**
     * Start editing the specified record, using the specified Column definition to define which field is being edited.
     * @param {Model} record The Store data record which backs the row to be edited.
     * @param {Model} columnHeader The Column object defining the column to be edited.
     * @override
     */
    startEdit: function(record, columnHeader) {
        var me = this,
            ed   = me.getEditor(record, columnHeader),
            value = record.get(columnHeader.dataIndex),
            context = me.getEditingContext(record, columnHeader);

        record = context.record;
        columnHeader = context.column;

        // Complete the edit now, before getting the editor's target
        // cell DOM element. Completing the edit causes a view refresh.
        me.completeEdit();

        // See if the field is editable for the requested record
        if (columnHeader && !columnHeader.getEditor(record)) {
            return false;
        }

        if (ed) {
            context.originalValue = context.value = value;
            if (me.beforeEdit(context) === false || me.fireEvent('beforeedit', context) === false || context.cancel) {
                return false;
            }

            me.context = context;
            me.setActiveEditor(ed);
            me.setActiveRecord(record);
            me.setActiveColumn(columnHeader);

            // Defer, so we have some time between view scroll to sync up the editor
            Ext.defer(ed.startEdit, 15, ed, [me.getCell(record, columnHeader), value]);
        } else {
            // BrowserBug: WebKit & IE refuse to focus the element, rather
            // it will focus it and then immediately focus the body. This
            // temporary hack works for Webkit and IE6. IE7 and 8 are still
            // broken
            me.grid.getView().el.focus((Ext.isWebKit || Ext.isIE) ? 10 : false);
        }
    },

    completeEdit: function() {
        var activeEd = this.getActiveEditor();
        if (activeEd) {
            activeEd.completeEdit();
        }
    },

    // internal getters/setters
    setActiveEditor: function(ed) {
        this.activeEditor = ed;
    },

    getActiveEditor: function() {
        return this.activeEditor;
    },

    setActiveColumn: function(column) {
        this.activeColumn = column;
    },

    getActiveColumn: function() {
        return this.activeColumn;
    },

    setActiveRecord: function(record) {
        this.activeRecord = record;
    },

    getActiveRecord: function() {
        return this.activeRecord;
    },

    getEditor: function(record, column) {
        var editors = this.editors,
            editorId = column.itemId || column.id,
            editor = editors.getByKey(editorId);

        if (editor) {
            return editor;
        } else {
            editor = column.getEditor(record);
            if (!editor) {
                return false;
            }

            // Allow them to specify a CellEditor in the Column
            if (!(editor instanceof Ext.grid.CellEditor)) {
                editor = Ext.create('Ext.grid.CellEditor', {
                    editorId: editorId,
                    field: editor
                });
            }
            editor.parentEl = this.grid.getEditorParent();
            // editor.parentEl should be set here.
            editor.on({
                scope: this,
                specialkey: this.onSpecialKey,
                complete: this.onEditComplete,
                canceledit: this.cancelEdit
            });
            editors.add(editor);
            return editor;
        }
    },

    /**
     * Get the cell (td) for a particular record and column.
     * @param {Ext.data.Model} record
     * @param {Ext.grid.column.Colunm} column
     * @private
     */
    getCell: function(record, column) {
        return this.grid.getView().getCell(record, column);
    },

    onSpecialKey: function(ed, field, e) {
        var grid = this.grid,
            sm;
        if (e.getKey() === e.TAB) {
            e.stopEvent();
            sm = grid.getSelectionModel();
            if (sm.onEditorTab) {
                sm.onEditorTab(this, e);
            }
        }
    },

    onEditComplete : function(ed, value, startValue) {
        var me = this,
            grid = me.grid,
            sm = grid.getSelectionModel(),
            dataIndex = me.getActiveColumn().dataIndex;

        me.setActiveEditor(null);
        me.setActiveColumn(null);
        me.setActiveRecord(null);
        delete sm.wasEditing;

        if (!me.validateEdit()) {
            return;
        }
        me.context.record.set(dataIndex, value);
        me.fireEvent('edit', me, me.context);
    },

    /**
     * Cancel any active editing.
     */
    cancelEdit: function() {
        var me = this,
            activeEd = me.getActiveEditor(),
            viewEl = me.grid.getView().el;

        me.setActiveEditor(null);
        me.setActiveColumn(null);
        me.setActiveRecord(null);
        if (activeEd) {
            activeEd.cancelEdit();
            viewEl.focus();
        }
    },

    /**
     * Starts editing by position (row/column)
     * @param {Object} position A position with keys of row and column.
     */
    startEditByPosition: function(position) {
        var me = this,
            grid = me.grid,
            sm = grid.getSelectionModel(),
            editRecord = grid.store.getAt(position.row),
            editColumnHeader = grid.headerCt.getHeaderAtIndex(position.column);

        if (sm.selectByPosition) {
            sm.selectByPosition(position);
        }
        me.startEdit(editRecord, editColumnHeader);
    }
});