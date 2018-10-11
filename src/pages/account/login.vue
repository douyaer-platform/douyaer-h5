<!--
* @moduleName: 登录页面
* @Author: weiberzeng
* @Date:   2018-04-25 14:17:20
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-10-11 09:08:53
-->
<template>
    <div class="page page-current">
        <div class="content">
            <div class="accountWrap">
                <div class="userPhoto">
                    <img src="/static/image/logo.png" alt="">
                </div>
                <div class="list-block">
                    <ul>
                        <li>
                            <div class="item-content">
                                <div class="item-inner">
                                    <div class="item-title label">账号</div>
                                    <div class="item-input">
                                        <input type="text" v-model="form.account" placeholder="请输入账号" autofocus>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="item-content">
                                <div class="item-inner">
                                    <div class="item-title label">密码</div>
                                    <div class="item-input">
                                        <input v-model="form.password" maxlength="12" :type="canSee?'text':'password'" placeholder="请输入密码">
                                    </div>
                                    <a href="javascript:;" @click.stop="canSeeChangeFun" :class="canSee?'seeBtn active':'seeBtn'">
                                        <i class="icon-see"></i>
                                    </a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="submitWrap">
                    <a href="javascript:;" @click.stop="loginFun" class="button button-big button-fill">登录</a>
                </div>
                <div class="linkWrap">
                    <router-link to="/account/forget">忘记密码？</router-link>
                </div>
                <div class="linkWrap bottom">
                    <router-link to="/account/reg">还没有账号？</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    trim
} from '@/javascript/utils';
let $ = window.$;
export default {
    name: 'accountLogin',
    data() {
        return {
            form: {
                account: '',
                password: ''
            },
            validate: {
                account: false,
                password: false
            },
            canSee: false
        };
    },
    watch: {
        'form.account': 'validateAccount',
        'form.password': 'validatePassword'
    },
    created() {
        // 清空用户信息
        localStorage.setItem('userInfo', '');
        this.$store.state.userInfo = {};
        localStorage.setItem('userCert', '');
        this.$store.state.userCert = {};
    },
    methods: {
        /**
         * @Author      weiberZeng
         * @DateTime    2018-06-04
         * @lastTime    2018-06-04
         * @description 验证函数
         */
        validateAccount(to, from) {
            if (to.length < 11) {
                this.validate.account = false;
            } else {
                this.validate.account = (to.length) > 0 && (/^(1[3-9][0-9])[0-9]{8}$/).test(trim(to));
            }
        },
        validatePassword(to, from) {
            if (to.length < 6) {
                this.validate.password = false;
            } else if (to.length > 12) {
                this.validate.password = false;
            } else {
                this.validate.password = true;
            }
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-06-04
         * @lastTime    2018-06-04
         * @description 密码是否可见
         */
        canSeeChangeFun() {
            this.canSee = !this.canSee;
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-06-04
         * @lastTime    2018-06-04
         * @description 登录
         */
        loginFun() {
            if (!this.validate.account) {
                $.toast('请输入正确手机号！');
                return;
            }
            if (!this.validate.password) {
                $.toast('请输入6-12位密码！');
                return;
            }
            $.showPreloader();
            this.$http.post('/user/doLogin', this.form).then((response) => {
                $.hidePreloader();
                if (response.data.success) {
                    // 已登录，重新获取用户信息
                    this.$http.get('/user/get').then((response) => {
                        if (response.data.success) {
                            localStorage.setItem('userInfo', JSON.stringify(response.data.data.user));
                            this.$store.state.userInfo = response.data.data.user;
                            if (response.data.data.userCert) {
                                localStorage.setItem('userCert', JSON.stringify(response.data.data.userCert));
                                this.$store.state.userCert = response.data.data.userCert;
                            }
                            // 刷手跳转到刷手页面
                            if (response.data.data.user.userRole === 'brushhand') {
                                this.$router.replace({
                                    path: '/home/seller'
                                });
                            }
                            // 商家跳转到商家页面
                            if (response.data.data.user.userRole === 'business') {
                                this.$router.replace({
                                    path: '/home/buyer'
                                });
                            }
                        }
                    });

                    // 获取公告信息
                    this.$http.get('/sys/listNotice').then((response) => {
                        if (response.data.success) {
                            this.$store.state.notices = response.data.data.notices || [];
                        }
                    });
                } else {
                    $.alert(response.data.message);
                }
            }).catch(() => {
                $.hidePreloader();
            });
        }
    }
};

</script>
