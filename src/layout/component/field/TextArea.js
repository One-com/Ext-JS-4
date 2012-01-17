/**
 * Layout class for {@link Ext.form.field.TextArea} fields. Handles sizing the textarea field.
 * @private
 */
Ext.define('Ext.layout.component.field.TextArea', {
    extend: 'Ext.layout.component.field.Text',
    alias: 'layout.textareafield',

    type: 'textareafield',

    measureContentHeight: function (ownerContext) {
        var me = this,
            owner = me.owner,
            height = me.callParent(arguments),
            inputContext, inputEl, value, max, curWidth, calcHeight;

        if (owner.grow) {
            inputContext = ownerContext.inputContext;
            inputEl = owner.inputEl;
            curWidth = inputEl.getWidth(true); //subtract border/padding to get the available width for the text

            // Get and normalize the field value for measurement
            value = inputEl.dom.value || '&#160;';
            value += owner.growAppend;

            // Translate newlines to <br> tags
            value = value.replace(/\n/g, '<br>');

            // Find the height that contains the whole text value
            calcHeight = Ext.util.TextMetrics.measure(inputEl, value, curWidth).height +
                         inputContext.getBorderInfo().height + inputContext.getPaddingInfo().height;

            // Constrain
            calcHeight = Ext.Number.constrain(calcHeight, owner.growMin, owner.growMax);
            if (height != calcHeight) {
                height = inputContext.setHeight(calcHeight);
            }
        }

        return height;
    },
    
    publishInnerHeight: function (ownerContext, height) {
        ownerContext.inputContext.setHeight(height - this.measureLabelErrorHeight(ownerContext));
    }
});
