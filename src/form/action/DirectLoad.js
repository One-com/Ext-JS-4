/**
 * Provides {@link Ext.direct.Manager} support for loading form data.
 *
 * This example illustrates usage of Ext.direct.Direct to **load** a form through Ext.Direct.
 *
 *     var myFormPanel = new Ext.form.Panel({
 *         // configs for FormPanel
 *         title: 'Basic Information',
 *         renderTo: document.body,
 *         width: 300, height: 160,
 *         padding: 10,
 *
 *         // configs apply to child items
 *         defaults: {anchor: '100%'},
 *         defaultType: 'textfield',
 *         items: [{
 *             fieldLabel: 'Name',
 *             name: 'name'
 *         },{
 *             fieldLabel: 'Email',
 *             name: 'email'
 *         },{
 *             fieldLabel: 'Company',
 *             name: 'company'
 *         }],
 *
 *         // configs for BasicForm
 *         api: {
 *             // The server-side method to call for load() requests
 *             load: Profile.getBasicInfo,
 *             // The server-side must mark the submit handler as a 'formHandler'
 *             submit: Profile.updateBasicInfo
 *         },
 *         // specify the order for the passed params
 *         paramOrder: ['uid', 'foo']
 *     });
 *
 *     // load the form
 *     myFormPanel.getForm().load({
 *         // pass 2 arguments to server side getBasicInfo method (len=2)
 *         params: {
 *             foo: 'bar',
 *             uid: 34
 *         }
 *     });
 *
 * The data packet sent to the server will resemble something like:
 *
 *     [
 *         {
 *             "action":"Profile","method":"getBasicInfo","type":"rpc","tid":2,
 *             "data":[34,"bar"] // note the order of the params
 *         }
 *     ]
 *
 * The form will process a data packet returned by the server that is similar to the following format:
 *
 *     [
 *         {
 *             "action":"Profile","method":"getBasicInfo","type":"rpc","tid":2,
 *             "result":{
 *                 "success":true,
 *                 "data":{
 *                     "name":"Fred Flintstone",
 *                     "company":"Slate Rock and Gravel",
 *                     "email":"fred.flintstone@slaterg.com"
 *                 }
 *             }
 *         }
 *     ]
 */
Ext.define('Ext.form.action.DirectLoad', {
    extend:'Ext.form.action.Load',
    requires: ['Ext.direct.Manager'],
    alternateClassName: 'Ext.form.Action.DirectLoad',
    alias: 'formaction.directload',

    type: 'directload',

    run: function() {
        this.form.api.load.apply(window, this.getArgs());
    },

    /**
     * @private
     * Builds the arguments to be sent to the Direct call.
     * @return Array
     */
    getArgs: function() {
        var me = this,
            args = [],
            form = me.form,
            paramOrder = form.paramOrder,
            params = me.getParams(),
            i, len;

        // If a paramOrder was specified, add the params into the argument list in that order.
        if (paramOrder) {
            for (i = 0, len = paramOrder.length; i < len; i++) {
                args.push(params[paramOrder[i]]);
            }
        }
        // If paramsAsHash was specified, add all the params as a single object argument.
        else if (form.paramsAsHash) {
            args.push(params);
        }

        // Add the callback and scope to the end of the arguments list
        args.push(me.onComplete, me);

        return args;
    },

    // Direct actions have already been processed and therefore
    // we can directly set the result; Direct Actions do not have
    // a this.response property.
    processResponse: function(result) {
        return (this.result = result);
    },

    onComplete: function(data, response) {
        if (data) {
            this.onSuccess(data);
        } else {
            this.onFailure(null);
        }
    }
});


