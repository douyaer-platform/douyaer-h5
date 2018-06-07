<!--
* @moduleName:
* @Author: weiberzeng
* @Date:   2018-04-23 21:54:33
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-06-08 00:10:50
-->
<template>
    <router-view></router-view>
</template>
<script>
import bottomBar from '@/components/bottomBar';
export default {
    name: 'home',
    data() {
        return {};
    },
    created() {
        let userInfo = this.$store.state.userInfo;
        if (userInfo) {
            // 刷手跳转到刷手页面
            if (userInfo.userRole === 'brushhand') {
                this.$router.replace({
                    path: '/home/seller'
                });
            }
            // 商家跳转到商家页面
            if (userInfo.userRole === 'business') {
                this.$router.replace({
                    path: '/home/buyer'
                });
            }
        } else {
            this.$router.replace({
                path: '/account/login'
            });
        }
    },
    components: {
        bottomBar
    }
};

</script>
