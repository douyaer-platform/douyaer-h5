<template>
<div class="page page-current">
    <header class="bar bar-nav">
        <router-link to="/uc/default" class="button button-link button-nav pull-left"><span class="icon icon-left"></span></router-link>
        <h1 class="title">联系客服</h1>
    </header>
    <div class="content gray">
        <div class="main-box">
            <div class="box-hd">QQ</div>
            <div class="box-bd">
                <div class="list-block">
                    <ul>
                        <li :key="index" v-for="(item,index) in qqGroup">
                            <div class="item-content">
                                <div class="item-inner">
                                    <div class="item-title label">客服群{{index + 1}}</div>
                                    <div class="item-input">
                                        {{item}}
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="main-box">
            <div class="box-hd">微信</div>
            <div class="box-bd">
                <div class="concat-wrap">
                    <div class="pf-wrap">
                        <div class="img-wrap"> <img src="/static/image/admin.png" alt=""></div>
                        <div class="inner">
                            <p>{{groupName}}</p>
                            <div class="attr-item">
                                <span class="attr-name">工作时间</span>
                                <span class="attr-val">{{workTime}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="code-wrap">
                        <div class="code-img">
                            <img src="/static/config/admincode.png" alt="">
                        </div>
                        <div class="sub">扫码添加平台管理员微信</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'userConcat',
    data() {
        return {
            groupName: window.config.text.groupName,
            workTime: window.config.text.workTime,
            qqGroup: window.config.qqGroup,
            userInfo: this.$store.state.userInfo
        };
    },
    methods: {}
};
</script>
