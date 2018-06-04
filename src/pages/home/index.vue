<!--
* @moduleName:
* @Author: weiberzeng
* @Date:   2018-04-23 21:54:33
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-06-04 20:20:43
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
        // 获取用户是否登录
        this.$http.get('/user/loginStatus').then((response) => {
            let data = response.data.data;
            let userInfoStr = localStorage.getItem('userInfo');
            let userInfo;

            if (response.data.success) {
                if (data.loginStatus && userInfoStr) {
                    // 已登录，并且有用户信息
                    userInfo = JSON.parse(userInfoStr);
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
                    console.log('userInfo>>', userInfo);
                } else {
                    // 未登录，跳转到登录页
                    this.$router.replace({
                        path: '/account/login'
                    });
                }
            }
        });
    },
    components: {
        bottomBar
    }
};

</script>
