<!--
* @moduleName: 刷手订单
* @Author: weiberzeng
* @Date:   2018-04-25 14:35:32
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-09-20 15:02:50
-->
<template>
    <div class="page page-current">
        <header class="bar bar-nav">
            <h1 class="title">我的订单</h1>
        </header>
        <bottomBar></bottomBar>
        <div class="sub-tab">
            <ul>
                <li :class="{'active':status===0}" @click.stop="setTabFun(0)">待完成</li>
                <li :class="{'active':status===1}" @click.stop="setTabFun(1)">待发布评价</li>
                <li :class="{'active':status===2}" @click.stop="setTabFun(2)">
                    <i class="sep" v-if="total2>0"></i>待完成评价</li>
                <li :class="{'active':status===3}" @click.stop="setTabFun(3)">待放款</li>
                <li :class="{'active':status===4}" @click.stop="setTabFun(4)">已结束</li>
            </ul>
        </div>
        <div class="content" v-on:scroll="onScroll">
            <div class="scroll">
                <div class="main-box" v-if="total>0">
                    <div class="box-bd">
                        <ul class="order-list">
                            <li v-for="item in listData" :key="item.orderId" class="item clearfix">
                                <div class="img-wrap">
                                    <img :src="item.goodsPicUrl" alt="">
                                </div>
                                <div class="inner">
                                    <div class="name">【{{item.orderId}}】 {{item.storeName}}</div>
                                    <div class="state">
                                        <span>{{item.buyBackText}}</span>
                                        <span v-if="item.needAlitm==1">假聊</span>
                                        <span class="right">垫付</span>
                                    </div>
                                    <div class="money">
                                        <span>￥</span>{{item.goodsPrice}}
                                    </div>
                                </div>
                                <div class="detail">
                                    <span class="attr">
                                    <span class="name">订单收益</span>
                                    <span class="val">{{item.incomePrice||'--'}}</span>
                                    </span>
                                </div>
                                <div class="detail">
                                    <span class="attr">
                                    <span class="name">创建时间</span>
                                    <span class="val">{{dateFormatter(item.createTime)}}</span>
                                    </span>
                                </div>
                                <div class="ctrl">
                                    <a href="javascript:;" class="button" @click.stop="complainOrderFun(item)">立即投诉</a>
                                    <template v-if="!item.hasExpired">
                                        <a href="javascript:;" class="button" @click.stop="completeOrderFun(item)" v-if="status===0">去完成</a>
                                        <a href="javascript:;" class="button" @click.stop="detailOrderFun(item)" v-if="status!==0">完成详情</a>
                                        <a href="javascript:;" class="button" @click.stop="evaluateOrderFun(item)" v-if="status===2">立即评价</a>
                                        <a href="javascript:;" class="button" @click.stop="showEvaluateOrderFun(item)" v-if="status===3||status===4">评价详情</a>
                                        <a href="javascript:;" class="button" @click.stop="cancelOrderFun(item)" v-if="item.enableCancel">取消订单</a>
                                    </template>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="no-tmpl" v-else>
                    <router-link to="/home" v-if="status===0">
                        <span class="icon"><i class="icon-addtmpl"></i></span>
                        <span class="text">尝试添加第一笔订单</span>
                    </router-link>
                    <template v-else>
                        <span class="icon"><i class="icon-addtmpl"></i></span>
                        <span class="text">暂无数据</span>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import bottomBar from '@/components/bottomBar';
import {
    setBuyBackType,
    dateFormatter
} from '@/javascript/utils';
let $ = window.$;
export default {
    name: 'orderSeller',
    data() {
        return {
            status: 0,
            listData: [],
            total: 0,
            total2: 0,
            loading: false,
            page: {
                pageIndex: 1,
                pageSize: 10
            }
        };
    },
    created() {
        let _that = this;
        this.getOrderListFun(false, 0, function() {
            _that.getOrderListFun(true, 2);
        });
    },
    methods: {
        /**
         * @Author      weiberZeng
         * @DateTime    2018-08-02
         * @lastTime    2018-08-02
         * @description 获取不同状态的任务列表
         */
        setTabFun(val) {
            if (this.loading) return;
            this.listData = [];
            this.status = val;
            this.page = {
                pageIndex: 1,
                pageSize: 10
            };
            this.getOrderListFun();
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-06-11
         * @lastTime    2018-06-11
         * @description 获取订单列表
         */
        getOrderListFun(noData, status, cb) {
            if (this.loading) return;
            this.loading = true;

            this.$http.get('/order/list', {
                params: {
                    status: status ? status : this.status,
                    pageIndex: this.page.pageIndex,
                    pageSize: this.page.pageSize
                }
            }).then((response) => {
                this.loading = false;

                if (response.data.success) {
                    // 正常路径获取数据和总量
                    if (!noData) {
                        let data = response.data.data.list;
                        for (let i = 0; i < data.length; i++) {
                            data[i].buyBackText = setBuyBackType(data[i].buyBackType);
                        }
                        if (this.page.pageIndex === 1) {
                            this.listData = data;
                        } else {
                            for (let j in data) {
                                this.listData.push(data[j]);
                            }
                        }
                        this.total = response.data.data.total;
                    } else {
                        if (status === 2) {
                            this.total2 = response.data.data.total;
                        }
                    }
                    // 有回调函数，执行回调函数
                    if (cb) {
                        cb();
                    }
                }
            }).catch(() => {
                this.loading = false;
            });
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-07-01
         * @lastTime    2018-07-01
         * @description 刷手取消订单
         */
        cancelOrderFun(item) {
            $.showPreloader();
            this.$http.post('/order/cancel', {
                orderId: item.orderId
            }).then((response) => {
                $.hidePreloader();
                if (response.data.success) {
                    $.toast('取消成功！');
                    this.page = {
                        pageIndex: 1,
                        pageSize: 10
                    };
                    this.getOrderListFun();
                } else {
                    $.alert(response.data.message);
                }
            }).catch(() => {
                $.hidePreloader();
            });
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-07-01
         * @lastTime    2018-07-01
         * @description 刷手投诉订单
         */
        complainOrderFun(item) {
            $.alert('请联系在线客服进行投诉');
            // $.showPreloader();
            // this.$http.post('/order/complain', {
            //     orderId: item.orderId
            // }).then((response) => {
            //     $.hidePreloader();
            //     if (response.data.success) {
            //         $.toast('投诉成功！');
            //     } else {
            //         $.alert(response.data.message);
            //     }
            // }).catch(() => {
            //     $.hidePreloader();
            // });
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-07-01
         * @lastTime    2018-07-01
         * @description 刷手立即评价订单
         */
        evaluateOrderFun(item) {
            this.$router.replace({
                path: '/order/seller/evaluate/' + item.orderId
            });
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-08-18
         * @lastTime    2018-08-18
         * @description 显示评价详情
         */
        showEvaluateOrderFun(item) {
            this.$router.replace({
                path: '/order/seller/showevaluate/' + item.orderId
            });
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-07-01
         * @lastTime    2018-07-01
         * @description 刷手完成订单
         */
        completeOrderFun(item) {
            this.$router.replace({
                path: '/order/seller/complete/' + item.orderId
            });
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-08-18
         * @lastTime    2018-08-18
         * @description 查看订单
         */
        detailOrderFun(item) {
            this.$router.replace({
                path: '/order/seller/detail/' + item.orderId
            });
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-08-13
         * @lastTime    2018-08-13
         * @description 滚动
         */
        onScroll(event) {
            // 监听滚动所在节点
            let el = event.target;
            // 滚动内容高度
            let innerHeight = el.querySelector('.scroll').offsetHeight;
            // 滚动判断
            if (el.scrollTop + el.offsetHeight + 10 >= innerHeight) {
                if (this.page.pageIndex * this.page.pageSize < this.total) {
                    this.page.pageSize += 1;
                    this.getOrderListFun();
                }
            }
        },

        dateFormatter(val) {
            return dateFormatter(val);
        }
    },
    components: {
        bottomBar
    }
};

</script>
