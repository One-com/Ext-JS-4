/**
 * @class Ext.fx.target.Component
 * @private
 * @extends Object
 */

Ext.define('Ext.fx.target.Component', {

    /* Begin Definitions */

    /* End Definitions */

    isAnimTarget: true,

    type: 'component',

    constructor: function(target) {
        this.target = target;
        this.id = this.getId();
        this.callParent([target]);
    },

    // Methods to call to retrieve unspecified "from" values from a target Component
    getPropMethod: {
        top: function() {
            return this.getPosition(true)[1];
        },
        left: function() {
            return this.getPosition(true)[0];
        },
        x: function() {
            return this.getPosition()[0];
        },
        y: function() {
            return this.getPosition()[1];
        },
        height: function() {
            return this.getHeight();
        },
        width: function() {
            return this.getWidth();
        },
        opacity: function() {
            return this.el.getStyle('opacity');
        }
    },

    compMethod: {
        top: 'setPosition',
        left: 'setPosition',
        x: 'setPagePosition',
        y: 'setPagePosition',
        height: 'setSize',
        width: 'setSize',
        opacity: 'setOpacity'
    },

    getId: function() {
        return this.target.id;
    },

    // Read the named attribute from the target Component. Use the defined getter for the attribute
    getAttr: function(attr, val) {
        return [[this.target, val != undefined ? val : this.getPropMethod[attr].call(this.target)]];
    },

    setAttr: function(targetData, isFirstFrame, isLastFrame) {
        var me = this,
            target = me.target,
            ln = targetData.length,
            attrs, attr, o, i, j, meth, targets;
        for (i = 0; i < ln; i++) {
            attrs = targetData[i].attrs;
            for (attr in attrs) {
                targets = attrs[attr].length;
                meth = {
                    setPosition: {},
                    setPagePosition: {},
                    setSize: {},
                    setOpacity: {}
                };
                for (j = 0; j < targets; j++) {
                    o = attrs[attr][j];
                    // We REALLY want a single function call, so push these down to merge them: eg
                    // meth.setPagePosition.target = <targetComponent>
                    // meth.setPagePosition['x'] = 100
                    // meth.setPagePosition['y'] = 100
                    meth[me.compMethod[attr]].target = o[0];
                    meth[me.compMethod[attr]][attr] = parseInt(o[1], 10);
                }
                if (meth.setPosition.target) {
                    o = meth.setPosition;
                    o.target.setPosition(o.left, o.top);
                }
                if (meth.setPagePosition.target) {
                    o = meth.setPagePosition;
                    o.target.setPagePosition(o.x, o.y);
                }
                if (meth.setSize.target) {
                    o = meth.setSize;
                    var w = o.width,
                        h = o.height;

                    // Dimensions not being animated MUST NOT be autosized. They must remain at current value.
                    if (w === undefined) {
                        w = o.target.getWidth();
                    }
                    if (h === undefined) {
                        h = o.target.getHeight();
                    }

                    // Only set the size of the Component on the last frame, or if the animation was
                    // configured with dynamic: true.
                    // In other cases, we just set the target element size.
                    // This will result in either clipping if animating a reduction in size, or the revealing of
                    // the inner elements of the Component if animating an increase in size.
                    // Component's animate function initially resizes to the larger size before resizing the
                    // outer element to clip the contents.
                    if (isLastFrame || me.dynamic) {
                        o.target.componentLayout.childrenChanged = true;

                        // Flag if we are being called by an animating layout: use setCalculatedSize
                        if (me.layoutAnimation) {
                            o.target.setCalculatedSize(w, h);
                        } else {
                            o.target.setSize(w, h);
                        }
                    }
                    else {
                        o.target.el.setSize(w, h);
                    }
                }
                if (meth.setOpacity.target) {
                    o = meth.setOpacity;
                    o.target.el.setStyle('opacity', o.opacity);
                }
            }
        }
    }
});
