<template>
  <div ref="$el">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ElWaypoint',
  props: {
    scrollAncestors: {
      type: Function,
      default: () => [window]
    },
    scrollParent: {
      type: Function,
      default: () => window
    },
    offsetTop: {
      type: String,
      default: '0px'
    },
    offsetBottom: {
      type: String,
      default: '0px'
    },
    immediate: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isTopInView: false,
      isBottomInView: false
    };
  },
  mounted() {
    this.addResizeEvent();
    this.addScrollEvent();

    if (this.immediate) {
      this.verifyPosition();
    }
  },
  beforeDestroy() {
    this.removeResizeEvent();
    this.removeScrollEvent();
  },
  watch: {
    isTopInView(value) {
      if (value) {
        this.$emit('top-enter');
      } else {
        this.$emit('top-leave');
      }
    },
    isBottomInView(value) {
      if (value) {
        this.$emit('bottom-enter');
      } else {
        this.$emit('bottom-leave');
      }
    }
  },
  methods: {
    addResizeEvent() {
      window.addEventListener('resize', this.handleResize);
    },
    removeResizeEvent() {
      window.removeEventListener('resize', this.handleResize);
    },
    addScrollEvent() {
      const $scrollAncestors = this.scrollAncestors();
      if ($scrollAncestors && $scrollAncestors.length) {
        for (const $scrollAncestor of $scrollAncestors) {
          if (typeof $scrollAncestor === 'string') {
            document.querySelector($scrollAncestor).addEventListener('scroll', this.handleScroll);
          } else {
            $scrollAncestor.addEventListener('scroll', this.handleScroll);
          }
        }
      }
    },
    removeScrollEvent() {
      const $scrollAncestors = this.scrollAncestors();
      if ($scrollAncestors && $scrollAncestors.length) {
        for (const $scrollAncestor of $scrollAncestors) {
          if (typeof $scrollAncestor === 'string') {
            document.querySelector($scrollAncestor).removeEventListener('scroll', this.handleScroll);
          } else {
            $scrollAncestor.removeEventListener('scroll', this.handleScroll);
          }
        }
      }
    },
    getClientRect(element) {
      if (element === window) {
        const { innerWidth: width, innerHeight: height } = element;
        return { x: 0, y: 0, top: 0, right: 0, bottom: 0, left: 0, width, height };
      }
      const rects = element.getClientRects();
      return rects.length ? rects[0] : undefined;
    },
    string2Pixel(value) {
      return +value.replace('px', '');
    },
    topViewPort(parRect) {
      return Math.max(0, parRect.y);
    },
    bottomViewPort(parRect) {
      return Math.min(window.innerHeight, parRect.y + parRect.height);
    },
    isElTopInView(elRect, parRect) {
      return elRect.y + this.string2Pixel(this.offsetTop) >= this.topViewPort(parRect) && elRect.y + this.string2Pixel(this.offsetTop) <= this.bottomViewPort(parRect);
    },
    isElBottomInView(elRect, parRect) {
      return elRect.y + elRect.height + this.string2Pixel(this.offsetBottom) >= this.topViewPort(parRect) && elRect.y + elRect.height + this.string2Pixel(this.offsetBottom) <= this.bottomViewPort(parRect);
    },
    isElTopOutView(elRect, parRect) {
      return elRect.y + this.string2Pixel(this.offsetTop) < this.topViewPort(parRect) || elRect.y + this.string2Pixel(this.offsetTop) > this.bottomViewPort(parRect);
    },
    isElBottomOutView(elRect, parRect) {
      return elRect.y + elRect.height + this.string2Pixel(this.offsetBottom) < this.topViewPort(parRect) || elRect.y + elRect.height + this.string2Pixel(this.offsetBottom) > this.bottomViewPort(parRect);
    },
    verifyPosition() {
      const { $el } = this.$refs;
      const $scrollParent = this.scrollParent();

      const elRect = this.getClientRect($el);
      const parRect = this.getClientRect($scrollParent);

      if ($el && $scrollParent && elRect && parRect) {
        const isElTopInView = this.isElTopInView(elRect, parRect);
        const isElBottomInView = this.isElBottomInView(elRect, parRect);
        const isElTopOutView = this.isElTopOutView(elRect, parRect);
        const isElBottomOutView = this.isElBottomOutView(elRect, parRect);
        if (isElTopInView && !this.isTopInView) {
          this.isTopInView = true;
        }
        if (isElBottomInView && !this.isBottomInView) {
          this.isBottomInView = true;
        }
        if (isElTopOutView && this.isTopInView) {
          this.isTopInView = false;
        }
        if (isElBottomOutView && this.isBottomInView) {
          this.isBottomInView = false;
        }
      }
    },
    handleResize() {
      this.verifyPosition();
    },
    handleScroll() {
      this.verifyPosition();
    }
  }
};
</script>
