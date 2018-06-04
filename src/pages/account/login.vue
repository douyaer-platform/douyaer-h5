<!--
* @moduleName: 登录页面
* @Author: weiberzeng
* @Date:   2018-04-25 14:17:20
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-06-04 23:42:18
-->
<template>
    <div class="page page-current">
        <div class="content">
            <div class="accountWrap">
                <div class="userPhoto"></div>
                <div class="list-block">
                    <ul>
                        <li>
                            <div class="item-content">
                                <div class="item-inner">
                                    <div class="item-title label">账号</div>
                                    <div class="item-input">
                                        <el-input v-model="form.account" maxlength="11" placeholder="请输入账号" autofocus></el-input>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="item-content">
                                <div class="item-inner">
                                    <div class="item-title label">密码</div>
                                    <div class="item-input">
                                        <el-input v-model="form.password" maxlength="12" :type="canSee?'text':'password'" placeholder="请输入密码"></el-input>
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
import utils from '@/javascript/utils';
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
                this.validate.account = (to.length) > 0 && (/^(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/).test(utils.trim(to));
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
                    localStorage.setItem('userInfo', JSON.stringify(response.data.data.user));
                    // 根据登录信息跳转
                    let userInfo = response.data.data.user;
                    // 刷手跳转到刷手页面
                    if (userInfo && userInfo.userRole === 'brushhand') {
                        this.$router.replace({
                            path: '/home/seller'
                        });
                    }
                    // 商家跳转到商家页面
                    if (userInfo && userInfo.userRole === 'business') {
                        this.$router.replace({
                            path: '/home/buyer'
                        });
                    }
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
