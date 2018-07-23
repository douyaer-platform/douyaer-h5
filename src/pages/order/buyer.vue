<!--
* @moduleName: 商家订单
* @Author: weiberzeng
* @Date:   2018-04-25 14:35:39
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-07-10 10:56:01
-->
<template>
<div class="page page-current">
    <header class="bar bar-nav">
        <h1 class="title">我的订单</h1>
    </header>
    <bottomBar></bottomBar>
    <div class="content">
        <div class="main-box" v-if="total>0">
            <div class="box-hd">
                <span class="text">进行中</span>
            </div>
            <div class="box-bd">
                <ul class="order-list">
                    <li v-for="item in listData" :key="item.taskId" class="item clearfix">
                        <div class="img-wrap">
                            <img :src="item.goodsPicUrl" alt="">
                        </div>
                        <div class="inner">
                            <div class="name">{{item.storeName}}</div>
                            <div class="state">
                                <span v-if="item.buyBackText">{{item.buyBackText}}</span>
                                <span v-if="item.needAlitm==1">假聊</span>
                                <span class="right">垫付</span>
                            </div>
                            <div class="money">
                                <span>￥</span>{{item.goodsPrice}}
                            </div>
                        </div>
                        <div class="detail">
                            <span class="text">共计：</span>
                            <span class="attr">
                                <span class="name">放单量</span>
                            <span class="val">{{item.orderCount}}</span>
                            </span>
                            <span class="attr">
                                <span class="name">佣金</span>
                            <span class="val">{{item.commission}}</span>
                            </span>
                        </div>
                        <div class="ctrl">
                            <a href="javascipt:;" class="button">立即投诉</a>
                            <a href="javascipt:;" class="button">去完成</a>
                            <a href="javascipt:;" class="button">取消订单</a>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="no-tmpl" v-else>
            <router-link to="/home">
                <span class="icon"><i class="icon-addtmpl"></i></span>
                <span class="text">尝试添加第一笔订单</span>
            </router-link>
        </div>
        <!-- 加载提示符 -->
        <!--  <div class="infinite-scroll-preloader">
                <div class="preloader"></div>
            </div> -->
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
    name: 'orderbuyer',
    data() {
        return {
            listData: [],
            total: 0
        };
    },
    created() {
        this.getOrderListFun();
    },
    methods: {
        /**
         * @Author      weiberZeng
         * @DateTime    2018-06-11
         * @lastTime    2018-06-11
         * @description 获取订单列表
         */
        getOrderListFun() {
            $.showPreloader();
            this.$http.get('/task/list', {
                params: {
                    pageIndex: 1,
                    pageSize: 10
                }
            }).then((response) => {
                $.hidePreloader();
                if (response.data.success) {
                    let data = response.data.data.list;
                    for (let i = 0; i < data.length; i++) {
                        data[i].buyBackText = setBuyBackType(data[i].buyBackType);
                    }
                    this.listData = data;
                    this.total = response.data.data.total;
                }
            }).catch(() => {
                $.hidePreloader();
            });
        }
    },
    components: {
        bottomBar
    }
};
</script>
