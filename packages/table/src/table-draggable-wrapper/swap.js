import { Sortable } from 'sortablejs';

function matches(el, selector) {
  if (!selector) return;

  selector[0] === '>' && (selector = selector.substring(1));

  if (el) {
    try {
      if (el.matches) {
        return el.matches(selector);
      } else if (el.msMatchesSelector) {
        return el.msMatchesSelector(selector);
      } else if (el.webkitMatchesSelector) {
        return el.webkitMatchesSelector(selector);
      }
    } catch (_) {
      return false;
    }
  }

  return false;
}
function indexOf(el, selector) {
  let index = 0;

  if (!el || !el.parentNode) {
    return -1;
  }

  // eslint-disable-next-line no-cond-assign
  while ((el = el.previousElementSibling)) {
    if (
      el.nodeName.toUpperCase() !== 'TEMPLATE' &&
      el !== Sortable.clone &&
      (!selector || matches(el, selector))
    ) {
      index++;
    }
  }

  return index;
}

const R_SPACE = /\s+/g;

function toggleClass(el, name, state) {
  if (el && name) {
    if (el.classList) {
      el.classList[state ? 'add' : 'remove'](name);
    } else {
      let className = (' ' + el.className + ' ')
        .replace(R_SPACE, ' ')
        .replace(' ' + name + ' ', ' ');
      el.className = (className + (state ? ' ' + name : '')).replace(
        R_SPACE,
        ' '
      );
    }
  }
}
let lastSwapEl;
let lastSwapElIndex;
let dragElIndex;

function SwapPlugin() {
  function Swap() {
    this.defaults = {
      swapClass: ['sortable-swap-highlight-up', 'sortable-swap-highlight-down']
    };
  }

  Swap.prototype = {
    dragStart({ dragEl }) {
      lastSwapEl = dragEl;
      dragElIndex = indexOf(dragEl);
      lastSwapElIndex = dragElIndex;
    },
    dragOver({ target, dragEl, nextEl }) {
      const options = this.options;
      if (target === dragEl) {
        if (target !== lastSwapEl) {
          toggleClass(
            lastSwapEl,
            options.swapClass[dragElIndex > lastSwapElIndex ? 0 : 1],
            false
          );
        }
        lastSwapEl = dragEl;
        lastSwapElIndex = dragElIndex;
      }
    },
    dragOverValid({
      completed,
      target,
      onMove,
      activeSortable,
      changed,
      cancel
    }) {
      if (!activeSortable.options.swap) return;
      // eslint-disable-next-line one-var
      let el = this.sortable.el,
        options = this.options;
      if (target && target !== el) {
        let prevSwapEl = lastSwapEl;
        const prevSwapElIndex = lastSwapElIndex;
        if (onMove(target) !== false) {
          lastSwapEl = target;
          lastSwapElIndex = indexOf(lastSwapEl);
          toggleClass(
            target,
            options.swapClass[dragElIndex > lastSwapElIndex ? 0 : 1],
            true
          );
        } else {
          lastSwapEl = null;
          lastSwapElIndex = undefined;
        }

        if (prevSwapEl && prevSwapEl !== lastSwapEl) {
          toggleClass(
            prevSwapEl,
            options.swapClass[dragElIndex > prevSwapElIndex ? 0 : 1],
            false
          );
        }
      }
      changed();

      completed(true);
      cancel();
    },
    drop({ activeSortable, putSortable, dragEl, cancel }) {
      let toSortable = putSortable || this.sortable;
      let options = this.options;
      lastSwapEl &&
        toggleClass(
          lastSwapEl,
          options.swapClass[dragElIndex > lastSwapEl ? 0 : 1],
          false
        );
      if (lastSwapEl === dragEl) {
        cancel();
        return;
      }
      if (
        lastSwapEl &&
        (options.swap || (putSortable && putSortable.options.swap))
      ) {
        if (dragEl !== lastSwapEl) {
          toSortable.captureAnimationState();
          if (toSortable !== activeSortable) {
            activeSortable.captureAnimationState();
          }
          swapNodes(dragEl, lastSwapEl);

          toSortable.animateAll();
          if (toSortable !== activeSortable) activeSortable.animateAll();
        }
      }
    },
    nulling() {
      lastSwapEl = null;
      lastSwapElIndex = undefined;
    }
  };

  return Object.assign(Swap, {
    pluginName: 'swap',
    eventProperties() {
      return {
        swapItem: lastSwapEl
      };
    }
  });
}

function swapNodes(n1, n2) {
  // eslint-disable-next-line one-var
  let p1 = n1.parentNode,
    p2 = n2.parentNode,
    i1,
    i2;

  if (!p1 || !p2 || p1.isEqualNode(n2) || p2.isEqualNode(n1)) return;

  i1 = indexOf(n1);
  i2 = indexOf(n2);

  if (p1.isEqualNode(p2) && i1 < i2) {
    i2++;
  }
  p1.insertBefore(n2, p1.children[i1]);
  p2.insertBefore(n1, p2.children[i2]);
}

export default SwapPlugin;
