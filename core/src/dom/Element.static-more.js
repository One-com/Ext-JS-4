/**
 * @class Ext.core.Element
 */
(function(){
    var doc = document,
        isCSS1 = doc.compatMode == "CSS1Compat",
        ELEMENT = Ext.core.Element,
        fly = function(el){
            if (!_fly) {
                _fly = new Ext.core.Element.Flyweight();
            }
            _fly.dom = el;
            return _fly;
        }, _fly;

    Ext.apply(ELEMENT, {
        isAncestor : function(p, c) {
            var ret = false;

            p = Ext.getDom(p);
            c = Ext.getDom(c);
            if (p && c) {
                if (p.contains) {
                    return p.contains(c);
                } else if (p.compareDocumentPosition) {
                    return !!(p.compareDocumentPosition(c) & 16);
                } else {
                    while ((c = c.parentNode)) {
                        ret = c == p || ret;
                    }
                }
            }
            return ret;
        },

        getViewWidth : function(full) {
            return full ? ELEMENT.getDocumentWidth() : ELEMENT.getViewportWidth();
        },

        getViewHeight : function(full) {
            return full ? ELEMENT.getDocumentHeight() : ELEMENT.getViewportHeight();
        },

        getDocumentHeight: function() {
            return Math.max(!isCSS1 ? doc.body.scrollHeight : doc.documentElement.scrollHeight, ELEMENT.getViewportHeight());
        },

        getDocumentWidth: function() {
            return Math.max(!isCSS1 ? doc.body.scrollWidth : doc.documentElement.scrollWidth, ELEMENT.getViewportWidth());
        },

        getViewportHeight: function(){
            return Ext.isIE ?
                   (Ext.isStrict ? doc.documentElement.clientHeight : doc.body.clientHeight) :
                   self.innerHeight;
        },

        getViewportWidth : function() {
            return (!Ext.isStrict && !Ext.isOpera) ? doc.body.clientWidth :
                   Ext.isIE ? doc.documentElement.clientWidth : self.innerWidth;
        },

        getY : function(el) {
            return ELEMENT.getXY(el)[1];
        },

        getX : function(el) {
            return ELEMENT.getXY(el)[0];
        },

        getXY : function(el) {
            var p,
                pe,
                b,
                bt,
                bl,
                dbd,
                x = 0,
                y = 0,
                scroll,
                hasAbsolute,
                bd = (doc.body || doc.documentElement),
                ret = [0,0];

            el = Ext.getDom(el);

            if(el != bd){
                hasAbsolute = fly(el).isStyle("position", "absolute");

                if (el.getBoundingClientRect) {
                    b = el.getBoundingClientRect();
                    scroll = fly(document).getScroll();
                    ret = [Math.round(b.left + scroll.left), Math.round(b.top + scroll.top)];
                } else {
                    p = el;

                    while (p) {
                        pe = fly(p);
                        x += p.offsetLeft;
                        y += p.offsetTop;

                        hasAbsolute = hasAbsolute || pe.isStyle("position", "absolute");

                        if (Ext.isGecko) {
                            y += bt = parseInt(pe.getStyle("borderTopWidth"), 10) || 0;
                            x += bl = parseInt(pe.getStyle("borderLeftWidth"), 10) || 0;

                            if (p != el && !pe.isStyle('overflow','visible')) {
                                x += bl;
                                y += bt;
                            }
                        }
                        p = p.offsetParent;
                    }

                    if (Ext.isSafari && hasAbsolute) {
                        x -= bd.offsetLeft;
                        y -= bd.offsetTop;
                    }

                    if (Ext.isGecko && !hasAbsolute) {
                        dbd = fly(bd);
                        x += parseInt(dbd.getStyle("borderLeftWidth"), 10) || 0;
                        y += parseInt(dbd.getStyle("borderTopWidth"), 10) || 0;
                    }

                    p = el.parentNode;
                    while (p && p != bd) {
                        if (!Ext.isOpera || (p.tagName != 'TR' && !fly(p).isStyle("display", "inline"))) {
                            x -= p.scrollLeft;
                            y -= p.scrollTop;
                        }
                        p = p.parentNode;
                    }
                    ret = [x,y];
                }
            }
            return ret;
        },

        setXY : function(el, xy) {
            (el = Ext.fly(el, '_setXY')).position();

            var pts = el.translatePoints(xy),
                style = el.dom.style,
                pos;

            for (pos in pts) {
                if (!isNaN(pts[pos])) {
                    style[pos] = pts[pos] + "px";
                }
            }
        },

        setX : function(el, x) {
            ELEMENT.setXY(el, [x, false]);
        },

        setY : function(el, y) {
            ELEMENT.setXY(el, [false, y]);
        },

        /**
         * Serializes a DOM form into a url encoded string
         * @param {Object} form The form
         * @return {String} The url encoded form
         */
        serializeForm: function(form) {
            var fElements = form.elements || (document.forms[form] || Ext.getDom(form)).elements,
                hasSubmit = false,
                encoder = encodeURIComponent,
                name,
                data = '',
                type,
                hasValue;

            Ext.each(fElements, function(element){
                name = element.name;
                type = element.type;

                if (!element.disabled && name) {
                    if (/select-(one|multiple)/i.test(type)) {
                        Ext.each(element.options, function(opt){
                            if (opt.selected) {
                                hasValue = opt.hasAttribute ? opt.hasAttribute('value') : opt.getAttributeNode('value').specified;
                                data += String.format("{0}={1}&", encoder(name), encoder(hasValue ? opt.value : opt.text));
                            }
                        });
                    } else if (!(/file|undefined|reset|button/i.test(type))) {
                        if (!(/radio|checkbox/i.test(type) && !element.checked) && !(type == 'submit' && hasSubmit)) {
                            data += encoder(name) + '=' + encoder(element.value) + '&';
                            hasSubmit = /submit/i.test(type);
                        }
                    }
                }
            });
            return data.substr(0, data.length - 1);
        }
    });
})();
