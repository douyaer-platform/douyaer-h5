<!--
* @moduleName: 个人中心
* @Author: weiberzeng
* @Date:   2018-04-23 21:52:38
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-09-05 13:45:31
-->
<template>
    <div class="page page-current">
        <header class="bar bar-nav">
            <h1 class="title">我</h1>
        </header>
        <bottomBar></bottomBar>
        <div class="content gray">
            <div class="pf-wrap">
                <div class="img-wrap"> <img :src="userInfo.sex==='female'?'/static/image/female.jpg':'/static/image/male.jpg'" alt=""></div>
                <div class="inner">
                    <p>{{hidePhoneFun(userInfo.phone)}}</p>
                    <div class="attr-item">
                        <span class="attr-name">旺旺号：</span>
                        <span class="attr-val">{{userInfo.alitm||'--'}}</span>
                    </div>
                </div>
                <router-link to="/auth" class="authBtn">{{auditText}} <i class="icon icon-right"></i></router-link>
            </div>
            <div class="list-block">
                <ul>
                    <li class="item-content item-link">
                        <router-link to="/uc/flow">
                            <div class="item-media"><i class="icon icon-flow"></i></div>
                            <div class="item-inner">
                                <div class="item-title">资金流水</div>
                                <div class="item-after"></div>
                            </div>
                        </router-link>
                    </li>
                    <li class="item-content item-link">
                        <router-link to="/uc/coin">
                            <div class="item-media"><i class="icon icon-coin"></i></div>
                            <div class="item-inner">
                                <div class="item-title">我的金币</div>
                                <div class="item-after">{{userInfo.coin}}</div>
                            </div>
                        </router-link>
                    </li>
                    <li class="item-content item-link" v-if="userInfo.userRole==='business'">
                        <router-link to="/uc/points">
                            <div class="item-media"><i class="icon icon-points"></i></div>
                            <div class="item-inner">
                                <div class="item-title">我的积分</div>
                                <div class="item-after">{{userInfo.integral}}</div>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="list-block">
                <ul>
                    <li class="item-content item-link">
                        <router-link to="/uc/concat">
                            <div class="item-media"><i class="icon icon-tel"></i></div>
                            <div class="item-inner">
                                <div class="item-title">联系客服</div>
                                <div class="item-after"></div>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="submitWrap"><a href="javascript:;" @click.stop="logoutFun" class="button button-big button-light button-danger">退出登录</a></div>
        </div>
    </div>
</template>
<script>
import bottomBar from '@/components/bottomBar';
import {
    hidePhone
} from '@/javascript/utils';

let $ = window.$;
export default {
    name: 'userCenterIndex',
    data() {
        return {
            auditText: ''
        };
    },
    computed: {
        userInfo() {
            return this.$store.state.userInfo;
        },
        userCert() {
            return this.$store.state.userCert || {};
        }
    },
    created() {
        switch (this.userCert.status) {
            case 0:
                this.auditText = '认证中';
                break;
            case 1:
                this.auditText = '认证不通过';
                break;
            case 2:
                this.auditText = '认证通过';
                break;
            default:
                this.auditText = '去认证';
                break;
        }
    },
    methods: {
        /**
         * @Author      weiberZeng
         * @DateTime    2018-07-31
         * @lastTime    2018-07-31
         * @description 电话号码脱敏
         */
        hidePhoneFun(val) {
            return hidePhone(val);
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-07-31
         * @lastTime    2018-07-31
         * @description 退出登录
         */
        logoutFun() {
            let _that = this;
            $.confirm('退出登录？', '', function() {
                _that.$http.get('/user/logout').then((response) => {
                    if (response.data.success) {
                        // 清空用户信息
                        localStorage.setItem('userInfo', '');
                        _that.$store.state.userInfo = {};
                        localStorage.setItem('userCert', '');
                        _that.$store.state.userCert = {};
                        setTimeout(() => {
                            // 跳转至登录页面
                            _that.$router.replace({
                                path: '/account/login'
                            });
                        }, 500);
                    } else {
                        $.alert(response.data.message);
                    }
                });
            }, function() {}, '确定', '取消');
        }
    },
    components: {
        bottomBar
    }
};

</script>
