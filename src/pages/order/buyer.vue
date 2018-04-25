<!--
* @moduleName: 商家订单
* @Author: weiberzeng
* @Date:   2018-04-25 14:35:39
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-04-25 14:38:34
-->
<template>
    <div class="page page-current">
        <header class="bar bar-nav">
            <h1 class="title">我的订单</h1>
        </header>
        <bottomBar></bottomBar>
        <div class="content">
        </div>
    </div>
</template>
<script>
import bottomBar from '@/components/bottomBar';
export default {
    name: 'orderbuyer',
    data() {
        return {};
    },
    components: {
        bottomBar
    }
};

</script>