<!--
* @moduleName:
* @Author: weiberzeng
* @Date:   2018-04-24 00:05:10
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-04-25 15:15:15
-->
<template>
    <div style="padding: 1rem;">
        <router-link to="/home/seller" class="button">刷手首页</router-link>
        <router-link to="/home/buyer" class="button">商家首页</router-link>
        <router-link to="/home/creat" class="button">创建模板</router-link>
        <br>
        <router-link to="/account/reg" class="button">用户注册</router-link>
        <router-link to="/account/login" class="button">用户登录</router-link>
        <br>
        <router-link to="/order/seller" class="button">刷手订单</router-link>
        <router-link to="/order/buyer" class="button">商家订单</router-link>
        <br>
        <router-link to="/auth/seller" class="button">刷手认证</router-link>
        <router-link to="/auth/buyer" class="button">商家认证</router-link>
    </div>
</template>
<style scoped>
a {
    margin-bottom: 1rem;
}

</style>
