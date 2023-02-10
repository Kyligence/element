<template>
  <transition name="msgbox-fade">
    <div
      class="el-message-box__wrapper"
      tabindex="-1"
      v-show="visible"
      @click.self="handleWrapperClick"
      role="dialog"
      aria-modal="true"
      :aria-label="title || 'dialog'"
    >
      <div class="el-message-box" :style="style" :class="[customClass, center && 'el-message-box--center']">
        <div class="el-message-box__header" v-if="title !== null">
          <div class="el-message-box__title">
            <div class="el-message-box__status" :class="[ typeClass ]" v-if="iconClass"></div>
            <el-icon class="el-message-box__status" v-if="typeClass" :name="typeClass" type="mult"></el-icon>
            <span>{{ title }}</span>
          </div>
          <el-button type="button"
                  class="el-message-box__headerbtn"
                  aria-label="Close"
                  v-if="showClose"
                  nobg-text
                  icon="el-ksd-icon-close_22"
                  @click="handleAction('cancel')"
                  @keydown.enter="handleAction('cancel')"
          >
            <!-- <i class="el-message-box__close el-ksd-icon-close_22"></i> -->
          </el-button>
        </div>
        <div class="el-message-box__content" v-if="message !== ''">
          <!-- <div class="el-message-box__status" :class="[ typeClass ]" v-if="typeClass && !center"></div> -->
          <div class="el-message-box__message">
            <slot>
              <p v-if="!dangerouslyUseHTMLString">{{ message }}</p>
              <p v-else v-html="message"></p>
            </slot>
          </div>
          <div class="el-message-box__input" v-show="showInput">
            <el-input
              v-model="inputValue"
              :type="inputType"
              @keydown.enter.native="handleAction('confirm')"
              :placeholder="inputPlaceholder"
              ref="input"></el-input>
            <div class="el-message-box__errormsg" :style="{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }">{{ editorErrorMessage }}</div>
          </div>
        </div>
        <div class="el-message-box__btns" :class="{'el-message-box__btns_center': centerButton}">
          <el-button
            :loading="cancelButtonLoading"
            :class="[ cancelButtonClasses ]"
            v-if="showCancelButton"
            :round="roundButton"
            size="medium"
            @click.native="handleAction('cancel')"
            @keydown.enter="handleAction('cancel')"
          >
            {{ cancelButtonText || t('el.messagebox.cancel') }}
          </el-button>
          <el-button
            :loading="confirmButtonLoading"
            ref="confirm"
            :class="[ confirmButtonClasses ]"
            v-if="showConfirmButton"
            :round="roundButton"
            size="medium"
            type="primary"
            @click.native="handleAction('confirm')"
            @keydown.enter="handleAction('confirm')"
          >
            {{ confirmButtonText || t('el.messagebox.confirm') }}
          </el-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/babel">
  import Popup from 'kyligence-kylin-ui/src/utils/popup';
  import Locale from 'kyligence-kylin-ui/src/mixins/locale';
  import ElInput from 'kyligence-kylin-ui/packages/input';
  import ElButton from 'kyligence-kylin-ui/packages/button';
  import { addClass, removeClass } from 'kyligence-kylin-ui/src/utils/dom';
  import { t } from 'kyligence-kylin-ui/src/locale';
  import Dialog from 'kyligence-kylin-ui/src/utils/aria-dialog';

  let messageBox;
  let typeMap = {
    success: 'finished',
    info: 'info',
    warning: 'warning',
    error: 'error'
  };

  export default {
    mixins: [Popup, Locale],

    props: {
      modal: {
        default: true
      },
      iconClass: {
        type: String
      },
      lockScroll: {
        default: true
      },
      showClose: {
        type: Boolean,
        default: true
      },
      closeOnClickModal: {
        default: true
      },
      closeOnPressEscape: {
        default: true
      },
      closeOnHashChange: {
        default: true
      },
      center: {
        default: false,
        type: Boolean
      },
      roundButton: {
        default: false,
        type: Boolean
      },
      centerButton: {
        default: true,
        type: Boolean
      },
      width: {
        default: '400px',
        type: String
      }
    },

    components: {
      ElInput,
      ElButton
    },

    computed: {
      typeClass() {
        return this.iconClass ? this.iconClass : this.type && typeMap[this.type] ? `el-ksd-icon-${ typeMap[this.type] }_24` : '';
      },
      confirmButtonClasses() {
        return `${ this.confirmButtonClass }`;
      },
      cancelButtonClasses() {
        return `${ this.cancelButtonClass }`;
      },
      style() {
        return {width: this.width};
      }
    },

    methods: {
      getSafeClose() {
        const currentId = this.uid;
        return () => {
          this.$nextTick(() => {
            if (currentId === this.uid) this.doClose();
          });
        };
      },
      doClose() {
        if (!this.visible) return;
        this.visible = false;
        this._closing = true;

        this.onClose && this.onClose();
        messageBox.closeDialog(); // 解绑
        if (this.lockScroll) {
          setTimeout(() => {
            if (this.modal && this.bodyOverflow !== 'hidden') {
              document.body.style.overflow = this.bodyOverflow;
              document.body.style.paddingRight = this.bodyPaddingRight;
            }
            this.bodyOverflow = null;
            this.bodyPaddingRight = null;
          }, 200);
        }
        this.opened = false;

        if (!this.transition) {
          this.doAfterClose();
        }
        setTimeout(() => {
          if (this.action) this.callback(this.action, this);
        });
      },

      handleWrapperClick() {
        if (this.closeOnClickModal) {
          this.handleAction('cancel');
        }
      },

      handleAction(action) {
        if (this.$type === 'prompt' && action === 'confirm' && !this.validate()) {
          return;
        }
        this.action = action;
        if (typeof this.beforeClose === 'function') {
          this.close = this.getSafeClose();
          this.beforeClose(action, this, this.close);
        } else {
          this.doClose();
        }
      },

      validate() {
        if (this.$type === 'prompt') {
          const inputPattern = this.inputPattern;
          if (inputPattern && !inputPattern.test(this.inputValue || '')) {
            this.editorErrorMessage = this.inputErrorMessage || t('el.messagebox.error');
            addClass(this.getInputElement(), 'invalid');
            return false;
          }
          const inputValidator = this.inputValidator;
          if (typeof inputValidator === 'function') {
            const validateResult = inputValidator(this.inputValue);
            if (validateResult === false) {
              this.editorErrorMessage = this.inputErrorMessage || t('el.messagebox.error');
              addClass(this.getInputElement(), 'invalid');
              return false;
            }
            if (typeof validateResult === 'string') {
              this.editorErrorMessage = validateResult;
              return false;
            }
          }
        }
        this.editorErrorMessage = '';
        removeClass(this.getInputElement(), 'invalid');
        return true;
      },
      getFistFocus() {
        const $btns = this.$el.querySelector('.el-message-box__btns .el-button');
        const $title = this.$el.querySelector('.el-message-box__btns .el-message-box__title');
        return $btns && $btns[0] || $title;
      },
      getInputElement() {
        const inputRefs = this.$refs.input.$refs;
        return inputRefs.input || inputRefs.textarea;
      }
    },

    watch: {
      inputValue: {
        immediate: true,
        handler(val) {
          this.$nextTick(_ => {
            if (this.$type === 'prompt' && val !== null) {
              this.validate();
            }
          });
        }
      },

      visible(val) {
        if (val) {
          this.uid++;
          if (this.$type === 'alert' || this.$type === 'confirm') {
            this.$nextTick(() => {
              this.$refs.confirm.$el.focus();
            });
          }
          this.focusAfterClosed = document.activeElement;
          messageBox = new Dialog(this.$el, this.focusAfterClosed, this.getFistFocus());
        }

        // prompt
        if (this.$type !== 'prompt') return;
        if (val) {
          setTimeout(() => {
            if (this.$refs.input && this.$refs.input.$el) {
              this.getInputElement().focus();
            }
          }, 500);
        } else {
          this.editorErrorMessage = '';
          removeClass(this.getInputElement(), 'invalid');
        }
      }
    },

    mounted() {
      if (this.closeOnHashChange) {
        window.addEventListener('hashchange', this.close);
      }
    },

    beforeDestroy() {
      if (this.closeOnHashChange) {
        window.removeEventListener('hashchange', this.close);
      }
      setTimeout(() => {
        messageBox.closeDialog();
      });
    },

    data() {
      return {
        uid: 1,
        title: undefined,
        message: '',
        type: '',
        customClass: '',
        showInput: false,
        inputValue: null,
        inputPlaceholder: '',
        inputType: 'text',
        inputPattern: null,
        inputValidator: null,
        inputErrorMessage: '',
        showConfirmButton: true,
        showCancelButton: false,
        action: '',
        confirmButtonText: '',
        cancelButtonText: '',
        confirmButtonLoading: false,
        cancelButtonLoading: false,
        confirmButtonClass: '',
        confirmButtonDisabled: false,
        cancelButtonClass: '',
        editorErrorMessage: null,
        callback: null,
        dangerouslyUseHTMLString: false,
        focusAfterClosed: null,
        isOnComposition: false
      };
    }
  };
</script>
