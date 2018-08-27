import Vue from 'vue';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import qs from 'qs';

let shell;
if (window.navigator.userAgent.indexOf('Electron') !== -1) {
  // eslint-disable-next-line
  shell = require('electron').shell;
}

Vue.use(ElementUI);
if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = 'http://pc.zmzapi.com';
} else {
  axios.defaults.baseURL = '/';
}
const axiosInstance = axios.create({
  params: {
    g: 'api/pv2', accesskey: '519f9cab85c8059d17544947k361a827',
  },
});
axiosInstance.interceptors.request.use((req) => {
  if (window.localStorage.getItem('userInfo')) {
    const userInfo = JSON.parse(window.localStorage.getItem('userInfo'));
    if (userInfo.token) {
      Object.assign(req.params, {
        uid: userInfo.uid,
        token: userInfo.token,
      });
    }
  }
  return req;
}, err => Promise.reject(err));

axiosInstance.interceptors.response.use((rep) => {
  if (rep.data.status !== 1) Vue.prototype.$message.warning(rep.data.info);
  return rep;
}, err => Promise.reject(err));

Vue.prototype.$http = axiosInstance;
Vue.prototype.$openUrl = function openUrl(url) {
  if (window.navigator.userAgent.indexOf('Electron') !== -1) {
    shell.openExternal(url);
  } else {
    window.open(url);
  }
};
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
