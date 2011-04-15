/**
 * @class Ext.layout.container.Auto
 * @extends Ext.layout.container.Container
 *
 * <p>The AutoLayout is the default layout manager delegated by {@link Ext.container.Container} to
 * render any child Components when no <tt>{@link Ext.container.Container#layout layout}</tt> is configured into
 * a <tt>{@link Ext.container.Container Container}.</tt>.  AutoLayout provides only a passthrough of any layout calls
 * to any child containers.</p>
 */

Ext.define('Ext.layout.container.Auto', {

    /* Begin Definitions */

    alias: ['layout.auto', 'layout.autocontainer'],

    extend: 'Ext.layout.container.Container',

    /* End Definitions */

    type: 'autocontainer',

    fixedLayout: false,

    bindToOwnerCtComponent: true,

    // @private
    onLayout : function(owner, target) {
        var me = this,
            items = me.getLayoutItems(),
            ln = items.length,
            i;

        // Ensure the Container is only primed with the clear element if there are child items.
        if (ln) {
            // Auto layout uses natural HTML flow to arrange the child items.
            // To ensure that all browsers (I'm looking at you IE!) add the bottom margin of the last child to the
            // containing element height, we create a zero-sized element with style clear:both to force a "new line"
            if (!me.clearEl) {
                me.clearEl = me.getRenderTarget().createChild({
                    cls: Ext.baseCSSPrefix + 'clear',
                    role: 'presentation'
                });
            }

            // Auto layout allows CSS to size its child items.
            for (i = 0; i < ln; i++) {
                me.setItemSize(items[i]);
            }
        }
    }
});