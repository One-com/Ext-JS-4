/*

This file is part of Ext JS 4

Copyright (c) 2011 Sencha Inc

Contact:  http://www.sencha.com/contact

GNU General Public License Usage
This file may be used under the terms of the GNU General Public License version 3.0 as published by the Free Software Foundation and appearing in the file LICENSE included in the packaging of this file.  Please review the following information to ensure the GNU General Public License version 3.0 requirements will be met: http://www.gnu.org/copyleft/gpl.html.

If you are unsure which license is appropriate for your use, please contact the sales department at http://www.sencha.com/contact.

*/
/**
 * Tracks what records are currently selected in a databound component.
 *
 * This is an abstract class and is not meant to be directly used. Databound UI widgets such as
 * {@link Ext.grid.Panel Grid} and {@link Ext.tree.Panel Tree} should subclass Ext.selection.Model
 * and provide a way to binding to the component.
 *
 * The abstract methods `onSelectChange` and `onLastFocusChanged` should be implemented in these
 * subclasses to update the UI widget.
 */
Ext.define('Ext.selection.Model', {
    extend: 'Ext.util.Observable',
    alternateClassName: 'Ext.AbstractSelectionModel',
    requires: ['Ext.data.StoreManager'],
    // lastSelected

    /**
     * @cfg {String} mode
     * Mode of selection.  Valid values are:
     *
     * - **SINGLE** - Only allows selecting one item at a time.  Use {@link #allowDeselect} to allow
     *   deselecting that item.  This is the default.
     * - **SIMPLE** - Allows simple selection of multiple items one-by-one. Each click in grid will either
     *   select or deselect an item.
     * - **MULTI** - Allows complex selection of multiple items using Ctrl and Shift keys.
     */

    /**
     * @cfg {Boolean} allowDeselect
     * Allow users to deselect a record in a DataView, List or Grid.
     * Only applicable when the {@link #mode} is 'SINGLE'.
     */
    allowDeselect: false,

    /**
     * @property {Ext.util.MixedCollection} selected
     * A MixedCollection that maintains all of the currently selected records. Read-only.
     */
    selected: null,

    /**
     * Prune records when they are removed from the store from the selection.
     * This is a private flag. For an example of its usage, take a look at
     * Ext.selection.TreeModel.
     * @private
     */
    pruneRemoved: true,

    constructor: function(cfg) {
        var me = this;

        cfg = cfg || {};
        Ext.apply(me, cfg);

        me.addEvents(
            /**
             * @event
             * Fired after a selection change has occurred
             * @param {Ext.selection.Model} this
             * @param {Ext.data.Model[]} selected The selected records
             */
            'selectionchange'
        );

        me.modes = {
            SINGLE: true,
            SIMPLE: true,
            MULTI: true
        };

        // sets this.selectionMode
        me.setSelectionMode(cfg.mode || me.mode);

        // maintains the currently selected records.
        me.selected = Ext.create('Ext.util.MixedCollection');

        me.callParent(arguments);
    },

    // binds the store to the selModel.
    bind : function(store, initial){
        var me = this;

        if(!initial && me.store){
            if(store !== me.store && me.store.autoDestroy){
                me.store.destroyStore();
            }else{
                me.store.un("add", me.onStoreAdd, me);
                me.store.un("clear", me.onStoreClear, me);
                me.store.un("remove", me.onStoreRemove, me);
                me.store.un("update", me.onStoreUpdate, me);
            }
        }
        if(store){
            store = Ext.data.StoreManager.lookup(store);
            store.on({
                add: me.onStoreAdd,
                clear: me.onStoreClear,
                remove: me.onStoreRemove,
                update: me.onStoreUpdate,
                scope: me
            });
        }
        me.store = store;
        if(store && !initial) {
            me.refresh();
        }
    },

    /**
     * Selects all records in the view.
     * @param {Boolean} suppressEvent True to suppress any select events
     */
    selectAll: function(suppressEvent) {
        var me = this;

        me.select(me.store.getRange(), suppressEvent);
    },

    /**
     * Deselects all records in the view.
     * @param {Boolean} suppressEvent True to suppress any deselect events
     */
    deselectAll: function(suppressEvent) {
        var me = this;

        me.deselect(me.getSelection(), suppressEvent);
    },

    // Provides differentiation of logic between MULTI, SIMPLE and SINGLE
    // selection modes. Requires that an event be passed so that we can know
    // if user held ctrl or shift.
    selectWithEvent: function(record, e, keepExisting) {
        var me = this;

        switch (me.selectionMode) {
            case 'MULTI':
                if (e.shiftKey) {
                    me.selectRange(record, e.ctrlKey);
                } else if (e.ctrlKey) {
                    if (me.isSelected(record)) {
                        me.deselect(record);
                    } else {
                        me.select(record, true);
                    }
                } else {
                    //me.select(record, me.isSelected(record) && me.selected.getCount() > 1 && keepExisting); // Don't deselect existing selection if record is selected
                    me.select(record, keepExisting);
                }
                break;
            case 'SIMPLE':
                if (me.isSelected(record)) {
                    me.deselect(record);
                } else {
                    me.select(record, true);
                }
                break;
            case 'SINGLE':
                if (me.isSelected(record) && me.allowDeselect) {
                    // if allowDeselect is on and this record isSelected, deselect it
                    me.deselect(record);
                } else {
                    // select the record and do NOT maintain existing selections
                    me.select(record, true);
                }
                break;
        }

        me.setLastFocused(record);
        if (!e.shiftKey) {
            me.shiftAnchor = record;
        }
    },

    /**
     * Selects a range of rows if the selection model {@link #isLocked is not locked}.
     * All rows between record and the previously active record will also be selected.
     * @param {Ext.data.Model} The record that was interacted with
     * @param {Boolean} [keepExisting] True to retain existing selections
     */
    selectRange: function (from, to, keepExisting) {
        var me = this,
            store = me.store;

        /* Normalize differences between old and new api.
         * Old API:
         *     from and to may be records or indices. keepExisting is an optinal boolean
         * New API:
         *     from is a record and keepExisting is an optional boolean
         */
        // from was a record, get the index
        if (Ext.isObject(from)) {
            from = store.indexOf(from);
        }

        if (Ext.isBoolean(to)) {
            to = me.shiftAnchor ? store.indexOf(me.shiftAnchor) : 0;
            keepExisting = to;
        } else if (!Ext.isEmpty(to)) {
            if (Ext.isObject(to)) {
                to = store.indexOf(to);
            } else if (!Ext.isNumber(to)) {
                keepExisting = !!to;
            }
        }
        /* Compatibility code end */

        me.select(store.getRange(from, to), keepExisting);
    },

    /**
     * Selects an array of records or a record by index.
     * @param {Ext.data.Model[]/Number} records An array of records or an index
     * @param {Boolean} [keepExisting] True to retain existing selections
     * @param {Boolean} [suppressEvent] Set to true to not fire a select event
     */
    select: function (records, keepExisting, suppressEvent) {
        var me = this,
            selected = me.selected,
            toDeselect = [],
            success,
            change = false,
            i,
            record,
            commit;

        if (me.locked || !Ext.isDefined(records) || (Ext.isArray(records) && records.length === 0)) {
            return;
        }
        if (Ext.isNumber(records)) {
            records = [me.store.getAt(records)];
        } else if (!Ext.isArray(records)) {
            records = [records];
        }

        if (me.selectionMode === 'SINGLE') {
            records = [records[0]];
        }

        // Find out which records need to be selected and which to be deselected so we only fire events once
        selected.each(function (item) {
            var idx = records.indexOf(item);
            if (idx < 0) {
                // The selected item was not in the list of records to be selected
                // Mark for deselection
                toDeselect.push(item);
            } else {
                // The selected item was in the list of records to be selected
                // Splice it out so we don't fire unneeded selection events
                records.splice(idx, 1);
            }
        });

        // Deselect records
        if (!keepExisting && toDeselect.length > 0) {
            success = me.doDeselect(toDeselect, suppressEvent);

            if (!success) {
                return;
            } else {
                change = true;
            }
        }

        // Select records
        commit = function () {
            selected.add(record);
            me.lastSelected = record;
            change = true;
        };

        for (i = 0; i < records.length; i += 1) {
            record = records[i];
            me.onSelectChange(record, true, suppressEvent, commit);
        }

        if (change && !suppressEvent) {
            me.fireEvent('selectionchange', me, me.getSelection());
        }
    },

    /**
     * Deselects an array of records or a record by index.
     * @param {Ext.data.Model[]/Number} records An array of records or an index
     * @param {Boolean} [suppressEvent] Set to true to not fire a deselect event
     */
    deselect: function (records, suppressEvent) {
        var me = this,
            success;

        if (me.locked) {
            return false;
        }

        if (Ext.isNumber(records)) {
            records = [me.store.getAt(records)];
        } else if (!Ext.isArray(records)) {
            records = [records];
        }

        success = me.doDeselect(records, suppressEvent);

        if (me.lastSelected && me.isSelected(me.lastSelected)) {
            me.lastSelected = me.selected.last();
        }

        // fire selchange if there was a change and there is no suppressEvent flag
        if (records.length > 0 && success && !suppressEvent) {
            me.fireEvent('selectionchange', me, me.getSelection());
        }

        return success;
    },

    // records is an array of records
    doDeselect: function (records, suppressEvent) {
        var me = this,
            selected = me.selected,
            attempted = 0,
            accepted = 0,
            record,
            commit,
            i;

        commit = function () {
            accepted += 1;
            selected.remove(record);
        };

        for (i = 0; i < records.length; i += 1) {
            record = records[i];
            if (me.isSelected(record)) {
                attempted += 1;
                me.onSelectChange(record, false, suppressEvent, commit);
            }
        }

        return accepted === attempted;
    },

    /**
     * Sets a record as the last focused record. This does NOT mean
     * that the record has been selected.
     * @param {Ext.data.Model} record
     */
    setLastFocused: function(record, supressFocus) {
        var me = this,
            recordBeforeLast = me.lastFocused;
        me.lastFocused = record;
        me.onLastFocusChanged(recordBeforeLast, record, supressFocus);
    },

    /**
     * Determines if this record is currently focused.
     * @param {Ext.data.Model} record
     */
    isFocused: function(record) {
        return record === this.getLastFocused();
    },

    /**
     * Returns the last selected record.
     */
    getLastSelected: function() {
        return this.lastSelected;
    },

    getLastFocused: function() {
        return this.lastFocused;
    },

    /**
     * Returns an array of the currently selected records.
     * @return {Ext.data.Model[]} The selected records
     */
    getSelection: function() {
        return this.selected.getRange();
    },

    /**
     * Returns the current selectionMode.
     * @return {String} The selectionMode: 'SINGLE', 'MULTI' or 'SIMPLE'.
     */
    getSelectionMode: function() {
        return this.selectionMode;
    },

    /**
     * Sets the current selectionMode.
     * @param {String} selModel 'SINGLE', 'MULTI' or 'SIMPLE'.
     */
    setSelectionMode: function(selMode) {
        selMode = selMode ? selMode.toUpperCase() : 'SINGLE';
        // set to mode specified unless it doesnt exist, in that case
        // use single.
        this.selectionMode = this.modes[selMode] ? selMode : 'SINGLE';
    },

    /**
     * Returns true if the selections are locked.
     * @return {Boolean}
     */
    isLocked: function() {
        return this.locked;
    },

    /**
     * Locks the current selection and disables any changes from happening to the selection.
     * @param {Boolean} locked  True to lock, false to unlock.
     */
    setLocked: function(locked) {
        this.locked = !!locked;
    },

    /**
     * Returns true if the specified row is selected.
     * @param {Ext.data.Model/Number} record The record or index of the record to check
     * @return {Boolean}
     */
    isSelected: function(record) {
        record = Ext.isNumber(record) ? this.store.getAt(record) : record;
        return this.selected.indexOf(record) !== -1;
    },

    /**
     * Returns true if there are any a selected records.
     * @return {Boolean}
     */
    hasSelection: function() {
        return this.selected.getCount() > 0;
    },

    refresh: function() {
        var me = this,
            toBeSelected = [],
            oldSelections = me.getSelection(),
            len = oldSelections.length,
            selection,
            change,
            i = 0,
            lastFocused = this.getLastFocused();

        // check to make sure that there are no records
        // missing after the refresh was triggered, prune
        // them from what is to be selected if so
        for (; i < len; i++) {
            selection = oldSelections[i];
            if (!this.pruneRemoved || me.store.indexOf(selection) !== -1) {
                toBeSelected.push(selection);
            }
        }

        // there was a change from the old selected and
        // the new selection
        if (me.selected.getCount() != toBeSelected.length) {
            change = true;
        }

        me.deselectAll(true);
        me.select(toBeSelected, false, true);

        if (me.store.indexOf(lastFocused) !== -1) {
            // restore the last focus but supress restoring focus
            this.setLastFocused(lastFocused, true);
        }

        if (change) {
            me.fireEvent('selectionchange', me, me.getSelection());
        }
    },

    // when a record is added to a store
    onStoreAdd: function() {

    },

    // when a store is cleared remove all selections
    // (if there were any)
    onStoreClear: function() {
        this.deselectAll();
    },

    // prune records from the SelectionModel if
    // they were selected at the time they were
    // removed.
    onStoreRemove: function(store, record) {
        var me = this;

        me.deselect(record);

        if (me.getLastFocused() == record) {
            me.setLastFocused(null);
        }
    },

    /**
     * Returns the count of selected records.
     * @return {Number} The number of selected records
     */
    getCount: function() {
        return this.selected.getCount();
    },

    // cleanup.
    destroy: function() {

    },

    // if records are updated
    onStoreUpdate: function() {

    },

    // @abstract
    onSelectChange: function(record, isSelected, suppressEvent) {

    },

    // @abstract
    onLastFocusChanged: function(oldFocused, newFocused) {

    },

    // @abstract
    onEditorKey: function(field, e) {

    },

    // @abstract
    bindComponent: function(cmp) {

    }
});
