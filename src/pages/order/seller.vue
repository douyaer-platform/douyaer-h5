<!--
* @moduleName: 刷手订单
* @Author: weiberzeng
* @Date:   2018-04-25 14:35:32
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-06-11 20:39:16
-->
<template>
    <div class="page page-current">
        <header class="bar bar-nav">
            <h1 class="title">我的订单</h1>
        </header>
        <bottomBar></bottomBar>
        <div class="content">
            <div class="main-box">
                <div class="box-hd">
                    <span class="text">待完成</span>
                </div>
                <div class="box-bd">
                    <ul class="order-list">
                        <li class="item clearfix">
                            <div class="img-wrap">
                                <img src="/static/demo/demo.jpg" alt="">
                            </div>
                            <div class="inner">
                                <div class="name">商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称</div>
                                <div class="state">
                                    <span>加收藏后3-4天付款</span>
                                    <span>假聊</span>
                                    <span class="right">垫付</span>
                                </div>
                                <div class="money">
                                    <span>￥</span>398
                                </div>
                            </div>
                            <!-- <div class="detail">
                                <span class="text">共计：</span>
                                <span class="attr">
                                    <span class="name">放单量</span>
                                    <span class="val">3</span>
                                </span>
                                <span class="attr">
                                    <span class="name">佣金</span>
                                    <span class="val">3</span>
                                </span>
                            </div> -->
                            <div class="ctrl">
                                <a href="javascipt:;" class="button">立即投诉</a>
                                <a href="javascipt:;" class="button">去完成</a>
                                <a href="javascipt:;" class="button">取消订单</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import bottomBar from '@/components/bottomBar';
export default {
    name: 'orderSeller',
    data() {
        return {};
    },
    components: {
        bottomBar
    }
};

</script>
