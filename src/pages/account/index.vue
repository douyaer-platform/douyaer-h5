<!--
* @moduleName:
* @Author: weiberzeng
* @Date:   2018-04-25 14:59:26
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-04-25 15:18:00
-->
<template>
    <router-view></router-view>
</template>
<script>
export default {
    name: 'account',
    data() {
        return {};
    },
    created() {
        // TODO
        // 根据用户返回的类型，跳转到刷手订单或者商家订单
        // this.$router.replace({
        //     path: '/home/buyer'
        // });
    }
};

</script>
