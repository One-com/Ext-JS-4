/**
 * @class Ext.toolbar.Separator
 * @extends Ext.toolbar.Item
 * A simple class that adds a vertical separator bar between toolbar items
 * (css class:<tt>'x-toolbar-separator'</tt>). 
 * {@img Ext.toolbar.Separator/Ext.toolbar.Separator.png Toolbar Separator}
 * Example usage:
 * <pre><code>
    Ext.create('Ext.panel.Panel', {
        title: 'Toolbar Seperator Example',
        width: 300,
        height: 200,
        tbar : [
            'Item 1',
            {xtype: 'tbseparator'}, // or '-'
            'Item 2'
        ],
        renderTo: Ext.getBody()
    }); 
</code></pre>
 * @constructor
 * Creates a new Separator
 * @xtype tbseparator
 */
Ext.define('Ext.toolbar.Separator', {
    extend: 'Ext.toolbar.Item',
    alias: 'widget.tbseparator',
    alternateClassName: 'Ext.Toolbar.Separator',
    cls: Ext.baseCSSPrefix + 'toolbar-separator',
    focusable: false
});