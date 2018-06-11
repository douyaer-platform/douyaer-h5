<!--
* @moduleName: 个人中心
* @Author: weiberzeng
* @Date:   2018-04-23 21:52:38
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-06-11 20:04:09
-->
<template>
    <div class="page page-current">
        <header class="bar bar-nav">
            <h1 class="title">我</h1>
        </header>
        <bottomBar></bottomBar>
        <div class="content gray">
            <div class="pf-wrap">
                <div class="img-wrap"> <img src="/static/demo/photo.png" alt=""></div>
                <div class="inner">
                    <p>{{userInfo.phone}}</p>
                    <div class="attr-item">
                        <span class="attr-name">旺旺号：</span>
                        <span class="attr-val">{{userInfo.alitm||'--'}}</span>
                    </div>
                </div>
                <router-link to="/auth" class="authBtn">去认证 <i class="icon icon-right"></i></router-link>
            </div>
            <div class="list-block">
                <ul>
                    <li class="item-content item-link">
                        <router-link to="/uc/flow">
                            <div class="item-media"><i class="icon icon-flow"></i></div>
                            <div class="item-inner">
                                <div class="item-title">资金流水</div>
                                <div class="item-after"></div>
                            </div>
                        </router-link>
                    </li>
                    <li class="item-content item-link">
                        <router-link to="/uc/coin">
                            <div class="item-media"><i class="icon icon-coin"></i></div>
                            <div class="item-inner">
                                <div class="item-title">我的金币</div>
                                <div class="item-after">{{userInfo.coin}}</div>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="list-block">
                <ul>
                    <li class="item-content item-link">
                        <a href="tel:40080088008">
                            <div class="item-media"><i class="icon icon-tel"></i></div>
                            <div class="item-inner">
                                <div class="item-title">联系客服</div>
                                <div class="item-after">40080088008</div>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import bottomBar from '@/components/bottomBar';
export default {
    name: 'userCenterIndex',
    data() {
        return {
            userInfo: this.$store.state.userInfo
        };
    },
    components: {
        bottomBar
    }
};

</script>
