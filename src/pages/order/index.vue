<!--
* @moduleName:
* @Author: weiberzeng
* @Date:   2018-04-23 21:58:14
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-04-23 21:58:44
-->
<template>
    <div class="page page-current">
        <header class="bar bar-nav">
            <h1 class="title">我的订单</h1>
        </header>
        <bottomBar></bottomBar>
        <div class="content">
            <!-- 这里是页面内容区 -->
        </div>
    </div>
</template>
<script>
import bottomBar from '@/components/bottomBar';
export default {
    name: ' order',
    data() {
        return {};
    },
    components: {
        bottomBar
    }
};

</script>