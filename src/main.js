import Vue from 'vue';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUI);
if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://pc.zmzapi.com';
} else {
  axios.defaults.baseURL = '/';
}
let loading;
axios.interceptors.request.use((req) => {
  loading = Vue.prototype.$loading({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)',
  });
  return req;
}, err => Promise.reject(err));

axios.interceptors.response.use((rep) => {
  loading.close();
  if (rep.data.status !== 1) Vue.prototype.$message.warning(rep.data.info);
  return rep;
}, err => Promise.reject(err));

Vue.prototype.$http = axios;
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
