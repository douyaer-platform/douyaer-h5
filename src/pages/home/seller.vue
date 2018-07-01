<!--
* @moduleName: 刷手首页
* @Author: weiberzeng
* @Date:   2018-04-24 15:46:11
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-07-01 13:01:48
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
            <div class="description">接单规则说明
                <br>豆芽网是一个专业的邀请亲友互助，让亲友赚取佣金的平台，注册后请严格遵守豆芽网的操作规则。</div>
            <div class="main-box">
                <div class="box-hd">
                    <span class="text">任务列表</span></div>
                <div class="box-bd">
                    <ul class="pro-list" v-if="taskTotal>0">
                        <li v-for="item in taskList" :key="item.id" class="item clearfix">
                            <div class="img-wrap">
                                <img src="/static/demo/demo.jpg" alt="">
                            </div>
                            <div class="inner">
                                <div class="name">{{item.name}}</div>
                                <div class="state">
                                    <span>加收藏后3-4天付款</span>
                                    <span>假聊</span>
                                </div>
                                <div class="info">
                                    <span class="attr"><span class="money"><i>￥</i>398</span> 垫付</span>
                                    <span class="attr">每笔佣金：3</span>
                                </div>
                                <div class="ctrl">
                                    <span class="stock">剩余单数：32</span>
                                    <a href="javascipt:;" class="button" @click.stop="getOrderFun(item)">我要接单</a>
                                </div>
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
let $ = window.$;
export default {
    name: 'homeSeller',
    data() {
        return {
            taskList: [],
            taskTotal: 0
        };
    },
    methods: {
        /**
         * @Author      weiberZeng
         * @DateTime    2018-06-11
         * @lastTime    2018-06-11
         * @description 获取任务列表
         */
        getTaskFun() {
            this.$http.get('/task/list', {
                params: {
                    pageIndex: 1,
                    pageSize: 10
                }
            }).then((response) => {
                if (response.data.success) {
                    this.taskList = response.data.data.list;
                    this.taskTotal = response.data.data.total;
                }
            });
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-07-01
         * @lastTime    2018-07-01
         * @description 刷手接单
         */
        getOrderFun(item) {
            $.showPreloader();
            this.$http.post('/order/receive', {
                id: item.id
            }).then((response) => {
                $.hidePreloader();
                if (response.data.success) {
                    $.toast('接单成功！');
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
