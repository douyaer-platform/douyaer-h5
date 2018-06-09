<!--
* @moduleName:
* @Author: weiberzeng
* @Date:   2018-04-23 21:58:14
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-06-08 00:32:54
-->
<template>
    <router-view></router-view>
</template>
<script>
export default {
    name: 'order',
    data() {
        return {
            userInfo: this.$store.state.userInfo
        };
    },
    created() {
        if (this.userInfo.userRole === 'brushhand') {
            this.$router.replace({
                path: '/order/seller'
            });
        }
        // 商家跳转到商家页面
        if (this.userInfo.userRole === 'business') {
            this.$router.replace({
                path: '/order/buyer'
            });
        }
    }
};

</script>
