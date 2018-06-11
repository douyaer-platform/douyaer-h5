<!--
* @moduleName: 资金流水
* @Author: weiberzeng
* @Date:   2018-06-06 11:02:11
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-06-11 19:49:51
-->
<template>
    <div class="page page-current">
        <header class="bar bar-nav">
            <router-link to="/uc/default" class="button button-link button-nav pull-left"><span class="icon icon-left"></span></router-link>
            <h1 class="title">资金流水</h1>
        </header>
        <div class="content">
            <div class="flow-list-block list-block">
                <ul>
                    <li class="item-content">
                        <div class="item-inner">
                            <div class="item-title">充值</div>
                            <div class="item-after">+2000</div>
                        </div>
                        <div class="footer">2018-05-05 12:22</div>
                    </li>
                    <li class="item-content">
                        <div class="item-inner">
                            <div class="item-title">提现</div>
                            <div class="item-after">-2000</div>
                        </div>
                        <div class="footer">2018-05-05 12:22</div>
                    </li>
                     <li class="item-content">
                        <div class="item-inner">
                            <div class="item-title">支付</div>
                            <div class="item-after">-10000</div>
                        </div>
                        <div class="footer">2018-05-05 12:22</div>
                    </li>
                </ul>
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
        this.$http.get('/coin/list', {
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
    }
};

</script>
