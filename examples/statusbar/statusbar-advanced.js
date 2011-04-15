Ext.Loader.setConfig({
    enabled: true
});

Ext.Loader.setPath('Ext.ux', '../ux/');

Ext.require([
  'Ext.form.Panel',
  'Ext.form.field.Date',
  'Ext.tip.QuickTipManager',
  'Ext.ux.statusbar.StatusBar',
  'Ext.ux.statusbar.ValidationStatus'
]);


Ext.onReady(function(){
    Ext.tip.QuickTipManager.init();
    var fp = Ext.create('Ext.FormPanel', {
        id: 'status-form',
        renderTo: Ext.getBody(),
        labelWidth: 75,
        width: 350,
        border: false,
        bodyPadding: 10,
        defaults: {
            anchor: '95%',
            allowBlank: false,
            selectOnFocus: true,
            msgTarget: 'side'
        },
        items:[{
            xtype: 'textfield',
            fieldLabel: 'Name',
            blankText: 'Name is required'
        },{
            xtype: 'datefield',
            fieldLabel: 'Birthdate',
            blankText: 'Birthdate is required'
        }],
        dockedItems: {
            xtype: 'toolbar',
            dock: 'bottom',
            ui: 'footer',
            items: ['->', {
                text: 'Save',
                handler: function(){
                    if(fp.getForm().isValid()){
                        var sb = Ext.getCmp('form-statusbar');
                        sb.showBusy('Saving form...');
                        fp.getEl().mask();
                        fp.getForm().submit({
                            url: 'fake.php',
                            success: function(){
                                sb.setStatus({
                                    text:'Form saved!',
                                    iconCls:'',
                                    clear: true
                                });
                                fp.getEl().unmask();
                            }
                        });
                    }
                }
            }]
        }
    });

    Ext.create('Ext.Panel', {
        title: 'StatusBar with Integrated Form Validation',
        renderTo: Ext.getBody(),
        width: 350,
        autoHeight: true,
        layout: 'fit',
        items: fp,
        bbar: Ext.create('Ext.ux.StatusBar', {
            id: 'form-statusbar',
            defaultText: 'Ready',
            plugins: Ext.create('Ext.ux.statusbar.ValidationStatus', {form:'status-form'})
        })
    });

});