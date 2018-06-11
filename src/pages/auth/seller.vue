<!--
* @moduleName: 刷手认证
* @Author: weiberzeng
* @Date:   2018-04-25 14:35:32
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-06-09 17:32:01
-->
<template>
    <div class="page page-current">
        <header class="bar bar-nav">
            <router-link to="/uc/default" class="button button-link button-nav pull-left"><span class="icon icon-left"></span></router-link>
            <h1 class="title">刷手认证</h1>
        </header>
        <div class="content">
            <div class="description">(1)本平台是基于亲友所搭建的一个互助平台，不以盈利为目的，不收取任何保证金！
                <br> (2)在本平台做任务，每个月能赚300-400元，不像网络骗局所说的月入上万！
                <br> (3)请确保信息真实有效，确保审核通过。
            </div>
            <div class="main-box">
                <div class="box-bd">
                    <div class="list-block">
                        <ul class="thinForm">
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label">姓名</div>
                                        <div class="item-input">
                                            <el-input v-model="form.realName" placeholder="请输入真实姓名" autofocus></el-input>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label">身份证号</div>
                                        <div class="item-input">
                                            <el-input v-model="form.identifyNo" maxlength="18" placeholder="请输入身份证号"></el-input>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label">淘宝账号</div>
                                        <div class="item-input">
                                            <el-input v-model="form.taobaoAccount" placeholder="请输入淘宝账号"></el-input>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label">旺旺名</div>
                                        <div class="item-input">
                                            <el-input v-model="form.alitm" placeholder="请输入旺旺名"></el-input>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label">店铺链接</div>
                                        <div class="item-input">
                                            <el-input v-model="form.storeUrl" placeholder="请输入店铺链接"></el-input>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="main-box">
                <div class="box-hd"><span class="text">上传身份证</span></div>
                <div class="box-bd">
                </div>
                <div class="submit-wrap">
                    <a href="javascript:;" @click.stop="submitFun" class="button button-big button-fill">提交商家认证</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'authSeller',
    data() {
        return {
            form: {}
        };
    }
};

</script>
