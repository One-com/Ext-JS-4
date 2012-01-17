/**
 * Layout class for {@link Ext.form.field.HtmlEditor} fields. Sizes the toolbar, textarea, and iframe elements.
 * @private
 */
Ext.define('Ext.layout.component.field.HtmlEditor', {
    extend: 'Ext.layout.component.field.Field',
    alias: ['layout.htmleditor'],

    type: 'htmleditor',

    // Flags to say that the item is autoheighting itself based upon a managed width.
    // This Component's component layout explicitly manages the toolbar's width.
    toolbarSizePolicy: {
        setsWidth: 1,
        setsHeight: 0
    },

    beginLayout: function(ownerContext) {
        this.callParent(arguments);

        ownerContext.textAreaContext = ownerContext.getEl('textareaEl');
        ownerContext.iframeContext   = ownerContext.getEl('iframeEl');
        ownerContext.toolbarContext  = ownerContext.context.getCmp(this.owner.getToolbar());
    },

    getItemSizePolicy: function (item) {
        // we are only ever called by the toolbar
        return this.toolbarSizePolicy;
    },

    getLayoutItems: function () {
        return [ this.owner.getToolbar() ];
    },

    getRenderTarget: function() {
        return this.owner.bodyEl;
    },

    publishInnerHeight: function (ownerContext, height) {
        var me = this,
            innerHeight = height - me.measureLabelErrorHeight(ownerContext) -
                          ownerContext.toolbarContext.getProp('height') -
                          ownerContext.bodyCellContext.getPaddingInfo().height;

        // If the Toolbar has not acheieved a height yest, we are not done laying out.
        if (Ext.isNumber(innerHeight)) {
            ownerContext.textAreaContext.setHeight(innerHeight);
            ownerContext.iframeContext.setHeight(innerHeight);
        } else {
            me.done = false;
        }
    },

    publishInnerWidth: function (ownerContext, width) {
        var innerWidth = width - ownerContext.bodyCellContext.getFrameInfo().width;

        ownerContext.toolbarContext.setWidth(innerWidth);
    }
});