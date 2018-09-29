<!--
* @moduleName: 忘记密码
* @Author: weiberzeng
* @Date:   2018-06-04 23:31:39
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-09-29 20:51:11
-->
<template>
    <div class="page page-current">
        <div class="content">
            <div class="accountWrap">
                <div class="list-block">
                    <ul>
                        <li>
                            <div class="item-content">
                                <div class="item-inner">
                                    <div class="item-title label">手机号</div>
                                    <div class="item-input">
                                        <input type="text" v-model="form.phone" maxlength="11" placeholder="请输入你的手机号" autofocus>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="item-content">
                                <div class="item-inner">
                                    <div class="item-title label">验证码</div>
                                    <div class="item-input">
                                        <input type="text" v-model="form.authCode" maxlength="6" placeholder="请输入验证码">
                                    </div>
                                    <span @click.stop="sendAuthCodeFun" :class="count===0?'codeBtn':'codeBtn done'">{{authCodeText}}</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="item-content">
                                <div class="item-inner">
                                    <div class="item-title label">密码</div>
                                    <div class="item-input">
                                        <input v-model="form.newPassword" maxlength="12" type="password" placeholder="请设置6-12位登录密码">
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="submitWrap">
                    <a href="javascript:;" @click.stop="resetFun" class="button button-big button-fill">重置密码</a>
                </div>
                <div class="linkWrap bottom">
                    <router-link to="/account/login">已有账号，直接<span>登录</span></router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { trim } from '@/javascript/utils';
let $ = window.$;
export default {
    name: 'accountForget',
    data() {
        return {
            count: 0,
            authCodeText: '发送验证码',
            form: {
                phone: '',
                newPassword: '',
                authCode: ''
            },
            validate: {
                phone: false,
                newPassword: false,
                authCode: false
            }
        };
    },
    watch: {
        'form.phone': 'validatePhone',
        'form.newPassword': 'validatePassword',
        'form.authCode': 'validateAuthCode'
    },
    methods: {
        /**
         * @Author      weiberZeng
         * @DateTime    2018-06-04
         * @lastTime    2018-06-04
         * @description 验证函数
         */
        validatePhone(to, from) {
            if (to.length < 11) {
                this.validate.phone = false;
            } else {
                this.validate.phone = (to.length) > 0 && (/^(1[3-9][0-9])[0-9]{8}$/).test(trim(to));
            }
        },
        validateAuthCode(to, from) {
            if (to.length !== 6) {
                this.validate.authCode = false;
            } else {
                this.validate.authCode = true;
            }
        },
        validatePassword(to, from) {
            if (to.length < 6) {
                this.validate.newPassword = false;
            } else if (to.length > 12) {
                this.validate.newPassword = false;
            } else {
                this.validate.newPassword = true;
            }
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-06-04
         * @lastTime    2018-06-04
         * @description 发送验证码
         */
        sendAuthCodeFun() {
            if (this.count !== 0) return;
            if (!this.validate.phone) {
                $.toast('请输入正确手机号！');
                return;
            }

            this.count = 60;
            let _that = this;
            let setCount = function() {
                if (_that.count > 0) {
                    _that.count = _that.count - 1;
                    if (_that.count > 0) {
                        _that.authCodeText = _that.count + '秒后重新发送';
                    } else {
                        _that.authCodeText = '发送验证码';
                    }
                    setTimeout(setCount, 1000);
                }
            };
            setCount();

            this.$http.post('/authCode/send', {
                phone: this.form.phone,
                authCodeEvent: 'forget_password'
            }).then((response) => {
                if (response.data.success) {
                    $.toast('验证码发送成功！');
                } else {
                    $.alert(response.data.message);
                }
            });
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-06-04
         * @lastTime    2018-06-04
         * @description 注册
         */
        resetFun() {
            if (!this.validate.phone) {
                $.toast('请输入正确手机号！');
                return;
            }
            if (!this.validate.authCode) {
                $.toast('请输入6位验证码！');
                return;
            }
            if (!this.validate.newPassword) {
                $.toast('请输入6-12位密码！');
                return;
            }
            $.showPreloader();
            this.$http.post('/user/resetPassword', this.form).then((response) => {
                $.hidePreloader();
                if (response.data.success) {
                    localStorage.setItem('userInfo', '');
                    this.$store.state.userInfo = {};
                    localStorage.setItem('userCert', '');
                    this.$store.state.userCert = {};
                    let _that = this;
                    setTimeout(() => {
                        _that.$router.replace({
                            path: '/account/login'
                        });
                    }, 500);
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
