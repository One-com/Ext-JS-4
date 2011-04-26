
// setInterval(function() {
//     Ext.get('styleCss').dom.href = "/css/style.css?" + Math.ceil(Math.random() * 10000);
// }, 2000)

var searchResults = Ext.create('Ext.XTemplate',
    '<table class="searchResults">',
        '<thead>',
            '<tr>',
                '<th></th>',
                '<th>Result</th>',
                '<th>Class</th>',
            '</tr>',
        '</thead>',
        '<tbody>',
            '<tpl for=".">',
                '<tr>',
                    '<td><div class="icn icon-{iconCls}"></div></td>',
                    '<td class="result"><a href="#">{member}</td>',
                    '<td class="result"><a href="#">{cls}</td>',
                '</tr>',
            '</tpl>',
        '</tbody>',
    '</table>'
);


/**
 * Search box
 */
Ext.onReady(function() {

    var searchStore = new Ext.data.Store({
        fields: [ 'memberType', 'cls', 'member' ],

        proxy: {
            type: 'memory',
            reader: {
                type: 'array'
            }
        },
        
        listeners: {
            datachanged: function() {
                panel.render('search-box');
            }
        }
    });

    var panel = Ext.create('Ext.view.View', {
        store: searchStore,
        tpl: new Ext.XTemplate(
            '<tpl for=".">',
                '<div class="item {memberType}">',
                    '<div class="title">{member}</div>',
                    '<div class="class">{cls}</div>',
                '</div>',
            '</tpl>'
        ),
        id: 'quick-search',
        overItemCls:'x-view-over',
        trackOver: true,
        itemSelector:'div.item',
        singleSelect: true,

        handleClick: function(curItem) {
            curItem = curItem || panel.getSelectionModel().getLastSelected();
            var classId = curItem.data.cls;

            if (req.standAloneMode) {
        		if (window.location.href.match(/api/)) {
        			window.location = classId + '.html';
        		} else {
        			window.location = 'api/' + classId + '.html';
        		}
        		return;
        	}

            var cls = classId;
            if (curItem.data.memberType != 'cls') {
                cls += '#' + curItem.data.memberType + '-' + curItem.data.member;
            }
            panel.hide();
            getDocClass(cls);
        },
        listeners: {
            itemclick: function(panel, item) {
                this.handleClick(item);
            }
        }
    });

    Ext.get('search-field').on('blur', function(ev, el) {
        setTimeout(function(){
            panel.hide();
        }, 100);
    });
    Ext.get('search-field').on('focus', function(ev, el) {
        panel.show();
    });
    
    var submitForm = false;

    /**
     * When a key is pressed in the search field, search for classes, methods, properties, configs, etc
     */
    Ext.get('search-field').on('keyup', function(ev, el) {
        
        // Esc key
        if (ev.keyCode == 27 || el.value == '') {
            panel.hide();
            return;
        }
        else {
            panel.show();
        }

        var curItem = panel.store.indexOf(panel.getSelectionModel().getLastSelected()), //panel.getSelectedRecords()[0],
            lastItem = panel.store.data.length - 1,
            selModel = panel.getSelectionModel();

        // Up arrow
        if (ev.keyCode == 38) {
            if (curItem == undefined) {
                selModel.select(0);
            } else {
                selModel.select(curItem == 0 ? lastItem : (curItem - 1));
            }
        }
        // Down arrow
        else if (ev.keyCode == 40) {
            if (curItem == undefined) {
                selModel.select(0);
            } else {
                selModel.select(curItem == lastItem ? 0 : curItem + 1);
            }
        }
        // Enter key
        else if (ev.keyCode == 13) {
            if(curItem > 0) {
                ev.preventDefault();
                panel.handleClick();
            } else {
                var html = searchResults.apply(filterClasses(Ext.get(el).getValue(), 100))
                showContent('Search', html)
            }
        }
        else {
            searchExt(Ext.get(el).getValue());
        }
    });

    Ext.get(Ext.get('search-field').dom.parentNode).on('submit', function(ev, el) {
        if (!submitForm) {
            ev.preventDefault();            
        }
    });

    var classSearch;
    
    if (req.standAloneMode) {
        if (window.location.href.match(/api/)) {
			req.baseDocURL = '../';
        } else if (window.location.href.match(/guide/)){
			req.baseDocURL = '../';
		}
    }

    Ext.data.JsonP.request({
        callbackKey: 'docsCallback',
        url: req.baseDocURL + '/class_search.json',
        success: function(response) {
            classSearch = response;
        }
    });

    var searchExt = function(term) {
        searchStore.loadData(filterClasses(term), false);
    }

	var filterClasses = function(term, maxResults) {

	    maxResults = maxResults || 10;

	    var result = [];
	    var termExpr = new RegExp(term, "i");
	    var members = ['method', 'config', 'property', 'event'];

	    for (var cls in classSearch) {
	        if (cls.match(termExpr)) {
                result.push({cls: cls, memberType: 'cls', member: cls});
                if (result.length >= maxResults) return result;
	        }
	    }
	    for (var cls in classSearch) {
	        for (var m=0; m< 4; m++) {
	            var member = members[m];
    	        for (var i=0; i< classSearch[cls][member].length; i++) {
    	            var curMember = classSearch[cls][member][i];
    	            if (curMember && curMember.match(termExpr)) {
    	                
    	                var iconCls;
    	                if (member == 'cls') iconCls = 'class';
                        if (member == 'properties') iconCls = 'property';
                        if (member == 'methods') iconCls = 'method';
                        if (member == 'cfgs') iconCls = 'config';
                        if (member == 'events') iconCls = 'event';
                        
                        result.push({ cls: cls, memberType: member, member: curMember, iconCls: iconCls });
                        if (result.length >= maxResults) return result;
    	            }
    	        }
	        }
	    }

	    return result;
	}
});
