/**
 * @class Ext.grid.LockingView
 * This class is used internally to provide a single interface when using
 * a locking grid. Internally, the locking grid creates 2 separate grids,
 * so this class is used to map calls appropriately.
 * @ignore
 */
Ext.define('Ext.grid.LockingView', {
    
    mixins: {
        observable: 'Ext.util.Observable'
    },
    
    eventRelayRe: /^(beforeitem|beforecontainer|item|container|cell)/,
    
    constructor: function(config){
        var me = this,
            eventNames = [],
            eventRe = me.eventRelayRe,
            locked = config.locked.getView(),
            normal = config.normal.getView(),
            events,
            event;
        
        Ext.apply(me, {
            lockedView: locked,
            normalView: normal,
            lockedGrid: config.locked,
            normalGrid: config.normal,
            panel: config.panel
        });
        me.mixins.observable.constructor.call(me, config);
        
        // relay events
        events = locked.events;
        for (event in events) {
            if (events.hasOwnProperty(event) && eventRe.test(event)) {
                eventNames.push(event);
            }
        }
        me.relayEvents(locked, eventNames);
        me.relayEvents(normal, eventNames);
        
        normal.on({
            scope: me,
            itemmouseleave: me.onItemMouseLeave,
            itemmouseenter: me.onItemMouseEnter
        });
        
        locked.on({
            scope: me,
            itemmouseleave: me.onItemMouseLeave,
            itemmouseenter: me.onItemMouseEnter
        });
    },
    
    getGridColumns: function() {
        var cols = this.lockedGrid.headerCt.getGridColumns();
        return cols.concat(this.normalGrid.headerCt.getGridColumns());
    },
    
    onItemMouseEnter: function(view, record){
        var me = this,
            locked = me.lockedView,
            other = me.normalView,
            item;
            
        if (view.trackOver) {
            if (view !== locked) {
                other = locked;
            }
            item = other.getNode(record);
            other.highlightItem(item);
        }
    },
    
    onItemMouseLeave: function(view, record){
        var me = this,
            locked = me.lockedView,
            other = me.normalView;
            
        if (view.trackOver) {
            if (view !== locked) {
                other = locked;
            }
            other.clearHighlight();
        }
    },
    
    relayFn: function(name, args){
        args = args || [];
        
        var view = this.lockedView;
        view[name].apply(view, args || []);    
        view = this.normalView;
        view[name].apply(view, args || []);   
    },
    
    getSelectionModel: function(){
        return this.panel.getSelectionModel();    
    },
    
    getStore: function(){
        return this.panel.store;
    },
    
    getNode: function(nodeInfo){
        // default to the normal view
        return this.normalView.getNode(nodeInfo);
    },
    
    getCell: function(record, column){
        var view = this.lockedView,
            row;
        
        
        if (view.getHeaderAtIndex(column) === -1) {
            view = this.normalView;
        }
        
        row = view.getNode(record);
        return Ext.fly(row).down(column.getCellSelector());
    },
    
    getRecord: function(node){
        var result = this.lockedView.getRecord(node);
        if (!node) {
            result = this.normalView.getRecord(node);
        }
        return result;
    },
    
    refreshNode: function(){
        this.relayFn('refreshNode', arguments);
    },
    
    refresh: function(){
        this.relayFn('refresh', arguments);
    },
    
    bindStore: function(){
        this.relayFn('bindStore', arguments);
    },
    
    addRowCls: function(){
        this.relayFn('addRowCls', arguments);
    },
    
    removeRowCls: function(){
        this.relayFn('removeRowCls', arguments);
    }
       
});