/**
 * @class Ext.tree.Column
 * @extends Ext.grid.column.Column
 * 
 * Provides indentation and folder structure markup for a Tree taking into account
 * depth and position within the tree hierarchy.
 * 
 * @private
 */
Ext.define('Ext.tree.Column', {
    extend: 'Ext.grid.column.Column',
    alias: 'widget.treecolumn',

    initComponent: function() {
        var origRenderer = this.renderer || this.defaultRenderer,
            origScope    = this.scope || window;

        this.renderer = function(value, metaData, record, rowIdx, colIdx, store, view) {
            var buf   = [],
                format = Ext.String.format,
                depth = record.getDepth(),
                treePrefix  = Ext.baseCSSPrefix + 'tree-',
                elbowPrefix = treePrefix + 'elbow-',
                expanderCls = treePrefix + 'expander',
                imgText     = '<img src="{1}" class="{0}" />',
                checkboxText= '<input type="checkbox" class="{0}" {1} />',
                formattedValue = origRenderer.apply(origScope, arguments),
                href = record.get('href'),
                target = record.get('hrefTarget');

            while (record) {
                if (!record.isRoot() || (record.isRoot() && view.rootVisible)) {
                    if (record.getDepth() === depth) {
                        buf.unshift(format(imgText,
                            treePrefix + 'icon ' + 
                            treePrefix + 'icon' + (record.get('icon') ? '-inline ' : (record.isLeaf() ? '-leaf ' : '-parent ')) +
                            (record.get('iconCls') || ''),
                            record.get('icon') || Ext.BLANK_IMAGE_URL
                        ));
                        if (record.get('checked') !== null) {
                            buf.unshift(format(checkboxText, (treePrefix + 'checkbox'), record.get('checked') ? 'checked="checked"' : ''));
                            if (record.get('checked')) {
                                metaData.tdCls += (' ' + Ext.baseCSSPrefix + 'tree-checked');
                            }
                        }
                        if (record.isLast()) {
                            if (record.isLeaf()) {
                                buf.unshift(format(imgText, (elbowPrefix + 'end'), Ext.BLANK_IMAGE_URL));
                            } else {
                                buf.unshift(format(imgText, (elbowPrefix + 'end-plus ' + expanderCls), Ext.BLANK_IMAGE_URL));
                            }
                            
                        } else {
                            if (record.isLeaf()) {
                                buf.unshift(format(imgText, (treePrefix + 'elbow'), Ext.BLANK_IMAGE_URL));
                            } else {
                                buf.unshift(format(imgText, (elbowPrefix + 'plus ' + expanderCls), Ext.BLANK_IMAGE_URL));
                            }
                        }
                    } else {
                        if (record.isLast() || record.getDepth() === 0) {
                            buf.unshift(format(imgText, (elbowPrefix + 'empty'), Ext.BLANK_IMAGE_URL));
                        } else if (record.getDepth() !== 0) {
                            buf.unshift(format(imgText, (elbowPrefix + 'line'), Ext.BLANK_IMAGE_URL));
                        }                      
                    }
                }
                record = record.parentNode;
            }
            if (href) {
                formattedValue = format('<a href="{0}" target="{1}">{2}</a>', href, target, formattedValue);
            }
            return buf.join("") + formattedValue;
        };
        this.callParent(arguments);
    },

    defaultRenderer: function(value) {
        return value;
    }
});