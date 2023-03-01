import ElWaypoint from 'kyligence-ui/packages/waypoint';

export default {
  name: 'ElTableRow',

  components: {
    ElWaypoint
  },

  props: {
    virtualCellHeight: String,
    virtualCellHolder: Function,
    scrollAncestors: Function,
    row: Object,
    index: Number,
    columnsHidden: Array
  },

  data: () => ({
    headerInView: false,
    footerInView: false
  }),

  methods: {
    getScrollParent() {
      return this.$parent.$parent.$refs['bodyWrapper'];
    },
    getScrollAncestors() {
      const scrollParent = this.getScrollParent();
      return [...(this.scrollAncestors ? this.scrollAncestors() : []), ...(scrollParent ? [scrollParent] : [])];
    },
    getVirtualCellHolder(h) {
      return this.virtualCellHolder ? this.virtualCellHolder(h) : <el-skeleton class="cell" rows={1} animated />;
    },
    handleHeaderEnter() {
      this.headerInView = true;
    },
    handleFooterEnter() {
      this.footerInView = true;
    }
  },

  render(h) {
    const { row, index: $index, $parent, columnsHidden, virtualCellHeight } = this;
    const isVirtual = !!virtualCellHeight;

    return (
      <tr
        style={ $parent.rowStyle ? $parent.getRowStyle(row, $index) : null }
        key={ $parent.table.rowKey ? $parent.getKeyOfRow(row, $index) : $index }
        on-dblclick={ ($event) => $parent.handleDoubleClick($event, row) }
        on-click={ ($event) => $parent.handleClick($event, row) }
        on-contextmenu={ ($event) => $parent.handleContextMenu($event, row) }
        on-mouseenter={ _ => $parent.handleMouseEnter($index) }
        on-mouseleave={ _ => $parent.handleMouseLeave() }
        class={ [$parent.getRowClass(row, $index)] }>
        {
          $parent._l($parent.columns, (column, cellIndex) => {
            const { rowspan, colspan } = $parent.getSpan(row, column, $index, cellIndex);
            if (!rowspan || !colspan) {
              return '';
            } else {
              if (rowspan === 1 && colspan === 1) {
                return (
                  <td
                    style={ Object.assign({}, isVirtual ? { height: virtualCellHeight } : {}, $parent.getCellStyle($index, cellIndex, row, column)) }
                    class={ $parent.getCellClass($index, cellIndex, row, column) }
                    on-mouseenter={ ($event) => $parent.handleCellMouseEnter($event, row) }
                    on-mouseleave={ $parent.handleCellMouseLeave }>
                    {isVirtual && cellIndex === 0 ? (
                      <ElWaypoint
                        ref="waypointTop"
                        scrollParent={this.getScrollParent}
                        scrollAncestors={this.getScrollAncestors}
                        on-top-enter={this.handleHeaderEnter}
                      />
                    ) : null}
                    {this.headerInView || this.footerInView || !isVirtual ? column.renderCell.call(
                      $parent._renderProxy,
                      h,
                      {
                        row,
                        column,
                        $index,
                        store: $parent.store,
                        _self: $parent.context || $parent.table.$vnode.context
                      },
                      columnsHidden[cellIndex]
                    ) : this.getVirtualCellHolder(h)}
                    {isVirtual && cellIndex === 0 ? (
                      <ElWaypoint
                        ref="waypointBottom"
                        scrollParent={this.getScrollParent}
                        scrollAncestors={this.getScrollAncestors}
                        on-top-enter={this.handleFooterEnter}
                      />
                    ) : null}
                  </td>
                );
              } else {
                return (
                  <td
                    style={ $parent.getCellStyle($index, cellIndex, row, column) }
                    class={ $parent.getCellClass($index, cellIndex, row, column) }
                    rowspan={ rowspan }
                    colspan={ colspan }
                    on-mouseenter={ ($event) => $parent.handleCellMouseEnter($event, row) }
                    on-mouseleave={ $parent.handleCellMouseLeave }>
                    {isVirtual && cellIndex === 0 ? (
                      <ElWaypoint
                        ref="waypointTop"
                        scrollParent={this.getScrollParent}
                        scrollAncestors={this.getScrollAncestors}
                        on-top-enter={this.handleHeaderEnter}
                      />
                    ) : null}
                    {this.headerInView || this.footerInView || !isVirtual ? column.renderCell.call(
                      $parent._renderProxy,
                      h,
                      {
                        row,
                        column,
                        $index,
                        store: $parent.store,
                        _self: $parent.context || $parent.table.$vnode.context
                      },
                      columnsHidden[cellIndex]
                    ) : this.getVirtualCellHolder(h)}
                    {isVirtual && cellIndex === 0 ? (
                      <ElWaypoint
                        ref="waypointBottom"
                        scrollParent={this.getScrollParent}
                        scrollAncestors={this.getScrollAncestors}
                        on-top-enter={this.handleFooterEnter}
                      />
                    ) : null}
                  </td>
                );
              }
            }
          })
        }
      </tr>
    );
  }
};
