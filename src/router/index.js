import Vue from 'vue';
import Router from 'vue-router';

// 首页
import home from '@/pages/home';
import link from '@/pages/home/link';
// 我的订单
import order from '@/pages/order';
// 个人中心
import userCenter from '@/pages/userCenter';
// 账户中心
import accountReg from '@/pages/account/reg';

Vue.use(Router);

export default new Router({
    routes: [{
        // 首页
        path: '/',
        name: 'default',
        component: link
    }, {
        // 首页
        path: '/home',
        name: 'home',
        component: home
    }, {
        // 我的订单
        path: '/order',
        name: 'order',
        component: order
    }, {
        // 个人中心
        path: '/uc',
        name: 'userCenter',
        component: userCenter
    }, {
        // 账号-注册
        path: '/account/reg',
        name: 'accountReg',
        component: accountReg
    }]
});
