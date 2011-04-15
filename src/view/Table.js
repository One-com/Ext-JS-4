/**
 * @class Ext.view.Table
 * @extends Ext.DataView
 *
 * The grid view binds a store to the underlying html markup of a grid. In most
 * cases you may configure a grid view from the Ext.grid.Panel with the
 * viewConfig configuration.
 *
 * The selection model is shared across sibling grid views.
 * @xtype gridview
 * @author Nicolas Ferrero
 */
Ext.define('Ext.view.Table', {
    extend: 'Ext.DataView',
    alias: 'widget.tableview',
    uses: [
        'Ext.view.TableChunker',
        'Ext.util.DelayedTask',
        'Ext.util.MixedCollection'
    ],

    cls: Ext.baseCSSPrefix + 'grid-view',

    // row
    itemSelector: '.' + Ext.baseCSSPrefix + 'grid-row',
    // cell
    cellSelector: '.' + Ext.baseCSSPrefix + 'grid-cell',

    selectedItemCls: Ext.baseCSSPrefix + 'grid-row-selected',
    selectedCellCls: Ext.baseCSSPrefix + 'grid-cell-selected',
    focusedItemCls: Ext.baseCSSPrefix + 'grid-row-focused',
    overItemCls: Ext.baseCSSPrefix + 'grid-row-over',
    altRowCls:   Ext.baseCSSPrefix + 'grid-row-alt',
    rowClsRe: /(?:^|\s*)grid-row-(first|last|alt)(?:\s+|$)/g,
    cellRe: new RegExp('x-grid-cell-([^\\s]+) ', ''),

    // cfg docs inherited
    trackOver: true,

    /**
     * Override this function to apply custom CSS classes to rows during rendering.  You can also supply custom
     * parameters to the row template for the current row to customize how it is rendered using the <b>rowParams</b>
     * parameter.  This function should return the CSS class name (or empty string '' for none) that will be added
     * to the row's wrapping div.  To apply multiple class names, simply return them space-delimited within the string
     * (e.g., 'my-class another-class'). Example usage:
    <pre><code>
viewConfig: {
    forceFit: true,
    showPreview: true, // custom property
    enableRowBody: true, // required to create a second, full-width row to show expanded Record data
    getRowClass: function(record, rowIndex, rp, ds){ // rp = rowParams
        if(this.showPreview){
            rp.body = '&lt;p>'+record.data.excerpt+'&lt;/p>';
            return 'x-grid3-row-expanded';
        }
        return 'x-grid3-row-collapsed';
    }
},
    </code></pre>
     * @param {Model} model The {@link Ext.data.Model} corresponding to the current row.
     * @param {Number} index The row index.
     * @param {Object} rowParams (DEPRECATED) A config object that is passed to the row template during rendering that allows
     * customization of various aspects of a grid row.
     * <p>If {@link #enableRowBody} is configured <b><tt></tt>true</b>, then the following properties may be set
     * by this function, and will be used to render a full-width expansion row below each grid row:</p>
     * <ul>
     * <li><code>body</code> : String <div class="sub-desc">An HTML fragment to be used as the expansion row's body content (defaults to '').</div></li>
     * <li><code>bodyStyle</code> : String <div class="sub-desc">A CSS style specification that will be applied to the expansion row's &lt;tr> element. (defaults to '').</div></li>
     * </ul>
     * The following property will be passed in, and may be appended to:
     * <ul>
     * <li><code>tstyle</code> : String <div class="sub-desc">A CSS style specification that willl be applied to the &lt;table> element which encapsulates
     * both the standard grid row, and any expansion row.</div></li>
     * </ul>
     * @param {Store} store The {@link Ext.data.Store} this grid is bound to
     * @method getRowClass
     * @return {String} a CSS class name to add to the row.
     */
    getRowClass: null,

    initComponent: function() {
        this.scrollState = {};
        this.selModel.view = this;
        this.headerCt.view = this;
        this.initFeatures();
        this.setNewTemplate();
        this.callParent();
        this.mon(this.store, {
            load: this.onStoreLoad,
            scope: this
        });

        // this.addEvents(
        //     /**
        //      * @event rowfocus
        //      * @param {Ext.data.Record} record
        //      * @param {HTMLElement} row
        //      * @param {Number} rowIdx
        //      */
        //     'rowfocus'
        // );
    },

    // scroll to top of the grid when store loads
    onStoreLoad: function(){
        if (this.invalidateScrollerOnRefresh) {
            if (Ext.isGecko) {
                if (!this.scrollToTopTask) {
                    this.scrollToTopTask = Ext.create('Ext.util.DelayedTask', this.scrollToTop, this);
                }
                this.scrollToTopTask.delay(1);
            } else {
                this.scrollToTop();
            }
        }
    },

    // scroll the view to the top
    scrollToTop: Ext.emptyFn,

    /**
     * Get a reference to a feature
     * @param {String} id The id of the feature
     * @return {Ext.grid.feature.Feature} The feature. Undefined if not found
     */
    getFeature: function(id) {
        var features = this.featuresMC;
        if (features) {
            return features.get(id);
        }
    },

    /**
     * Initializes each feature and bind it to this view.
     * @private
     */
    initFeatures: function() {
        this.features = this.features || [];
        var features = this.features,
            ln       = features.length,
            i        = 0;

        this.featuresMC = Ext.create('Ext.util.MixedCollection');
        for (; i < ln; i++) {
            // ensure feature hasnt already been instantiated
            if (!features[i].isFeature) {
                features[i] = Ext.create('feature.'+features[i].ftype, features[i]);
            }
            // inject a reference to view
            features[i].view = this;
            this.featuresMC.add(features[i]);
        }
    },

    /**
     * Gives features an injection point to attach events to the markup that
     * has been created for this view.
     * @private
     */
    attachEventsForFeatures: function() {
        var features = this.features,
            ln       = features.length,
            i        = 0;

        for (; i < ln; i++) {
            if (features[i].isFeature) {
                features[i].attachEvents();
            }
        }
    },

    afterRender: function() {
        this.callParent();
        this.mon(this.el, {
            scroll: this.fireBodyScroll,
            scope: this
        });
        this.attachEventsForFeatures();
    },

    fireBodyScroll: function(e, t) {
        this.fireEvent('bodyscroll', e, t);
    },

    // TODO: Refactor headerCt dependency here to colModel
    /**
     * Uses the headerCt to transform data from dataIndex keys in a record to
     * headerId keys in each header and then run them through each feature to
     * get additional data for variables they have injected into the view template.
     * @private
     */
    prepareData: function(data, idx, record) {
        var orig     = this.headerCt.prepareData(data, idx, record, this),
            features = this.features,
            ln       = features.length,
            i        = 0,
            node, feature;

        for (; i < ln; i++) {
            feature = features[i];
            if (feature.isFeature) {
                Ext.apply(orig, feature.getAdditionalData(data, idx, record, orig, this));
            }
        }

        return orig;
    },

    // TODO: Refactor headerCt dependency here to colModel
    collectData: function(records, startIndex) {
        var preppedRecords = this.callParent(arguments),
            headerCt  = this.headerCt,
            fullWidth = headerCt.getFullWidth(),
            features  = this.features,
            ln = features.length,
            o = {
                rows: preppedRecords,
                fullWidth: fullWidth
            },
            i  = 0,
            feature,
            j = 0,
            jln,
            rowParams;

        jln = preppedRecords.length;
        // process row classes, rowParams has been deprecated and has been moved
        // to the individual features that implement the behavior. 
        if (this.getRowClass) {
            for (; j < jln; j++) {
                rowParams = {};
                preppedRecords[j]['rowCls'] = this.getRowClass(records[j], j, rowParams, this.store);
                //<debug>
                if (rowParams.alt) {
                    Ext.Error.raise("The getRowClass alt property is no longer supported.");
                }
                if (rowParams.tstyle) {
                    Ext.Error.raise("The getRowClass tstyle property is no longer supported.");
                }
                if (rowParams.cells) {
                    Ext.Error.raise("The getRowClass cells property is no longer supported.");
                }
                if (rowParams.body) {
                    Ext.Error.raise("The getRowClass body property is no longer supported. Use the getAdditionalData method of the rowbody feature.");
                }
                if (rowParams.bodyStyle) {
                    Ext.Error.raise("The getRowClass bodyStyle property is no longer supported.");
                }
                if (rowParams.cols) {
                    Ext.Error.raise("The getRowClass cols property is no longer supported.");
                }
                //</debug>
            }
        }
        // currently only one feature may implement collectData. This is to modify
        // what's returned to the view before its rendered
        for (; i < ln; i++) {
            feature = features[i];
            if (feature.isFeature && feature.collectData && !feature.disabled) {
                o = feature.collectData(records, preppedRecords, startIndex, fullWidth, o);
                break;
            }
        }
        return o;
    },

    // TODO: Refactor header resizing to column resizing
    /**
     * When a header is resized, setWidth on the individual columns resizer class,
     * the top level table, save/restore scroll state, generate a new template and
     * restore focus to the grid view's element so that keyboard navigation
     * continues to work.
     * @private
     */
    onHeaderResize: function(header, w, suppressFocus) {
        var el = this.el;
        if (el) {
            this.saveScrollState();
            // Grab the col and set the width, css
            // class is generated in TableChunker.
            // Select composites because there may be several chunks.
            el.select('.' + Ext.baseCSSPrefix + 'grid-col-resizer-'+header.id).setWidth(w);
            el.select('.' + Ext.baseCSSPrefix + 'grid-table-resizer').setWidth(this.headerCt.getFullWidth());
            this.restoreScrollState();
            this.setNewTemplate();
            if (!suppressFocus) {
                this.el.focus();
            }
        }
    },

    /**
     * When a header is shown restore its oldWidth if it was previously hidden.
     * @private
     */
    onHeaderShow: function(headerCt, header, suppressFocus) {
        // restore headers that were dynamically hidden
        if (header.oldWidth) {
            this.onHeaderResize(header, header.oldWidth, suppressFocus);
            delete header.oldWidth;
        // flexed headers will have a calculated size set
        // this additional check has to do with the fact that
        // defaults: {width: 100} will fight with a flex value
        } else if (header.width && !header.flex) {
            this.onHeaderResize(header, header.width, suppressFocus);
        }
        this.setNewTemplate();
    },

    /**
     * When the header hides treat it as a resize to 0.
     * @private
     */
    onHeaderHide: function(headerCt, header, suppressFocus) {
        this.onHeaderResize(header, 0, suppressFocus);
    },

    /**
     * Set a new template based on the current columns displayed in the
     * grid.
     * @private
     */
    setNewTemplate: function() {
        var columns = this.headerCt.getColumnsForTpl(true);
        this.tpl = this.getTableChunker().getTableTpl({
            columns: columns,
            features: this.features
        });
    },

    /**
     * Get the configured chunker or default of Ext.view.TableChunker
     */
    getTableChunker: function() {
        return this.chunker || Ext.view.TableChunker;
    },

    /**
     * Add a CSS Class to a specific row.
     * @param {HTMLElement/String/Number/Ext.data.Model} rowInfo An HTMLElement, index or instance of a model representing this row
     * @param {String} cls
     */
    addRowCls: function(rowInfo, cls) {
        var row = this.getNode(rowInfo);
        if (row) {
            Ext.fly(row).addCls(cls);
        }
    },

    /**
     * Remove a CSS Class from a specific row.
     * @param {HTMLElement/String/Number/Ext.data.Model} rowInfo An HTMLElement, index or instance of a model representing this row
     * @param {String} cls
     */
    removeRowCls: function(rowInfo, cls) {
        var row = this.getNode(rowInfo);
        if (row) {
            Ext.fly(row).removeCls(cls);
        }
    },

    // GridSelectionModel invokes onRowSelect as selection changes
    onRowSelect : function(rowIdx) {
        this.addRowCls(rowIdx, this.selectedItemCls);
    },

    // GridSelectionModel invokes onRowDeselect as selection changes
    onRowDeselect : function(rowIdx) {
        this.removeRowCls(rowIdx, this.selectedItemCls);
        this.removeRowCls(rowIdx, this.focusedItemCls);
    },
    
    onCellSelect: function(position) {
        var cell = this.getCellByPosition(position);
        if (cell) {
            cell.addCls(this.selectedCellCls);
        }
    },
    
    onCellDeselect: function(position) {
        var cell = this.getCellByPosition(position);
        if (cell) {
            cell.removeCls(this.selectedCellCls);
        }
        
    },
    
    onCellFocus: function(position) {
        //var cell = this.getCellByPosition(position);
        this.focusCell(position);
    },
    
    getCellByPosition: function(position) {
        var row    = position.row,
            column = position.column,
            store  = this.store,
            node   = this.getNode(row),
            header = this.headerCt.getHeaderAtIndex(column),
            cellSelector,
            cell = false;
            
        if (header) {
            cellSelector = header.getCellSelector();
            cell = Ext.fly(node).down(cellSelector);
        }
        return cell;
    },

    // GridSelectionModel invokes onRowFocus to 'highlight'
    // the last row focused
    onRowFocus: function(rowIdx, highlight, supressFocus) {
        var row = this.getNode(rowIdx);

        if (highlight) {
            this.addRowCls(rowIdx, this.focusedItemCls);
            if (!supressFocus) {
                this.focusRow(rowIdx);
            }
            //this.el.dom.setAttribute('aria-activedescendant', row.id);
        } else {
            this.removeRowCls(rowIdx, this.focusedItemCls);
        }
    },

    /**
     * Focus a particular row and bring it into view. Will fire the rowfocus event.
     * @cfg {Mixed} An HTMLElement template node, index of a template node, the
     * id of a template node or the record associated with the node.
     */
    focusRow: function(rowIdx) {
        var row        = this.getNode(rowIdx),
            el         = this.el,
            adjustment = 0,
            elRegion   = el.getRegion(),
            panel      = this.ownerCt,
            rowRegion,
            record;

        if (row) {
            rowRegion = Ext.fly(row).getRegion();
            // row is above
            if (rowRegion.top < elRegion.top) {
                adjustment = rowRegion.top - elRegion.top;
            // row is below
            } else if (rowRegion.bottom > elRegion.bottom) {
                adjustment = rowRegion.bottom - elRegion.bottom;
            }
            record = this.getRecord(row);
            rowIdx = this.store.indexOf(record);

            if (adjustment) {
                // scroll the grid itself, so that all gridview's update.
                panel.scrollByDeltaY(adjustment);
            }
            this.fireEvent('rowfocus', record, row, rowIdx);
        }
    },

    focusCell: function(position) {
        var cell        = this.getCellByPosition(position),
            el          = this.el,
            adjustmentY = 0,
            adjustmentX = 0,
            elRegion    = el.getRegion(),
            panel       = this.ownerCt,
            cellRegion,
            record;

        if (cell) {
            cellRegion = cell.getRegion();
            // cell is above
            if (cellRegion.top < elRegion.top) {
                adjustmentY = cellRegion.top - elRegion.top;
            // cell is below
            } else if (cellRegion.bottom > elRegion.bottom) {
                adjustmentY = cellRegion.bottom - elRegion.bottom;
            }

            // cell is left
            if (cellRegion.left < elRegion.left) {
                adjustmentX = cellRegion.left - elRegion.left;
            // cell is right
            } else if (cellRegion.right > elRegion.right) {
                adjustmentX = cellRegion.right - elRegion.right;
            }

            if (adjustmentY) {
                // scroll the grid itself, so that all gridview's update.
                panel.scrollByDeltaY(adjustmentY);
            }
            if (adjustmentX) {
                panel.scrollByDeltaX(adjustmentX);
            }
            el.focus();
            this.fireEvent('cellfocus', record, cell, position);
        }
    },

    /**
     * Scroll by delta. This affects this individual view ONLY and does not
     * synchronize across views or scrollers.
     * @param {Number} delta
     * @param {String} dir (optional) Valid values are scrollTop and scrollLeft. Defaults to scrollTop.
     * @private
     */
    scrollByDelta: function(delta, dir) {
        dir = dir || 'scrollTop';
        var elDom = this.el.dom;
        elDom[dir] = (elDom[dir] += delta);
    },

    onUpdate: function(ds, index) {
        this.callParent(arguments);
    },

    /**
     * Save the scrollState in a private variable.
     * Must be used in conjunction with restoreScrollState
     */
    saveScrollState: function() {
        var dom = this.el.dom,
            state = this.scrollState;

        state.left = dom.scrollLeft;
        state.top = dom.scrollTop;
    },

    /**
     * Restore the scrollState.
     * Must be used in conjunction with saveScrollState
     * @private
     */
    restoreScrollState: function() {
        var dom = this.el.dom,
            state = this.scrollState,
            headerEl = this.headerCt.el.dom;

        headerEl.scrollLeft = dom.scrollLeft = state.left;
        dom.scrollTop = state.top;
    },

    /**
     * Refresh the grid view.
     * Saves and restores the scroll state, generates a new template, stripes rows
     * and invalidates the scrollers.
     * @param {Boolean} firstPass This is a private flag for internal use only.
     */
    refresh: function(firstPass) {
        var me = this,
            table;

        //this.saveScrollState();
        me.setNewTemplate();
        me.callParent(arguments);

        //this.restoreScrollState();
        if (me.rendered) {
            // Make the table view unselectable
            table = me.el.child('table');
            if (table) {
                table.unselectable();
            }
            
            if (!firstPass) {
                // give focus back to gridview
                me.el.focus();
            }
        }
    },

    processItemEvent: function(type, record, row, rowIndex, e) {
        var me = this,
            cell = e.getTarget(me.cellSelector, row),
            cellIndex = cell ? cell.cellIndex : -1,
            map = me.statics().EventMap,
            selModel = me.getSelectionModel(),
            result;

        if (type == 'keydown' && !cell && selModel.getCurrentPosition) {
            // CellModel, otherwise we can't tell which cell to invoke
            cell = me.getCellByPosition(selModel.getCurrentPosition());
            if (cell) {
                cell = cell.dom;
                cellIndex = cell.cellIndex;
            }
        }

        result = me.fireEvent('uievent', type, me, cell, rowIndex, cellIndex, e);

        if (result === false || me.callParent(arguments) === false) {
            return false;
        }

        // Don't handle cellmouseenter and cellmouseleave events for now
        if (type == 'mouseover' || type == 'mouseout') {
            return true;
        }

        return !(
            // We are adding cell and feature events  
            (me['onBeforeCell' + map[type]](cell, cellIndex, record, row, rowIndex, e) === false) ||
            (me.fireEvent('beforecell' + type, me, cell, cellIndex, record, row, rowIndex, e) === false) ||
            (me['onCell' + map[type]](cell, cellIndex, record, row, rowIndex, e) === false) ||
            (me.fireEvent('cell' + type, me, cell, cellIndex, record, row, rowIndex, e) === false)
        );
    },

    processSpecialEvent: function(e) {
        var me = this,
            map = this.statics().EventMap,
            features = this.features,
            ln = features.length,
            type = e.type,
            i, feature, prefix, featureTarget;

        this.callParent(arguments);

        if (type == 'mouseover' || type == 'mouseout') {
            return;
        }

        for (i = 0; i < ln; i++) {
            feature = features[i];
            if (feature.hasFeatureEvent) {
                featureTarget = e.getTarget(feature.eventSelector, me.getTargetEl());
                if (featureTarget) {
                    prefix = feature.eventPrefix;
                    if (
                        (me.fireEvent('before' + prefix + type, me, featureTarget) === false) ||
                        (me.fireEvent(prefix + type, me, featureTarget) === false)
                    ) {
                        return false;
                    }
                }
            }
        }
        return true;
    },

    onCellMouseDown: Ext.emptyFn,
    onCellMouseUp: Ext.emptyFn,
    onCellClick: Ext.emptyFn,
    onCellDblClick: Ext.emptyFn,
    onCellContextMenu: Ext.emptyFn,
    onCellKeyDown: Ext.emptyFn,
    onBeforeCellMouseDown: Ext.emptyFn,
    onBeforeCellMouseUp: Ext.emptyFn,
    onBeforeCellClick: Ext.emptyFn,
    onBeforeCellDblClick: Ext.emptyFn,
    onBeforeCellContextMenu: Ext.emptyFn,
    onBeforeCellKeyDown: Ext.emptyFn,

    /**
     * Expand a particular header to fit the max content width.
     * This will ONLY expand, not contract.
     * @private
     */
    expandToFit: function(header) {
        var maxWidth = this.getMaxContentWidth(header);
        delete header.flex;
        header.setWidth(maxWidth);
    },

    /**
     * Get the max contentWidth of the header's text and all cells
     * in the grid under this header.
     * @private
     */
    getMaxContentWidth: function(header) {
        var cellSelector = header.getCellInnerSelector(),
            cells        = this.el.query(cellSelector),
            i = 0,
            ln = cells.length,
            maxWidth = header.el.dom.scrollWidth,
            scrollWidth;

        for (; i < ln; i++) {
            scrollWidth = cells[i].scrollWidth;
            if (scrollWidth > maxWidth) {
                maxWidth = scrollWidth;
            }
        }
        return maxWidth;
    },

    getPositionByEvent: function(e) {
        var cellNode = e.getTarget(this.cellSelector),
            rowNode  = e.getTarget(this.itemSelector),
            record   = this.getRecord(rowNode),
            header   = this.getHeaderByCell(cellNode);

        return this.getPosition(record, header);
    },

    getHeaderByCell: function(cell) {
        if (cell) {
            var m = cell.className.match(this.cellRe);
            if (m && m[1]) {
                return Ext.getCmp(m[1]);
            }
        }
        return false;
    },

    /**
     * @param {Object} position The current row and column
     * @param {String} direction 'up', 'down', 'right' and 'left'
     * @param {Ext.EventObject} e event
     * @param {Boolean} preventWrap Set to true to prevent wrap around to the next or previous row.
     * @param {Function} verifierFn A function to verify the validity of the calculated position. When using this function, you must return true to allow the newPosition to be returned.
     * @param {Scope} scope Scope to run the verifierFn in
     * @returns {Object} newPosition The newPosition or false.
     * @private
     */
    walkCells: function(pos, direction, e, preventWrap, verifierFn, scope) {
        var row      = pos.row,
            column   = pos.column,
            rowCount = this.store.getCount(),
            firstCol = this.getFirstVisibleColumnIndex(),
            lastCol  = this.getLastVisibleColumnIndex(),
            newPos   = {row: row, column: column},
            activeHeader = this.headerCt.getHeaderAtIndex(column);

        // no active header or its currently hidden
        if (!activeHeader || activeHeader.hidden) {
            return false;
        }

        e = e || {};
        direction = direction.toLowerCase();
        switch (direction) {
            case 'right':
                // has the potential to wrap if its last
                if (column === lastCol) {
                    // if bottom row and last column, deny right
                    if (preventWrap || row === rowCount - 1) {
                        return false;
                    }
                    if (!e.ctrlKey) {
                        // otherwise wrap to nextRow and firstCol
                        newPos.row = row + 1;
                        newPos.column = firstCol;
                    }
                // go right
                } else {
                    if (!e.ctrlKey) {
                        newPos.column = column + this.getRightGap(activeHeader);
                    } else {
                        newPos.column = lastCol;
                    }
                }
                break;

            case 'left':
                // has the potential to wrap
                if (column === firstCol) {
                    // if top row and first column, deny left
                    if (preventWrap || row === 0) {
                        return false;
                    }
                    if (!e.ctrlKey) {
                        // otherwise wrap to prevRow and lastCol
                        newPos.row = row - 1;
                        newPos.column = lastCol;
                    }
                // go left
                } else {
                    if (!e.ctrlKey) {
                        newPos.column = column + this.getLeftGap(activeHeader);
                    } else {
                        newPos.column = firstCol;
                    }
                }
                break;

            case 'up':
                // if top row, deny up
                if (row === 0) {
                    return false;
                // go up
                } else {
                    if (!e.ctrlKey) {
                        newPos.row = row - 1;
                    } else {
                        newPos.row = 0;
                    }
                }
                break;

            case 'down':
                // if bottom row, deny down
                if (row === rowCount - 1) {
                    return false;
                // go down
                } else {
                    if (!e.ctrlKey) {
                        newPos.row = row + 1;
                    } else {
                        newPos.row = rowCount - 1;
                    }
                }
                break;
        }

        if (verifierFn && verifierFn.call(scope || window, newPos) !== true) {
            return false;
        } else {
            return newPos;
        }
    },
    getFirstVisibleColumnIndex: function() {
        var headerCt   = this.getHeaderCt(),
            allColumns = headerCt.getGridColumns(),
            visHeaders = Ext.ComponentQuery.query(':not([hidden])', allColumns),
            firstHeader = visHeaders[0];

        return headerCt.getHeaderIndex(firstHeader);
    },

    getLastVisibleColumnIndex: function() {
        var headerCt   = this.getHeaderCt(),
            allColumns = headerCt.getGridColumns(),
            visHeaders = Ext.ComponentQuery.query(':not([hidden])', allColumns),
            lastHeader = visHeaders[visHeaders.length - 1];

        return headerCt.getHeaderIndex(lastHeader);
    },

    getHeaderCt: function() {
        return this.headerCt;
    },

    getPosition: function(record, header) {
        var me = this,
            store = me.store,
            gridCols = me.headerCt.getGridColumns();

        return {
            row: store.indexOf(record),
            column: Ext.Array.indexOf(gridCols, header)
        };
    },

    /**
     * Determines the 'gap' between the closest adjacent header to the right
     * that is not hidden.
     * @private
     */
    getRightGap: function(activeHeader) {
        var headerCt        = this.getHeaderCt(),
            headers         = headerCt.getGridColumns(),
            activeHeaderIdx = Ext.Array.indexOf(headers, activeHeader),
            i               = activeHeaderIdx + 1,
            nextIdx;

        for (; i <= headers.length; i++) {
            if (!headers[i].hidden) {
                nextIdx = i;
                break;
            }
        }

        return nextIdx - activeHeaderIdx;
    },

    /**
     * Determines the 'gap' between the closest adjacent header to the left
     * that is not hidden.
     * @private
     */
    getLeftGap: function(activeHeader) {
        var headerCt        = this.getHeaderCt(),
            headers         = headerCt.getGridColumns(),
            activeHeaderIdx = Ext.Array.indexOf(headers, activeHeader),
            i               = activeHeaderIdx - 1,
            prevIdx;

        for (; i >= 0; i--) {
            if (!headers[i].hidden) {
                prevIdx = i;
                break;
            }
        }

        return prevIdx - activeHeaderIdx;
    }
});