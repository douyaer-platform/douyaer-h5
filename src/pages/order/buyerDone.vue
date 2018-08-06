<!--
* @moduleName:
* @Author: weiberzeng
* @Date:   2018-08-03 23:18:59
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-08-06 09:45:41
-->
<template>
    <div class="page page-current">
        <header class="bar bar-nav">
            <h1 class="title">查看评价</h1>
        </header>
        <bottomBar></bottomBar>
        <div class="content gray">
            <div class="main-box white">
                <div class="box-hd">评价详情</div>
                <div class="box-bd">
                    <ul class="order-list">
                        <li class="item clearfix">
                            <div class="img-wrap">
                                <img :src="userOrder.goodsPicUrl" alt="">
                            </div>
                            <div class="inner">
                                <div class="name">淘宝账号：{{userOrder.taobaoAccount}}</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <!-- 买家图片回显 -->
            <div class="main-box">
                <div class="box-bd">
                    <div class="tmp-upload">
                        <ul class="tmp-list">
                            <li>
                                <div class="tips">评价完成截图</div>
                                <div class="upload">
                                    <img @click.stop="showImgFun" :src="userOrder.finishRemarkUrl||defaultImg" alt="">
                                </div>
                            </li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
                    <div class="submit-wrap mt10">
                        <a href="javascript:;" @click.stop="doneFun" class="button button-big button-fill">确认放款</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import bottomBar from '@/components/bottomBar';
let $ = window.$;
let myPhotoBrowserPopup;
export default {
    name: 'orderbuyerDone',
    data() {
        return {
            id: this.$route.params.id,
            defaultImg: '/static/image/tmp-bg.png',
            userOrder: {}

        };
    },
    created() {
        this.getOrderDetailFun();
    },
    methods: {
        /**
         * @Author      weiberZeng
         * @DateTime    2018-06-11
         * @lastTime    2018-06-11
         * @description 获取订单详情
         */
        getOrderDetailFun() {
            $.showPreloader();
            this.$http.get('/order/findByBusiness', {
                params: {
                    orderId: this.id
                }
            }).then((response) => {
                $.hidePreloader();
                if (response.data.success) {
                    let data = response.data.data;
                    this.userOrder = data.userOrder;

                    myPhotoBrowserPopup = $.photoBrowser({
                        photos: [
                            this.userOrder.finishRemarkUrl
                        ],
                        type: 'popup'
                    });
                }
            }).catch(() => {
                $.hidePreloader();
            });
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-08-03
         * @lastTime    2018-08-03
         * @description 显示图片
         */
        showImgFun() {
            if (myPhotoBrowserPopup) {
                myPhotoBrowserPopup.open();
            }
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-08-03
         * @lastTime    2018-08-03
         * @description 确认放款
         */
        doneFun() {
            $.showPreloader();
            this.$http.post('/order/sendMoney', {
                orderId: this.id
            }).then((response) => {
                $.hidePreloader();
                if (response.data.success) {
                    $.toast('保存成功！');
                    let _that = this;
                    setTimeout(() => {
                        _that.$router.replace({
                            path: '/order/buyer'
                        });
                    }, 500);
                } else {
                    $.alert(response.data.message);
                }
            }).catch(() => {
                $.hidePreloader();
            });
        }
    },
    components: {
        bottomBar
    }
};

</script>
