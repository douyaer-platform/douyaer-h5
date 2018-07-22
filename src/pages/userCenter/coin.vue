<!--
* @moduleName: 我的金币
* @Author: weiberzeng
* @Date:   2018-04-25 15:30:50
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-06-11 20:09:19
-->
<template>
<div class="page page-current">
    <header class="bar bar-nav">
        <router-link to="/uc/default" class="button button-link button-nav pull-left"><span class="icon icon-left"></span></router-link>
        <h1 class="title">我的金币</h1>
    </header>
    <div class="content gray">
        <div class="coin-card-wrap">
            <div class="coni-card-item">
                <div class="name">金币数量</div>
                <div class="val">{{userInfo.coin}}</div>
            </div>
            <div class="coni-card-item">
                <div class="name">冻结金币数量</div>
                <div class="val">{{userInfo.freezeCoin}}</div>
            </div>
        </div>
        <div class="list-block">
            <ul>
                <li class="item-content item-link">
                    <router-link to="/uc/pay">
                        <div class="item-media"><i class="icon icon-pay"></i></div>
                        <div class="item-inner">
                            <div class="item-title">充值</div>
                            <div class="item-after"></div>
                        </div>
                    </router-link>
                </li>
                <li class="item-content item-link">
                    <router-link to="/uc/cash">
                        <div class="item-media"><i class="icon icon-cash"></i></div>
                        <div class="item-inner">
                            <div class="item-title">提现</div>
                            <div class="item-after"></div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: 'ucCoin',
    data() {
        return {
            userInfo: this.$store.state.userInfo
        };
    }
};
</script>
