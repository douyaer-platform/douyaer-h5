<!--
* @moduleName: 注册页面
* @Author: weiberzeng
* @Date:   2018-04-23 20:41:10
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-07-22 02:43:13
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
                                        <el-input v-model="form.phone" maxlength="11" placeholder="请输入你的手机号" autofocus></el-input>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="item-content">
                                <div class="item-inner">
                                    <div class="item-title label">验证码</div>
                                    <div class="item-input">
                                        <el-input v-model="form.authCode" maxlength="6" placeholder="请输入验证码"></el-input>
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
                                        <el-input v-model="form.password" maxlength="12" type="password" placeholder="请设置6-12位登录密码"></el-input>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="submitWrap">
                    <a href="javascript:;" @click.stop="regFun('business')" class="button button-big button-fill">商家注册</a>
                    <a href="javascript:;" @click.stop="regFun('brushhand')" class="button button-big button-light">刷手注册</a>
                </div>
                <div class="description">豆芽网是一个专业的邀请亲友互助，让亲友赚取佣金的平台，注册后请严格遵守豆芽网的操作规则，恶意违规者一律封号处理</div>
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
    name: 'accountReg',
    data() {
        return {
            count: 0,
            authCodeText: '发送验证码',
            form: {
                phone: '',
                password: '',
                authCode: '',
                userRole: '',
                inviteId: ''
            },
            validate: {
                phone: false,
                password: false,
                authCode: false
            }
        };
    },
    watch: {
        'form.phone': 'validatePhone',
        'form.password': 'validatePassword',
        'form.authCode': 'validateAuthCode'
    },
    created() {
        this.form.inviteId = this.$route.params.id || '';
        this.$http.get('/userInvite/checkInviteId', {
            params: {
                inviteId: this.form.inviteId
            }
        }).then((response) => {
            if (response.data.success) {
                if (response.data.data.status !== 0) {
                    $.alert('请联系商家或平台管理人员重新发', '注册链接已失效');
                }
            } else {
                $.alert(response.data.message);
            }
        });
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
                this.validate.phone = (to.length) > 0 && (/^(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/).test(trim(to));
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
                authCodeEvent: 'register'
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
        regFun(type) {
            console.log(this.form);
            if (!this.validate.phone) {
                $.toast('请输入正确手机号！');
                return;
            }
            if (!this.validate.authCode) {
                $.toast('请输入6位验证码！');
                return;
            }
            if (!this.validate.password) {
                $.toast('请输入6-12位密码！');
                return;
            }

            let title;
            let text;
            let ok;
            let _that = this;
            if (type === 'brushhand') {
                title = '确认注册成为刷手';
                text = '选择注册为刷手后将无法更改';
                ok = '注册刷手';
            }
            if (type === 'business') {
                title = '确认注册成为商家';
                text = '选择注册为商家后将无法更改';
                ok = '注册商家';
            }

            $.confirm(text, title, function() {
                _that._regFun(type);
            }, function() {}, ok, '重新选择');
        },
        _regFun(type) {
            $.showPreloader();
            this.form.userRole = type;
            this.$http.post('/user/register', this.form).then((response) => {
                $.hidePreloader();
                if (response.data.success) {
                    localStorage.setItem('userInfo', JSON.stringify(response.data.data.user));
                    this.$store.state.userInfo = response.data.data.user;
                    // 刷手跳转到刷手页面
                    if (type === 'brushhand') {
                        this.$router.replace({
                            path: '/home/seller'
                        });
                    }
                    // 商家跳转到商家页面
                    if (type === 'business') {
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
