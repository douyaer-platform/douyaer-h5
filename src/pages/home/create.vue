<!--
* @moduleName: 商家-创建模板
* @Author: weiberzeng
* @Date:   2018-04-24 15:46:18
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-06-12 20:48:08
-->
<template>
    <div class="page page-current">
        <header class="bar bar-nav">
             <router-link to="/home/buyer" class="button button-link button-nav pull-left"><span class="icon icon-left"></span></router-link>
            <h1 class="title">创建模板</h1>
        </header>
        <div class="content">
            <!-- 创建 -->
            <div class="description">商家发起互助注意事项
                <br> 违规及处罚方式：
                <br> （1）一个身份证，一个IP只能在本平台注册一个帐号，一个帐号只能绑定一个淘宝店铺。
                <br> （2）发布互助时只能发布帐号绑定的店铺宝贝，违规者直接拉黑。
                <br> （3）本平台的刷手都是各位商家自己邀请的亲朋好友，并不是专业的刷手，希望大家发起互助时友好对待。
                <br> （4）本平台严禁发红包合虚假单号，发包的最低标准是一瓶未开启的矿泉水，包的重量控制在500g内
                <br> （5）邀请好友互助时，一定把握好被邀请者的人品，本平台是非盈利机构
            </div>
            <div class="main-box mt10">
                <div class="box-bd">
                    <div class="list-block">
                        <ul class="thinForm">
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label">店铺名称</div>
                                        <div class="item-input">
                                            <input type="text" placeholder="请输入店铺名称">
                                        </div>
                                        <div class="newUser">最近300000人成交</div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label">宝贝链接</div>
                                        <div class="item-input">
                                            <input type="text" placeholder="请填写正确的宝贝链接">
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="main-box">
                <div class="box-hd">
                    <span class="text">上传图片</span></div>
                <div class="box-bd">

                </div>
            </div>
            <div class="main-box">
                <div class="box-bd">
                    <div class="list-block">
                        <ul>
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label" style="width:7.5rem">产品价格 <span class="sub">(包含运费)</span><span class="red">*</span></div>
                                        <div class="item-input">
                                            <input type="text" placeholder="请输入价格">
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="item-content">
                                    <div class="item-inner noflex">
                                        <div class="item-title label">搜索关键词<span class="red">*</span></div>
                                        <div class="item-input">
                                            <input type="text" placeholder="请输入关键词1 如 女鞋">
                                        </div>
                                        <div class="item-input">
                                            <input type="text" placeholder="请输入关键词2 如 尖头鞋">
                                        </div>
                                        <div class="item-input">
                                            <input type="text" placeholder="请输入关键词3">
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="item-content">
                                    <div class="item-inner noflex">
                                        <div class="item-title label">回购类型</div>
                                        <div class="item-input">
                                            <el-radio-group v-model="radio2">
                                                <el-radio :label="3">加收藏后3-5内回购，费用＋5</el-radio>
                                                <el-radio :label="6">关注店铺后6-10内回购，费用＋6</el-radio>
                                            </el-radio-group>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="item-content">
                                    <div class="item-inner noflex">
                                        <div class="item-title label" style="width:100%">是否需要假聊</div>
                                        <div class="item-input">
                                            <el-radio-group v-model="radio3">
                                                <el-radio :label="3">旺旺咨询，费用＋1</el-radio>
                                            </el-radio-group>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                        <br>
                        <br>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'homeCreate',
    data() {
        return {
            radio2: '',
            radio3: ''
        };
    },
    methods: {},
    components: {}
};

</script>
