Ext.require('Ext.util.DelayedTask', function() {

    Ext.util.Event = Ext.extend(Object, (function() {
        function createBuffered(handler, listener, o, scope) {
            listener.task = new Ext.util.DelayedTask();
            return function() {
                listener.task.delay(o.buffer, handler, scope, Ext.Array.toArray(arguments));
            };
        }

        function createDelayed(handler, listener, o, scope) {
            return function() {
                var task = new Ext.util.DelayedTask();
                if (!listener.tasks) {
                    listener.tasks = [];
                }
                listener.tasks.push(task);
                task.delay(o.delay || 10, handler, scope, Ext.Array.toArray(arguments));
            };
        }

        function createSingle(handler, listener, o, scope) {
            return function() {
                listener.ev.removeListener(listener.fn, scope);
                return handler.apply(scope, arguments);
            };
        }

        return {
            isEvent: true,

            constructor: function(observable, name) {
                this.name = name;
                this.observable = observable;
                this.listeners = [];
            },

            addListener: function(fn, scope, options) {
                var me = this,
                    listener;
                    scope = scope || me.observable;

                //<debug error>
                if (!fn) {
                    throw new Error("["+Ext.getClassName(this.observable)+"#addListener -> Ext.util.Event#addListener] Invalid callback function: " + fn);
                }
                //</debug>

                if (!me.isListening(fn, scope)) {
                    listener = me.createListener(fn, scope, options);
                    if (me.firing) {
                        // if we are currently firing this event, don't disturb the listener loop
                        me.listeners = me.listeners.slice(0);
                    }
                    me.listeners.push(listener);
                }
            },

            createListener: function(fn, scope, o) {
                o = o || {};
                scope = scope || this.observable;

                var listener = {
                        fn: fn,
                        scope: scope,
                        o: o,
                        ev: this
                    },
                    handler = fn;

                if (o.delay) {
                    handler = createDelayed(handler, listener, o, scope);
                }
                if (o.buffer) {
                    handler = createBuffered(handler, listener, o, scope);
                }
                if (o.single) {
                    handler = createSingle(handler, listener, o, scope);
                }

                listener.fireFn = handler;
                return listener;
            },

            findListener: function(fn, scope) {
                var listeners = this.listeners,
                i = listeners.length,
                listener,
                s;

                while (i--) {
                    listener = listeners[i];
                    if (listener) {
                        s = listener.scope;
                        if (listener.fn == fn && (s == scope || s == this.observable)) {
                            return i;
                        }
                    }
                }

                return - 1;
            },

            isListening: function(fn, scope) {
                return this.findListener(fn, scope) !== -1;
            },

            removeListener: function(fn, scope) {
                var me = this,
                    index,
                    listener,
                    k;
                index = me.findListener(fn, scope);
                if (index != -1) {
                    listener = me.listeners[index];

                    if (me.firing) {
                        me.listeners = me.listeners.slice(0);
                    }

                    // cancel and remove a buffered handler that hasn't fired yet
                    if (listener.task) {
                        listener.task.cancel();
                        delete listener.task;
                    }

                    // cancel and remove all delayed handlers that haven't fired yet
                    k = listener.tasks && listener.tasks.length;
                    if (k) {
                        while (k--) {
                            listener.tasks[k].cancel();
                        }
                        delete listener.tasks;
                    }

                    // remove this listener from the listeners array
                    me.listeners.splice(index, 1);
                    return true;
                }

                return false;
            },

            // Iterate to stop any buffered/delayed events
            clearListeners: function() {
                var listeners = this.listeners,
                    i = listeners.length;

                while (i--) {
                    this.removeListener(listeners[i].fn, listeners[i].scope);
                }
            },

            fire: function() {
                var me = this,
                    listeners = me.listeners,
                    count = listeners.length,
                    i,
                    args,
                    listener;

                if (count > 0) {
                    me.firing = true;
                    for (i = 0; i < count; i++) {
                        listener = listeners[i];
                        args = arguments.length ? Array.prototype.slice.call(arguments, 0) : [];
                        if (listener.o) {
                            args.push(listener.o);
                        }
                        if (listener && listener.fireFn.apply(listener.scope || me.observable, args) === false) {
                            return (me.firing = false);
                        }
                    }
                }
                me.firing = false;
                return true;
            }
        };
    })());
});
