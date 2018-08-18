<!--
* @moduleName: 认证
* @Author: weiberzeng
* @Date:   2018-04-23 21:58:14
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-08-18 19:32:22
-->
<template>
    <router-view></router-view>
</template>
<script>
export default {
    name: 'auth',
    data() {
        return {};
    },
    computed: {
        userInfo() {
            return this.$store.state.userInfo;
        }
    },
    created() {
        if (this.userInfo.userRole === 'brushhand') {
            this.$router.replace({
                path: '/auth/seller'
            });
        }
        // 商家跳转到商家页面
        if (this.userInfo.userRole === 'business') {
            this.$router.replace({
                path: '/auth/buyer'
            });
        }
    }
};

</script>
