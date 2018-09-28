<!--
* @moduleName: 充值
* @Author: weiberzeng
* @Date:   2018-04-25 15:26:19
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-09-28 17:10:22
-->
<template>
    <div class="page page-current" v-if="!success">
        <header class="bar bar-nav">
            <router-link to="/uc/coin" class="button button-link button-nav pull-left"><span class="icon icon-left"></span></router-link>
            <h1 class="title">充值</h1>
        </header>
        <div class="content gray">
            <div class="description wihte" v-html="text"></div>
            <div class="main-box mt10">
                <div class="box-bd">
                    <div class="list-block">
                        <ul class="thinForm">
                            <li>
                                <div class="item-content item-money">
                                    <div class="item-inner">
                                        <div class="item-title label">充值金额</div>
                                        <span class="unit">￥</span>
                                        <div class="item-input">
                                            <input type="number" v-model="form.totalFee" placeholder="输入充值金额" autofocus>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label">微信名</div>
                                        <div class="item-input">
                                            <input v-model="form.wechatName" placeholder="请输入微信名">
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="multi">
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label">备注</div>
                                        <div class="item-input">
                                            <input v-model="form.remark" type="textarea" :rows="3" placeholder="备注">
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="submit-wrap">
                        <a href="javascript:;" @click.stop="submitFun" class="button button-big button-fill">确认充值</a>
                    </div>
                </div>
                <div class="main-box">
                    <div class="box-bd">
                        <div class="concat-wrap">
                            <div class="code-wrap">
                                <div class="code-img">
                                    <img src="/static/config/wxcash.png" alt="">
                                </div>
                                <div class="sub">微信收款</div>
                            </div>
                        </div>
                        <div class="concat-wrap">
                            <div class="code-wrap">
                                <div class="code-img">
                                    <img src="/static/config/zfbcash.png" alt="">
                                </div>
                                <div class="sub">支付宝收款</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="page page-current" v-else>
        <header class="bar bar-nav">
            <router-link to="/uc/coin" class="button button-link button-nav pull-right">完成</router-link>
            <h1 class="title">交易结果</h1>
        </header>
        <div class="content gray">
            <div class="success-wrap">
                <span class="text">充值成功</span>
                <div class="money"><span class="unit">￥</span><span class="val">{{form.totalFee}}</span></div>
                <div class="detail clearfix">
                    <span class="name">充值单号</span>
                    <span class="val">{{applyId}}</span>
                </div>
            </div>
            <div class="concat-wrap mt10">
                <div class="pf-wrap">
                    <div class="img-wrap"> <img src="/static/image/admin.png" alt=""></div>
                    <div class="inner">
                        <p>{{groupName}}</p>
                        <div class="attr-item">
                            <span class="attr-name">工作时间</span>
                            <span class="attr-val">{{workTime}}</span>
                        </div>
                    </div>
                </div>
                <div class="code-wrap">
                    <div class="code-img">
                        <img src="/static/config/admincode.png" alt="">
                    </div>
                    <div class="sub">扫码添加平台管理员微信</div>
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
    name: 'ucPay',
    data() {
        return {
            groupName: window.config.text.groupName,
            workTime: window.config.text.workTime,
            success: false,
            applyId: '',
            form: {
                exchangeType: 'deposit',
                totalFee: '',
                wechatName: '',
                remark: ''
            },
            validate: {
                totalFee: false,
                wechatName: false
            },
            text: window.config.mark.userCenter.t2
        };
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
        /**
         * @Author      weiberZeng
         * @DateTime    2018-06-11
         * @lastTime    2018-06-11
         * @description 提交充值
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
