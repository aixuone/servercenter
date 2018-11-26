// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import './assets/themes/theme2/index.scss';
import router from "./router";
import App from './App';
import 'font-awesome/css/font-awesome.min.css';
// require("./utils/mock");
Vue.use(ElementUI, { size: 'medium' });

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App)
  });
