import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import './plugins/element';

let shell;
let isElectron;
if (window.navigator.userAgent.indexOf('Electron') !== -1) {
  isElectron = true;
}
if (isElectron) {
  // eslint-disable-next-line
  shell = require('electron').shell;
}

if (isElectron) {
  axios.defaults.baseURL = 'htt p://pc.zmzapi.com';
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
  if (isElectron) {
    shell.openExternal(url);
  } else {
    window.open(url);
  }
};
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
