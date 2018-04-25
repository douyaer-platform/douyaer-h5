<!--
* @moduleName: 提现
* @Author: weiberzeng
* @Date:   2018-04-25 15:26:50
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-04-25 15:32:16
-->
<template>
    <div class="page page-current">
        <header class="bar bar-nav">
            <h1 class="title">提现</h1>
        </header>
        <bottomBar></bottomBar>
        <div class="content">
        </div>
    </div>
</template>
<script>
import bottomBar from '@/components/bottomBar';
export default {
    name: 'ucCash',
    data() {
        return {};
    },
    components: {
        bottomBar
    }
};

</script>