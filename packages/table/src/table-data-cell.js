import ElWaypoint from 'kyligence-ui/packages/waypoint';

export default {
  name: 'ElTableDataCell',

  components: {
    ElWaypoint
  },

  props: {
    virtualCellHeight: String,
    scrollAncestors: Function,
    row: {
      type: Object,
      required: true
    },
    column: {
      type: Object,
      required: true
    },
    columnsHidden: {
      type: Array,
      required: true
    },
    $index: {
      type: Number,
      required: true
    },
    cellIndex: {
      type: Number,
      required: true
    },
    store: {
      type: Object,
      required: true
    },
    self: {
      type: Object,
      required: true
    },
    getSpan: {
      type: Function,
      required: true
    },
    getCellStyle: {
      type: Function,
      required: true
    },
    getCellClass: {
      type: Function,
      required: true
    }
  },

  data: () => ({
    options: {
      root: null,
      rootMargin: '0px 0px 0px 0px',
      threshold: [0, 1]
    },
    headerInView: false,
    footerInView: false
  }),

  methods: {
    getScrollParent() {
      return this.$parent.$parent.$refs['bodyWrapper'];
    },
    getScrollAncestors() {
      return [...(this.scrollAncestors ? this.scrollAncestors() : []), this.getScrollParent()];
    },
    handleHeaderEnter() {
      this.headerInView = true;
    },
    handleFooterEnter() {
      this.footerInView = true;
    },
    handleHeaderLeave() {
      // this.headerInView = false;
    },
    handleFooterLeave() {
      // this.footerInView = false;
    }
  },

  render(h) {
    const { row, column, $index, cellIndex, store, options, self, columnsHidden, virtualCellHeight } = this;
    const { rowspan, colspan } = this.getSpan(row, column, $index, cellIndex);
    const isVirtual = !!virtualCellHeight;

    if (!rowspan || !colspan) {
      return '';
    }

    if (rowspan === 1 && colspan === 1) {
      return (
        <td
          style={ Object.assign({}, isVirtual ? { height: virtualCellHeight } : {}, this.getCellStyle($index, cellIndex, row, column)) }
          class={ this.getCellClass($index, cellIndex, row, column) }
          on-mouseenter={ ($event) => this.$emit('cell-mouse-enter', $event, row) }
          on-mouseleave={ ($event) => this.$emit('cell-mouse-leave', $event) }>
          {isVirtual ? (
            <ElWaypoint
              scrollParent={this.getScrollParent}
              scrollAncestors={this.getScrollAncestors}
              on-top-enter={this.handleHeaderEnter}
              on-top-leave={this.handleHeaderLeave}
            />
          ) : null}
          {this.headerInView || this.footerInView || !isVirtual ? column.renderCell.call(
            this._renderProxy,
            h,
            {
              row,
              column,
              $index,
              store,
              _self: self
            },
            columnsHidden[cellIndex]
          ) : null}
          {isVirtual ? (
            <ElWaypoint
              scrollParent={this.getScrollParent}
              scrollAncestors={this.getScrollAncestors}
              on-top-enter={this.handleFooterEnter}
              on-top-leave={this.handleFooterLeave}
            />
          ) : null}
        </td>
      );
    }

    return (
      <td
        style={ this.getCellStyle($index, cellIndex, row, column) }
        class={ this.getCellClass($index, cellIndex, row, column) }
        rowspan={ rowspan }
        colspan={ colspan }
        on-mouseenter={ ($event) => this.$emit('cell-mouse-enter', $event, row) }
        on-mouseleave={ ($event) => this.$emit('cell-mouse-leave', $event) }>
        {isVirtual ? <div v-waypoint={{ active: true, callback: this.handleHeaderWaypoint, options }} /> : null}
        {this.headerInView || this.footerInView || !isVirtual ? column.renderCell.call(
          this._renderProxy,
          h,
          {
            row,
            column,
            $index,
            store,
            _self: self
          },
          columnsHidden[cellIndex]
        ) : null}
        {isVirtual ? <div v-waypoint={{ active: true, callback: this.handleFooterWaypoint, options }} /> : null}
      </td>
    );
  }
};
