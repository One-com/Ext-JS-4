/**
 * Simple helper class for easily creating image components. This simply renders an image tag to the DOM
 * with the configured src.
 *
 * {@img Ext.Img/Ext.Img.png Ext.Img component}
 *
 * ## Example usage: 
 *
 *     var changingImage = Ext.create('Ext.Img', {
 *         src: 'http://www.sencha.com/img/20110215-feat-html5.png',
 *         renderTo: Ext.getBody()
 *     });
 *      
 *     // change the src of the image programmatically
 *     changingImage.setSrc('http://www.sencha.com/img/20110215-feat-perf.png');
*/
Ext.define('Ext.Img', {
    extend: 'Ext.Component',
    alias: ['widget.image', 'widget.imagecomponent'],

    autoEl: 'img',

    /**
     * @cfg {String} src
     * The image src.
     */
    src: '',

    /**
     * @cfg {String} alt
     * The descriptive text for non-visual UI description.
     */
    alt: '',

    getElConfig: function() {
        return Ext.apply(this.callParent(), {
            src: this.src,
            alt: this.alt
        });
    },
    
    // null out this function, we can't set any html inside the image
    initRenderTpl: Ext.emptyFn,
    
    /**
     * Updates the {@link #src} of the image.
     */
    setSrc: function(src) {
        var me = this,
            img = me.el;
        me.src = src;
        if (img) {
            img.dom.src = src;
        }
    }
});
