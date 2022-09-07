import ElCheckbox from 'kyligence-ui/packages/checkbox';
import ElButton from 'kyligence-ui/packages/button';
import ElTooltip from 'kyligence-ui/packages/tooltip';

export default {
  name: 'ElTransferPanelItem',

  render(h) {
    const {
      draggable,
      item,
      keyProp,
      disabledProp,
      showOverflowTip,
      showToolTip,
      remove,
      index,
      getOptionContent,
      closable,
      getDescription
    } = this;

    const tooltipDisabled = (index) =>
      !showOverflowTip ? !showOverflowTip : showToolTip(this.$el, index);

    return (
      <div class='el-transfer-panel__checkbox checkbox-item'>
        {draggable ? (
          <i class='el-transfer-panel__item-dragger el-ksd-n-icon-grab-dots-outlined' />
        ) : (
          ''
        )}

        <el-checkbox
          class='el-transfer-panel__item'
          label={item[keyProp]}
          disabled={item[disabledProp]}
        >
          <div class='el-transfer-panel__item-inline'>
            <div class='el-transfer-panel__item-left'>
              {item.icon ? (
                <span class='el-transfer-panel__item-icon'>{item.icon}</span>
              ) : (
                ''
              )}
              <el-tooltip
                content={item.label}
                effect='dark'
                placement='top'
                disabled={tooltipDisabled(index)}
              >
                {getOptionContent(h)}
              </el-tooltip>
            </div>

            {getDescription(h, item.description)}
          </div>
          <div class='el-transfer-panel__item-hover'>
            {closable ? (
              <el-button
                text
                type='primary'
                icon-button-mini
                size='small'
                icon='el-ksd-n-icon-close-outlined'
                on-click={() => remove([item[keyProp]])}
              ></el-button>
            ) : (
              ''
            )}
          </div>
        </el-checkbox>
      </div>
    );
  },

  components: {
    ElCheckbox,
    ElButton,
    ElTooltip
  },

  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
    },
    keyProp: String,
    labelProp: String,
    disabledProp: String,
    renderContent: Function,
    remove: Function,
    showToolTip: Function,
    index: Number,
    showOverflowTip: {
      type: Boolean,
      default: false
    },
    draggable: {
      type: Boolean,
      default: false
    },
    closable: {
      type: Boolean,
      default: false
    },
    renderItemHandles: {
      type: Function | Array
    },
    renderDescription: {
      type: Function
    }
  },
  data() {
    return {
      draggingColumn: null,
      dragging: false,
      dragState: {},
      dragCount: 0,
      limitDragMinWidth: 90
    };
  },

  created() {},

  mounted() {},

  methods: {
    getItemHandles(h) {
      const { renderItemHandles } = this;
      if (!renderItemHandles) {
        return '';
      }
      const t = typeof renderItemHandles;
      if (t === 'string' || t === 'number') {
        return renderItemHandles;
      }
      if (renderItemHandles instanceof Array) {
        return this._l(renderItemHandles, (handleItem, handleIndex) => (
          <el-button
            {...handleItem.bind}
            on-click={($event) =>
              handleItem.click && handleItem.click($event, this.item)
            }
          >
            {handleItem.label}
          </el-button>
        ));
      }
      return renderItemHandles.call(this._renderProxy, h, this.item);
    },
    getOptionContent(h) {
      if (this.renderContent) {
        return this.renderContent(h, this.item);
      }
      return (
        <span class='el-transfer-panel__item-option option-items'>
          {this.item[this.labelProp] || this.item[this.keyProp]}
        </span>
      );
    },
    getDescription(h, description) {
      const { renderDescription } = this;
      if (!description && !renderDescription) {
        return '';
      }
      if (renderDescription) {
        return (
          <div class='el-transfer-panel__item-right'>
            {renderDescription.call(this._renderProxy, h, this.item)}
          </div>
        );
      }
      return <div class='el-transfer-panel__item-right'>{description}</div>;
    }
  }
};
