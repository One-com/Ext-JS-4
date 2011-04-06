/**
 * @author Aaron Conran
 * @class Ext.data.TreeStore
 * @extends Ext.data.AbstractStore
 *
 * <p>A store class that allows the representation of hierarchical data.</p>
 * @constructor
 * @param {Object} config Optional config object
 */
Ext.define('Ext.data.TreeStore', {
    extend: 'Ext.data.AbstractStore',
    requires: ['Ext.data.RecordNode'],
    
    /**
     * @cfg {Boolean} clearOnLoad (optional) Default to true. Remove previously existing
     * child nodes before loading.
     */
    clearOnLoad : true,

    /**
     * @cfg {String} nodeParam The name of the parameter sent to the server which contains
     * the identifier of the node. Defaults to <tt>'node'</tt>.
     */
    nodeParam: 'node',

    /**
     * @cfg {String} defaultRootId
     * The default root id. Defaults to 'root'
     */
    defaultRootId: 'root',

    constructor: function(config) {
        config = config || {};
        var me = this,
            rootCfg = config.root || {},
            rootNode;
            
        rootCfg.id = rootCfg.id || me.defaultRootId;

        // create a default rootNode and create internal data struct.
        rootNode = Ext.create('Ext.data.RecordNode', rootCfg);
        me.tree = Ext.create('Ext.data.Tree', rootNode);
        me.tree.treeStore = me;

        me.callParent([config]);
        
        //<deprecated since=0.99>
        if (Ext.isDefined(me.nodeParameter)) {
            throw "Ext.data.TreeStore: nodeParameter has been renamed to nodeParam for consistency";
        }
        //</deprecated>

        if (config.root) {
            me.read({
                node: rootNode,
                doPreload: true
            });
        }
    },


    /**
     * Returns the root node for this tree.
     * @return {Ext.data.RecordNode}
     */
    getRootNode: function() {
        return this.tree.getRootNode();
    },

    /**
     * Returns the record node by id
     * @return {Ext.data.RecordNode}
     */
    getNodeById: function(id) {
        return this.tree.getNodeById(id);
    },


    // new options are
    // * node - a node within the tree
    // * doPreload - private option used to preload existing childNodes
    load: function(options) {
        options = options || {};
        options.params = options.params || {};

        var me = this,
            node = options.node || me.tree.getRootNode(),
            reader = this.proxy.reader,
            records,
            record,
            root;

        if (me.clearOnLoad) {
            while (node.firstChild){
                node.removeChild(node.firstChild);
            }
        }

        if (!options.doPreload) {
            Ext.applyIf(options, {
                node: node
            });
            record = node.getRecord();
            options.params[me.nodeParam] = record ? record.getId() : 'root';
            return me.callParent([options]);
        } else {
            root = reader.getRoot(node.isRoot ? node.attributes : node.getRecord().raw);
            records = reader.extractData(root);
            me.fillNode(node, records);
            return true;
        }
    },

    // @private
    // fills an Ext.data.RecordNode with records
    fillNode: function(node, records) {
        node.loaded = true;
        var ln = records.length,
            recordNode,
            i = 0,
            raw,
            subStore = node.subStore;

        for (; i < ln; i++) {
            raw = records[i].raw;
            records[i].data.leaf = raw.leaf;
            recordNode = Ext.create('Ext.data.RecordNode', {
                id: records[i].getId(),
                leaf: raw.leaf,
                record: records[i],
                expanded: raw.expanded
            });
            node.appendChild(recordNode);
            if (records[i].doPreload) {
                this.load({
                    node: recordNode,
                    doPreload: true
                });
            }
        }

        // maintain the subStore if its already been created
        if (subStore) {
            if (this.clearOnLoad) {
                subStore.removeAll();
            }
            subStore.add.apply(subStore, records);
            if (subStore.sortOnLoad && !subStore.remoteSort) {
                subStore.sort();
            }
        }
    },


    onProxyLoad: function(operation) {
        var me = this,
            successful = operation.wasSuccessful(),
            records = operation.getRecords();

        if (successful) {
            me.fillNode(operation.node, records);
        }

        me.fireEvent('read', me, operation.node, records, successful);
        //this is a callback that would have been passed to the 'read' function and is optional
        Ext.callback(operation.callback, operation.scope || me, [records, operation, successful]);
    },


    /**
     * Returns a flat Ext.data.Store with the correct type of model.
     * @param {Ext.data.RecordNode/Ext.data.Record} record
     * @returns Ext.data.Store
     */
    getSubStore: function(node, callback, scope) {
        // Remap Record to RecordNode
        if (node && node.node) {
            node = node.node;
        }
        return node.getSubStore(callback, scope);
    },


    removeAll: function() {
        this.getRootNode().destroy();
    }
});
