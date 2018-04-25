<!--
* @moduleName:
* @Author: weiberzeng
* @Date:   2018-04-23 20:41:10
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-04-25 14:25:05
-->
<template>
    <div class="page page-current">
        <header class="bar bar-nav">
            <h1 class="title">注册</h1>
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
    name: 'accountReg',
    data() {
        return {};
    },
    components: {
        bottomBar
    }
};

</script>
