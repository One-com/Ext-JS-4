/**
 * @class Ext.selection.CheckboxModel
 * @extends Ext.selection.RowModel
 *
 * A selection model that renders a column of checkboxes that can be toggled to
 * select or deselect rows. The default mode for this selection model is MULTI.
 *
 * The selection model will inject a header for the checkboxes in the first view
 * and according to the 'injectCheckbox' configuration.
 */
Ext.define('Ext.selection.CheckboxModel', {
    extend: 'Ext.selection.RowModel',

    /**
     * @cfg {String} mode
     * Modes of selection.
     * Valid values are SINGLE, SIMPLE, and MULTI. Defaults to 'MULTI'
     */
    mode: 'MULTI',

    /**
     * @cfg {Mixed} injectCheckbox
     * Instructs the SelectionModel whether or not to inject the checkbox header
     * automatically or not. (Note: By not placing the checkbox in manually, the
     * grid view will need to be rendered 2x on initial render.)
     * Supported values are a Number index, false and the strings 'first' and 'last'.
     * Default is 0.
     */
    injectCheckbox: 0,

    /**
     * @cfg {Boolean} checkOnly <tt>true</tt> if rows can only be selected by clicking on the
     * checkbox column (defaults to <tt>false</tt>).
     */
    checkOnly: false,

    // private
    checkerOnCls: Ext.baseCSSPrefix + 'grid-hd-checker-on',

    bindComponent: function() {
        this.sortable = false;
        this.callParent(arguments);

        var view     = this.views[0],
            headerCt = view.headerCt;

        if (this.injectCheckbox !== false) {
            if (this.injectCheckbox == 'first') {
                this.injectCheckbox = 0;
            } else if (this.injectCheckbox == 'last') {
                this.injectCheckbox = headerCt.getColumnCount();
            }
            headerCt.add(this.injectCheckbox,  this.getHeaderConfig());
        }
        headerCt.on('headerclick', this.onHeaderClick, this);
    },

    /**
     * Toggle the ui header between checked and unchecked state.
     * @param {Boolean} isChecked
     * @private
     */
    toggleUiHeader: function(isChecked) {
        var view     = this.views[0],
            headerCt = view.headerCt,
            checkHd  = headerCt.child('gridcolumn[isCheckerHd]');

        if (checkHd) {
            if (isChecked) {
                checkHd.el.addCls(this.checkerOnCls);
            } else {
                checkHd.el.removeCls(this.checkerOnCls);
            }
        }
    },

    /**
     * Toggle between selecting all and deselecting all when clicking on
     * a checkbox header.
     */
    onHeaderClick: function(headerCt, header, e) {
        if (header.isCheckerHd) {
            e.stopEvent();
            var isChecked = header.el.hasCls(Ext.baseCSSPrefix + 'grid-hd-checker-on');
            if (isChecked) {
                this.deselectAll(true);
            } else {
                this.selectAll(true);
            }
        }
    },

    /**
     * Retrieve a configuration to be used in a HeaderContainer.
     * This should be used when injectCheckbox is set to false.
     */
    getHeaderConfig: function() {
        return {
            isCheckerHd: true,
            text : '&#160;',
            width: 24,
            sortable: false,
            fixed: true,
            hideable: false,
            draggable: false,
            menuDisabled: true,
            dataIndex: '',
            cls: Ext.baseCSSPrefix + 'column-header-checkbox ',
            renderer : function(v, p, record) {
                p.tdCls = Ext.baseCSSPrefix + 'grid-cell-special';
                return '<div class="' + Ext.baseCSSPrefix + 'grid-row-checker">&#160;</div>';
            }
        };
    },

    // override
    onRowMouseDown: function(view, record, item, index, e) {
        view.el.focus();
        var me = this,
            checker = e.getTarget('.' + Ext.baseCSSPrefix + 'grid-row-checker');

        // checkOnly set, but we didn't click on a checker.
        if (me.checkOnly && !checker) {
            return;
        }

        if (checker) {
            var mode = me.getSelectionMode();
            // dont change the mode if its single otherwise
            // we would get multiple selection
            if (mode !== 'SINGLE') {
                me.setSelectionMode('SIMPLE');
            }
            me.selectWithEvent(record, e);
            me.setSelectionMode(mode);
        } else {
            me.selectWithEvent(record, e);
        }
    },

    /**
     * Synchronize header checker value as selection changes.
     * @private
     */
    onSelectChange: function(record, isSelected) {
        this.callParent([record, isSelected]);
        // check to see if all records are selected
        var hdSelectStatus = this.selected.getCount() === this.store.getCount();
        this.toggleUiHeader(hdSelectStatus);
    }
});
