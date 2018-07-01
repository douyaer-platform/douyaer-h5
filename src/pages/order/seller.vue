<!--
* @moduleName: 刷手订单
* @Author: weiberzeng
* @Date:   2018-04-25 14:35:32
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-07-01 12:58:40
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
                    <span class="text">待完成</span>
                </div>
                <div class="box-bd">
                    <ul class="order-list">
                        <li v-for="item in cancelOrderFun" :key="item.id" class="item clearfix">
                            <div class="img-wrap">
                                <img src="/static/demo/demo.jpg" alt="">
                            </div>
                            <div class="inner">
                                <div class="name">{{item.name}}</div>
                                <div class="state">
                                    <span>加收藏后3-4天付款</span>
                                    <span>假聊</span>
                                    <span class="right">垫付</span>
                                </div>
                                <div class="money">
                                    <span>￥</span>398
                                </div>
                            </div>
                            <div class="ctrl">
                                <a href="javascipt:;" class="button">立即投诉</a>
                                <a href="javascipt:;" class="button">去完成</a>
                                <a href="javascipt:;" class="button" @click.stop="cancelOrderFun(item)">取消订单</a>
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
        </div>
    </div>
</template>
<script>
import bottomBar from '@/components/bottomBar';
let $ = window.$;
export default {
    name: 'orderSeller',
    data() {
        return {
            listData: [],
            total: ''
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
            this.$http.get('/order/list', {
                params: {
                    pageIndex: 1,
                    pageSize: 10
                }
            }).then((response) => {
                $.hidePreloader();
                if (response.data.success) {
                    this.listData = response.data.data.list;
                    this.total = response.data.data.total;
                }
            }).catch(() => {
                $.hidePreloader();
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
                id: item.id
            }).then((response) => {
                $.hidePreloader();
                if (response.data.success) {
                    $.toast('取消成功！');
                } else {
                    $.alert(response.data.message);
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
