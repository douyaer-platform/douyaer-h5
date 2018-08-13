<!--
* @moduleName: 刷手首页
* @Author: weiberzeng
* @Date:   2018-04-24 15:46:11
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-08-13 20:06:18
-->
<template>
    <div class="page page-current">
        <header class="bar bar-nav">
            <h1 class="title">首页</h1>
        </header>
        <!-- <div class="topTips warning"><i class="icon-warning"></i>重要通知：关于对某某账户的违规操作处理。</div> -->
        <bottomBar></bottomBar>
        <div class="content">
            <!-- 刷手首页 -->
            <div class="description" v-html="text"></div>
            <div class="main-box">
                <div class="box-hd">
                    <span class="text">任务列表</span></div>
                <div class="box-bd">
                    <ul class="pro-list" v-if="taskTotal>0">
                        <li v-for="item in taskList" :key="item.taskId" class="item clearfix" :class="{'active':item.isActive}" @click.stop="itemClickFun(item)" v-if="item.orderCount-item.finishScalpingCount>0">
                            <div class="main clearfix">
                                <div class="img-wrap">
                                    <img :src="item.goodsPicUrl" alt="">
                                </div>
                                <div class="inner">
                                    <div class="name">{{item.storeName}}</div>
                                    <div class="state">
                                        <span>{{item.buyBackText}}</span>
                                        <span v-if="item.needAlitm==1">假聊</span>
                                    </div>
                                    <div class="info">
                                        <span class="attr"><span class="money"><i>￥</i>{{item.goodsPrice}}</span></span>
                                        <span class="attr">垫付</span>
                                        <span class="attr">每笔佣金：{{item.commission}}</span>
                                    </div>
                                    <div class="ctrl">
                                        <span class="stock">剩余单数：{{item.orderCount-item.finishScalpingCount}}</span>
                                        <template v-if="userCert && userCert.status===2">
                                            <a href="javascript:;" class="button" @click.stop="getOrderFun(item)" v-if="item.orderCount-item.finishScalpingCount>0">我要接单</a>
                                        </template>
                                    </div>
                                </div>
                            </div>
                            <div class="remark">
                                <span>备注</span>
                                <p>{{item.remark}}</p>
                            </div>
                        </li>
                    </ul>
                    <div class="no-tmpl" v-else>
                        <span class="icon"><i class="icon-addtmpl"></i></span>
                        <span class="text">暂无数据</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import bottomBar from '@/components/bottomBar';
import {
    setBuyBackType
} from '@/javascript/utils';
let $ = window.$;
export default {
    name: 'homeSeller',
    data() {
        return {
            taskList: [],
            taskTotal: 0,
            loading: false,
            text: window.config.mark.home.t2,
            userCert: this.$store.state.userCert || {}
        };
    },
    created() {
        this.getTaskFun();
    },
    methods: {
        /**
         * @Author      weiberZeng
         * @DateTime    2018-06-11
         * @lastTime    2018-06-11
         * @description 获取任务列表
         */
        getTaskFun() {
            this.$http.get('/task/list').then((response) => {
                if (response.data.success) {
                    let data = response.data.data.list;
                    for (let i = 0; i < data.length; i++) {
                        data[i].buyBackText = setBuyBackType(data[i].buyBackType);
                        data[i].isActive = false;
                    }
                    this.taskList = data;
                    this.taskTotal = response.data.data.total;
                }
            });
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-08-04
         * @lastTime    2018-08-04
         * @description 点击
         */
        itemClickFun(item) {
            for (let i in this.taskList) {
                if (this.taskList[i].taskId !== item.taskId) {
                    this.taskList[i].isActive = false;
                }
            }
            item.isActive = !item.isActive;
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-07-01
         * @lastTime    2018-07-01
         * @description 刷手接单
         */
        getOrderFun(item) {
            if (this.loading) return;
            this.loading = true;
            $.showPreloader();
            this.$http.post('/order/receive', {
                taskId: item.taskId
            }).then((response) => {
                $.hidePreloader();
                this.loading = false;
                if (response.data.success) {
                    $.toast('接单成功！');
                    this.getTaskFun();
                } else {
                    $.alert(response.data.message);
                }
            }).catch(() => {
                $.hidePreloader();
                this.loading = false;
            });
        }
    },
    components: {
        bottomBar
    }
};

</script>
