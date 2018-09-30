import Vue from 'vue';
import { Form, FormItem, Tooltip, Message, Menu, MenuItem, Header, Container, Main, Input, Button, ButtonGroup, Popover, Dialog, Loading, Notification } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tooltip);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Header);
Vue.use(Container);
Vue.use(Main);
Vue.use(Input);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Popover);
Vue.use(Dialog);
Vue.use(Loading);

Vue.prototype.$message = Message;
Vue.prototype.$loading = Loading;
Vue.prototype.$notify = Notification;
