<template>
  <transition
    name="dialog-fade"
    @after-enter="afterEnter"
    @after-leave="afterLeave">
    <div class="el-dialog__wrapper" v-show="visible" @click.self="handleWrapperClick">
      <div
        class="el-dialog"
        :class="[{ 'is-fullscreen': fullscreen, 'el-dialog--center': center }, customClass]"
        ref="dialog"
        :style="style">
        <div class="el-dialog__header" :class="{'dragable': isDragable}">
          <el-icon :name="statusIcon" v-if="statusIcon" type="mult"></el-icon>
          <slot name="title">
            <span class="el-dialog__title">{{ title }}</span>
          </slot>
          <el-button
            type="button"
            class="el-dialog__headerbtn"
            aria-label="Close"
            nobg-text
            icon="el-ksd-icon-close_22"
            v-if="showClose"
            @click.stop="handleClose">
            <!-- <i class="el-dialog__close el-icon el-icon-close"></i> -->
          </el-button>
        </div>
        <div class="el-dialog__body" v-if="rendered" :style="bodyStyle"><slot></slot></div>
        <div class="el-dialog__footer" v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import Popup from 'kyligence-kylin-ui/src/utils/popup';
  import Migrating from 'kyligence-kylin-ui/src/mixins/migrating';
  import emitter from 'kyligence-kylin-ui/src/mixins/emitter';

  export default {
    name: 'ElDialog',

    mixins: [Popup, emitter, Migrating],

    props: {
      title: {
        type: String,
        default: ''
      },

      modal: {
        type: Boolean,
        default: true
      },

      modalAppendToBody: {
        type: Boolean,
        default: true
      },

      appendToBody: {
        type: Boolean,
        default: false
      },

      isDragable: {
        type: Boolean,
        default: false
      },

      lockScroll: {
        type: Boolean,
        default: true
      },

      closeOnClickModal: {
        type: Boolean,
        default: true
      },

      closeOnPressEscape: {
        type: Boolean,
        default: true
      },

      showClose: {
        type: Boolean,
        default: true
      },

      width: String,

      fullscreen: Boolean,

      customClass: {
        type: String,
        default: ''
      },

      top: {
        type: String,
        default: '15vh'
      },
      beforeClose: Function,
      center: {
        type: Boolean,
        default: false
      },
      limitedArea: {
        type: Boolean,
        default: false
      },
      statusIcon: String
    },

    data() {
      return {
        closed: false,
        mousePoint: { x: 0, y: 0 },
        offset: { left: 0, top: 0 },
        bodyStyle: {},
        dialogStyle: {},
        _scrollSizeCache: null
      };
    },

    watch: {
      visible(val) {
        if (val) {
          let hasTitleSlot = this.$slots && this.$slots.title && this.$slots.title[0] && this.$slots.title[0].data;
          let slotTitleClass = hasTitleSlot && this.$slots.title[0].data.staticClass ? this.$slots.title[0].data.staticClass : '';
          if (hasTitleSlot && slotTitleClass.indexOf('el-dialog__title') === -1) {
            let tempClass = slotTitleClass ? slotTitleClass + ' el-dialog__title' : 'el-dialog__title';
            this.$slots.title[0].data.staticClass = tempClass;
          }
          this.closed = false;
          this.$emit('open');
          this.$el.addEventListener('scroll', this.updatePopper);
          if (this.isDragable) {
            this.dragable();
          }
          this.$nextTick(() => {
            this.$refs.dialog.scrollTop = 0;
            this.$el.focus();
            this.resetSize();
            // console.log(this.$el);
          });
          if (this.appendToBody) {
            document.body.appendChild(this.$el);
          }
        } else {
          this.$el.removeEventListener('scroll', this.updatePopper);
          if (!this.closed) this.$emit('close');
        }
      }
    },

    computed: {
      style() {
        let style = {};
        if (this.limitedArea) {
          let scrollBarSize = this._getScrollbarSize();
          style['max-width'] = 'calc(100vw - ' + scrollBarSize.width + 'px)';
        }
        if (this.width) {
          style.width = this.width;
        }
        if (!this.fullscreen) {
          style.marginTop = this.top;
        }
        return style;
      }
    },

    methods: {
      _getScrollbarSize() {
        if (this._scrollSizeCache) {
          return this._scrollSizeCache;
        }
        let oP = document.createElement('p');
        let styles = {
          width: '100px',
          height: '100px',
          overflow: 'scroll',
          position: 'absolute'
        };
        let i;
        let scrollbarWidth;
        let scrollbarHeight;
        for (i in styles) {
          oP.style[i] = styles[i];
        }
        document.body.appendChild(oP);
        scrollbarWidth = oP.offsetWidth - oP.clientWidth;
        scrollbarHeight = oP.offsetHeight - oP.clientHeight;
        removeElement(oP);
        function removeElement(_element) {
          let _parentElement = _element.parentNode;
          if (_parentElement) {
            _parentElement.removeChild(_element);
          }
        }
        this._scrollSizeCache = {
          width: scrollbarWidth, height: scrollbarHeight
        };
        return this._scrollSizeCache;
      },
      resetSize() {
        if (!this.limitedArea) {
          return;
        }
        this.$nextTick(() => {
          let headerDom = this.$el.querySelector('.el-dialog__header');
          let footerDom = this.$el.querySelector('.el-dialog__footer');
          let bodyDom = this.$el.querySelector('.el-dialog__body');
          let padding = 0;
          let computedDomStyle = window.getComputedStyle(bodyDom, null);
          padding += +computedDomStyle.paddingTop.replace('px', '');
          padding += +computedDomStyle.paddingBottom.replace('px', '');
          let headerH = headerDom && headerDom.offsetHeight || 0;
          let footerH = footerDom && footerDom.offsetHeight || 0;
          let scrollBarSize = this._getScrollbarSize();
          this.bodyStyle = {
            'max-height': 'calc(100vh - ' + scrollBarSize.height + 'px - ' + this.top + ' - ' + headerH + 'px - ' + footerH + 'px - ' + padding + 'px)',
            'overflow-y': 'auto'
          };
        });
      },
      getMigratingConfig() {
        return {
          props: {
            'size': 'size is removed.'
          }
        };
      },
      handleWrapperClick() {
        if (!this.closeOnClickModal) return;
        this.handleClose();
      },
      handleClose() {
        if (typeof this.beforeClose === 'function') {
          this.beforeClose(this.hide);
        } else {
          this.hide();
        }
      },
      hide(cancel) {
        if (cancel !== false) {
          this.$emit('update:visible', false);
          this.$emit('close');
          this.closed = true;
        }
      },
      updatePopper() {
        this.broadcast('ElSelectDropdown', 'updatePopper');
        this.broadcast('ElDropdownMenu', 'updatePopper');
      },
      dragable() {
        const targetid = this.$el.querySelector('.el-dialog__header');
        const moveTarget = this.$el.querySelector('.el-dialog');
        let leftLimit;
        let topLimit;
        let topMaxLimit;
        targetid.onmousedown = (event) => {
          const e = event;
          const offsetLeft = this.offset.left;
          const offsetTop = this.offset.top;
          leftLimit = (window.innerWidth - moveTarget.offsetWidth) / 2;
          topLimit = window.innerHeight * moveTarget.style['margin-top'].split('vh')[0] / 100;
          topMaxLimit = window.innerHeight * (100 - moveTarget.style['margin-top'].split('vh')[0]) / 100 - moveTarget.offsetHeight;
          this.mousePoint.x = e.clientX - offsetLeft;
          this.mousePoint.y = e.clientY - offsetTop;
          document.onmousemove = move;
          e.stopPropagation();
        };
        const move = (event) => {
          const e = event;
          let l = e.clientX - this.mousePoint.x;
          let t = e.clientY - this.mousePoint.y;
          if (l < 0 - leftLimit) {
            l = 0 - leftLimit;
          } else if (l > leftLimit) {
            l = leftLimit;
          }
          if (t < 0 - topLimit) {
            t = 0 - topLimit;
          } else if (t > topMaxLimit) {
            t = topMaxLimit;
          }
          this.offset.left = l;
          this.offset.top = t;
          moveTarget.style.left = this.offset.left + 'px';
          moveTarget.style.top = this.offset.top + 'px';
          document.onmouseup = end;
          targetid.onmouseup = end;
          e.stopPropagation();
        };
        const end = (event) => {
          const e = event;
          document.onmousemove = null;
          document.onmouseup = null;
          e.stopPropagation();
        };
      },
      afterEnter() {
        this.$emit('opened');
      },
      afterLeave() {
        this.$emit('closed');
      }
    },

    mounted() {
      if (this.visible) {
        this.rendered = true;
        this.open();
        if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
        this.resetSize();
        window.addEventListener('resize', this.resetSize);
      }
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.resetSize);
    },
    destroyed() {
      // if appendToBody is true, remove DOM node after destroy
      if (this.appendToBody && this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
    }
  };
</script>
