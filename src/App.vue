<template>
    <div class="page-group" id="app">
        <transition>
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
export default {
    name: 'App',
    created() {
        // 获取用户是否登录
        this.$http.get('/user/loginStatus').then((response) => {
            if (!response.data.success || !response.data.data.loginStatus || !this.$store.state.userInfo) {
                // 未登录，跳转到登录页
                this.$router.replace({
                    path: '/account/login'
                });
            }
        });
    }
};

</script>
