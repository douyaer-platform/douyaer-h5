<!--
* @moduleName: 刷手评价订单订单
* @Author: weiberzeng
* @Date:   2018-04-25 14:35:32
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-08-04 02:15:51
-->
<!--
* @moduleName:
* @Author: weiberzeng
* @Date:   2018-08-03 23:18:59
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-08-04 00:11:16
-->
<template>
    <div class="page page-current">
        <header class="bar bar-nav">
            <h1 class="title">完成评价</h1>
        </header>
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
                                <div class="name">卖家店名：{{userOrder.storeName}}</div>
                                <div class="state">
                                    <span>注意：请认真核对好商品和对应的评价，避免发生错误遭到投诉！</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="list-block">
                        <ul class="thinForm">
                            <li class="multi">
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label">评价</div>
                                        <div class="item-input">
                                            <el-input id="target" v-model="userOrder.businessRemarkDes" type="textarea" :rows="3"></el-input>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="rightBtnWrap">
                        <a href="javascript:;" id="copyBtn" data-clipboard-action="copy" data-clipboard-target="#target" class="button button-fill">一键复制评价</a>
                    </div>
                </div>
            </div>
            <!-- 买家图片回显 -->
            <div class="main-box white">
                <div class="box-bd">
                    <div class="tmp-upload">
                        <ul class="tmp-list">
                            <li>
                                <div class="tips">买家秀图1</div>
                                <div class="upload">
                                    <img @click.stop="showImgFun" :src="userOrder.buyershowUrl1||defaultImg" alt="">
                                </div>
                            </li>
                            <li>
                                <div class="tips">买家秀图2</div>
                                <div class="upload">
                                    <img @click.stop="showImgFun" :src="userOrder.buyershowUrl2||defaultImg" alt="">
                                </div>
                            </li>
                            <li>
                                <div class="tips">买家秀图3</div>
                                <div class="upload">
                                    <img @click.stop="showImgFun" :src="userOrder.buyershowUrl3||defaultImg" alt="">
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- 上传截图 -->
            <div class="main-box">
                <div class="box-hd">
                    <span class="text">上传图片</span></div>
                <div class="box-bd">
                    <div class="tmp-upload">
                        <ul class="tmp-list">
                            <li>
                                <div class="tips">完成评价截图</div>
                                <div class="upload" @click="checkPhotoFun('tmp1')">
                                    <span v-if="tmp1.uploadResult==='progress'" class="percent">{{tmp1.progress}}<i>%</i></span>
                                    <img :src="tmp1.imageUrl" alt="">
                                    <input type="file" ref="tmp1" name="multipartFiles" accept="image/*" @change="uploadPhotoFun('tmp1')">
                                </div>
                            </li>
                            <li> </li>
                            <li> </li>
                        </ul>
                        <div class="des">建议尺寸800*800</div>
                    </div>
                    <div class="submit-wrap">
                        <a href="javascript:;" @click.stop="doneFun" class="button button-big button-fill">确认评价完成</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import upload from '@/javascript/upload';
let $ = window.$;
let myPhotoBrowserPopup;
export default {
    name: 'orderEvaluate',
    data() {
        return {
            id: this.$route.params.id,
            defaultImg: '/static/image/tmp-bg.png',
            userOrder: {},
            finishRemarkUrl: '',
            tmp1: {
                imageUrl: '/static/image/tmp-bg.png',
                uploadResult: 'wait',
                progress: '0'
            }
        };
    },
    created() {
        this.getOrderDetailFun();
    },
    mounted() {
        this.copyUrlFun();
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
            this.$http.get('/order/findByBrushhand', {
                params: {
                    orderId: this.id
                }
            }).then((response) => {
                $.hidePreloader();
                if (response.data.success) {
                    let data = response.data.data;
                    this.userOrder = data.userOrder;

                    let photos = [];
                    if (this.userOrder.buyershowUrl1) photos.push(this.userOrder.buyershowUrl1);
                    if (this.userOrder.buyershowUrl2) photos.push(this.userOrder.buyershowUrl2);
                    if (this.userOrder.buyershowUrl3) photos.push(this.userOrder.buyershowUrl3);

                    myPhotoBrowserPopup = $.photoBrowser({
                        photos: photos,
                        type: 'popup'
                    });
                }
            }).catch(() => {
                $.hidePreloader();
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
         * @DateTime    2018-06-07
         * @lastTime    2018-06-07
         * @description 选择图片
         */
        checkPhotoFun(name) {
            if (this[name].uploadResult === 'wait') {
                this.$refs[name].dispatchEvent(new MouseEvent('click'));
            } else if (this[name].uploadResult === 'success' || this[name].uploadResult === 'progress') {
                // 不执行
            } else {
                this.uploadPhotoFun(name);
            }
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-06-07
         * @lastTime    2018-06-07
         * @description 上传前限制
         */
        uploadPhotoFun(name) {
            let _that = this;
            // 获取文件流
            let file = this.$refs[name].files[0];
            // 设置回显
            this[name].imageUrl = URL.createObjectURL(file);
            // 上传文件
            upload({
                action: '/douyaer-api/file/upload',
                filename: 'multipartFiles',
                file: file,
                onSuccess(response) {
                    if (response.success) {
                        _that[name].uploadResult = 'success';
                        switch (name) {
                            case 'tmp1':
                                _that.finishRemarkUrl = response.data.visitUrls[0].fileUrl;
                                break;
                        }
                        $.toast('上传成功！');
                    } else {
                        _that[name].uploadResult = 'fail';
                        $.toast(response.message);
                    }
                },
                onProgress(progress) {
                    _that[name].uploadResult = 'progress';
                    _that[name].progress = progress.percent;
                },
                onError(e) {
                    _that[name].uploadResult = 'fail';
                    $.toast('服务器错误！');
                }
            });
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-08-03
         * @lastTime    2018-08-03
         * @description 确认评价完成
         */
        doneFun() {
            if (!this.finishRemarkUrl) {
                $.toast('请上传完成评价截图');
                return;
            }

            $.showPreloader();
            this.$http.post('/order/brushhandRemark', {
                orderId: this.id,
                finishRemarkUrl: this.finishRemarkUrl
            }).then((response) => {
                $.hidePreloader();
                if (response.data.success) {
                    $.toast('保存成功！');
                    this.$router.replace({
                        path: '/order'
                    });
                } else {
                    $.alert(response.data.message);
                }
            }).catch(() => {
                $.hidePreloader();
            });
        }
    }
};

</script>
