<!--
* @moduleName:
* @Author: weiberzeng
* @Date:   2018-04-23 21:58:14
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-08-18 19:34:19
-->
<template>
    <router-view></router-view>
</template>
<script>
export default {
    name: 'order',
    data() {
        return {};
    },
    computed: {
        userInfo() {
            return this.$store.state.userInfo;
        },
        userCert() {
            return this.$store.state.userCert || {};
        }
    },
    watch: {
        '$route': function(to) {
            if (to.path === '/order') {
                this.gotoFun();
            }
        }
    },
    created() {
        this.gotoFun();
    },
    methods: {
        gotoFun() {
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
    }
};

</script>
