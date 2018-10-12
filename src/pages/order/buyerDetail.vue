<!--
* @moduleName:
* @Author: weiberzeng
* @Date:   2018-08-02 22:50:50
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-10-12 14:41:53
-->
<template>
    <div class="page page-current">
        <header class="bar bar-nav">
            <router-link :to="'/order/buyer/'+taskId" class="button button-link button-nav pull-left"><span class="icon icon-left"></span></router-link>
            <h1 class="title">订单详情</h1>
        </header>
        <bottomBar></bottomBar>
        <div class="content gray">
            <div class="main-box">
                <div class="box-bd">
                    <div class="list-block">
                        <ul class="thinForm">
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label">买家账号</div>
                                        <div class="item-input">
                                            <input type="text" disabled v-model="userOrder.taobaoAccount">
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label">收货地址</div>
                                        <div class="item-input">
                                            <input type="text" disabled v-model="userOrder.address">
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="description" v-html="text"></div>
            <!-- 买家图片回显 -->
            <div class="main-box white">
                <div class="box-bd">
                    <div class="tmp-upload">
                        <ul class="tmp-list">
                            <li>
                                <div class="tips">IP 地址图</div>
                                <div class="upload">
                                    <img @click.stop="showImgFun" :src="userOrder.ipScreenshotUrl||defaultImg" alt="">
                                </div>
                            </li>
                            <li>
                                <div class="tips">搜索图</div>
                                <div class="upload">
                                    <img @click.stop="showImgFun" :src="userOrder.searchPicUrl||defaultImg" alt="">
                                </div>
                            </li>
                            <li>
                                <div class="tips">对比图一</div>
                                <div class="upload">
                                    <img @click.stop="showImgFun" :src="userOrder.comparePicUrl1||defaultImg" alt="">
                                </div>
                            </li>
                        </ul>
                        <ul class="tmp-list">
                            <li>
                                <div class="tips">对比图二</div>
                                <div class="upload">
                                    <img @click.stop="showImgFun" :src="userOrder.comparePicUrl2||defaultImg" alt="">
                                </div>
                            </li>
                            <li>
                                <div class="tips">对比图三</div>
                                <div class="upload">
                                    <img @click.stop="showImgFun" :src="userOrder.comparePicUrl3||defaultImg" alt="">
                                </div>
                            </li>
                            <li>
                                <div class="tips">入店图</div>
                                <div class="upload">
                                    <img @click.stop="showImgFun" :src="userOrder.enterStoreUrl||defaultImg" alt="">
                                </div>
                            </li>
                        </ul>
                        <ul class="tmp-list">
                            <li>
                                <div class="tips">查看评价图</div>
                                <div class="upload">
                                    <img @click.stop="showImgFun" :src="userOrder.viewRemarkUrl||defaultImg" alt="">
                                </div>
                            </li>
                            <li>
                                <div class="tips">查看买家秀图</div>
                                <div class="upload">
                                    <img @click.stop="showImgFun" :src="userOrder.viewBuyershowUrl||defaultImg" alt="">
                                </div>
                            </li>
                            <li>
                                <div class="tips">详情页面图</div>
                                <div class="upload">
                                    <img @click.stop="showImgFun" :src="userOrder.detailPageUrl||defaultImg" alt="">
                                </div>
                            </li>
                        </ul>
                        <ul class="tmp-list">
                            <li>
                                <div class="tips">咨询图</div>
                                <div class="upload">
                                    <img @click.stop="showImgFun" :src="userOrder.chatUrl||defaultImg" alt="">
                                </div>
                            </li>
                            <li>
                                <div class="tips">我的收藏图</div>
                                <div class="upload">
                                    <img @click.stop="showImgFun" :src="userOrder.favoriteAttentionUrl||defaultImg" alt="">
                                </div>
                            </li>
                            <li>
                                <div class="tips">关注店铺图</div>
                                <div class="upload">
                                    <img @click.stop="showImgFun" :src="userOrder.favoriteAttentionEntershopUrl||defaultImg" alt="">
                                </div>
                            </li>
                        </ul>
                        <template v-if="userOrder && userOrder.buyBackType === 1">
                            <ul class="tmp-list">
                                <li>
                                    <div class="tips">猜你喜欢图1</div>
                                    <div class="upload">
                                        <img @click.stop="showImgFun" :src="userOrder.backBuyImg1||defaultImg" alt="">
                                    </div>
                                </li>
                                <li>
                                    <div class="tips">猜你喜欢图2</div>
                                    <div class="upload">
                                        <img @click.stop="showImgFun" :src="userOrder.backBuyImg2||defaultImg" alt="">
                                    </div>
                                </li>
                                <li>
                                    <div class="tips">详情页面图</div>
                                    <div class="upload">
                                        <img @click.stop="showImgFun" :src="userOrder.backBuyImg3||defaultImg" alt="">
                                    </div>
                                </li>
                            </ul>
                        </template>
                        <template v-if="userOrder && userOrder.buyBackType === 2">
                            <ul class="tmp-list">
                                <li>
                                    <div class="tips">手淘首页入店</div>
                                    <div class="upload">
                                        <img @click.stop="showImgFun" :src="userOrder.backBuyImg4||defaultImg" alt="">
                                    </div>
                                </li>
                                <li>
                                    <div class="tips">详情页面图</div>
                                    <div class="upload">
                                        <img @click.stop="showImgFun" :src="userOrder.backBuyImg5||defaultImg" alt="">
                                    </div>
                                </li>
                                <li></li>
                            </ul>
                        </template>
                    </div>
                </div>
            </div>
            <!-- 评价 -->
            <div class="main-box white">
                <div class="box-bd">
                    <div class="list-block">
                        <ul class="thinForm">
                            <li class="multi">
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label">评价</div>
                                        <div class="item-input">
                                            <textarea v-model="form.businessRemarkDes" type="textarea" :rows="3" placeholder="请输入评价内容" :disabled="isShow"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="tmp-upload">
                        <ul class="tmp-list">
                            <li>
                                <div class="tips">上传买家秀图1</div>
                                <div class="upload" @click="checkPhotoFun('tmp1')">
                                    <span v-if="tmp1.uploadResult==='progress'" class="percent">{{tmp1.progress}}<i>%</i></span>
                                    <img :src="this.userOrder.buyershowUrl1||tmp1.imageUrl" alt="">
                                    <input type="file" ref="tmp1" name="multipartFiles" accept="image/*" @change="uploadPhotoFun('tmp1')">
                                </div>
                            </li>
                            <li>
                                <div class="tips">上传买家秀图2</div>
                                <div class="upload" @click="checkPhotoFun('tmp2')">
                                    <span v-if="tmp2.uploadResult==='progress'" class="percent">{{tmp2.progress}}<i>%</i></span>
                                    <img :src="this.userOrder.buyershowUrl2||tmp2.imageUrl" alt="">
                                    <input type="file" ref="tmp2" name="multipartFiles" accept="image/*" @change="uploadPhotoFun('tmp2')">
                                </div>
                            </li>
                            <li>
                                <div class="tips">上传买家秀图3</div>
                                <div class="upload" @click="checkPhotoFun('tmp3')">
                                    <span v-if="tmp3.uploadResult==='progress'" class="percent">{{tmp3.progress}}<i>%</i></span>
                                    <img :src="this.userOrder.buyershowUrl3||tmp3.imageUrl" alt="">
                                    <input type="file" ref="tmp3" name="multipartFiles" accept="image/*" @change="uploadPhotoFun('tmp3')">
                                </div>
                            </li>
                        </ul>
                        <div class="des">建议尺寸800*800</div>
                    </div>
                    <div class="submit-wrap mt10" v-if="!isShow">
                        <a href="javascript:;" @click.stop="evaluateFun" class="button button-big button-fill">发送评价内容</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import bottomBar from '@/components/bottomBar';
import upload from '@/javascript/upload';
let $ = window.$;
let myPhotoBrowserPopup;
export default {
    name: 'orderbuyerDetail',
    data() {
        return {
            id: this.$route.params.id,
            taskId: this.$route.params.taskId,
            text: window.config.mark.buyer.t1,
            defaultImg: '/static/image/tmp-bg.png',
            userOrder: {},
            form: {
                orderId: this.$route.params.id,
                businessRemarkDes: '',
                buyershowUrl1: '',
                buyershowUrl2: '',
                buyershowUrl3: ''
            },
            tmp1: {
                imageUrl: '/static/image/tmp-bg.png',
                uploadResult: 'wait',
                progress: '0'
            },
            tmp2: {
                imageUrl: '/static/image/tmp-bg.png',
                uploadResult: 'wait',
                progress: '0'
            },
            tmp3: {
                imageUrl: '/static/image/tmp-bg.png',
                uploadResult: 'wait',
                progress: '0'
            },
            isShow: false
        };
    },
    created() {
        if (this.$route.name === 'orderBuyerShowDetail') {
            this.isShow = true;
        }
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
                    // 回显数据
                    if (this.userOrder.businessRemarkDes) {
                        this.form.businessRemarkDes = this.userOrder.businessRemarkDes;
                    }
                    // 照片
                    let photos = [];
                    if (this.userOrder.ipScreenshotUrl) photos.push(this.userOrder.ipScreenshotUrl);
                    if (this.userOrder.searchPicUrl) photos.push(this.userOrder.searchPicUrl);
                    if (this.userOrder.comparePicUrl1) photos.push(this.userOrder.comparePicUrl1);
                    if (this.userOrder.comparePicUrl2) photos.push(this.userOrder.comparePicUrl2);
                    if (this.userOrder.comparePicUrl3) photos.push(this.userOrder.comparePicUrl3);
                    if (this.userOrder.enterStoreUrl) photos.push(this.userOrder.enterStoreUrl);
                    if (this.userOrder.viewRemarkUrl) photos.push(this.userOrder.viewRemarkUrl);
                    if (this.userOrder.viewBuyershowUrl) photos.push(this.userOrder.viewBuyershowUrl);
                    if (this.userOrder.detailPageUrl) photos.push(this.userOrder.detailPageUrl);
                    if (this.userOrder.chatUrl) photos.push(this.userOrder.chatUrl);
                    if (this.userOrder.favoriteAttentionUrl) photos.push(this.userOrder.favoriteAttentionUrl);
                    if (this.userOrder.favoriteAttentionEntershopUrl) photos.push(this.userOrder.favoriteAttentionEntershopUrl);
                    if (this.userOrder.backBuyImg1) photos.push(this.userOrder.backBuyImg1);
                    if (this.userOrder.backBuyImg2) photos.push(this.userOrder.backBuyImg2);
                    if (this.userOrder.backBuyImg3) photos.push(this.userOrder.backBuyImg3);
                    if (this.userOrder.backBuyImg4) photos.push(this.userOrder.backBuyImg4);
                    if (this.userOrder.backBuyImg5) photos.push(this.userOrder.backBuyImg5);

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
            if (this.isShow) return;

            if (this[name].uploadResult === 'success' || this[name].uploadResult === 'wait') {
                this.$refs[name].dispatchEvent(new MouseEvent('click'));
            } else if (this[name].uploadResult === 'progress') {
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
                                _that.form.buyershowUrl1 = response.data.visitUrls[0].fileUrl;
                                break;
                            case 'tmp2':
                                _that.form.buyershowUrl2 = response.data.visitUrls[0].fileUrl;
                                break;
                            case 'tmp3':
                                _that.form.buyershowUrl3 = response.data.visitUrls[0].fileUrl;
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
                    _that[name].progress = parseInt(progress.percent);
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
         * @description 发送评价
         */
        evaluateFun() {
            $.showPreloader();
            this.$http.post('/order/businessRemark', this.form).then((response) => {
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
