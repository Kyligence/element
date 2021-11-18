import Vue from 'vue';
import entry from './app';
import VueRouter from 'vue-router';
import Element from 'main/index.js';
import 'packages/theme-chalk/src/index.scss';
import routes from './route.config';
import demoBlock from './components/demo-block.vue';
import MainFooter from './components/footer.vue';
import MainHeader from './components/header.vue';
import SideNav from './components/side-nav';
import FooterNav from './components/footer-nav';
import title from './i18n/title.json';
import VueI18n from 'vue-i18n';
import enLocale from '../lib/locale/lang/en';
import zhLocale from '../lib/locale/lang/zh-CN';
import '../src/iconfont/iconfont.js';
Vue.use(VueI18n);
Vue.locale('zh-cn', zhLocale);
Vue.locale('en', enLocale);

Vue.use(Element, {
  closeOtherMessages: true,
  messageDuration: 6000,
  messageShowClose: true
});
Vue.use(VueRouter);
Vue.component('demo-block', demoBlock);
Vue.component('main-footer', MainFooter);
Vue.component('main-header', MainHeader);
Vue.component('side-nav', SideNav);
Vue.component('footer-nav', FooterNav);

const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes
});

router.afterEach(route => {
  const data = title[route.meta.lang];
  for (let val in data) {
    if (new RegExp('^' + val, 'g').test(route.name)) {
      document.title = data[val];
      return;
    }
  }
  document.title = 'Element';
});

window.elementVm = new Vue({ // eslint-disable-line
  render: h => h(entry),
  router
}).$mount('#app');
