<template>
  <div
    class="el-tree-node"
    @click.stop="handleClick"
    @contextmenu="($event) => this.handleContextMenu($event)"
    v-show="node.visible"
    :class="{
      'is-expanded': expanded,
      'is-current': tree.store.currentNode === node,
      'is-hidden': !node.visible,
      'is-focusable': !node.disabled,
      'is-checked': !node.disabled && node.checked
    }"
    role="treeitem"
    tabindex="-1"
    :aria-expanded="expanded"
    :aria-disabled="node.disabled"
    :aria-checked="node.checked"
  >
    
    <div class="el-tree-node__content"   
       @mouseenter.stop="handleNodeMouseEnter($event, node)"
       @mouseleave.stop="handleNodeMouseLeave($event)"
      :style="{ 'padding-left': (node.level - 1) * tree.indent + 'px' }">
      <span
        class="el-tree-node__expand-icon el-icon-caret-right"
        @click.stop="handleExpandIconClick"
        :class="{ 'is-leaf': node.isLeaf, expanded: !node.isLeaf && expanded }">
      </span>
      <el-tooltip  placement="top" ref="tooltip" :content="tooltipContent"></el-tooltip>
      <el-checkbox
        v-if="getShowCheckbox(node)"
        v-model="node.checked"
        :indeterminate="node.indeterminate"
        :disabled="!!node.disabled"
        @click.native.stop
        @change="handleCheckChange"
      >
      </el-checkbox>
      <span
        v-if="node.loading"
        class="el-tree-node__loading-icon el-icon-loading">
      </span>
      <node-content :node="node"></node-content>
    </div>
    <el-collapse-transition>
      <div
        class="el-tree-node__children"
        v-if="!renderAfterExpand || childNodeRendered"
        v-show="expanded"
        role="group"
        :aria-expanded="expanded"
      >
        <el-tree-node
          :render-content="renderContent"
          v-for="child in childNodes"
          :render-after-expand="renderAfterExpand"
          :key="getNodeKey(child)"
          :node="child"
          :should-node-render="shouldNodeRender"
          @node-expand="handleChildNodeExpand">
        </el-tree-node>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script type="text/jsx">
  import ElCollapseTransition from 'kyligence-ui/src/transitions/collapse-transition';
  import ElCheckbox from 'kyligence-ui/packages/checkbox';
  import ElTooltip from 'kyligence-ui/packages/tooltip';
  import emitter from 'kyligence-ui/src/mixins/emitter';
  import { getNodeKey } from './model/util';
  import { hasClass } from 'kyligence-ui/src/utils/dom';
  import debounce from 'throttle-debounce/debounce';

  export default {
    name: 'ElTreeNode',

    componentName: 'ElTreeNode',

    mixins: [emitter],

    props: {
      node: {
        default() {
          return {};
        }
      },
      props: {},
      renderContent: Function,
      renderAfterExpand: {
        type: Boolean,
        default: true
      },
      shouldNodeRender: Function
    },

    components: {
      ElCollapseTransition,
      ElCheckbox,
      ElTooltip,
      NodeContent: {
        props: {
          node: {
            required: true
          }
        },
        render(h) {
          const parent = this.$parent;
          const tree = parent.tree;
          const node = this.node;
          const { data, store } = node;
          return (
            parent.renderContent
              ? parent.renderContent.call(parent._renderProxy, h, { _self: tree.$vnode.context, node, data, store })
              : tree.$scopedSlots.default
                ? tree.$scopedSlots.default({ node, data })
                : <span class="el-tree-node__label">{ this.node.label }</span>
          );
        }
      }
    },

    data() {
      return {
        tree: null,
        expanded: false,
        childNodeRendered: false,
        oldChecked: null,
        oldIndeterminate: null,
        tooltipContent:'',
        showOverflowTooltip: this.$parent.showOverflowTooltip
      };
    },

    watch: {
      'node.indeterminate'(val) {
        this.handleSelectChange(this.node.checked, val);
      },

      'node.checked'(val) {
        this.handleSelectChange(val, this.node.indeterminate);
      },

      'node.expanded'(val) {
        this.$nextTick(() => this.expanded = val);
        if (val) {
          this.childNodeRendered = true;
        }
      }
    },

    computed: {
      childNodes() {
        const { node: { childNodes }, shouldNodeRender } = this
        return childNodes.filter(
          (childNode, index) => shouldNodeRender(childNode, childNode.data, index)
        )
      }
    },

    methods: {
      getShowCheckbox(node) {
        const showCheckbox = this.tree.showCheckbox;
        return typeof showCheckbox === 'function' ? showCheckbox(node.data, node) : showCheckbox;
      },
      getNodeKey(node) {
        return getNodeKey(this.tree.nodeKey, node.data);
      },
      handleNodeMouseEnter(event, node) {
        // 判断是否text-overflow, 如果是就显示tooltip
        if (!this.tree.showOverflowTooltip) {
          return
        }
        const nodeChild = event.target;
        let nodeContent = this.$el.querySelector('.el-tree-node__content')
        let limitNodeContent = this.$el.querySelector('.el-tree-tooltip-box') //自定义监控是否被截取
        if (nodeChild && (nodeContent && nodeContent.scrollWidth > nodeContent.offsetWidth || limitNodeContent && limitNodeContent.scrollWidth > limitNodeContent.offsetWidth) && this.$refs.tooltip) {
          const tooltip = this.$refs.tooltip;
          this.tooltipContent = node.data.label || nodeChild.innerText;
          tooltip.referenceElm = nodeChild;
          tooltip.$refs.popper && (tooltip.$refs.popper.style.display = 'none');
          tooltip.doDestroy();
          tooltip.setExpectedState(true);
          this.activateTooltip(tooltip);
        }
      },
      handleNodeMouseLeave(event) {
        if (!this.tree.showOverflowTooltip) {
          return
        }
        const tooltip = this.$refs.tooltip;
        if (tooltip) {
          tooltip.setExpectedState(false);
          tooltip.handleClosePopper();
        }
      },
      handleSelectChange(checked, indeterminate) {
        if (this.oldChecked !== checked && this.oldIndeterminate !== indeterminate) {
          this.tree.$emit('check-change', this.node.data, checked, indeterminate);
        }
        this.oldChecked = checked;
        this.indeterminate = indeterminate;
      },

      handleClick() {
        const store = this.tree.store;
        store.setCurrentNode(this.node);
        this.tree.$emit('current-change', store.currentNode ? store.currentNode.data : null, store.currentNode);
        this.tree.currentNode = this;
        if (this.tree.expandOnClickNode) {
          this.handleExpandIconClick();
        }
        this.tree.$emit('node-click', this.node.data, this.node, this);
      },

      handleContextMenu(event) {
        if (this.tree._events['node-contextmenu'] && this.tree._events['node-contextmenu'].length > 0) {
          event.stopPropagation();
          event.preventDefault();
        }
        this.tree.$emit('node-contextmenu', event, this.node.data, this.node, this);
      },

      handleExpandIconClick() {
        if (this.node.isLeaf) return;
        if (this.expanded) {
          this.tree.$emit('node-collapse', this.node.data, this.node, this);
          this.node.collapse();
        } else {
          this.node.expand();
          this.$emit('node-expand', this.node.data, this.node, this);
        }
      },

      handleCheckChange(value, ev) {
        this.node.setChecked(ev.target.checked, !this.tree.checkStrictly);
        this.$nextTick(() => {
          const store = this.tree.store;
          this.tree.$emit('check', this.node.data, {
            checkedNodes: store.getCheckedNodes(),
            checkedKeys: store.getCheckedKeys(),
            halfCheckedNodes: store.getHalfCheckedNodes(),
            halfCheckedKeys: store.getHalfCheckedKeys(),
          }, this.node);
        });
      },

      handleChildNodeExpand(nodeData, node, instance) {
        this.broadcast('ElTreeNode', 'tree-node-expand', node);
        this.tree.$emit('node-expand', nodeData, node, instance);
      }
    },
    created() {
      this.activateTooltip = debounce(50, tooltip => tooltip.handleShowPopper());
      const parent = this.$parent;

      if (parent.isTree) {
        this.tree = parent;
      } else {
        this.tree = parent.tree;
      }

      const tree = this.tree;
      if (!tree) {
        console.warn('Can not find node\'s tree.');
      }

      const props = tree.props || {};
      const childrenKey = props['children'] || 'children';

      this.$watch(`node.data.${childrenKey}`, () => {
        this.node.updateChildren();
      });

      if (this.node.expanded) {
        this.expanded = true;
        this.childNodeRendered = true;
      }

      if(this.tree.accordion) {
        this.$on('tree-node-expand', node => {
          if(this.node !== node) {
            this.node.collapse();
          }
        });
      }
    }
  };
</script>
