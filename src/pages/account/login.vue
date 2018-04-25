<!--
* @moduleName: 登录页面
* @Author: weiberzeng
* @Date:   2018-04-25 14:17:20
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-04-25 14:24:56
-->
<template>
    <div class="page page-current">
        <header class="bar bar-nav">
            <h1 class="title">登录</h1>
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
    name: 'accountLogin',
    data() {
        return {};
    },
    components: {
        bottomBar
    }
};

</script>
