<!--
* @moduleName:
* @Author: weiberzeng
* @Date:   2018-04-23 21:54:33
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-04-23 23:14:11
-->
<template>
    <div class="page page-current">
        <header class="bar bar-nav">
            <h1 class="title">首页</h1>
        </header>
        <bottomBar></bottomBar>
        <div class="content">
            <div class="topTips warning"><i class="icon-warning"></i>重要通知：关于对某某账户的违规操作处理。</div>
            <!-- 刷手首页 -->
            <div class="idx-description">接单规则说明
                <br>豆芽网是一个专业的邀请亲友互助，让亲友赚取佣金的平台，注册后请严格遵守豆芽网的操作规则。</div>
            <div class="main-box">
                <div class="box-hd">
                    <span class="text">任务列表</span></div>
                <div class="box-bd"></div>
            </div>
        </div>
    </div>
</template>
<script>
import bottomBar from '@/components/bottomBar';
export default {
    name: 'home',
    data() {
        return {};
    },
    components: {
        bottomBar
    }
};

</script>
