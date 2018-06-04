import Vue from 'vue';
import Router from 'vue-router';

// 首页
import home from '@/pages/home';
import homeSeller from '@/pages/home/seller';
import homeBuyer from '@/pages/home/buyer';
import homeCreate from '@/pages/home/create';
// 我的订单
import order from '@/pages/order';
import orderSeller from '@/pages/order/seller';
import orderBuyer from '@/pages/order/buyer';
// 账户中心
import account from '@/pages/account';
import accountReg from '@/pages/account/reg';
import accountLogin from '@/pages/account/login';
// 认证
import auth from '@/pages/auth';
import authSeller from '@/pages/auth/seller';
import authBuyer from '@/pages/auth/buyer';
// 个人中心
import userCenter from '@/pages/userCenter';
import ucPay from '@/pages/userCenter/pay';
import ucCash from '@/pages/userCenter/cash';
import ucCoin from '@/pages/userCenter/coin';

Vue.use(Router);

export default new Router({
    routes: [{
        // 缺省页
        path: '/',
        redirect: '/home'
    }, {
        // 首页
        path: '/home',
        name: 'home',
        component: home,
        children: [{
            // 刷手
            path: 'seller',
            name: 'homeSeller',
            component: homeSeller
        }, {
            // 商家
            path: 'buyer',
            name: 'homeBuyer',
            component: homeBuyer
        }, {
            // 商家-创建模板
            path: 'create',
            name: 'homeCreate',
            component: homeCreate
        }]
    }, {
        // 账号中心
        path: '/account',
        name: 'account',
        component: account,
        children: [{
            // 登录
            path: 'login',
            name: 'accountLogin',
            component: accountLogin
        }, {
            // 注册
            path: ' reg',
            name: 'accountReg',
            component: accountReg
        }]
    }, {
        // 认证
        path: '/auth',
        name: 'auth',
        component: auth,
        children: [{
            // 刷手认证
            path: 'seller',
            name: 'authSeller',
            component: authSeller
        }, {
            // 商家认证
            path: 'buyer',
            name: 'authBuyer',
            component: authBuyer
        }]
    }, {
        // 我的订单
        path: '/order',
        name: 'order',
        component: order,
        children: [{
            // 刷手订单
            path: 'seller',
            name: 'orderSeller',
            component: orderSeller
        }, {
            // 商家订单
            path: 'buyer',
            name: 'orderBuyer',
            component: orderBuyer
        }]
    }, {
        // 个人中心
        path: '/uc',
        name: 'userCenter',
        component: userCenter,
        children: [{
            // 充值
            path: 'pay',
            name: 'ucPay',
            component: ucPay
        }, {
            // 提现
            path: 'cash',
            name: 'ucCash',
            component: ucCash
        }, {
            // 我的金币
            path: 'coin',
            name: 'ucCoin',
            component: ucCoin
        }]
    }]
});
