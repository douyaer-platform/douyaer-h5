<!--
* @moduleName:
* @Author: weiberzeng
* @Date:   2018-04-23 21:47:53
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-08-17 14:31:32
-->
<template>
    <nav class="bar bar-tab">
        <router-link to="/home" class="tab-item" replace>
            <span class="icon icon-home"></span>
            <span class="tab-label">首页</span>
        </router-link>
        <router-link to="/order" class="tab-item" replace>
            <span class="icon icon-order"></span>
            <span class="tab-label" v-if="userInfo.userRole==='business'">任务</span>
            <span class="tab-label" v-if="userInfo.userRole==='brushhand'">订单</span>
        </router-link>
        <router-link to="/uc" class="tab-item" replace>
            <span class="icon icon-uc"></span>
            <span class="tab-label">个人中心</span>
        </router-link>
    </nav>
</template>
<script>
export default {
    name: 'bottomBar',
    data() {
        return {};
    },
    computed: {
        userInfo() {
            return this.$store.state.userInfo;
        }
    }
};

</script>
