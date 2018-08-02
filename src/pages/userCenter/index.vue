<!--
* @moduleName:
* @Author: weiberzeng
* @Date:   2018-04-25 14:59:26
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-08-02 22:06:42
-->
<template>
    <router-view></router-view>
</template>
<script>
export default {
    name: 'userCenter',
    data() {
        return {};
    },
    created() {
        // 重新获取用户信息
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
    }
};

</script>
