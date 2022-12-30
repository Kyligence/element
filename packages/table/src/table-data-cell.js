import 'intersection-observer';
import Vue from 'vue';
import VueWaypoint from 'vue-waypoint';

Vue.use(VueWaypoint);

export default {
  name: 'ElTableDataCell',

  props: {
    virtualCellHeight: {
      type: String
    },
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
    handleHeaderWaypoint(params) {
      const { going } = params;
      if (going === 'in') {
        this.headerInView = true;
      } else if (going === 'out') {
        this.headerInView = false;
      }
    },
    handleFooterWaypoint(params) {
      const { going } = params;
      if (going === 'in') {
        this.footerInView = true;
      } else if (going === 'out') {
        this.footerInView = false;
      }
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
