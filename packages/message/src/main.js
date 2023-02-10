import Vue from 'vue';
import Main from './main.vue';
import { PopupManager } from 'kyligence-kylin-ui/src/utils/popup';
import { isVNode } from 'kyligence-kylin-ui/src/utils/vdom';
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
  // 需要自定义时间和关闭按钮的 message 类型
  const curMessageType = options.type || 'info';
  // 如果组件本身没设置 duration 和 showClose 这个字段，但全局配置了，这时候需要将全局的设置给组件，便于全局设置消失时间和是否可关闭
  const hasGlobalDuration = Vue.prototype.$ELEMENT && Vue.prototype.$ELEMENT[curMessageType + 'MessageDuration'] !== undefined && options.duration === undefined;
  if (hasGlobalDuration) {
    options.duration = Vue.prototype.$ELEMENT[curMessageType + 'MessageDuration'];
  }
  const hasGlobalShowClose = Vue.prototype.$ELEMENT && Vue.prototype.$ELEMENT[curMessageType + 'MessageShowClose'] !== undefined && options.showClose === undefined;
  if (hasGlobalShowClose) {
    options.showClose = Vue.prototype.$ELEMENT[curMessageType + 'MessageShowClose'];
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
