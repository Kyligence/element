import Vue from 'vue';
import Main from './main.vue';
import { PopupManager } from 'kyligence-ui/src/utils/popup';
import { isVNode } from 'kyligence-ui/src/utils/vdom';
let MessageConstructor = Vue.extend(Main);

let instance;
let instances = [];
let seed = 1;

const Message = function(options) {
  if (Vue.prototype.$isServer) return;
  options = options || {};
  if (typeof options === 'string') {
    options = {
      message: options
    };
  }
  // 1、全局设置了关闭，组件没设，则统一会关闭 2、组件直接设置关闭，当前的会关闭 3、全局设置关闭，组件设置为false的话，就不关闭
  if (options.closeOtherMessages || ((Vue.prototype.$ELEMENT || {}).closeOtherMessages && options.closeOtherMessages === undefined)) {
    Message.closeAll();
  }
  // 如果组件本身没设置 duration 和 showClose 这个字段，但全局配置了，这时候需要将全局的设置给组件，便于全局设置消失时间和是否可关闭
  if (Vue.prototype.$ELEMENT && Vue.prototype.$ELEMENT.messageDuration !== undefined && options.duration === undefined) {
    options.duration = Vue.prototype.$ELEMENT.messageDuration;
  }
  if (Vue.prototype.$ELEMENT && Vue.prototype.$ELEMENT.messageShowClose !== undefined && options.showClose === undefined) {
    options.showClose = Vue.prototype.$ELEMENT.messageShowClose;
  }
  let userOnClose = options.onClose;
  let id = 'message_' + seed++;

  options.onClose = function() {
    Message.close(id, userOnClose);
  };
  instance = new MessageConstructor({
    data: options
  });
  instance.id = id;
  if (isVNode(instance.message)) {
    instance.$slots.default = [instance.message];
    instance.message = null;
  }
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instance.vm.visible = true;
  instance.dom = instance.vm.$el;
  instance.dom.style.zIndex = PopupManager.nextZIndex();
  instances.push(instance);
  return instance.vm;
};

['success', 'warning', 'info', 'error'].forEach(type => {
  Message[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options
      };
    }
    options.type = type;
    return Message(options);
  };
});

Message.close = function(id, userOnClose) {
  for (let i = 0, len = instances.length; i < len; i++) {
    if (id === instances[i].id) {
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i]);
      }
      instances.splice(i, 1);
      break;
    }
  }
};

Message.closeAll = function() {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close();
  }
};

export default Message;
