/**
 * @class Ext.Dispatcher
 * @extends Ext.util.Dispatcher
 * 
 * <p>The Dispatcher is responsible for sending requests through to a specific controller
 * action. It is usually invoked either by a UI event handler calling {@link Ext#dispatch Ext.dispatch}, or by the 
 * {@link Ext.Router Router} recognizing a change in the page url.</p>
 * 
 * <p>Ext.Dispatcher is the default instance of {@link Ext.util.Dispatcher} that is automatically created for every
 * application. Usually it is the only instance that you will need.</p>
 * 
 * <p>Let's say we have an application that manages instances of a Contact model using a contacts controller:</p>
 * 
<pre><code>
Ext.regModel('Contact', {
    fields: ['id', 'name', 'email']
});

//the controller has a single action - list - which just loads the Contacts and logs them to the console
Ext.regController('contacts', {
    list: function() {
        new Ext.data.Store({
            model: 'Contact',
            autoLoad: {
                callback: function(contacts) {
                    console.log(contacts);
                }
            }
        });
    }
});
</code></pre>
 * 
 * <p>We can easily dispatch to the contacts controller's list action from anywhere in our app:</p>
 * 
<pre><code>
Ext.dispatch({
    controller: 'contacts',
    action    : 'list',
    
    historyUrl: 'contacts/list',
    
    anotherOption: 'some value'
});
</code></pre>
 * 
 * <p>The Dispatcher finds the contacts controller and calls its list action. We also passed in a couple of additional
 * options to dispatch - historyUrl and anotherOption. 'historyUrl' is a special parameter which automatically changes
 * the browser's url when passed. For example, if your application is being served from http://yourapp.com, dispatching
 * with the options we passed above would update the url to http://yourapp.com/#contacts/list, as well as calling the 
 * controller action as before.</p>
 * 
 * <p>We also passed a second configuration into dispatch - anotherOption. We can access this inside our controller 
 * action like this:</p>
 * 
<pre><code>
Ext.regController('contacts', {
    list: function(options) {
        console.log(options.anotherOption); // 'some value'
    }
});
</code></pre>
 * 
 * <p>We can pass anything in to Ext.dispatch and have it come through to our controller action. Internally, all of the
 * options that we pass to dispatch are rolled into an Ext.Interaction. Interaction is a very simple class that
 * represents a single request into the application - typically the controller and action names plus any additional 
 * information like the Model instance that a particular action is concerned with.</p>
 * 
 * @singleton
 */
Ext.define('Ext.Dispatcher', {
    extend: 'Ext.util.Dispatcher',
    singleton: true
}, function() {
    /**
     * Shorthand for {@link Ext.Dispatcher#dispatch}. Dispatches a request to a controller action
     * 
     * @member Ext
     * @method dispatch
     */
    Ext.dispatch = function() {
        return Ext.Dispatcher.dispatch.apply(Ext.Dispatcher, arguments);
    };

    /**
     * Shorthand for {@link Ext.Dispatcher#redirect}. Dispatches a request to a controller action, adding to the History
     * stack and updating the page url as necessary.
     * 
     * @member Ext
     * @method redirect
     */
    Ext.redirect = function() {
        return Ext.Dispatcher.redirect.apply(Ext.Dispatcher, arguments);
    };

    Ext.createRedirect = this.createRedirect;
});