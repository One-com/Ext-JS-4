/**
 * @class Ext.scaffold.Edit
 * @extends Ext.scaffold.Form
 * @private
 */
Ext.scaffold.Edit = Ext.extend(Ext.scaffold.Form, {
    titleFormat: "Edit {0}"
});

Ext.reg('scaffold-edit', Ext.scaffold.Edit);