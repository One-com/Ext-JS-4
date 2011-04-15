/**
 * @class Ext.panel.Tool
 * @extends Ext.Component
 * 
 * @xtype tool
 */
Ext.define('Ext.panel.Tool', {
    extend: 'Ext.Component',
    requires: ['Ext.tip.QuickTipManager'],
    alias: 'widget.tool',

    baseCls: Ext.baseCSSPrefix + 'tool',
    disableCls: Ext.baseCSSPrefix + 'tool-disabled',
    toolPressedCls: Ext.baseCSSPrefix + 'tool-pressed',
    toolOverCls: Ext.baseCSSPrefix + 'tool-over',
    ariaRole: 'button',
    renderTpl: ['<img src="{blank}" class="{baseCls}-{type}" role="presentation"/>'],
    disabled: false,

    initComponent: function() {
        var me = this;
        me.addEvents('click');
        me.type = me.type || me.id;

        Ext.applyIf(me.renderData, {
            baseCls: me.baseCls,
            blank: Ext.BLANK_IMAGE_URL,
            type: me.type
        });
        me.renderSelectors.toolEl = '.' + me.baseCls + '-' + me.type;
        me.callParent();
    },

    afterRender: function() {
        var me = this;
        me.callParent(arguments);
        if (me.qtip) {
            if (Ext.isObject(me.qtip)) {
                Ext.tip.QuickTipManager.register(Ext.apply({
                    target: me.id
                }, me.qtip));
            }
            else {
                me.toolEl.dom.qtip = me.qtip;
            }
        }

        me.mon(me.toolEl, {
            click: me.onClick,
            mousedown: me.onMouseDown,
            mouseover: me.onMouseOver,
            mouseout: me.onMouseOut,
            scope: me
        });
    },

    setType: function(type) {
        this.type = type;
        if (this.rendered) {
            this.toolEl.dom.className = this.baseCls + '-' + type;
        }
    },

    enable: function() {
        this.toolEl.removeCls(this.disbledCls);
        this.disabled = false;
    },

    disable: function() {
        this.toolEl.addCls(this.disbledCls);
        this.disabled = true;
    },

    bindTo: function(component) {
        this.owner = component;
    },

    onClick: function(e, target) {
        if (this.disabled) {
            return false;
        }

        var me    = this,
            owner = me.owner || me.ownerCt;

        //remove the pressed + over class
        me.el.removeCls(me.toolPressedCls);
        me.el.removeCls(me.toolOverCls);

        if (me.stopEvent !== false) {
            e.stopEvent();
        }

        if (me.handler) {
            me.handler.call(me.scope || me, e, target, owner, me);
        }

        this.fireEvent('click', me, e, target, owner, me);
        return true;
    },

    /**
     * Called then the user pressing their mouse button down on a tool
     * Adds the press class ({@link #toolPressedCls})
     */
    onMouseDown: function() {
        if (this.disabled) {
            return false;
        }

        this.el.addCls(this.toolPressedCls);
    },

    /**
     * Called when the user rolls over a tool
     * Adds the over class ({@link #toolOverCls})
     */
    onMouseOver: function() {
        this.el.addCls(this.toolOverCls);
    },

    /**
     * Called when the user rolls out from a tool.
     * Removes the over class ({@link #toolOverCls})
     */
    onMouseOut: function() {
        this.el.removeCls(this.toolOverCls);
    }
});