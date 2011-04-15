/**
 * @class Ext.selection.CellModel
 * @extends Ext.selection.Model
 * @private
 */
Ext.define('Ext.selection.CellModel', {
    extend: 'Ext.selection.Model',
    alias: 'selection.cellmodel',
    requires: ['Ext.util.KeyNav'],
    
    /**
     * @cfg {Boolean} enableKeyNav
     * Turns on/off keyboard navigation within the grid. Defaults to true.
     */
    enableKeyNav: true,
    
    /**
     * @cfg {Boolean} preventWrap
     * Set this configuration to true to prevent wrapping around of selection as
     * a user navigates to the first or last column. Defaults to false.
     */
    preventWrap: false,

    constructor: function(){
        this.addEvents(
            /**
             * @event deselect
             * Fired after a cell is deselected
             * @param {Ext.selection.CellModel} this
             * @param {Ext.data.Model} record The record of the deselected cell
             * @param {Number} row The row index deselected
             * @param {Number} column The column index deselected
             */
            'deselect',
            
            /**
             * @event select
             * Fired after a cell is selected
             * @param {Ext.selection.CellModel} this
             * @param {Ext.data.Model} record The record of the selected cell
             * @param {Number} row The row index selected
             * @param {Number} column The column index selected
             */
            'select'
        );
        this.callParent(arguments);    
    },

    bindComponent: function(view) {
        var me = this;
        me.primaryView = view;
        me.views = me.views || [];
        me.views.push(view);
        me.bind(view.getStore(), true);

        view.on({
            cellmousedown: this.onMouseDown,
            refresh: this.onViewRefresh,
            scope: me
        });

        if (me.enableKeyNav) {
            me.initKeyNav(view);
        }
    },

    initKeyNav: function(view) {
        var me = this;
        
        if (!view.rendered) {
            view.on('render', Ext.Function.bind(me.initKeyNav, me, [view], 0), me, {single: true});
            return;
        }

        view.el.set({
            tabIndex: -1
        });

        // view.el has tabIndex -1 to allow for
        // keyboard events to be passed to it.
        me.keyNav = Ext.create('Ext.util.KeyNav', view.el, {
            up: me.onKeyUp,
            down: me.onKeyDown,
            right: me.onKeyRight,
            left: me.onKeyLeft,
            tab: me.onKeyTab,
            scope: me
        });
    },
    
    getHeaderCt: function() {
        return this.primaryView.headerCt;
    },
    
    getActiveHeader: function() {
        if (this.position) {
            return this.getHeaderCt().getHeaderAtIndex(this.position.column);
        }
        return false;

    },

    onKeyUp: function(e, t) {
        this.move('up', e);
    },

    onKeyDown: function(e, t) {
        this.move('down', e);
    },

    onKeyLeft: function(e, t) {
        this.move('left', e);
    },
    
    onKeyRight: function(e, t) {
        this.move('right', e);
    },
    
    move: function(dir, e) {
        var pos = this.primaryView.walkCells(this.getCurrentPosition(), dir, e, this.preventWrap);
        if (pos) {
            this.setCurrentPosition(pos);
        }
        return pos;
    },

    /**
     * Returns the current position in the format {row: row, column: column}
     */
    getCurrentPosition: function() {
        return this.position;
    },
    
    /**
     * Sets the current position
     * @param {Object} position The position to set.
     */
    setCurrentPosition: function(pos) {
        if (this.position) {
            this.onCellDeselect(this.position);
        }
        if (pos) {
            this.onCellSelect(pos);
        }
        this.position = pos;
    },
    
    /**
     * Set the current position based on where the user clicks.
     * @private
     */
    onMouseDown: function(view, cell, cellIndex, record, row, rowIndex, e) {
        this.setCurrentPosition({
            row: rowIndex,
            column: cellIndex
        });
    },
    
    // notify the view that the cell has been selected to update the ui
    // approriately and bring the cell into focus
    onCellSelect: function(position) {
        var me = this,
            store = me.view.getStore(),
            record = store.getAt(position.row);
        
        me.doSelect(record);
        me.primaryView.onCellSelect(position);
        // TODO: Remove temporary cellFocus call here.
        me.primaryView.onCellFocus(position);
        
        me.fireEvent('select', me, record, position.row, position.column);
    },
    
    // notify view that the cell has been deselected to update the ui
    // appropriately
    onCellDeselect: function(position) {
        var me = this,
            store = me.view.getStore(),
            record = store.getAt(position.row);
        
        me.doDeselect(record);
        me.primaryView.onCellDeselect(position);
        
        me.fireEvent('deselect', me, record, position.row, position.column);
    },
    
    
    onKeyTab: function(e, t) {
        var me = this,
            direction = e.shiftKey ? 'left' : 'right',
            editingPlugin = me.view.editingPlugin,
            position = me.move(direction, e);
        
        if (editingPlugin && position && me.wasEditing) {
            editingPlugin.startEditByPosition(position);
        }
        delete me.wasEditing;
    },
    
    onEditorTab: function(editingPlugin, e) {
        var me = this,
            direction = e.shiftKey ? 'left' : 'right',
            position  = me.move(direction, e);
        
        if (position) {
            editingPlugin.startEditByPosition(position);
            me.wasEditing = true;
        }
    },
    
    refresh: function() {
        var pos = this.getCurrentPosition();
        if (pos) {
            this.onCellSelect(pos);
        }
    },
    
    onViewRefresh: function() {
        var pos = this.getCurrentPosition();
        if (pos) {
            this.onCellDeselect(pos);
            this.setCurrentPosition(null);
        }
    },
    
    selectByPosition: function(position) {
        this.setCurrentPosition(position);
    }
});
