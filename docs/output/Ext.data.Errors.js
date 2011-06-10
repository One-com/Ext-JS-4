Ext.data.JsonP.Ext_data_Errors({
  "allMixins": [
    "Ext.util.Sortable",
    "Ext.util.Observable"
  ],
  "deprecated": null,
  "docauthor": null,
  "members": {
    "cfg": [
      {
        "type": "Boolean",
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "cfg",
        "href": "AbstractMixedCollection.html#Ext-util-AbstractMixedCollection-cfg-allowFunctions",
        "shortDoc": "Specify true if the addAll\nfunction should add function references to the collection. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/AbstractMixedCollection.js",
        "private": false,
        "name": "allowFunctions",
        "owner": "Ext.util.AbstractMixedCollection",
        "doc": "<p>Specify <tt>true</tt> if the <a href=\"#/api/Ext.data.Errors-method-addAll\" rel=\"Ext.data.Errors-method-addAll\" class=\"docClass\">addAll</a>\nfunction should add function references to the collection. Defaults to\n<tt>false</tt>.</p>\n",
        "linenr": 62,
        "html_filename": "AbstractMixedCollection.html"
      },
      {
        "type": "Object",
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "cfg",
        "href": "Observable.html#Ext-util-Observable-cfg-listeners",
        "shortDoc": "A config object containing one or more event handlers to be added to this object during initialization. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/Observable.js",
        "private": false,
        "name": "listeners",
        "owner": "Ext.util.Observable",
        "doc": "<p>A config object containing one or more event handlers to be added to this object during initialization. This\nshould be a valid listeners config object as specified in the <a href=\"#/api/Ext.data.Errors-method-addListener\" rel=\"Ext.data.Errors-method-addListener\" class=\"docClass\">addListener</a> example for attaching multiple\nhandlers at once.</p>\n\n<p><strong>DOM events from ExtJS <a href=\"#/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Components</a></strong></p>\n\n<p>While <em>some</em> ExtJs Component classes export selected DOM events (e.g. \"click\", \"mouseover\" etc), this is usually\nonly done when extra value can be added. For example the <a href=\"#/api/Ext.view.View\" rel=\"Ext.view.View\" class=\"docClass\">DataView</a>'s <strong><code><a href=\"#/api/Ext.view.View-event-itemclick\" rel=\"Ext.view.View-event-itemclick\" class=\"docClass\">itemclick</a></code></strong> event passing the node clicked on. To access DOM events directly from a\nchild element of a Component, we need to specify the <code>element</code> option to identify the Component property to add a\nDOM listener to:</p>\n\n<pre><code>new Ext.panel.Panel({\n    width: 400,\n    height: 200,\n    dockedItems: [{\n        xtype: 'toolbar'\n    }],\n    listeners: {\n        click: {\n            element: 'el', //bind to the underlying el property on the panel\n            fn: function(){ console.log('click el'); }\n        },\n        dblclick: {\n            element: 'body', //bind to the underlying body property on the panel\n            fn: function(){ console.log('dblclick body'); }\n        }\n    }\n});\n</code></pre>\n",
        "linenr": 102,
        "html_filename": "Observable.html"
      }
    ],
    "method": [
      {
        "deprecated": null,
        "alias": null,
        "href": "MixedCollection.html#Ext-util-MixedCollection-method-constructor",
        "tagname": "method",
        "protected": false,
        "shortDoc": "Creates new MixedCollection. ...",
        "static": false,
        "params": [
          {
            "type": "Boolean",
            "optional": false,
            "doc": "<p>Specify <tt>true</tt> if the <a href=\"#/api/Ext.data.Errors-method-addAll\" rel=\"Ext.data.Errors-method-addAll\" class=\"docClass\">addAll</a>\nfunction should add function references to the collection. Defaults to\n<tt>false</tt>.</p>\n",
            "name": "allowFunctions"
          },
          {
            "type": "Function",
            "optional": false,
            "doc": "<p>A function that can accept an item of the type(s) stored in this MixedCollection\nand return the key value for that item.  This is used when available to look up the key on items that\nwere passed without an explicit key parameter to a MixedCollection method.  Passing this parameter is\nequivalent to providing an implementation for the <a href=\"#/api/Ext.data.Errors-method-getKey\" rel=\"Ext.data.Errors-method-getKey\" class=\"docClass\">getKey</a> method.</p>\n",
            "name": "keyFn"
          }
        ],
        "private": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/MixedCollection.js",
        "doc": "<p>Creates new MixedCollection.</p>\n",
        "owner": "Ext.util.MixedCollection",
        "name": "Errors",
        "html_filename": "MixedCollection.html",
        "return": {
          "type": "Object",
          "doc": "\n"
        },
        "linenr": 40
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "AbstractMixedCollection.html#Ext-util-AbstractMixedCollection-method-add",
        "shortDoc": "Adds an item to the collection. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/AbstractMixedCollection.js",
        "private": false,
        "params": [
          {
            "type": "String",
            "optional": false,
            "doc": "<p>The key to associate with the item, or the new item.</p>\n\n\n<p>If a <a href=\"#/api/Ext.data.Errors-method-getKey\" rel=\"Ext.data.Errors-method-getKey\" class=\"docClass\">getKey</a> implementation was specified for this MixedCollection,\nor if the key of the stored items is in a property called <tt><b>id</b></tt>,\nthe MixedCollection will be able to <i>derive</i> the key for the new item.\nIn this case just pass the new item in this parameter.</p>\n\n",
            "name": "key"
          },
          {
            "type": "Object",
            "optional": false,
            "doc": "<p>The item to add.</p>\n",
            "name": "o"
          }
        ],
        "name": "add",
        "owner": "Ext.util.AbstractMixedCollection",
        "doc": "<p>Adds an item to the collection. Fires the <a href=\"#/api/Ext.data.Errors-event-add\" rel=\"Ext.data.Errors-event-add\" class=\"docClass\">add</a> event when complete.</p>\n",
        "linenr": 69,
        "return": {
          "type": "Object",
          "doc": "<p>The item added.</p>\n"
        },
        "html_filename": "AbstractMixedCollection.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "AbstractMixedCollection.html#Ext-util-AbstractMixedCollection-method-addAll",
        "shortDoc": "Adds all elements of an Array or an Object to the collection. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/AbstractMixedCollection.js",
        "private": false,
        "params": [
          {
            "type": "Object/Array",
            "optional": false,
            "doc": "<p>An Object containing properties which will be added\nto the collection, or an Array of values, each of which are added to the collection.\nFunctions references will be added to the collection if <code><a href=\"#/api/Ext.data.Errors-cfg-allowFunctions\" rel=\"Ext.data.Errors-cfg-allowFunctions\" class=\"docClass\">allowFunctions</a></code>\nhas been set to <tt>true</tt>.</p>\n",
            "name": "objs"
          }
        ],
        "name": "addAll",
        "owner": "Ext.util.AbstractMixedCollection",
        "doc": "<p>Adds all elements of an Array or an Object to the collection.</p>\n",
        "linenr": 166,
        "return": {
          "type": "void",
          "doc": "\n"
        },
        "html_filename": "AbstractMixedCollection.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "Observable.html#Ext-util-Observable-method-addEvents",
        "shortDoc": "Adds the specified events to the list of events which this Observable may fire. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/Observable.js",
        "private": false,
        "params": [
          {
            "type": "Object/String",
            "optional": false,
            "doc": "<p>Either an object with event names as properties with a value of <code>true</code> or the first\nevent name string if multiple event names are being passed as separate parameters. Usage:</p>\n\n<pre><code>this.addEvents({\n    storeloaded: true,\n    storecleared: true\n});\n</code></pre>\n",
            "name": "o"
          },
          {
            "type": "String...",
            "optional": false,
            "doc": "<p>Optional additional event names if multiple event names are being passed as separate\nparameters. Usage:</p>\n\n<pre><code>this.addEvents('storeloaded', 'storecleared');\n</code></pre>\n",
            "name": "more"
          }
        ],
        "name": "addEvents",
        "owner": "Ext.util.Observable",
        "doc": "<p>Adds the specified events to the list of events which this Observable may fire.</p>\n",
        "linenr": 494,
        "return": {
          "type": "void",
          "doc": "\n"
        },
        "html_filename": "Observable.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "Observable.html#Ext-util-Observable-method-addListener",
        "shortDoc": "Appends an event handler to this object. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/Observable.js",
        "private": false,
        "params": [
          {
            "type": "String",
            "optional": false,
            "doc": "<p>The name of the event to listen for. May also be an object who's property names are\nevent names.</p>\n",
            "name": "eventName"
          },
          {
            "type": "Function",
            "optional": false,
            "doc": "<p>The method the event invokes.  Will be called with arguments given to\n<a href=\"#/api/Ext.data.Errors-method-fireEvent\" rel=\"Ext.data.Errors-method-fireEvent\" class=\"docClass\">fireEvent</a> plus the <code>options</code> parameter described below.</p>\n",
            "name": "handler"
          },
          {
            "type": "Object",
            "optional": true,
            "doc": "<p>(optional) The scope (<code>this</code> reference) in which the handler function is executed. <strong>If\nomitted, defaults to the object which fired the event.</strong></p>\n",
            "name": "scope"
          },
          {
            "type": "Object",
            "optional": true,
            "doc": "<p>(optional) An object containing handler configuration.</p>\n\n<p><strong>Note:</strong> Unlike in ExtJS 3.x, the options object will also be passed as the last argument to every event handler.</p>\n\n<p>This object may contain any of the following properties:</p>\n\n<ul>\n<li><p><strong>scope</strong> : Object</p>\n\n<p>The scope (<code>this</code> reference) in which the handler function is executed. <strong>If omitted, defaults to the object\nwhich fired the event.</strong></p></li>\n<li><p><strong>delay</strong> : Number</p>\n\n<p>The number of milliseconds to delay the invocation of the handler after the event fires.</p></li>\n<li><p><strong>single</strong> : Boolean</p>\n\n<p>True to add a handler to handle just the next firing of the event, and then remove itself.</p></li>\n<li><p><strong>buffer</strong> : Number</p>\n\n<p>Causes the handler to be scheduled to run in an <a href=\"#/api/Ext.util.DelayedTask\" rel=\"Ext.util.DelayedTask\" class=\"docClass\">Ext.util.DelayedTask</a> delayed by the specified number of\nmilliseconds. If the event fires again within that time, the original handler is <em>not</em> invoked, but the new\nhandler is scheduled in its place.</p></li>\n<li><p><strong>target</strong> : Observable</p>\n\n<p>Only call the handler if the event was fired on the target Observable, <em>not</em> if the event was bubbled up from a\nchild Observable.</p></li>\n<li><p><strong>element</strong> : String</p>\n\n<p><strong>This option is only valid for listeners bound to <a href=\"#/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Components</a>.</strong> The name of a Component\nproperty which references an element to add a listener to.</p>\n\n<p>This option is useful during Component construction to add DOM event listeners to elements of\n<a href=\"#/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Components</a> which will exist only after the Component is rendered.\nFor example, to add a click listener to a Panel's body:</p>\n\n<pre><code>new Ext.panel.Panel({\n    title: 'The title',\n    listeners: {\n        click: this.handlePanelClick,\n        element: 'body'\n    }\n});\n</code></pre></li>\n</ul>\n\n\n<p><strong>Combining Options</strong></p>\n\n<p>Using the options argument, it is possible to combine different types of listeners:</p>\n\n<p>A delayed, one-time listener.</p>\n\n<pre><code>myPanel.on('hide', this.handleClick, this, {\n    single: true,\n    delay: 100\n});\n</code></pre>\n\n<p><strong>Attaching multiple handlers in 1 call</strong></p>\n\n<p>The method also allows for a single argument to be passed which is a config object containing properties which\nspecify multiple events. For example:</p>\n\n<pre><code>myGridPanel.on({\n    cellClick: this.onCellClick,\n    mouseover: this.onMouseOver,\n    mouseout: this.onMouseOut,\n    scope: this // Important. Ensure \"this\" is correct during handler execution\n});\n</code></pre>\n\n<p>One can also specify options for each event handler separately:</p>\n\n<pre><code>myGridPanel.on({\n    cellClick: {fn: this.onCellClick, scope: this, single: true},\n    mouseover: {fn: panel.onMouseOver, scope: panel}\n});\n</code></pre>\n",
            "name": "options"
          }
        ],
        "name": "addListener",
        "owner": "Ext.util.Observable",
        "doc": "<p>Appends an event handler to this object.</p>\n",
        "linenr": 278,
        "return": {
          "type": "void",
          "doc": "\n"
        },
        "html_filename": "Observable.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "Observable.html#Ext-util-Observable-method-addManagedListener",
        "shortDoc": "Adds listeners to any Observable object (or Element) which are automatically removed when this Component is\ndestroyed. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/Observable.js",
        "private": false,
        "params": [
          {
            "type": "Observable/Element",
            "optional": false,
            "doc": "<p>The item to which to add a listener/listeners.</p>\n",
            "name": "item"
          },
          {
            "type": "Object/String",
            "optional": false,
            "doc": "<p>The event name, or an object containing event name properties.</p>\n",
            "name": "ename"
          },
          {
            "type": "Function",
            "optional": true,
            "doc": "<p>(optional) If the <code>ename</code> parameter was an event name, this is the handler function.</p>\n",
            "name": "fn"
          },
          {
            "type": "Object",
            "optional": true,
            "doc": "<p>(optional) If the <code>ename</code> parameter was an event name, this is the scope (<code>this</code> reference)\nin which the handler function is executed.</p>\n",
            "name": "scope"
          },
          {
            "type": "Object",
            "optional": true,
            "doc": "<p>(optional) If the <code>ename</code> parameter was an event name, this is the\n<a href=\"#/api/Ext.util.Observable-method-addListener\" rel=\"Ext.util.Observable-method-addListener\" class=\"docClass\">addListener</a> options.</p>\n",
            "name": "opt"
          }
        ],
        "name": "addManagedListener",
        "owner": "Ext.util.Observable",
        "doc": "<p>Adds listeners to any Observable object (or Element) which are automatically removed when this Component is\ndestroyed.</p>\n",
        "linenr": 156,
        "return": {
          "type": "void",
          "doc": "\n"
        },
        "html_filename": "Observable.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "Base3.html#Ext-Base-method-addStatics",
        "shortDoc": "Add / override static properties of this class. ...",
        "static": true,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/core/src/class/Base.js",
        "private": false,
        "params": [
          {
            "type": "Object",
            "optional": false,
            "doc": "\n",
            "name": "members"
          }
        ],
        "name": "addStatics",
        "owner": "Ext.Base",
        "doc": "<p>Add / override static properties of this class.</p>\n\n<pre><code>Ext.define('My.cool.Class', {\n    ...\n});\n\nMy.cool.Class.addStatics({\n    someProperty: 'someValue',      // My.cool.Class.someProperty = 'someValue'\n    method1: function() { ... },    // My.cool.Class.method1 = function() { ... };\n    method2: function() { ... }     // My.cool.Class.method2 = function() { ... };\n});\n</code></pre>\n",
        "linenr": 388,
        "return": {
          "type": "Ext.Base",
          "doc": "<p>this</p>\n"
        },
        "html_filename": "Base3.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "Base3.html#Ext-Base-method-callOverridden",
        "shortDoc": "Call the original method that was previously overridden with Ext.Base.override\n\nExt.define('My.Cat', {\n    constructo...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/core/src/class/Base.js",
        "private": false,
        "params": [
          {
            "type": "Array/Arguments",
            "optional": false,
            "doc": "<p>The arguments, either an array or the <code>arguments</code> object</p>\n",
            "name": "args"
          }
        ],
        "name": "callOverridden",
        "owner": "Ext.Base",
        "doc": "<p>Call the original method that was previously overridden with <a href=\"#/api/Ext.Base-method-override\" rel=\"Ext.Base-method-override\" class=\"docClass\">Ext.Base.override</a></p>\n\n<pre><code>Ext.define('My.Cat', {\n    constructor: function() {\n        alert(\"I'm a cat!\");\n\n        return this;\n    }\n});\n\nMy.Cat.override({\n    constructor: function() {\n        alert(\"I'm going to be a cat!\");\n\n        var instance = this.callOverridden();\n\n        alert(\"Meeeeoooowwww\");\n\n        return instance;\n    }\n});\n\nvar kitty = new My.Cat(); // alerts \"I'm going to be a cat!\"\n                          // alerts \"I'm a cat!\"\n                          // alerts \"Meeeeoooowwww\"\n</code></pre>\n",
        "linenr": 269,
        "return": {
          "type": "Mixed",
          "doc": "<p>Returns the result after calling the overridden method</p>\n"
        },
        "html_filename": "Base3.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": true,
        "tagname": "method",
        "href": "Base3.html#Ext-Base-method-callParent",
        "shortDoc": "Call the parent's overridden method. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/core/src/class/Base.js",
        "private": false,
        "params": [
          {
            "type": "Array/Arguments",
            "optional": false,
            "doc": "<p>The arguments, either an array or the <code>arguments</code> object\nfrom the current method, for example: <code>this.callParent(arguments)</code></p>\n",
            "name": "args"
          }
        ],
        "name": "callParent",
        "owner": "Ext.Base",
        "doc": "<p>Call the parent's overridden method. For example:</p>\n\n<pre><code>Ext.define('My.own.A', {\n    constructor: function(test) {\n        alert(test);\n    }\n});\n\nExt.define('My.own.B', {\n    extend: 'My.own.A',\n\n    constructor: function(test) {\n        alert(test);\n\n        this.callParent([test + 1]);\n    }\n});\n\nExt.define('My.own.C', {\n    extend: 'My.own.B',\n\n    constructor: function() {\n        alert(\"Going to call parent's overriden constructor...\");\n\n        this.callParent(arguments);\n    }\n});\n\nvar a = new My.own.A(1); // alerts '1'\nvar b = new My.own.B(1); // alerts '1', then alerts '2'\nvar c = new My.own.C(2); // alerts \"Going to call parent's overriden constructor...\"\n                         // alerts '2', then alerts '3'\n</code></pre>\n",
        "linenr": 124,
        "return": {
          "type": "Mixed",
          "doc": "<p>Returns the result from the superclass' method</p>\n"
        },
        "html_filename": "Base3.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "Observable.html#Ext-util-Observable-method-capture",
        "shortDoc": "Starts capture on the specified Observable. ...",
        "static": true,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/Observable.js",
        "private": false,
        "params": [
          {
            "type": "Observable",
            "optional": false,
            "doc": "<p>The Observable to capture events from.</p>\n",
            "name": "o"
          },
          {
            "type": "Function",
            "optional": false,
            "doc": "<p>The function to call when an event is fired.</p>\n",
            "name": "fn"
          },
          {
            "type": "Object",
            "optional": true,
            "doc": "<p>(optional) The scope (<code>this</code> reference) in which the function is executed. Defaults to\nthe Observable firing the event.</p>\n",
            "name": "scope"
          }
        ],
        "name": "capture",
        "owner": "Ext.util.Observable",
        "doc": "<p>Starts capture on the specified Observable. All events will be passed to the supplied function with the event\nname + standard signature of the event <strong>before</strong> the event is fired. If the supplied function returns false,\nthe event will not fire.</p>\n",
        "linenr": 54,
        "return": {
          "type": "void",
          "doc": "\n"
        },
        "html_filename": "Observable.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "AbstractMixedCollection.html#Ext-util-AbstractMixedCollection-method-clear",
        "shortDoc": "Removes all items from the collection. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/AbstractMixedCollection.js",
        "private": false,
        "params": [

        ],
        "name": "clear",
        "owner": "Ext.util.AbstractMixedCollection",
        "doc": "<p>Removes all items from the collection.  Fires the <a href=\"#/api/Ext.data.Errors-event-clear\" rel=\"Ext.data.Errors-event-clear\" class=\"docClass\">clear</a> event when complete.</p>\n",
        "linenr": 435,
        "return": {
          "type": "void",
          "doc": "\n"
        },
        "html_filename": "AbstractMixedCollection.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "Observable.html#Ext-util-Observable-method-clearListeners",
        "shortDoc": "Removes all listeners for this object including the managed listeners ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/Observable.js",
        "private": false,
        "params": [

        ],
        "name": "clearListeners",
        "owner": "Ext.util.Observable",
        "doc": "<p>Removes all listeners for this object including the managed listeners</p>\n",
        "linenr": 425,
        "return": {
          "type": "void",
          "doc": "\n"
        },
        "html_filename": "Observable.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "Observable.html#Ext-util-Observable-method-clearManagedListeners",
        "shortDoc": "Removes all managed listeners for this object. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/Observable.js",
        "private": false,
        "params": [

        ],
        "name": "clearManagedListeners",
        "owner": "Ext.util.Observable",
        "doc": "<p>Removes all managed listeners for this object.</p>\n",
        "linenr": 454,
        "return": {
          "type": "void",
          "doc": "\n"
        },
        "html_filename": "Observable.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "AbstractMixedCollection.html#Ext-util-AbstractMixedCollection-method-clone",
        "shortDoc": "Creates a shallow copy of this collection ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/AbstractMixedCollection.js",
        "private": false,
        "params": [

        ],
        "name": "clone",
        "owner": "Ext.util.AbstractMixedCollection",
        "doc": "<p>Creates a shallow copy of this collection</p>\n",
        "linenr": 727,
        "return": {
          "type": "MixedCollection",
          "doc": "\n"
        },
        "html_filename": "AbstractMixedCollection.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "AbstractMixedCollection.html#Ext-util-AbstractMixedCollection-method-collect",
        "shortDoc": "Collects unique values of a particular property in this MixedCollection ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/AbstractMixedCollection.js",
        "private": false,
        "params": [
          {
            "type": "String",
            "optional": false,
            "doc": "<p>The property to collect on</p>\n",
            "name": "property"
          },
          {
            "type": "String",
            "optional": false,
            "doc": "<p>Optional 'root' property to extract the first argument from. This is used mainly when\nsumming fields in records, where the fields are all stored inside the 'data' object</p>\n",
            "name": "root"
          },
          {
            "type": "Boolean",
            "optional": true,
            "doc": "<p>(optional) Pass true to allow null, undefined or empty string values</p>\n",
            "name": "allowBlank"
          }
        ],
        "name": "collect",
        "owner": "Ext.util.AbstractMixedCollection",
        "doc": "<p>Collects unique values of a particular property in this MixedCollection</p>\n",
        "linenr": 489,
        "return": {
          "type": "Array",
          "doc": "<p>The unique values</p>\n"
        },
        "html_filename": "AbstractMixedCollection.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "AbstractMixedCollection.html#Ext-util-AbstractMixedCollection-method-contains",
        "shortDoc": "Returns true if the collection contains the passed Object as an item. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/AbstractMixedCollection.js",
        "private": false,
        "params": [
          {
            "type": "Object",
            "optional": false,
            "doc": "<p>The Object to look for in the collection.</p>\n",
            "name": "o"
          }
        ],
        "name": "contains",
        "owner": "Ext.util.AbstractMixedCollection",
        "doc": "<p>Returns true if the collection contains the passed Object as an item.</p>\n",
        "linenr": 417,
        "return": {
          "type": "Boolean",
          "doc": "<p>True if the collection contains the Object as an item.</p>\n"
        },
        "html_filename": "AbstractMixedCollection.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "AbstractMixedCollection.html#Ext-util-AbstractMixedCollection-method-containsKey",
        "shortDoc": "Returns true if the collection contains the passed Object as a key. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/AbstractMixedCollection.js",
        "private": false,
        "params": [
          {
            "type": "String",
            "optional": false,
            "doc": "<p>The key to look for in the collection.</p>\n",
            "name": "key"
          }
        ],
        "name": "containsKey",
        "owner": "Ext.util.AbstractMixedCollection",
        "doc": "<p>Returns true if the collection contains the passed Object as a key.</p>\n",
        "linenr": 426,
        "return": {
          "type": "Boolean",
          "doc": "<p>True if the collection contains the Object as a key.</p>\n"
        },
        "html_filename": "AbstractMixedCollection.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "Base3.html#Ext-Base-method-create",
        "shortDoc": "Create a new instance of this Class. ...",
        "static": true,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/core/src/class/Base.js",
        "private": false,
        "params": [

        ],
        "name": "create",
        "owner": "Ext.Base",
        "doc": "<p>Create a new instance of this Class.</p>\n\n<pre><code>Ext.define('My.cool.Class', {\n    ...\n});\n\nMy.cool.Class.create({\n    someConfig: true\n});\n</code></pre>\n\n<p>All parameters are passed to the constructor of the class.</p>\n",
        "linenr": 329,
        "return": {
          "type": "Object",
          "doc": "<p>the created instance.</p>\n"
        },
        "html_filename": "Base3.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "Base3.html#Ext-Base-method-createAlias",
        "shortDoc": "Create aliases for existing prototype methods. ...",
        "static": true,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/core/src/class/Base.js",
        "private": false,
        "params": [
          {
            "type": "String/Object",
            "optional": false,
            "doc": "<p>The new method name, or an object to set multiple aliases. See\n<a href=\"#/api/Ext.Function-method-flexSetter\" rel=\"Ext.Function-method-flexSetter\" class=\"docClass\">flexSetter</a></p>\n",
            "name": "alias"
          },
          {
            "type": "String/Object",
            "optional": false,
            "doc": "<p>The original method name</p>\n",
            "name": "origin"
          }
        ],
        "name": "createAlias",
        "owner": "Ext.Base",
        "doc": "<p>Create aliases for existing prototype methods. Example:</p>\n\n<pre><code>Ext.define('My.cool.Class', {\n    method1: function() { ... },\n    method2: function() { ... }\n});\n\nvar test = new My.cool.Class();\n\nMy.cool.Class.createAlias({\n    method3: 'method1',\n    method4: 'method2'\n});\n\ntest.method3(); // test.method1()\n\nMy.cool.Class.createAlias('method5', 'method3');\n\ntest.method5(); // test.method3() -&gt; test.method1()\n</code></pre>\n",
        "linenr": 648,
        "return": {
          "type": "void",
          "doc": "\n"
        },
        "html_filename": "Base3.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "AbstractMixedCollection.html#Ext-util-AbstractMixedCollection-method-each",
        "shortDoc": "Executes the specified function once for every item in the collection, passing the following arguments:\n\n\nitem : Mixe...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/AbstractMixedCollection.js",
        "private": false,
        "params": [
          {
            "type": "Function",
            "optional": false,
            "doc": "<p>The function to execute for each item.</p>\n",
            "name": "fn"
          },
          {
            "type": "Object",
            "optional": true,
            "doc": "<p>(optional) The scope (<code>this</code> reference) in which the function is executed. Defaults to the current item in the iteration.</p>\n",
            "name": "scope"
          }
        ],
        "name": "each",
        "owner": "Ext.util.AbstractMixedCollection",
        "doc": "<p>Executes the specified function once for every item in the collection, passing the following arguments:</p>\n\n<div class=\"mdetail-params\"><ul>\n<li><b>item</b> : Mixed<p class=\"sub-desc\">The collection item</p></li>\n<li><b>index</b> : Number<p class=\"sub-desc\">The item's index</p></li>\n<li><b>length</b> : Number<p class=\"sub-desc\">The total number of items in the collection</p></li>\n</ul></div>\n\n\n<p>The function should return a boolean value. Returning false from the function will stop the iteration.</p>\n",
        "linenr": 196,
        "return": {
          "type": "void",
          "doc": "\n"
        },
        "html_filename": "AbstractMixedCollection.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "AbstractMixedCollection.html#Ext-util-AbstractMixedCollection-method-eachKey",
        "shortDoc": "Executes the specified function once for every key in the collection, passing each\nkey, and its associated item as th...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/AbstractMixedCollection.js",
        "private": false,
        "params": [
          {
            "type": "Function",
            "optional": false,
            "doc": "<p>The function to execute for each item.</p>\n",
            "name": "fn"
          },
          {
            "type": "Object",
            "optional": true,
            "doc": "<p>(optional) The scope (<code>this</code> reference) in which the function is executed. Defaults to the browser window.</p>\n",
            "name": "scope"
          }
        ],
        "name": "eachKey",
        "owner": "Ext.util.AbstractMixedCollection",
        "doc": "<p>Executes the specified function once for every key in the collection, passing each\nkey, and its associated item as the first two parameters.</p>\n",
        "linenr": 221,
        "return": {
          "type": "void",
          "doc": "\n"
        },
        "html_filename": "AbstractMixedCollection.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "Observable.html#Ext-util-Observable-method-enableBubble",
        "shortDoc": "Enables events fired by this Observable to bubble up an owner hierarchy by calling this.getBubbleTarget() if\npresent. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/Observable.js",
        "private": false,
        "params": [
          {
            "type": "String/[String]",
            "optional": false,
            "doc": "<p>The event name to bubble, or an Array of event names.</p>\n",
            "name": "events"
          }
        ],
        "name": "enableBubble",
        "owner": "Ext.util.Observable",
        "doc": "<p>Enables events fired by this Observable to bubble up an owner hierarchy by calling <code>this.getBubbleTarget()</code> if\npresent. There is no implementation in the Observable base class.</p>\n\n<p>This is commonly used by Ext.Components to bubble events to owner Containers.\nSee <a href=\"#/api/Ext.Component-method-getBubbleTarget\" rel=\"Ext.Component-method-getBubbleTarget\" class=\"docClass\">Ext.Component.getBubbleTarget</a>. The default implementation in <a href=\"#/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Ext.Component</a> returns the\nComponent's immediate owner. But if a known target is required, this can be overridden to access the\nrequired target more quickly.</p>\n\n<p>Example:</p>\n\n<pre><code>Ext.override(Ext.form.field.Base, {\n    //  Add functionality to Field's initComponent to enable the change event to bubble\n    initComponent : Ext.Function.createSequence(Ext.form.field.Base.prototype.initComponent, function() {\n        this.enableBubble('change');\n    }),\n\n    //  We know that we want Field's events to bubble directly to the FormPanel.\n    getBubbleTarget : function() {\n        if (!this.formPanel) {\n            this.formPanel = this.findParentByType('form');\n        }\n        return this.formPanel;\n    }\n});\n\nvar myForm = new Ext.formPanel({\n    title: 'User Details',\n    items: [{\n        ...\n    }],\n    listeners: {\n        change: function() {\n            // Title goes red if form has been modified.\n            myForm.header.setStyle('color', 'red');\n        }\n    }\n});\n</code></pre>\n",
        "linenr": 609,
        "return": {
          "type": "void",
          "doc": "\n"
        },
        "html_filename": "Observable.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "AbstractMixedCollection.html#Ext-util-AbstractMixedCollection-method-filter",
        "shortDoc": "Filters the objects in this collection by a set of Filters, or by a single\nproperty/value pair with optional paramete...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/AbstractMixedCollection.js",
        "private": false,
        "params": [
          {
            "type": "Array/String",
            "optional": false,
            "doc": "<p>A property on your objects, or an array of <a href=\"#/api/Ext.util.Filter\" rel=\"Ext.util.Filter\" class=\"docClass\">Filter</a> objects</p>\n",
            "name": "property"
          },
          {
            "type": "String/RegExp",
            "optional": false,
            "doc": "<p>Either string that the property values\nshould start with or a RegExp to test against the property</p>\n",
            "name": "value"
          },
          {
            "type": "Boolean",
            "optional": true,
            "doc": "<p>(optional) True to match any part of the string, not just the beginning</p>\n",
            "name": "anyMatch"
          },
          {
            "type": "Boolean",
            "optional": true,
            "doc": "<p>(optional) True for case sensitive comparison (defaults to False).</p>\n",
            "name": "caseSensitive"
          }
        ],
        "name": "filter",
        "owner": "Ext.util.AbstractMixedCollection",
        "doc": "<p>Filters the objects in this collection by a set of <a href=\"#/api/Ext.util.Filter\" rel=\"Ext.util.Filter\" class=\"docClass\">Filter</a>s, or by a single\nproperty/value pair with optional parameters for substring matching and case sensitivity. See\n<a href=\"#/api/Ext.util.Filter\" rel=\"Ext.util.Filter\" class=\"docClass\">Filter</a> for an example of using Filter objects (preferred). Alternatively,\nMixedCollection can be easily filtered by property like this:</p>\n\n\n<pre><code>//create a simple store with a few people defined\nvar people = new Ext.util.MixedCollection();\npeople.addAll([\n    {id: 1, age: 25, name: 'Ed'},\n    {id: 2, age: 24, name: 'Tommy'},\n    {id: 3, age: 24, name: 'Arne'},\n    {id: 4, age: 26, name: 'Aaron'}\n]);\n\n//a new MixedCollection containing only the items where age == 24\nvar middleAged = people.filter('age', 24);\n</code></pre>\n\n",
        "linenr": 566,
        "return": {
          "type": "MixedCollection",
          "doc": "<p>The new filtered collection</p>\n"
        },
        "html_filename": "AbstractMixedCollection.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "AbstractMixedCollection.html#Ext-util-AbstractMixedCollection-method-filterBy",
        "shortDoc": "Filter by a function. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/AbstractMixedCollection.js",
        "private": false,
        "params": [
          {
            "type": "Function",
            "optional": false,
            "doc": "<p>The function to be called, it will receive the args o (the object), k (the key)</p>\n",
            "name": "fn"
          },
          {
            "type": "Object",
            "optional": true,
            "doc": "<p>(optional) The scope (<code>this</code> reference) in which the function is executed. Defaults to this MixedCollection.</p>\n",
            "name": "scope"
          }
        ],
        "name": "filterBy",
        "owner": "Ext.util.AbstractMixedCollection",
        "doc": "<p>Filter by a function. Returns a <i>new</i> collection that has been filtered.\nThe passed function will be called with each object in the collection.\nIf the function returns true, the value is included otherwise it is filtered.</p>\n",
        "linenr": 630,
        "return": {
          "type": "MixedCollection",
          "doc": "<p>The new filtered collection</p>\n"
        },
        "html_filename": "AbstractMixedCollection.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "AbstractMixedCollection.html#Ext-util-AbstractMixedCollection-method-findBy",
        "shortDoc": "Returns the first item in the collection which elicits a true return value from the\npassed selection function. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/AbstractMixedCollection.js",
        "private": false,
        "params": [
          {
            "type": "Function",
            "optional": false,
            "doc": "<p>The selection function to execute for each item.</p>\n",
            "name": "fn"
          },
          {
            "type": "Object",
            "optional": true,
            "doc": "<p>(optional) The scope (<code>this</code> reference) in which the function is executed. Defaults to the browser window.</p>\n",
            "name": "scope"
          }
        ],
        "name": "findBy",
        "owner": "Ext.util.AbstractMixedCollection",
        "doc": "<p>Returns the first item in the collection which elicits a true return value from the\npassed selection function.</p>\n",
        "linenr": 238,
        "return": {
          "type": "Object",
          "doc": "<p>The first item in the collection which returned true from the selection function.</p>\n"
        },
        "html_filename": "AbstractMixedCollection.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "AbstractMixedCollection.html#Ext-util-AbstractMixedCollection-method-findIndex",
        "shortDoc": "Finds the index of the first matching object in this collection by a specific property/value. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/AbstractMixedCollection.js",
        "private": false,
        "params": [
          {
            "type": "String",
            "optional": false,
            "doc": "<p>The name of a property on your objects.</p>\n",
            "name": "property"
          },
          {
            "type": "String/RegExp",
            "optional": false,
            "doc": "<p>A string that the property values\nshould start with or a RegExp to test against the property.</p>\n",
            "name": "value"
          },
          {
            "type": "Number",
            "optional": true,
            "doc": "<p>(optional) The index to start searching at (defaults to 0).</p>\n",
            "name": "start"
          },
          {
            "type": "Boolean",
            "optional": true,
            "doc": "<p>(optional) True to match any part of the string, not just the beginning.</p>\n",
            "name": "anyMatch"
          },
          {
            "type": "Boolean",
            "optional": true,
            "doc": "<p>(optional) True for case sensitive comparison.</p>\n",
            "name": "caseSensitive"
          }
        ],
        "name": "findIndex",
        "owner": "Ext.util.AbstractMixedCollection",
        "doc": "<p>Finds the index of the first matching object in this collection by a specific property/value.</p>\n",
        "linenr": 657,
        "return": {
          "type": "Number",
          "doc": "<p>The matched index or -1</p>\n"
        },
        "html_filename": "AbstractMixedCollection.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "AbstractMixedCollection.html#Ext-util-AbstractMixedCollection-method-findIndexBy",
        "shortDoc": "Find the index of the first matching object in this collection by a function. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/AbstractMixedCollection.js",
        "private": false,
        "params": [
          {
            "type": "Function",
            "optional": false,
            "doc": "<p>The function to be called, it will receive the args o (the object), k (the key).</p>\n",
            "name": "fn"
          },
          {
            "type": "Object",
            "optional": true,
            "doc": "<p>(optional) The scope (<code>this</code> reference) in which the function is executed. Defaults to this MixedCollection.</p>\n",
            "name": "scope"
          },
          {
            "type": "Number",
            "optional": true,
            "doc": "<p>(optional) The index to start searching at (defaults to 0).</p>\n",
            "name": "start"
          }
        ],
        "name": "findIndexBy",
        "owner": "Ext.util.AbstractMixedCollection",
        "doc": "<p>Find the index of the first matching object in this collection by a function.\nIf the function returns <i>true</i> it is considered a match.</p>\n",
        "linenr": 677,
        "return": {
          "type": "Number",
          "doc": "<p>The matched index or -1</p>\n"
        },
        "html_filename": "AbstractMixedCollection.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "Observable.html#Ext-util-Observable-method-fireEvent",
        "shortDoc": "Fires the specified event with the passed parameters (minus the event name, plus the options object passed\nto addList...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/Observable.js",
        "private": false,
        "params": [
          {
            "type": "String",
            "optional": false,
            "doc": "<p>The name of the event to fire.</p>\n",
            "name": "eventName"
          },
          {
            "type": "Object...",
            "optional": false,
            "doc": "<p>Variable number of parameters are passed to handlers.</p>\n",
            "name": "args"
          }
        ],
        "name": "fireEvent",
        "owner": "Ext.util.Observable",
        "doc": "<p>Fires the specified event with the passed parameters (minus the event name, plus the <code>options</code> object passed\nto <a href=\"#/api/Ext.data.Errors-method-addListener\" rel=\"Ext.data.Errors-method-addListener\" class=\"docClass\">addListener</a>).</p>\n\n<p>An event may be set to bubble up an Observable parent hierarchy (See <a href=\"#/api/Ext.Component-method-getBubbleTarget\" rel=\"Ext.Component-method-getBubbleTarget\" class=\"docClass\">Ext.Component.getBubbleTarget</a>) by\ncalling <a href=\"#/api/Ext.data.Errors-method-enableBubble\" rel=\"Ext.data.Errors-method-enableBubble\" class=\"docClass\">enableBubble</a>.</p>\n",
        "linenr": 233,
        "return": {
          "type": "Boolean",
          "doc": "<p>returns false if any of the handlers return false otherwise it returns true.</p>\n"
        },
        "html_filename": "Observable.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "AbstractMixedCollection.html#Ext-util-AbstractMixedCollection-method-first",
        "shortDoc": "Returns the first item in the collection. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/AbstractMixedCollection.js",
        "private": false,
        "params": [

        ],
        "name": "first",
        "owner": "Ext.util.AbstractMixedCollection",
        "doc": "<p>Returns the first item in the collection.</p>\n",
        "linenr": 448,
        "return": {
          "type": "Object",
          "doc": "<p>the first item in the collection..</p>\n"
        },
        "html_filename": "AbstractMixedCollection.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "AbstractMixedCollection.html#Ext-util-AbstractMixedCollection-method-get",
        "shortDoc": "Returns the item associated with the passed key OR index. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/AbstractMixedCollection.js",
        "private": false,
        "params": [
          {
            "type": "String/Number",
            "optional": false,
            "doc": "<p>The key or index of the item.</p>\n",
            "name": "key"
          }
        ],
        "name": "get",
        "owner": "Ext.util.AbstractMixedCollection",
        "doc": "<p>Returns the item associated with the passed key OR index.\nKey has priority over index.  This is the equivalent\nof calling key first, then if nothing matched calling <a href=\"#/api/Ext.data.Errors-method-getAt\" rel=\"Ext.data.Errors-method-getAt\" class=\"docClass\">getAt</a>.</p>\n",
        "linenr": 384,
        "return": {
          "type": "Object",
          "doc": "<p>If the item is found, returns the item.  If the item was not found, returns <tt>undefined</tt>.\nIf an item was found, but is a Class, returns <tt>null</tt>.</p>\n"
        },
        "html_filename": "AbstractMixedCollection.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "AbstractMixedCollection.html#Ext-util-AbstractMixedCollection-method-getAt",
        "shortDoc": "Returns the item at the specified index. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/AbstractMixedCollection.js",
        "private": false,
        "params": [
          {
            "type": "Number",
            "optional": false,
            "doc": "<p>The index of the item.</p>\n",
            "name": "index"
          }
        ],
        "name": "getAt",
        "owner": "Ext.util.AbstractMixedCollection",
        "doc": "<p>Returns the item at the specified index.</p>\n",
        "linenr": 399,
        "return": {
          "type": "Object",
          "doc": "<p>The item at the specified index.</p>\n"
        },
        "html_filename": "AbstractMixedCollection.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "Errors.html#Ext-data-Errors-method-getByField",
        "shortDoc": "Returns all of the errors for the given field ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/data/Errors.js",
        "private": false,
        "params": [
          {
            "type": "String",
            "optional": false,
            "doc": "<p>The field to get errors for</p>\n",
            "name": "fieldName"
          }
        ],
        "name": "getByField",
        "owner": "Ext.data.Errors",
        "doc": "<p>Returns all of the errors for the given field</p>\n",
        "linenr": 34,
        "return": {
          "type": "Array",
          "doc": "<p>All errors for the given field</p>\n"
        },
        "html_filename": "Errors.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "AbstractMixedCollection.html#Ext-util-AbstractMixedCollection-method-getByKey",
        "shortDoc": "Returns the item associated with the passed key. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/AbstractMixedCollection.js",
        "private": false,
        "params": [
          {
            "type": "String/Number",
            "optional": false,
            "doc": "<p>The key of the item.</p>\n",
            "name": "key"
          }
        ],
        "name": "getByKey",
        "owner": "Ext.util.AbstractMixedCollection",
        "doc": "<p>Returns the item associated with the passed key.</p>\n",
        "linenr": 408,
        "return": {
          "type": "Object",
          "doc": "<p>The item associated with the passed key.</p>\n"
        },
        "html_filename": "AbstractMixedCollection.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "AbstractMixedCollection.html#Ext-util-AbstractMixedCollection-method-getCount",
        "shortDoc": "Returns the number of items in the collection. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/AbstractMixedCollection.js",
        "private": false,
        "params": [

        ],
        "name": "getCount",
        "owner": "Ext.util.AbstractMixedCollection",
        "doc": "<p>Returns the number of items in the collection.</p>\n",
        "linenr": 358,
        "return": {
          "type": "Number",
          "doc": "<p>the number of items in the collection.</p>\n"
        },
        "html_filename": "AbstractMixedCollection.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "AbstractMixedCollection.html#Ext-util-AbstractMixedCollection-method-getKey",
        "shortDoc": "MixedCollection has a generic way to fetch keys if you implement getKey. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/AbstractMixedCollection.js",
        "private": false,
        "params": [
          {
            "type": "Object",
            "optional": false,
            "doc": "<p>The item for which to find the key.</p>\n",
            "name": "item"
          }
        ],
        "name": "getKey",
        "owner": "Ext.util.AbstractMixedCollection",
        "doc": "<p>MixedCollection has a generic way to fetch keys if you implement getKey.  The default implementation\nsimply returns <b><code>item.id</code></b> but you can provide your own implementation\nto return a different value as in the following examples:</p>\n\n<pre><code>// normal way\nvar mc = new Ext.util.MixedCollection();\nmc.add(someEl.dom.id, someEl);\nmc.add(otherEl.dom.id, otherEl);\n//and so on\n\n// using getKey\nvar mc = new Ext.util.MixedCollection();\nmc.getKey = function(el){\n   return el.dom.id;\n};\nmc.add(someEl);\nmc.add(otherEl);\n\n// or via the constructor\nvar mc = new Ext.util.MixedCollection(false, function(el){\n   return el.dom.id;\n});\nmc.add(someEl);\nmc.add(otherEl);\n</code></pre>\n\n",
        "linenr": 103,
        "return": {
          "type": "Object",
          "doc": "<p>The key for the passed item.</p>\n"
        },
        "html_filename": "AbstractMixedCollection.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "Base3.html#Ext-Base-method-getName",
        "shortDoc": "Get the current class' name in string format. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/core/src/class/Base.js",
        "private": false,
        "params": [

        ],
        "name": "getName",
        "owner": "Ext.Base",
        "doc": "<p>Get the current class' name in string format.</p>\n\n<pre><code>Ext.define('My.cool.Class', {\n    constructor: function() {\n        alert(this.self.getName()); // alerts 'My.cool.Class'\n    }\n});\n\nMy.cool.Class.getName(); // 'My.cool.Class'\n</code></pre>\n",
        "linenr": 631,
        "return": {
          "type": "String",
          "doc": "<p>className</p>\n"
        },
        "html_filename": "Base3.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "AbstractMixedCollection.html#Ext-util-AbstractMixedCollection-method-getRange",
        "shortDoc": "Returns a range of items in this collection ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/AbstractMixedCollection.js",
        "private": false,
        "params": [
          {
            "type": "Number",
            "optional": true,
            "doc": "<p>(optional) The starting index. Defaults to 0.</p>\n",
            "name": "startIndex"
          },
          {
            "type": "Number",
            "optional": true,
            "doc": "<p>(optional) The ending index. Defaults to the last item.</p>\n",
            "name": "endIndex"
          }
        ],
        "name": "getRange",
        "owner": "Ext.util.AbstractMixedCollection",
        "doc": "<p>Returns a range of items in this collection</p>\n",
        "linenr": 536,
        "return": {
          "type": "Array",
          "doc": "<p>An array of items</p>\n"
        },
        "html_filename": "AbstractMixedCollection.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "Observable.html#Ext-util-Observable-method-hasListener",
        "shortDoc": "Checks to see if this object has any listeners for a specified event ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/Observable.js",
        "private": false,
        "params": [
          {
            "type": "String",
            "optional": false,
            "doc": "<p>The name of the event to check for</p>\n",
            "name": "eventName"
          }
        ],
        "name": "hasListener",
        "owner": "Ext.util.Observable",
        "doc": "<p>Checks to see if this object has any listeners for a specified event</p>\n",
        "linenr": 530,
        "return": {
          "type": "Boolean",
          "doc": "<p>True if the event is being listened for, else false</p>\n"
        },
        "html_filename": "Observable.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "Base3.html#Ext-Base-method-implement",
        "shortDoc": "Add methods / properties to the prototype of this class. ...",
        "static": true,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/core/src/class/Base.js",
        "private": false,
        "params": [
          {
            "type": "Object",
            "optional": false,
            "doc": "\n",
            "name": "members"
          }
        ],
        "name": "implement",
        "owner": "Ext.Base",
        "doc": "<p>Add methods / properties to the prototype of this class.</p>\n\n<pre><code>Ext.define('My.awesome.Cat', {\n    constructor: function() {\n        ...\n    }\n});\n\n My.awesome.Cat.implement({\n     meow: function() {\n        alert('Meowww...');\n     }\n });\n\n var kitty = new My.awesome.Cat;\n kitty.meow();\n</code></pre>\n",
        "linenr": 415,
        "return": {
          "type": "void",
          "doc": "\n"
        },
        "html_filename": "Base3.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "AbstractMixedCollection.html#Ext-util-AbstractMixedCollection-method-indexOf",
        "shortDoc": "Returns index within the collection of the passed Object. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/AbstractMixedCollection.js",
        "private": false,
        "params": [
          {
            "type": "Object",
            "optional": false,
            "doc": "<p>The item to find the index of.</p>\n",
            "name": "o"
          }
        ],
        "name": "indexOf",
        "owner": "Ext.util.AbstractMixedCollection",
        "doc": "<p>Returns index within the collection of the passed Object.</p>\n",
        "linenr": 366,
        "return": {
          "type": "Number",
          "doc": "<p>index of the item. Returns -1 if not found.</p>\n"
        },
        "html_filename": "AbstractMixedCollection.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "AbstractMixedCollection.html#Ext-util-AbstractMixedCollection-method-indexOfKey",
        "shortDoc": "Returns index within the collection of the passed key. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/AbstractMixedCollection.js",
        "private": false,
        "params": [
          {
            "type": "String",
            "optional": false,
            "doc": "<p>The key to find the index of.</p>\n",
            "name": "key"
          }
        ],
        "name": "indexOfKey",
        "owner": "Ext.util.AbstractMixedCollection",
        "doc": "<p>Returns index within the collection of the passed key.</p>\n",
        "linenr": 375,
        "return": {
          "type": "Number",
          "doc": "<p>index of the key.</p>\n"
        },
        "html_filename": "AbstractMixedCollection.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": true,
        "tagname": "method",
        "href": "Base3.html#Ext-Base-method-initConfig",
        "shortDoc": "Initialize configuration for this class. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/core/src/class/Base.js",
        "private": false,
        "params": [
          {
            "type": "Object",
            "optional": false,
            "doc": "\n",
            "name": "config"
          }
        ],
        "name": "initConfig",
        "owner": "Ext.Base",
        "doc": "<p>Initialize configuration for this class. a typical example:</p>\n\n<pre><code>Ext.define('My.awesome.Class', {\n    // The default config\n    config: {\n        name: 'Awesome',\n        isAwesome: true\n    },\n\n    constructor: function(config) {\n        this.initConfig(config);\n\n        return this;\n    }\n});\n\nvar awesome = new My.awesome.Class({\n    name: 'Super Awesome'\n});\n\nalert(awesome.getName()); // 'Super Awesome'\n</code></pre>\n",
        "linenr": 63,
        "return": {
          "type": "Object",
          "doc": "<p>mixins The mixin prototypes as key - value pairs</p>\n"
        },
        "html_filename": "Base3.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "Sortable.html#Ext-util-Sortable-method-initSortable",
        "shortDoc": "Performs initialization of this mixin. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/Sortable.js",
        "private": false,
        "params": [

        ],
        "name": "initSortable",
        "owner": "Ext.util.Sortable",
        "doc": "<p>Performs initialization of this mixin. Component classes using this mixin should call this method\nduring their own initialization.</p>\n",
        "linenr": 36,
        "return": {
          "type": "void",
          "doc": "\n"
        },
        "html_filename": "Sortable.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "AbstractMixedCollection.html#Ext-util-AbstractMixedCollection-method-insert",
        "shortDoc": "Inserts an item at the specified index in the collection. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/AbstractMixedCollection.js",
        "private": false,
        "params": [
          {
            "type": "Number",
            "optional": false,
            "doc": "<p>The index to insert the item at.</p>\n",
            "name": "index"
          },
          {
            "type": "String",
            "optional": false,
            "doc": "<p>The key to associate with the new item, or the item itself.</p>\n",
            "name": "key"
          },
          {
            "type": "Object",
            "optional": true,
            "doc": "<p>(optional) If the second parameter was a key, the new item.</p>\n",
            "name": "o"
          }
        ],
        "name": "insert",
        "owner": "Ext.util.AbstractMixedCollection",
        "doc": "<p>Inserts an item at the specified index in the collection. Fires the <a href=\"#/api/Ext.data.Errors-event-add\" rel=\"Ext.data.Errors-event-add\" class=\"docClass\">add</a> event when complete.</p>\n",
        "linenr": 268,
        "return": {
          "type": "Object",
          "doc": "<p>The item inserted.</p>\n"
        },
        "html_filename": "AbstractMixedCollection.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "Errors.html#Ext-data-Errors-method-isValid",
        "shortDoc": "Returns true if there are no errors in the collection ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/data/Errors.js",
        "private": false,
        "params": [

        ],
        "name": "isValid",
        "owner": "Ext.data.Errors",
        "doc": "<p>Returns true if there are no errors in the collection</p>\n",
        "linenr": 26,
        "return": {
          "type": "Boolean",
          "doc": "\n"
        },
        "html_filename": "Errors.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "AbstractMixedCollection.html#Ext-util-AbstractMixedCollection-method-last",
        "shortDoc": "Returns the last item in the collection. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/AbstractMixedCollection.js",
        "private": false,
        "params": [

        ],
        "name": "last",
        "owner": "Ext.util.AbstractMixedCollection",
        "doc": "<p>Returns the last item in the collection.</p>\n",
        "linenr": 456,
        "return": {
          "type": "Object",
          "doc": "<p>the last item in the collection..</p>\n"
        },
        "html_filename": "AbstractMixedCollection.html"
      },
      {
        "deprecated": null,
        "alias": {
          "tagname": "alias",
          "cls": "Ext.util.Observable",
          "doc": null,
          "owner": "addManagedListener"
        },
        "protected": false,
        "tagname": "method",
        "href": "Observable.html#Ext-util-Observable-method-mon",
        "shortDoc": "Shorthand for addManagedListener. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/Observable.js",
        "private": false,
        "params": [
          {
            "type": "Observable/Element",
            "optional": false,
            "doc": "<p>The item to which to add a listener/listeners.</p>\n",
            "name": "item"
          },
          {
            "type": "Object/String",
            "optional": false,
            "doc": "<p>The event name, or an object containing event name properties.</p>\n",
            "name": "ename"
          },
          {
            "type": "Function",
            "optional": true,
            "doc": "<p>(optional) If the <code>ename</code> parameter was an event name, this is the handler function.</p>\n",
            "name": "fn"
          },
          {
            "type": "Object",
            "optional": true,
            "doc": "<p>(optional) If the <code>ename</code> parameter was an event name, this is the scope (<code>this</code> reference)\nin which the handler function is executed.</p>\n",
            "name": "scope"
          },
          {
            "type": "Object",
            "optional": true,
            "doc": "<p>(optional) If the <code>ename</code> parameter was an event name, this is the\n<a href=\"#/api/Ext.util.Observable-method-addListener\" rel=\"Ext.util.Observable-method-addListener\" class=\"docClass\">addListener</a> options.</p>\n",
            "name": "opt"
          }
        ],
        "name": "mon",
        "owner": "Ext.util.Observable",
        "doc": "<p>Shorthand for <a href=\"#/api/Ext.data.Errors-method-addManagedListener\" rel=\"Ext.data.Errors-method-addManagedListener\" class=\"docClass\">addManagedListener</a>.</p>\n\n<p>Adds listeners to any Observable object (or Element) which are automatically removed when this Component is\ndestroyed.</p>\n",
        "linenr": 681,
        "return": {
          "type": "void",
          "doc": "\n"
        },
        "html_filename": "Observable.html"
      },
      {
        "deprecated": null,
        "alias": {
          "tagname": "alias",
          "cls": "Ext.util.Observable",
          "doc": null,
          "owner": "removeManagedListener"
        },
        "protected": false,
        "tagname": "method",
        "href": "Observable.html#Ext-util-Observable-method-mun",
        "shortDoc": "Shorthand for removeManagedListener. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/Observable.js",
        "private": false,
        "params": [
          {
            "type": "Observable|Element",
            "optional": false,
            "doc": "<p>The item from which to remove a listener/listeners.</p>\n",
            "name": "item"
          },
          {
            "type": "Object|String",
            "optional": false,
            "doc": "<p>The event name, or an object containing event name properties.</p>\n",
            "name": "ename"
          },
          {
            "type": "Function",
            "optional": false,
            "doc": "<p>Optional. If the <code>ename</code> parameter was an event name, this is the handler function.</p>\n",
            "name": "fn"
          },
          {
            "type": "Object",
            "optional": false,
            "doc": "<p>Optional. If the <code>ename</code> parameter was an event name, this is the scope (<code>this</code> reference)\nin which the handler function is executed.</p>\n",
            "name": "scope"
          }
        ],
        "name": "mun",
        "owner": "Ext.util.Observable",
        "doc": "<p>Shorthand for <a href=\"#/api/Ext.data.Errors-method-removeManagedListener\" rel=\"Ext.data.Errors-method-removeManagedListener\" class=\"docClass\">removeManagedListener</a>.</p>\n\n<p>Removes listeners that were added by the <a href=\"#/api/Ext.data.Errors-method-mon\" rel=\"Ext.data.Errors-method-mon\" class=\"docClass\">mon</a> method.</p>\n",
        "linenr": 687,
        "return": {
          "type": "void",
          "doc": "\n"
        },
        "html_filename": "Observable.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "Observable.html#Ext-util-Observable-method-observe",
        "shortDoc": "Sets observability on the passed class constructor. ...",
        "static": true,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/Observable.js",
        "private": false,
        "params": [
          {
            "type": "Function",
            "optional": false,
            "doc": "<p>The class constructor to make observable.</p>\n",
            "name": "c"
          },
          {
            "type": "Object",
            "optional": false,
            "doc": "<p>An object containing a series of listeners to add. See <a href=\"#/api/Ext.data.Errors-method-addListener\" rel=\"Ext.data.Errors-method-addListener\" class=\"docClass\">addListener</a>.</p>\n",
            "name": "listeners"
          }
        ],
        "name": "observe",
        "owner": "Ext.util.Observable",
        "doc": "<p>Sets observability on the passed class constructor.</p>\n\n<p>This makes any event fired on any instance of the passed class also fire a single event through\nthe <strong>class</strong> allowing for central handling of events on many instances at once.</p>\n\n<p>Usage:</p>\n\n<pre><code>Ext.util.Observable.observe(Ext.data.Connection);\nExt.data.Connection.on('beforerequest', function(con, options) {\n    console.log('Ajax request made to ' + options.url);\n});\n</code></pre>\n",
        "linenr": 69,
        "return": {
          "type": "void",
          "doc": "\n"
        },
        "html_filename": "Observable.html"
      },
      {
        "deprecated": null,
        "alias": {
          "tagname": "alias",
          "cls": "Ext.util.Observable",
          "doc": null,
          "owner": "addListener"
        },
        "protected": false,
        "tagname": "method",
        "href": "Observable.html#Ext-util-Observable-method-on",
        "shortDoc": "Shorthand for addListener. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/Observable.js",
        "private": false,
        "params": [
          {
            "type": "String",
            "optional": false,
            "doc": "<p>The name of the event to listen for. May also be an object who's property names are\nevent names.</p>\n",
            "name": "eventName"
          },
          {
            "type": "Function",
            "optional": false,
            "doc": "<p>The method the event invokes.  Will be called with arguments given to\n<a href=\"#/api/Ext.data.Errors-method-fireEvent\" rel=\"Ext.data.Errors-method-fireEvent\" class=\"docClass\">fireEvent</a> plus the <code>options</code> parameter described below.</p>\n",
            "name": "handler"
          },
          {
            "type": "Object",
            "optional": true,
            "doc": "<p>(optional) The scope (<code>this</code> reference) in which the handler function is executed. <strong>If\nomitted, defaults to the object which fired the event.</strong></p>\n",
            "name": "scope"
          },
          {
            "type": "Object",
            "optional": true,
            "doc": "<p>(optional) An object containing handler configuration.</p>\n\n<p><strong>Note:</strong> Unlike in ExtJS 3.x, the options object will also be passed as the last argument to every event handler.</p>\n\n<p>This object may contain any of the following properties:</p>\n\n<ul>\n<li><p><strong>scope</strong> : Object</p>\n\n<p>The scope (<code>this</code> reference) in which the handler function is executed. <strong>If omitted, defaults to the object\nwhich fired the event.</strong></p></li>\n<li><p><strong>delay</strong> : Number</p>\n\n<p>The number of milliseconds to delay the invocation of the handler after the event fires.</p></li>\n<li><p><strong>single</strong> : Boolean</p>\n\n<p>True to add a handler to handle just the next firing of the event, and then remove itself.</p></li>\n<li><p><strong>buffer</strong> : Number</p>\n\n<p>Causes the handler to be scheduled to run in an <a href=\"#/api/Ext.util.DelayedTask\" rel=\"Ext.util.DelayedTask\" class=\"docClass\">Ext.util.DelayedTask</a> delayed by the specified number of\nmilliseconds. If the event fires again within that time, the original handler is <em>not</em> invoked, but the new\nhandler is scheduled in its place.</p></li>\n<li><p><strong>target</strong> : Observable</p>\n\n<p>Only call the handler if the event was fired on the target Observable, <em>not</em> if the event was bubbled up from a\nchild Observable.</p></li>\n<li><p><strong>element</strong> : String</p>\n\n<p><strong>This option is only valid for listeners bound to <a href=\"#/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Components</a>.</strong> The name of a Component\nproperty which references an element to add a listener to.</p>\n\n<p>This option is useful during Component construction to add DOM event listeners to elements of\n<a href=\"#/api/Ext.Component\" rel=\"Ext.Component\" class=\"docClass\">Components</a> which will exist only after the Component is rendered.\nFor example, to add a click listener to a Panel's body:</p>\n\n<pre><code>new Ext.panel.Panel({\n    title: 'The title',\n    listeners: {\n        click: this.handlePanelClick,\n        element: 'body'\n    }\n});\n</code></pre></li>\n</ul>\n\n\n<p><strong>Combining Options</strong></p>\n\n<p>Using the options argument, it is possible to combine different types of listeners:</p>\n\n<p>A delayed, one-time listener.</p>\n\n<pre><code>myPanel.on('hide', this.handleClick, this, {\n    single: true,\n    delay: 100\n});\n</code></pre>\n\n<p><strong>Attaching multiple handlers in 1 call</strong></p>\n\n<p>The method also allows for a single argument to be passed which is a config object containing properties which\nspecify multiple events. For example:</p>\n\n<pre><code>myGridPanel.on({\n    cellClick: this.onCellClick,\n    mouseover: this.onMouseOver,\n    mouseout: this.onMouseOut,\n    scope: this // Important. Ensure \"this\" is correct during handler execution\n});\n</code></pre>\n\n<p>One can also specify options for each event handler separately:</p>\n\n<pre><code>myGridPanel.on({\n    cellClick: {fn: this.onCellClick, scope: this, single: true},\n    mouseover: {fn: panel.onMouseOver, scope: panel}\n});\n</code></pre>\n",
            "name": "options"
          }
        ],
        "name": "on",
        "owner": "Ext.util.Observable",
        "doc": "<p>Shorthand for <a href=\"#/api/Ext.data.Errors-method-addListener\" rel=\"Ext.data.Errors-method-addListener\" class=\"docClass\">addListener</a>.</p>\n\n<p>Appends an event handler to this object.</p>\n",
        "linenr": 669,
        "return": {
          "type": "void",
          "doc": "\n"
        },
        "html_filename": "Observable.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "Base3.html#Ext-Base-method-override",
        "shortDoc": "Override prototype members of this class. ...",
        "static": true,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/core/src/class/Base.js",
        "private": false,
        "params": [
          {
            "type": "Object",
            "optional": false,
            "doc": "\n",
            "name": "members"
          }
        ],
        "name": "override",
        "owner": "Ext.Base",
        "doc": "<p>Override prototype members of this class. Overridden methods can be invoked via\n<a href=\"#/api/Ext.Base-method-callOverridden\" rel=\"Ext.Base-method-callOverridden\" class=\"docClass\">Ext.Base.callOverridden</a></p>\n\n<pre><code>Ext.define('My.Cat', {\n    constructor: function() {\n        alert(\"I'm a cat!\");\n\n        return this;\n    }\n});\n\nMy.Cat.override({\n    constructor: function() {\n        alert(\"I'm going to be a cat!\");\n\n        var instance = this.callOverridden();\n\n        alert(\"Meeeeoooowwww\");\n\n        return instance;\n    }\n});\n\nvar kitty = new My.Cat(); // alerts \"I'm going to be a cat!\"\n                          // alerts \"I'm a cat!\"\n                          // alerts \"Meeeeoooowwww\"\n</code></pre>\n",
        "linenr": 518,
        "return": {
          "type": "Ext.Base",
          "doc": "<p>this</p>\n"
        },
        "html_filename": "Base3.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "Observable.html#Ext-util-Observable-method-relayEvents",
        "shortDoc": "Relays selected events from the specified Observable as if the events were fired by this. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/Observable.js",
        "private": false,
        "params": [
          {
            "type": "Object",
            "optional": false,
            "doc": "<p>The Observable whose events this object is to relay.</p>\n",
            "name": "origin"
          },
          {
            "type": "[String]",
            "optional": false,
            "doc": "<p>Array of event names to relay.</p>\n",
            "name": "events"
          },
          {
            "type": "Object",
            "optional": false,
            "doc": "\n",
            "name": "prefix"
          }
        ],
        "name": "relayEvents",
        "owner": "Ext.util.Observable",
        "doc": "<p>Relays selected events from the specified Observable as if the events were fired by <code>this</code>.</p>\n",
        "linenr": 573,
        "return": {
          "type": "void",
          "doc": "\n"
        },
        "html_filename": "Observable.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "Observable.html#Ext-util-Observable-method-releaseCapture",
        "shortDoc": "Removes all added captures from the Observable. ...",
        "static": true,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/Observable.js",
        "private": false,
        "params": [
          {
            "type": "Observable",
            "optional": false,
            "doc": "<p>The Observable to release</p>\n",
            "name": "o"
          }
        ],
        "name": "releaseCapture",
        "owner": "Ext.util.Observable",
        "doc": "<p>Removes <strong>all</strong> added captures from the Observable.</p>\n",
        "linenr": 44,
        "return": {
          "type": "void",
          "doc": "\n"
        },
        "html_filename": "Observable.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "AbstractMixedCollection.html#Ext-util-AbstractMixedCollection-method-remove",
        "shortDoc": "Remove an item from the collection. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/AbstractMixedCollection.js",
        "private": false,
        "params": [
          {
            "type": "Object",
            "optional": false,
            "doc": "<p>The item to remove.</p>\n",
            "name": "o"
          }
        ],
        "name": "remove",
        "owner": "Ext.util.AbstractMixedCollection",
        "doc": "<p>Remove an item from the collection.</p>\n",
        "linenr": 302,
        "return": {
          "type": "Object",
          "doc": "<p>The item removed or false if no item was removed.</p>\n"
        },
        "html_filename": "AbstractMixedCollection.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "AbstractMixedCollection.html#Ext-util-AbstractMixedCollection-method-removeAll",
        "shortDoc": "Remove all items in the passed array from the collection. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/AbstractMixedCollection.js",
        "private": false,
        "params": [
          {
            "type": "Array",
            "optional": false,
            "doc": "<p>An array of items to be removed.</p>\n",
            "name": "items"
          }
        ],
        "name": "removeAll",
        "owner": "Ext.util.AbstractMixedCollection",
        "doc": "<p>Remove all items in the passed array from the collection.</p>\n",
        "linenr": 311,
        "return": {
          "type": "Ext.util.MixedCollection",
          "doc": "<p>this object</p>\n"
        },
        "html_filename": "AbstractMixedCollection.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "AbstractMixedCollection.html#Ext-util-AbstractMixedCollection-method-removeAt",
        "shortDoc": "Remove an item from a specified index in the collection. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/AbstractMixedCollection.js",
        "private": false,
        "params": [
          {
            "type": "Number",
            "optional": false,
            "doc": "<p>The index within the collection of the item to remove.</p>\n",
            "name": "index"
          }
        ],
        "name": "removeAt",
        "owner": "Ext.util.AbstractMixedCollection",
        "doc": "<p>Remove an item from a specified index in the collection. Fires the <a href=\"#/api/Ext.data.Errors-event-remove\" rel=\"Ext.data.Errors-event-remove\" class=\"docClass\">remove</a> event when complete.</p>\n",
        "linenr": 324,
        "return": {
          "type": "Object",
          "doc": "<p>The item removed or false if no item was removed.</p>\n"
        },
        "html_filename": "AbstractMixedCollection.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "AbstractMixedCollection.html#Ext-util-AbstractMixedCollection-method-removeAtKey",
        "shortDoc": "Removed an item associated with the passed key fom the collection. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/AbstractMixedCollection.js",
        "private": false,
        "params": [
          {
            "type": "String",
            "optional": false,
            "doc": "<p>The key of the item to remove.</p>\n",
            "name": "key"
          }
        ],
        "name": "removeAtKey",
        "owner": "Ext.util.AbstractMixedCollection",
        "doc": "<p>Removed an item associated with the passed key fom the collection.</p>\n",
        "linenr": 349,
        "return": {
          "type": "Object",
          "doc": "<p>The item removed or false if no item was removed.</p>\n"
        },
        "html_filename": "AbstractMixedCollection.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "Observable.html#Ext-util-Observable-method-removeListener",
        "shortDoc": "Removes an event handler. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/Observable.js",
        "private": false,
        "params": [
          {
            "type": "String",
            "optional": false,
            "doc": "<p>The type of event the handler was associated with.</p>\n",
            "name": "eventName"
          },
          {
            "type": "Function",
            "optional": false,
            "doc": "<p>The handler to remove. <strong>This must be a reference to the function passed into the\n<a href=\"#/api/Ext.data.Errors-method-addListener\" rel=\"Ext.data.Errors-method-addListener\" class=\"docClass\">addListener</a> call.</strong></p>\n",
            "name": "handler"
          },
          {
            "type": "Object",
            "optional": true,
            "doc": "<p>(optional) The scope originally specified for the handler.</p>\n",
            "name": "scope"
          }
        ],
        "name": "removeListener",
        "owner": "Ext.util.Observable",
        "doc": "<p>Removes an event handler.</p>\n",
        "linenr": 392,
        "return": {
          "type": "void",
          "doc": "\n"
        },
        "html_filename": "Observable.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "Observable.html#Ext-util-Observable-method-removeManagedListener",
        "shortDoc": "Removes listeners that were added by the mon method. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/Observable.js",
        "private": false,
        "params": [
          {
            "type": "Observable|Element",
            "optional": false,
            "doc": "<p>The item from which to remove a listener/listeners.</p>\n",
            "name": "item"
          },
          {
            "type": "Object|String",
            "optional": false,
            "doc": "<p>The event name, or an object containing event name properties.</p>\n",
            "name": "ename"
          },
          {
            "type": "Function",
            "optional": false,
            "doc": "<p>Optional. If the <code>ename</code> parameter was an event name, this is the handler function.</p>\n",
            "name": "fn"
          },
          {
            "type": "Object",
            "optional": false,
            "doc": "<p>Optional. If the <code>ename</code> parameter was an event name, this is the scope (<code>this</code> reference)\nin which the handler function is executed.</p>\n",
            "name": "scope"
          }
        ],
        "name": "removeManagedListener",
        "owner": "Ext.util.Observable",
        "doc": "<p>Removes listeners that were added by the <a href=\"#/api/Ext.data.Errors-method-mon\" rel=\"Ext.data.Errors-method-mon\" class=\"docClass\">mon</a> method.</p>\n",
        "linenr": 197,
        "return": {
          "type": "void",
          "doc": "\n"
        },
        "html_filename": "Observable.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "MixedCollection.html#Ext-util-MixedCollection-method-reorder",
        "shortDoc": "Reorders each of the items based on a mapping from old index to new index. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/MixedCollection.js",
        "private": false,
        "params": [
          {
            "type": "Object",
            "optional": false,
            "doc": "<p>Mapping from old item index to new item index</p>\n",
            "name": "mapping"
          }
        ],
        "name": "reorder",
        "owner": "Ext.util.MixedCollection",
        "doc": "<p>Reorders each of the items based on a mapping from old index to new index. Internally this\njust translates into a sort. The 'sort' event is fired whenever reordering has occured.</p>\n",
        "linenr": 152,
        "return": {
          "type": "void",
          "doc": "\n"
        },
        "html_filename": "MixedCollection.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "AbstractMixedCollection.html#Ext-util-AbstractMixedCollection-method-replace",
        "shortDoc": "Replaces an item in the collection. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/AbstractMixedCollection.js",
        "private": false,
        "params": [
          {
            "type": "String",
            "optional": false,
            "doc": "<p>The key associated with the item to replace, or the replacement item.</p>\n\n\n<p>If you supplied a <a href=\"#/api/Ext.data.Errors-method-getKey\" rel=\"Ext.data.Errors-method-getKey\" class=\"docClass\">getKey</a> implementation for this MixedCollection, or if the key\nof your stored items is in a property called <tt><b>id</b></tt>, then the MixedCollection\nwill be able to <i>derive</i> the key of the replacement item. If you want to replace an item\nwith one having the same key value, then just pass the replacement item in this parameter.</p>\n\n",
            "name": "key"
          },
          {
            "type": "Object",
            "optional": true,
            "doc": "<p>{Object} o (optional) If the first parameter passed was a key, the item to associate\nwith that key.</p>\n",
            "name": "o"
          }
        ],
        "name": "replace",
        "owner": "Ext.util.AbstractMixedCollection",
        "doc": "<p>Replaces an item in the collection. Fires the <a href=\"#/api/Ext.data.Errors-event-replace\" rel=\"Ext.data.Errors-event-replace\" class=\"docClass\">replace</a> event when complete.</p>\n",
        "linenr": 135,
        "return": {
          "type": "Object",
          "doc": "<p>The new item.</p>\n"
        },
        "html_filename": "AbstractMixedCollection.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "Observable.html#Ext-util-Observable-method-resumeEvents",
        "shortDoc": "Resumes firing events (see suspendEvents). ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/Observable.js",
        "private": false,
        "params": [

        ],
        "name": "resumeEvents",
        "owner": "Ext.util.Observable",
        "doc": "<p>Resumes firing events (see <a href=\"#/api/Ext.data.Errors-method-suspendEvents\" rel=\"Ext.data.Errors-method-suspendEvents\" class=\"docClass\">suspendEvents</a>).</p>\n\n<p>If events were suspended using the <code>**queueSuspended**</code> parameter, then all events fired\nduring event suspension will be sent to any listeners now.</p>\n",
        "linenr": 554,
        "return": {
          "type": "void",
          "doc": "\n"
        },
        "html_filename": "Observable.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "Sortable.html#Ext-util-Sortable-method-sort",
        "shortDoc": "Sorts the data in the Store by one or more of its properties. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/Sortable.js",
        "private": false,
        "params": [
          {
            "type": "String|Array",
            "optional": false,
            "doc": "<p>Either a string name of one of the fields in this Store's configured <a href=\"#/api/Ext.data.Model\" rel=\"Ext.data.Model\" class=\"docClass\">Model</a>,\nor an Array of sorter configurations.</p>\n",
            "name": "sorters"
          },
          {
            "type": "String",
            "optional": false,
            "doc": "<p>The overall direction to sort the data by. Defaults to \"ASC\".</p>\n",
            "name": "direction"
          },
          {
            "type": "Object",
            "optional": false,
            "doc": "\n",
            "name": "where"
          },
          {
            "type": "Object",
            "optional": false,
            "doc": "\n",
            "name": "doSort"
          }
        ],
        "name": "sort",
        "owner": "Ext.util.Sortable",
        "doc": "<p>Sorts the data in the Store by one or more of its properties. Example usage:</p>\n\n\n<pre><code>//sort by a single field\nmyStore.sort('myField', 'DESC');\n\n//sorting by multiple fields\nmyStore.sort([\n    {\n        property : 'age',\n        direction: 'ASC'\n    },\n    {\n        property : 'name',\n        direction: 'DESC'\n    }\n]);\n</code></pre>\n\n\n<p>Internally, Store converts the passed arguments into an array of <a href=\"#/api/Ext.util.Sorter\" rel=\"Ext.util.Sorter\" class=\"docClass\">Ext.util.Sorter</a> instances, and delegates the actual\nsorting to its internal <a href=\"#/api/Ext.util.MixedCollection\" rel=\"Ext.util.MixedCollection\" class=\"docClass\">Ext.util.MixedCollection</a>.</p>\n\n\n<p>When passing a single string argument to sort, Store maintains a ASC/DESC toggler per field, so this code:</p>\n\n\n<pre><code>store.sort('myField');\nstore.sort('myField');\n     </code></pre>\n\n\n<p>Is equivalent to this code, because Store handles the toggling automatically:</p>\n\n\n<pre><code>store.sort('myField', 'ASC');\nstore.sort('myField', 'DESC');\n</code></pre>\n\n",
        "linenr": 58,
        "return": {
          "type": "void",
          "doc": "\n"
        },
        "html_filename": "Sortable.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "MixedCollection.html#Ext-util-MixedCollection-method-sortBy",
        "shortDoc": "Sorts the collection by a single sorter function ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/MixedCollection.js",
        "private": false,
        "params": [
          {
            "type": "Function",
            "optional": false,
            "doc": "<p>The function to sort by</p>\n",
            "name": "sorterFn"
          }
        ],
        "name": "sortBy",
        "owner": "Ext.util.MixedCollection",
        "doc": "<p>Sorts the collection by a single sorter function</p>\n",
        "linenr": 113,
        "return": {
          "type": "void",
          "doc": "\n"
        },
        "html_filename": "MixedCollection.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "MixedCollection.html#Ext-util-MixedCollection-method-sortByKey",
        "shortDoc": "Sorts this collection by keys. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/MixedCollection.js",
        "private": false,
        "params": [
          {
            "type": "String",
            "optional": true,
            "doc": "<p>(optional) 'ASC' or 'DESC'. Defaults to 'ASC'.</p>\n",
            "name": "direction"
          },
          {
            "type": "Function",
            "optional": true,
            "doc": "<p>(optional) Comparison function that defines the sort order.\nDefaults to sorting by case insensitive string.</p>\n",
            "name": "fn"
          }
        ],
        "name": "sortByKey",
        "owner": "Ext.util.MixedCollection",
        "doc": "<p>Sorts this collection by <b>key</b>s.</p>\n",
        "linenr": 192,
        "return": {
          "type": "void",
          "doc": "\n"
        },
        "html_filename": "MixedCollection.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": true,
        "tagname": "method",
        "href": "Base3.html#Ext-Base-method-statics",
        "shortDoc": "Get the reference to the class from which this object was instantiated. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/core/src/class/Base.js",
        "private": false,
        "params": [

        ],
        "name": "statics",
        "owner": "Ext.Base",
        "doc": "<p>Get the reference to the class from which this object was instantiated. Note that unlike <a href=\"#/api/Ext.Base-property-self\" rel=\"Ext.Base-property-self\" class=\"docClass\">Ext.Base.self</a>,\n<code>this.statics()</code> is scope-independent and it always returns the class from which it was called, regardless of what\n<code>this</code> points to during run-time</p>\n\n<pre><code>Ext.define('My.Cat', {\n    statics: {\n        totalCreated: 0,\n        speciesName: 'Cat' // My.Cat.speciesName = 'Cat'\n    },\n\n    constructor: function() {\n        var statics = this.statics();\n\n        alert(statics.speciesName);     // always equals to 'Cat' no matter what 'this' refers to\n                                        // equivalent to: My.Cat.speciesName\n\n        alert(this.self.speciesName);   // dependent on 'this'\n\n        statics.totalCreated++;\n\n        return this;\n    },\n\n    clone: function() {\n        var cloned = new this.self;                      // dependent on 'this'\n\n        cloned.groupName = this.statics().speciesName;   // equivalent to: My.Cat.speciesName\n\n        return cloned;\n    }\n});\n\n\nExt.define('My.SnowLeopard', {\n    extend: 'My.Cat',\n\n    statics: {\n        speciesName: 'Snow Leopard'     // My.SnowLeopard.speciesName = 'Snow Leopard'\n    },\n\n    constructor: function() {\n        this.callParent();\n    }\n});\n\nvar cat = new My.Cat();                 // alerts 'Cat', then alerts 'Cat'\n\nvar snowLeopard = new My.SnowLeopard(); // alerts 'Cat', then alerts 'Snow Leopard'\n\nvar clone = snowLeopard.clone();\nalert(Ext.getClassName(clone));         // alerts 'My.SnowLeopard'\nalert(clone.groupName);                 // alerts 'Cat'\n\nalert(My.Cat.totalCreated);             // alerts 3\n</code></pre>\n",
        "linenr": 199,
        "return": {
          "type": "Class",
          "doc": "\n"
        },
        "html_filename": "Base3.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "AbstractMixedCollection.html#Ext-util-AbstractMixedCollection-method-sum",
        "shortDoc": "Collects all of the values of the given property and returns their sum ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/AbstractMixedCollection.js",
        "private": false,
        "params": [
          {
            "type": "String",
            "optional": false,
            "doc": "<p>The property to sum by</p>\n",
            "name": "property"
          },
          {
            "type": "String",
            "optional": false,
            "doc": "<p>Optional 'root' property to extract the first argument from. This is used mainly when\nsumming fields in records, where the fields are all stored inside the 'data' object</p>\n",
            "name": "root"
          },
          {
            "type": "Number",
            "optional": true,
            "doc": "<p>(optional) The record index to start at (defaults to <tt>0</tt>)</p>\n",
            "name": "start"
          },
          {
            "type": "Number",
            "optional": true,
            "doc": "<p>(optional) The record index to end at (defaults to <tt>-1</tt>)</p>\n",
            "name": "end"
          }
        ],
        "name": "sum",
        "owner": "Ext.util.AbstractMixedCollection",
        "doc": "<p>Collects all of the values of the given property and returns their sum</p>\n",
        "linenr": 464,
        "return": {
          "type": "Number",
          "doc": "<p>The total</p>\n"
        },
        "html_filename": "AbstractMixedCollection.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "method",
        "href": "Observable.html#Ext-util-Observable-method-suspendEvents",
        "shortDoc": "Suspends the firing of all events. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/Observable.js",
        "private": false,
        "params": [
          {
            "type": "Boolean",
            "optional": false,
            "doc": "<p>Pass as true to queue up suspended events to be fired\nafter the <a href=\"#/api/Ext.data.Errors-method-resumeEvents\" rel=\"Ext.data.Errors-method-resumeEvents\" class=\"docClass\">resumeEvents</a> call instead of discarding all suspended events.</p>\n",
            "name": "queueSuspended"
          }
        ],
        "name": "suspendEvents",
        "owner": "Ext.util.Observable",
        "doc": "<p>Suspends the firing of all events. (see <a href=\"#/api/Ext.data.Errors-method-resumeEvents\" rel=\"Ext.data.Errors-method-resumeEvents\" class=\"docClass\">resumeEvents</a>)</p>\n",
        "linenr": 541,
        "return": {
          "type": "void",
          "doc": "\n"
        },
        "html_filename": "Observable.html"
      },
      {
        "deprecated": null,
        "alias": {
          "tagname": "alias",
          "cls": "Ext.util.Observable",
          "doc": null,
          "owner": "removeListener"
        },
        "protected": false,
        "tagname": "method",
        "href": "Observable.html#Ext-util-Observable-method-un",
        "shortDoc": "Shorthand for removeListener. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/Observable.js",
        "private": false,
        "params": [
          {
            "type": "String",
            "optional": false,
            "doc": "<p>The type of event the handler was associated with.</p>\n",
            "name": "eventName"
          },
          {
            "type": "Function",
            "optional": false,
            "doc": "<p>The handler to remove. <strong>This must be a reference to the function passed into the\n<a href=\"#/api/Ext.data.Errors-method-addListener\" rel=\"Ext.data.Errors-method-addListener\" class=\"docClass\">addListener</a> call.</strong></p>\n",
            "name": "handler"
          },
          {
            "type": "Object",
            "optional": true,
            "doc": "<p>(optional) The scope originally specified for the handler.</p>\n",
            "name": "scope"
          }
        ],
        "name": "un",
        "owner": "Ext.util.Observable",
        "doc": "<p>Shorthand for <a href=\"#/api/Ext.data.Errors-method-removeListener\" rel=\"Ext.data.Errors-method-removeListener\" class=\"docClass\">removeListener</a>.</p>\n\n<p>Removes an event handler.</p>\n",
        "linenr": 675,
        "return": {
          "type": "void",
          "doc": "\n"
        },
        "html_filename": "Observable.html"
      }
    ],
    "property": [
      {
        "type": "String",
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "property",
        "href": "Sortable.html#Ext-util-Sortable-property-",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/Sortable.js",
        "private": false,
        "name": "",
        "owner": "Ext.util.Sortable",
        "doc": "<p>The property in each item that contains the data to sort.</p>\n",
        "linenr": 31,
        "html_filename": "Sortable.html"
      },
      {
        "type": "String",
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "property",
        "href": "Sortable.html#Ext-util-Sortable-property-defaultSortDirection",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/Sortable.js",
        "private": false,
        "name": "defaultSortDirection",
        "owner": "Ext.util.Sortable",
        "doc": "<p>The default sort direction to use if one is not specified (defaults to \"ASC\")</p>\n",
        "linenr": 20,
        "html_filename": "Sortable.html"
      },
      {
        "type": "Boolean",
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "property",
        "href": "Sortable.html#Ext-util-Sortable-property-isSortable",
        "shortDoc": "Flag denoting that this object is sortable. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/Sortable.js",
        "private": false,
        "name": "isSortable",
        "owner": "Ext.util.Sortable",
        "doc": "<p>Flag denoting that this object is sortable. Always true.</p>\n",
        "linenr": 13,
        "html_filename": "Sortable.html"
      },
      {
        "type": "Class",
        "deprecated": null,
        "alias": null,
        "protected": true,
        "tagname": "property",
        "href": "Base3.html#Ext-Base-property-self",
        "shortDoc": "Get the reference to the current class from which this object was instantiated. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/core/src/class/Base.js",
        "private": false,
        "name": "self",
        "owner": "Ext.Base",
        "doc": "<p>Get the reference to the current class from which this object was instantiated. Unlike <a href=\"#/api/Ext.Base-method-statics\" rel=\"Ext.Base-method-statics\" class=\"docClass\">Ext.Base.statics</a>,\n<code>this.self</code> is scope-dependent and it's meant to be used for dynamic inheritance. See <a href=\"#/api/Ext.Base-method-statics\" rel=\"Ext.Base-method-statics\" class=\"docClass\">Ext.Base.statics</a>\nfor a detailed comparison</p>\n\n<pre><code>Ext.define('My.Cat', {\n    statics: {\n        speciesName: 'Cat' // My.Cat.speciesName = 'Cat'\n    },\n\n    constructor: function() {\n        alert(this.self.speciesName); / dependent on 'this'\n\n        return this;\n    },\n\n    clone: function() {\n        return new this.self();\n    }\n});\n\n\nExt.define('My.SnowLeopard', {\n    extend: 'My.Cat',\n    statics: {\n        speciesName: 'Snow Leopard'         // My.SnowLeopard.speciesName = 'Snow Leopard'\n    }\n});\n\nvar cat = new My.Cat();                     // alerts 'Cat'\nvar snowLeopard = new My.SnowLeopard();     // alerts 'Snow Leopard'\n\nvar clone = snowLeopard.clone();\nalert(Ext.getClassName(clone));             // alerts 'My.SnowLeopard'\n</code></pre>\n",
        "linenr": 18,
        "html_filename": "Base3.html"
      },
      {
        "type": "Ext.util.MixedCollection",
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "property",
        "href": "Sortable.html#Ext-util-Sortable-property-sorters",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/Sortable.js",
        "private": false,
        "name": "sorters",
        "owner": "Ext.util.Sortable",
        "doc": "<p>The collection of <a href=\"#/api/Ext.util.Sorter\" rel=\"Ext.util.Sorter\" class=\"docClass\">Sorters</a> currently applied to this Store</p>\n",
        "linenr": 44,
        "html_filename": "Sortable.html"
      }
    ],
    "cssVar": [

    ],
    "cssMixin": [

    ],
    "event": [
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "event",
        "href": "AbstractMixedCollection.html#Ext-util-AbstractMixedCollection-event-add",
        "shortDoc": "Fires when an item is added to the collection. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/AbstractMixedCollection.js",
        "private": false,
        "params": [
          {
            "type": "Number",
            "optional": false,
            "doc": "<p>The index at which the item was added.</p>\n",
            "name": "index"
          },
          {
            "type": "Object",
            "optional": false,
            "doc": "<p>The item added.</p>\n",
            "name": "o"
          },
          {
            "type": "String",
            "optional": false,
            "doc": "<p>The key associated with the added item.</p>\n",
            "name": "key"
          },
          {
            "type": "Object",
            "tagname": "param",
            "name": "options",
            "doc": "<p>The options object passed to <a href=\"#/api/Ext.util.Observable-method-addListener\" rel=\"Ext.util.Observable-method-addListener\" class=\"docClass\">Ext.util.Observable.addListener</a>.</p>\n"
          }
        ],
        "name": "add",
        "owner": "Ext.util.AbstractMixedCollection",
        "doc": "<p>Fires when an item is added to the collection.</p>\n",
        "linenr": 26,
        "html_filename": "AbstractMixedCollection.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "event",
        "href": "AbstractMixedCollection.html#Ext-util-AbstractMixedCollection-event-clear",
        "shortDoc": "Fires when the collection is cleared. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/AbstractMixedCollection.js",
        "private": false,
        "params": [
          {
            "type": "Object",
            "tagname": "param",
            "name": "options",
            "doc": "<p>The options object passed to <a href=\"#/api/Ext.util.Observable-method-addListener\" rel=\"Ext.util.Observable-method-addListener\" class=\"docClass\">Ext.util.Observable.addListener</a>.</p>\n"
          }
        ],
        "name": "clear",
        "owner": "Ext.util.AbstractMixedCollection",
        "doc": "<p>Fires when the collection is cleared.</p>\n",
        "linenr": 20,
        "html_filename": "AbstractMixedCollection.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "event",
        "href": "AbstractMixedCollection.html#Ext-util-AbstractMixedCollection-event-remove",
        "shortDoc": "Fires when an item is removed from the collection. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/AbstractMixedCollection.js",
        "private": false,
        "params": [
          {
            "type": "Object",
            "optional": false,
            "doc": "<p>The item being removed.</p>\n",
            "name": "o"
          },
          {
            "type": "String",
            "optional": true,
            "doc": "<p>(optional) The key associated with the removed item.</p>\n",
            "name": "key"
          },
          {
            "type": "Object",
            "tagname": "param",
            "name": "options",
            "doc": "<p>The options object passed to <a href=\"#/api/Ext.util.Observable-method-addListener\" rel=\"Ext.util.Observable-method-addListener\" class=\"docClass\">Ext.util.Observable.addListener</a>.</p>\n"
          }
        ],
        "name": "remove",
        "owner": "Ext.util.AbstractMixedCollection",
        "doc": "<p>Fires when an item is removed from the collection.</p>\n",
        "linenr": 44,
        "html_filename": "AbstractMixedCollection.html"
      },
      {
        "deprecated": null,
        "alias": null,
        "protected": false,
        "tagname": "event",
        "href": "AbstractMixedCollection.html#Ext-util-AbstractMixedCollection-event-replace",
        "shortDoc": "Fires when an item is replaced in the collection. ...",
        "static": false,
        "filename": "/mnt/ebs/nightly/git/SDK/platform/src/util/AbstractMixedCollection.js",
        "private": false,
        "params": [
          {
            "type": "String",
            "optional": false,
            "doc": "<p>he key associated with the new added.</p>\n",
            "name": "key"
          },
          {
            "type": "Object",
            "optional": false,
            "doc": "<p>The item being replaced.</p>\n",
            "name": "old"
          },
          {
            "type": "Object",
            "optional": false,
            "doc": "<p>The new item.</p>\n",
            "name": "new"
          },
          {
            "type": "Object",
            "tagname": "param",
            "name": "options",
            "doc": "<p>The options object passed to <a href=\"#/api/Ext.util.Observable-method-addListener\" rel=\"Ext.util.Observable-method-addListener\" class=\"docClass\">Ext.util.Observable.addListener</a>.</p>\n"
          }
        ],
        "name": "replace",
        "owner": "Ext.util.AbstractMixedCollection",
        "doc": "<p>Fires when an item is replaced in the collection.</p>\n",
        "linenr": 35,
        "html_filename": "AbstractMixedCollection.html"
      }
    ]
  },
  "singleton": false,
  "alias": null,
  "superclasses": [
    "Ext.Base",
    "Ext.util.AbstractMixedCollection",
    "Ext.util.MixedCollection"
  ],
  "protected": false,
  "tagname": "class",
  "mixins": [

  ],
  "href": "Errors.html#Ext-data-Errors",
  "subclasses": [

  ],
  "static": false,
  "author": "Ed Spencer",
  "component": false,
  "filename": "/mnt/ebs/nightly/git/SDK/platform/src/data/Errors.js",
  "private": false,
  "alternateClassNames": [

  ],
  "name": "Ext.data.Errors",
  "doc": "<p>Wraps a collection of validation error responses and provides convenient functions for\naccessing and errors for specific fields.</p>\n\n\n\n\n<p>Usually this class does not need to be instantiated directly - instances are instead created\nautomatically when <a href=\"#/api/Ext.data.Model-method-validate\" rel=\"Ext.data.Model-method-validate\" class=\"docClass\">validate</a> on a model instance:</p>\n\n\n\n\n<pre><code>//validate some existing model instance - in this case it returned 2 failures messages\nvar errors = myModel.validate();\n\nerrors.isValid(); //false\n\nerrors.length; //2\nerrors.getByField('name');  // [{field: 'name',  message: 'must be present'}]\nerrors.getByField('title'); // [{field: 'title', message: 'is too short'}]\n</code></pre>\n\n",
  "mixedInto": [

  ],
  "linenr": 1,
  "xtypes": [

  ],
  "html_filename": "Errors.html",
  "extends": "Ext.util.MixedCollection"
});