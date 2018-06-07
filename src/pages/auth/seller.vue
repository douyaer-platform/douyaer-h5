<!--
* @moduleName: 刷手认证
* @Author: weiberzeng
* @Date:   2018-04-25 14:35:32
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-06-06 23:12:01
-->
<template>
    <div class="page page-current">
        <header class="bar bar-nav">
            <router-link to="/uc/default" class="button button-link button-nav pull-left"><span class="icon icon-left"></span></router-link>
            <h1 class="title">刷手认证</h1>
        </header>
        <div class="content">
            <div class="description">(1)本平台是基于亲友所搭建的一个互助平台，不以盈利为目的，不收取任何保证金！
                <br>(2)在本平台做任务，每个月能赚300-400元，不像网络骗局所说的月入上万！
                <br>(3)请确保信息真实有效，确保审核通过。</div>
            <div class="list-block">
                <ul>
                    <!-- Text inputs -->
                    <li>
                        <div class="item-content">
                            <div class="item-media"><i class="icon icon-form-name"></i></div>
                            <div class="item-inner">
                                <div class="item-title label">姓名</div>
                                <div class="item-input">
                                    <input type="text" placeholder="Your name">
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="item-content">
                            <div class="item-media"><i class="icon icon-form-email"></i></div>
                            <div class="item-inner">
                                <div class="item-title label">邮箱</div>
                                <div class="item-input">
                                    <input type="email" placeholder="E-mail">
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'authSeller',
    data() {
        return {};
    }
};

</script>
