<!--
* @moduleName: 提现
* @Author: weiberzeng
* @Date:   2018-04-25 15:26:50
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-11-24 13:57:23
-->
<template>
    <div class="page page-current" v-if="!success">
        <header class="bar bar-nav">
            <router-link to="/uc/coin" class="button button-link button-nav pull-left"><span class="icon icon-left"></span></router-link>
            <h1 class="title">提现</h1>
        </header>
        <div class="content gray" ref="content">
            <div class="description wihte" v-html="text"></div>
            <div class="main-box mt10">
                <div class="box-bd">
                    <div class="list-block">
                        <ul class="thinForm">
                            <li>
                                <div class="item-content item-money">
                                    <div class="item-inner">
                                        <div class="item-title label">提现金额</div>
                                        <span class="unit">￥</span>
                                        <div class="item-input">
                                            <input @input="inputHandleFun" type="number" v-model="form.totalFee" :placeholder="userInfo.coin" autofocus>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label">微信名</div>
                                        <div class="item-input">
                                            <input @input="inputHandleFun" type="text" v-model="form.wechatName" placeholder="请输入微信名">
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="multi">
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label">备注</div>
                                        <div class="item-input">
                                            <textarea @input="inputHandleFun" v-model="form.remark" type="textarea" :rows="3" placeholder="备注"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="submit-wrap">
                        <a href="javascript:;" @click.stop="submitFun" class="button button-big button-fill">确认提现</a>
                    </div>
                </div>
            </div>
            <div class="main-box">
                <div class="box-bd">
                    <div class="concat-wrap">
                        <div class="code-wrap">
                            <p class="code-img"><img src="/static/config/wxadd.png" alt=""></p>
                                <div class="sub">微信加好友</div>
                        </div>
                    </div>
                    <div class="concat-wrap" v-if="showZfb">
                        <div class="code-wrap">
                            <p class="code-img"><img src="/static/config/zfbadd.png" alt=""></p>
                                <div class="sub">支付宝加好友</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    validateNumber,
    validateRequire
} from '@/javascript/utils';
let $ = window.$;

export default {
    name: 'ucCash',
    data() {
        return {
            groupName: window.config.text.groupName,
            workTime: window.config.text.workTime,
            success: false,
            applyId: '',
            form: {
                exchangeType: 'withdraw',
                totalFee: '',
                wechatName: '',
                remark: ''
            },
            validate: {
                totalFee: false,
                wechatName: false
            },
            text: window.config.mark.userCenter.t1,
            showZfb: window.config.showZfb
        };
    },
    computed: {
        userInfo() {
            return this.$store.state.userInfo;
        }
    },
    watch: {
        'form.totalFee': 'validateTotalFee',
        'form.wechatName': 'validateWechatName'
    },
    methods: {
        // 校验金额是否为正整数
        validateTotalFee(to, from) {
            this.validate.totalFee = validateNumber(to, from);
        },
        // 校验微信名必填
        validateWechatName(to, from) {
            this.validate.wechatName = validateRequire(to, from);
        },
        inputHandleFun() {
            this.$refs['content'].scrollTop = this.$refs['content'].scrollTop + 1;
            this.$nextTick(() => {
                this.$refs['content'].scrollTop = this.$refs['content'].scrollTop - 1;
            });
        },
        /**
         * @Author      weiberZeng
         * @DateTime    2018-06-11
         * @lastTime    2018-06-11
         * @description 提交提现
         */
        submitFun() {
            if (!this.validate.totalFee) {
                $.toast('请输入正确的金额！');
                return;
            }
            if (!this.validate.wechatName) {
                $.toast('请输入微信名！');
                return;
            }

            $.showPreloader();
            this.$http.post('/coin/exchange', this.form).then((response) => {
                $.hidePreloader();
                if (response.data.success) {
                    this.success = true;
                    this.applyId = response.data.data.applyId;
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
