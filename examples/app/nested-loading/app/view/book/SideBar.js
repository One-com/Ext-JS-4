/**
 * The sidebar view for the application. Used to display a list of books.
 * @extends Ext.DataView
 */
Ext.define('Books.view.book.SideBar', {
    alias: 'widget.booksidebar',
    extend: 'Ext.DataView',
    
    initComponent: function() {
        Ext.apply(this, {
            id: 'sidebar',
            
            dock: 'left',
            width: 180,
            border: false,
            cls: 'sidebar-list',
            
            selModel: {
                deselectOnContainerClick: false
            },
            
            store: '',
            itemSelector: '.product',
            tpl: new Ext.XTemplate(
                '<div class="sidebar-title">Books</div>',
                '<tpl for=".">',
                    '<div class="product">{name}</div>',
                '</tpl>'
            )
        });
                
        this.callParent(arguments);
    }
});