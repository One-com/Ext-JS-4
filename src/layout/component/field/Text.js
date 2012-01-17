/**
 * Layout class for {@link Ext.form.field.Text} fields. Handles sizing the input field.
 * @private
 */
Ext.define('Ext.layout.component.field.Text', {
    extend: 'Ext.layout.component.field.Field',
    alias: 'layout.textfield',
    requires: ['Ext.util.TextMetrics'],

    type: 'textfield',

    measureContentWidth: function (ownerContext) {
        var me = this,
            owner = me.owner,
            width = me.callParent(arguments),
            inputContext = ownerContext.inputContext,
            inputEl, value, calcWidth, max, min;

        if (owner.grow) {
            inputEl = owner.inputEl;

            // Find the width that contains the whole text value
            value = (inputEl.dom.value || (owner.hasFocus ? '' : owner.emptyText) || '') + owner.growAppend;
            calcWidth = inputEl.getTextWidth(value) + inputContext.getFrameInfo().width;

            max = owner.growMax;
            min = Math.min(max, width);
            max = Math.max(owner.growMin, max, min);

            // Constrain
            calcWidth = Ext.Number.constrain(calcWidth, owner.growMin, max);
            if (width != calcWidth) {
                width = inputContext.setWidth(calcWidth);
            }
        }

        return width;
    }
});
