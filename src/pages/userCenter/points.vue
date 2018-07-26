<!--
* @moduleName: 我的积分
* @Author: weiberzeng
* @Date:   2018-04-25 15:30:50
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-06-11 20:09:19
-->
<template>
<div class="page page-current">
    <header class="bar bar-nav">
        <router-link to="/uc/default" class="button button-link button-nav pull-left"><span class="icon icon-left"></span></router-link>
        <h1 class="title">我的积分</h1>
    </header>
    <div class="content gray">
        <div class="coin-card-wrap">
            <div class="coni-card-item single">
                <div class="name">可用积分</div>
                <div class="val">{{userInfo.integral}}</div>
            </div>
        </div>
        <div class="flow-list-block list-block" v-if="total>0">
            <ul>
                <li v-for="item in listData" :key="item.id" class="item-content">
                    <div class="item-inner">
                        <div class="item-title">{{item.comment}}</div>
                        <div class="item-after">{{item.count}}</div>
                    </div>
                    <div class="footer">{{item.ctime}}</div>
                </li>
            </ul>
        </div>
        <div class="no-tmpl" v-else>
            <span class="icon"><i class="icon-addtmpl"></i></span>
            <span class="text">暂无数据</span>
        </div>
    </div>
</div>
</template>
<script>
let $ = window.$;

export default {
    name: 'ucPoints',
    data() {
        return {
            userInfo: this.$store.state.userInfo,
            listData: [],
            total: 0
        };
    },
    created() {
        // 获取积分流水
        $.showPreloader();
        this.$http.get('/integral/list').then((response) => {
            $.hidePreloader();
            if (response.data.success) {
                this.listData = response.data.data.list;
                this.total = response.data.data.total;
            }
        }).catch(() => {
            $.hidePreloader();
        });
    }
};
</script>
