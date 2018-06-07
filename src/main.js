// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App';
import router from './router';
import http from '@/javascript/http';
import {
    Input,
    Checkbox,
    CheckboxGroup,
    Radio,
    RadioGroup
} from 'element-ui';
// 引入 css
import '@/assets/less/index.less';

Vue.config.productionTip = false;

Vue.use(Input);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Radio);
Vue.use(RadioGroup);

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        userInfo: JSON.parse(localStorage.getItem('userInfo'))
    },
    mutations: {},
    actions: {}
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    http,
    components: { App },
    template: '<App/>'
});
