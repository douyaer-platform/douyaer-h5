<!--
* @moduleName:
* @Author: weiberzeng
* @Date:   2018-04-23 21:54:33
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-04-24 22:58:44
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
        // TODO
        // 根据用户返回的类型，跳转到刷手首页或者商家首页
        // this.$router.replace({
        //     path: '/home/buyer'
        // });
    },
    components: {
        bottomBar
    }
};

</script>
