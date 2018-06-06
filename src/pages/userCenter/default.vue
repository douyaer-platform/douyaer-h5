<!--
* @moduleName: 个人中心
* @Author: weiberzeng
* @Date:   2018-04-23 21:52:38
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-06-06 11:08:29
-->
<template>
    <div class="page page-current">
        <header class="bar bar-nav">
            <h1 class="title">我</h1>
        </header>
        <bottomBar></bottomBar>
        <div class="content gray">
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
                                <div class="item-after">4000</div>
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
        return { };
    },
    components: {
        bottomBar
    }
};

</script>
