import Popper from 'kyligence-ui/src/utils/vue-popper';
import debounce from 'throttle-debounce/debounce';
import { addClass, removeClass, on, off } from 'kyligence-ui/src/utils/dom';
import { getFirstComponentChild } from 'kyligence-ui/src/utils/vdom';
import { generateId } from 'kyligence-ui/src/utils/util';
import Vue from 'vue';

export default {
  name: 'ElTooltip',

  mixins: [Popper],

  props: {
    openDelay: {
      type: Number,
      default: 300
    },
    disabled: Boolean,
    manual: Boolean,
    effect: {
      type: String,
      default: 'dark'
    },
    arrowOffset: {
      type: Number,
      default: 0
    },
    popperClass: String,
    content: String,
    visibleArrow: {
      default: true
    },
    transition: {
      type: String,
      default: 'el-fade-in-linear'
    },
    popperOptions: {
      default() {
        return {
          boundariesPadding: 10,
          gpuAcceleration: false
        };
      }
    },
    enterable: {
      type: Boolean,
      default: true
    },
    hideAfter: {
      type: Number,
      default: 0
    },
    maxHeight: {
      type: [Number, String, Boolean],
      default: 130
    }
  },

  data() {
    return {
      timeoutPending: null,
      focusing: false,
      removeReferElm: false
    };
  },
  computed: {
    tooltipId() {
      return `el-tooltip-${generateId()}`;
    },
    tooltipStyle() {
      const maxHeight = typeof this.maxHeight === 'number' ? `${this.maxHeight}px` : this.maxHeight;
      const scrollStyle = {};

      if (maxHeight) {
        scrollStyle.maxHeight = maxHeight;
        scrollStyle.overflowY = 'auto';
        scrollStyle.textOverflow = 'ellipsis';
        scrollStyle.overflowX = 'hidden';
      }

      return Object.assign({}, scrollStyle);
    }
  },
  beforeCreate() {
    if (this.$isServer) return;

    this.popperVM = new Vue({
      data: { node: '' },
      render(h) {
        return this.node;
      }
    }).$mount();
  },

  created() {
    this.debounceClose = this.placement === 'follow-mouse' ? () => this.handleClosePopper() : debounce(200, () => this.handleClosePopper());
  },

  render(h) {
    if (this.popperVM) {
      this.popperVM.node = (
        <transition
          name={ this.transition }
          onAfterLeave={ this.doDestroy }>
          <div
            onMouseleave={ () => { this.handlePopperLeave();} }
            onMouseenter= { (e) => { this.handlePopperEnter(e); } }
            ref="popper"
            role="tooltip"
            id={this.tooltipId}
            aria-hidden={ (this.disabled || !this.showPopper) ? 'true' : 'false' }
            v-show={!this.disabled && this.showPopper}
            class={['el-tooltip__popper', 'is-' + this.effect, this.popperClass]}>
            <div style={this.tooltipStyle}>
              { this.$slots.content || this.content }
            </div>
          </div>
        </transition>);
    }

    if (!this.$slots.default || !this.$slots.default.length) return this.$slots.default;

    const vnode = getFirstComponentChild(this.$slots.default);

    if (!vnode) return vnode;

    const data = vnode.data = vnode.data || {};
    data.staticClass = this.concatClass(data.staticClass, 'el-tooltip');

    return vnode;
  },

  mounted() {
    this.referenceElm = this.$el;
    if (this.$el.nodeType === 1) {
      this.$el.setAttribute('aria-describedby', this.tooltipId);
      this.$el.setAttribute('tabindex', 0);
      on(this.referenceElm, 'mouseenter', this.show);
      on(this.referenceElm, 'mouseleave', this.hide);
      if (this.placement === 'follow-mouse') return;
      on(this.referenceElm, 'focus', () => {
        if (!this.$slots.default || !this.$slots.default.length) {
          this.handleFocus();
          return;
        }
        const instance = this.$slots.default[0].componentInstance;
        if (instance && instance.focus) {
          instance.focus();
        } else {
          this.handleFocus();
        }
      });
      on(this.referenceElm, 'blur', this.handleBlur);
      on(this.referenceElm, 'click', this.removeFocusing);
    }
  },
  watch: {
    focusing(val) {
      if (val) {
        addClass(this.referenceElm, 'focusing');
      } else {
        removeClass(this.referenceElm, 'focusing');
      }
    }
  },
  methods: {
    handlePopperLeave() {
      if (this.placement === 'follow-mouse') return;
      this.setExpectedState(false);
      this.debounceClose();
    },
    handlePopperEnter() {
      if (this.placement === 'follow-mouse' && this.removeReferElm) return;
      this.setExpectedState(true);
    },
    show(e) {
      if (this.placement === 'follow-mouse' && e) {
        const { clientX, clientY } = e;
        this.mousePos = { x: clientX, y: clientY};
      }
      this.removeReferElm = false;
      this.setExpectedState(true);
      this.handleShowPopper();
    },

    hide() {
      this.removeReferElm = true;
      this.setExpectedState(false);
      this.debounceClose();
    },
    handleFocus() {
      this.focusing = true;
      this.show();
    },
    handleBlur() {
      this.focusing = false;
      this.hide();
    },
    removeFocusing() {
      this.focusing = false;
    },

    concatClass(a, b) {
      if (a && a.indexOf(b) > -1) return a;
      return a ? b ? (a + ' ' + b) : a : (b || '');
    },

    handleShowPopper() {
      if (!this.expectedState || this.manual) return;
      if (this.showPopper) return;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.showPopper = true;
      }, this.openDelay);

      if (this.hideAfter > 0) {
        this.timeoutPending = setTimeout(() => {
          this.showPopper = false;
        }, this.hideAfter);
      }
    },

    handleClosePopper() {
      if (this.enterable && this.expectedState || this.manual) return;
      clearTimeout(this.timeout);

      if (this.timeoutPending) {
        clearTimeout(this.timeoutPending);
      }
      this.showPopper = false;
    },

    setExpectedState(expectedState) {
      if (expectedState === false) {
        clearTimeout(this.timeoutPending);
      }
      this.expectedState = expectedState;
    }
  },

  destroyed() {
    const reference = this.referenceElm;
    off(reference, 'mouseenter', this.show);
    off(reference, 'mouseleave', this.hide);
    if (this.placement === 'follow-mouse') return;
    off(reference, 'focus', this.handleFocus);
    off(reference, 'blur', this.handleBlur);
    off(reference, 'click', this.removeFocusing);
  }
};
