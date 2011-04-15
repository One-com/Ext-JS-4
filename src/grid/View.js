/**
 * @class Ext.grid.View
 * @extends Ext.view.Table
 */
Ext.define('Ext.grid.View', {
    extend: 'Ext.view.Table',
    alias: 'widget.gridview',

    /**
     * @cfg {Boolean} stripeRows <tt>true</tt> to stripe the rows. Default is <tt>false</tt>.
     * <p>This causes the CSS class <tt><b>x-grid-row-alt</b></tt> to be added to alternate rows of
     * the grid. A default CSS rule is provided which sets a background colour, but you can override this
     * with a rule which either overrides the <b>background-color</b> style using the '!important'
     * modifier, or which uses a CSS selector of higher specificity.</p>
     */
    stripeRows: true,
    
    invalidateScrollerOnRefresh: true,
    
    /**
     * Scroll the GridView to the top by scrolling the scroller.
     * @private
     */
    scrollToTop : function(){
        if (this.rendered) {
            var section = this.ownerCt,
                verticalScroller = section.verticalScroller;
                
            if (verticalScroller) {
                verticalScroller.scrollToTop();
            }
        }
    },

    // after adding a row stripe rows from then on
    onAdd: function(ds, records, index) {
        this.callParent(arguments);
        this.doStripeRows(index);
    },
    
    // after removing a row stripe rows from then on
    onRemove: function(ds, records, index) {
        this.callParent(arguments);
        this.doStripeRows(index);
    },
    
    /**
     * Stripe rows from a particular row index
     * @param {Number} startRow
     * @private
     */
    doStripeRows: function(startRow) {
        // ensure stripeRows configuration is turned on
        if (this.stripeRows) {
            var rows   = this.getNodes(startRow),
                rowsLn = rows.length,
                i      = 0,
                row;
                
            for (; i < rowsLn; i++) {
                row = rows[i];
                // Remove prior applied row classes.
                row.className = row.className.replace(this.rowClsRe, ' ');
                // Every odd row will get an additional cls
                if (i % 2 === 1) {
                    row.className += (' ' + this.altRowCls);
                }
            }
        }
    },
    
    refresh: function(firstPass) {
        this.callParent(arguments);
        this.doStripeRows(0);
        // TODO: Remove gridpanel dependency
        var g = this.up('gridpanel');
        if (g && this.invalidateScrollerOnRefresh) {
            g.invalidateScroller();
        }
    }
});
