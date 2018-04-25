<!--
* @moduleName: 认证
* @Author: weiberzeng
* @Date:   2018-04-23 21:58:14
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-04-25 15:18:08
-->
<template>
    <router-view></router-view>
</template>
<script>
export default {
    name: 'home',
    data() {
        return {};
    },
    created() {
        // TODO
        // 根据用户返回的类型，跳转到刷手认证或者商家认证
        // this.$router.replace({
        //     path: '/home/buyer'
        // });
    }
};

</script>