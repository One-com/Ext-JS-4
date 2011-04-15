/**
 * @class Ext.menu.DatePicker
 * @extends Ext.menu.Menu
 * <p>A menu containing an {@link Ext.picker.Date} Component.</p>
 * <p>Notes:</p><div class="mdetail-params"><ul>
 * <li>Although not listed here, the <b>constructor</b> for this class
 * accepts all of the configuration options of <b>{@link Ext.picker.Date}</b>.</li>
 * <li>If subclassing DateMenu, any configuration options for the DatePicker must be
 * applied to the <tt><b>initialConfig</b></tt> property of the DateMenu.
 * Applying {@link Ext.picker.Date DatePicker} configuration settings to
 * <b><tt>this</tt></b> will <b>not</b> affect the DatePicker's configuration.</li>
 * </ul></div>
 * @xtype datemenu
 * @author Nicolas Ferrero
 */
 Ext.define('Ext.menu.DatePicker', {
     extend: 'Ext.menu.Menu',
     
     alias: 'widget.datemenu',
     
     requires: [
        'Ext.picker.Date'
     ],
     
    /** 
     * @cfg {Boolean} hideOnClick
     * False to continue showing the menu after a date is selected, defaults to true.
     */
    hideOnClick : true,
    
    /** 
     * @cfg {String} pickerId
     * An id to assign to the underlying date picker. Defaults to <tt>null</tt>.
     */
    pickerId : null,
    
    /** 
     * @cfg {Number} maxHeight
     * @hide 
     */

    /**
     * The {@link Ext.picker.Date} instance for this DateMenu
     * @property picker
     * @type Ext.picker.Date
     */
    
    /**
     * @event click
     * @hide
     */
    
    /**
     * @event itemclick
     * @hide
     */

    initComponent : function(){
        var me = this;
        
        Ext.apply(me, {
            showSeparator: false,
            plain: true,
            items: Ext.applyIf({
                cls: Ext.baseCSSPrefix + 'menu-date-item',
                id: me.pickerId,
                xtype: 'datepicker'
            }, me.initialConfig)
        });

        me.callParent(arguments);
        
        me.picker = me.down('datepicker');
        /**
         * @event select
         * Fires when a date is selected from the {@link #picker Ext.picker.Date}
         * @param {Ext.picker.Date} picker The {@link #picker Ext.picker.Date}
         * @param {Date} date The selected date
         */
        me.relayEvents(me.picker, ['select']);
        
        if (me.hideOnClick) {
            me.on('select', me.hidePickerOnSelect, me);
        }
    },
    
    hidePickerOnSelect: function() {
        if (this.hideOnClick) {
            this.hide();
        }
    }
 });
