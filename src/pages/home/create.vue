<!--
* @moduleName: 商家-创建模板
* @Author: weiberzeng
* @Date:   2018-04-24 15:46:18
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-06-06 14:24:51
-->
<template>
    <div class="page page-current">
        <header class="bar bar-nav">
            <a class="button button-link button-nav pull-left" href="/demos/card" data-transition='slide-out'> <span class="icon icon-left"></span></a>
            <h1 class="title">创建模板</h1>
        </header>
        <bottomBar></bottomBar>
        <div class="content">
            <!-- 商家首页 -->
            <div class="description">建立当天活动功能介绍
                <br> （1）让精准标签的人参与当天的活动形成精准标签，有效成交带来更多符合精准人群的展现和流量
                <br> （2）配合模特试客回购活动，实现让模特试客1 5天后回购，从而打散轨迹，拒绝批量化行为
                <br> （3）模特试客会默认提交产品测评图片费用，如需高质量测评图片，请在左侧菜单栏点击［返客秀］
            </div>
            <div class="main-box">
                <div class="box-hd">
                    <span class="text">选择模板</span></div>
                <div class="box-bd">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import bottomBar from '@/components/bottomBar';

export default {
    name: 'homeCreate',
    data() {
        return {};
    },
    methods: {},
    components: {
        bottomBar
    }
};

</script>
