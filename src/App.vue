<template>
    <div class="page-group" id="app">
        <transition name="fade">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
export default {
    name: 'App',
    data() {
        return {
            isLogin: false
        };
    },
    created() {
        // 如果不是注册，再走验证是否登录流程
        let path = this.$route.path;
        if (path.indexOf('/account/reg') < 0) {
            // 获取用户是否登录
            this.$http.get('/user/loginStatus').then((response) => {
                if (!response.data.success || !response.data.data.loginStatus) {
                    // 未登录，跳转到登录页
                    this.$router.replace({
                        path: '/account/login'
                    });
                } else {
                    // 已登录，重新获取用户信息
                    this.$http.get('/user/get').then((response) => {
                        if (response.data.success) {
                            localStorage.setItem('userInfo', JSON.stringify(response.data.data.user));
                            this.$store.state.userInfo = response.data.data.user;
                            if (response.data.data.userCert) {
                                localStorage.setItem('userCert', JSON.stringify(response.data.data.userCert));
                                this.$store.state.userCert = response.data.data.userCert;
                            }
                        }
                    });
                };
            });
        }
    }
};

</script>
