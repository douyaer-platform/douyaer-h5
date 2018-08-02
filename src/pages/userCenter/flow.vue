<!--
* @moduleName: 资金流水
* @Author: weiberzeng
* @Date:   2018-06-06 11:02:11
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-08-02 21:08:53
-->
<template>
<div class="page page-current">
    <header class="bar bar-nav">
        <router-link to="/uc/default" class="button button-link button-nav pull-left"><span class="icon icon-left"></span></router-link>
        <h1 class="title">资金流水</h1>
    </header>
    <div class="content">
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
    name: 'ucFlow',
    data() {
        return {
            listData: [],
            total: 0
        };
    },
    created() {
        // 获取资金流水
        $.showPreloader();
        this.$http.get('/coin/list').then((response) => {
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
