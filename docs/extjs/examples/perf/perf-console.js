// bookmarklet: javascript:void(window.open("../perf/perf-console.html","perfcon"))

Ext.Loader.setPath({
    PerfCon: ''
});

Ext.require([
    'Ext.container.Viewport',
    'Ext.tab.Panel',
    'Ext.History',

    'Ext.form.field.Number',
    'Ext.form.field.TextArea',

    'Ext.toolbar.TextItem',

    'PerfCon.Console'
]);

function doPerfConsole () {

    var build = 1;

    function onGatherStats () {
        var data = window.opener.Ext.Perf.getData(),
            con = viewport.down('#perfcon');

        con.addSample({
            env: 'x',
            build: build,
            test: window.opener.location.pathname,
            data: data
        });
    }

    function onRawDataChange (con, json) {
        Ext.History.add('data='+json);
    }

    var viewport = new Ext.Viewport({
        layout: 'fit',
        renderTo: Ext.getBody(),
        items: [{
            xtype: 'panel',
            layout: 'fit',
            border: false,
            tbar: [
                { text: 'Gather Stats', handler: onGatherStats },
                '->',
                {
                    xtype: 'numberfield',
                    fieldLabel: 'Build',
                    style: 'margin-right: 10px;',
                    labelWidth: 30,
                    width: 100,
                    value: build,
                    listeners: {
                        change: function (field) {
                            build = field.getValue();
                        }
                    }
                }
            ],
            items: [
                new PerfCon.Console({
                    itemId: 'perfcon',
                    listeners: {
                        rawdataupdate: onRawDataChange
                    }
                })
            ]
        }]
    });

    var hash = Ext.History.getHash();
    if (hash) {
        var con = viewport.down('#perfcon'),
            json = hash.substring(5),
            data;

        try {
            data = Ext.decode(json);
        } catch (e) {
            json = decodeURIComponent(json);
            data = Ext.decode(json);
        }

        con.addSample(data);
    } else {
        onGatherStats();
    }
}

Ext.onReady(function () {
    Ext.History.useTopWindow = false;
    Ext.History.init(doPerfConsole);
    //doPerfConsole();
});
