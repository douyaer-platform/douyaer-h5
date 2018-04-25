// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import {
    Checkbox,
    CheckboxGroup,
    Radio,
    RadioGroup
} from 'element-ui';

// 引入 css
import '@/assets/less/index.less';

Vue.config.productionTip = false;

Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Radio);
Vue.use(RadioGroup);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
});
