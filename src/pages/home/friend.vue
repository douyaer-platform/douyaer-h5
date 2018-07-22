<!--
* @moduleName: 商家-邀请好友
* @Author: weiberzeng
* @Date:   2018-04-24 15:46:18
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-07-22 15:28:55
-->
<template>
    <div class="page page-current">
        <header class="bar bar-nav">
            <router-link to="/home/buyer" class="button button-link button-nav pull-left"><span class="icon icon-left"></span></router-link>
            <h1 class="title">邀请好友</h1>
        </header>
        <div class="content gray">
            <!-- 商家首页 -->
            <div class="description">1.豆芽儿平台是邀请注册制，一个邀请链接仅一次有效，若需要邀请多个用户，需要多次点击邀请生成唯一注册链接。
                <br> 2.被邀请人与邀请人之间有绑定关系，被邀请人每完成一次订单，邀请人可以获得一个豆芽积分（积分可用于发布任务，详情请查阅个人中心-我的积分）
                <br> 3.邀请好友来互助时，一定要把握好被邀请者的人品，本平台时非盈利机构，所以不收取任何的保证金，如有刷手收到款后发起售后，本平台会联系邀请这位刷手的商家，如果商家不能处理，平台连同商家一起拉黑
            </div>
            <div class="main-box">
                <div class="box-bd">
                    <div class="list-block">
                        <ul class="thinForm">
                            <li class="multi">
                                <div class="item-content">
                                    <div class="item-inner lt">
                                        <div class="item-title label">邀请链接</div>
                                        <div class="item-input">
                                            <el-input id="target" v-model="url" type="textarea" :rows="2"></el-input>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="rightBtnWrap">
                        <a href="javascript:;" id="copyBtn" data-clipboard-action="copy" data-clipboard-target="#target" class="button button-fill">复制邀请链接</a>
                    </div>
                </div>
            </div>
            <div class="main-box" v-if="listData.length>0">
                <div class="box-bd">
                    <div class="flow-list-block list-block">
                        <ul>
                            <li class="item-content header">
                                <div class="item-inner">
                                    <div class="item-title">被邀请人</div>
                                    <!-- <div class="item-after">积分</div> -->
                                </div>
                            </li>
                            <!-- todo -->
                            <li class="item-content" v-for="item in listData" :key="item.id">
                                <div class="item-inner">
                                    <div class="item-title">{{item.descUserName}}</div>
                                    <!-- <div class="item-after">+2000</div> -->
                                </div>
                                <div class="footer">{{item.receiveCtime}}</div>
                            </li>
                            <!-- todo end -->
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
let $ = window.$;

export default {
    name: 'homeFriend',
    data() {
        return {
            url: '',
            listData: [],
            total: 0
        };
    },
    created() {
        this.getUrlFun();
        this.getDataFun();
    },
    mounted() {
        this.copyUrlFun();
    },
    methods: {
        /**
         * @Author      weiberZeng
         * @DateTime    2018-07-20
         * @lastTime    2018-07-20
         * @description 获取用户邀请链接
         */
        getUrlFun() {
            this.$http.post('/userInvite/add').then((response) => {
                if (response.data.success) {
                    let id = response.data.data.inviteId;
                    this.url = window.location.origin + '/#/account/reg/' + id;
                }
            });
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-07-20
         * @lastTime    2018-07-20
         * @description 挂载复制事件到复制邀请链接
         */
        copyUrlFun() {
            var clipboard = new window.ClipboardJS('#copyBtn');
            clipboard.on('success', function(e) {
                $.toast('复制成功!');
                e.clearSelection();
            });
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-07-20
         * @lastTime    2018-07-20
         * @description 获取邀请好友列表
         */
        getDataFun() {
            this.$http.get('/userInvite/list', {
                params: {
                    pageIndex: 1,
                    pageSize: 1000
                }
            }).then((response) => {
                if (response.data.success) {
                    let data = response.data.data.list;

                    this.listData = data;
                    this.total = response.data.data.total;
                }
            });
        }
    }
};

</script>
