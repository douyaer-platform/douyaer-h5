<!--
* @moduleName:
* @Author: weiberzeng
* @Date:   2018-04-23 20:41:10
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-04-23 21:50:18
-->
<template>
    <div class="page page-current">
        <header class="bar bar-nav">
            <a class="button button-link button-nav pull-left" href="/demos/card" data-transition='slide-out'> <span class="icon icon-left"></span> 返回 </a>
            <h1 class="title">我的生活</h1>
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
