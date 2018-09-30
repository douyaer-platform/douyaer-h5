<!--
* @moduleName: 刷手完成订单订单
* @Author: weiberzeng
* @Date:   2018-04-25 14:35:32
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-09-30 15:07:42
-->
<template>
    <div class="page page-current">
        <header class="bar bar-nav">
            <router-link to="/order" class="button button-link button-nav pull-left"><span class="icon icon-left"></span></router-link>
            <h1 class="title">
                <template v-if="isShow">完成详情</template>
                <template v-else>完成订单</template>
            </h1>
        </header>
        <div class="content">
            <div class="main-box">
                <div class="box-bd">
                    <div class="list-block">
                        <ul class="thinForm">
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label">店铺名称</div>
                                        <div class="item-input">
                                            <input type="text" disabled v-model="userOrder.storeName">
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label">产品价格</div>
                                        <div class="item-input">
                                            <input type="text" disabled v-model="userOrder.goodsPrice">
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="multi">
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label">搜索关键词</div>
                                        <div class="item-input" v-if="userOrder.tags">
                                            <input type="text" disabled :value="'1、' + tag0">
                                            <input v-if="tag1" type="text" disabled :value="'2、' + tag1">
                                            <input v-if="tag2" type="text" disabled :value="'3、' + tag2">
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="multi">
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label">任务说明</div>
                                        <div class="item-input">
                                            <textarea v-model="userOrder.remark" type="textarea" :rows="3" placeholder="任务说明" disabled></textarea>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="box-bd">
                    <div class="tmp-upload">
                        <ul class="tmp-list">
                            <li>
                                <div class="tips">入店主图</div>
                                <div class="upload">
                                    <img @click.stop="showImgFun" :src="userOrder.goodsPicUrl||defaultImg" alt="">
                                </div>
                            </li>
                            <li>
                                <div class="tips">大概搜索排名</div>
                                <div class="upload">
                                    <img @click.stop="showImgFun" :src="userOrder.taskSearchPicUrl||defaultImg" alt="">
                                </div>
                            </li>
                            <li>
                                <div class="tips">条件筛选</div>
                                <div class="upload">
                                    <img @click.stop="showImgFun" :src="userOrder.conditionPicUrl||defaultImg" alt="">
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
                    <div class="tmp-upload">
                        <ul class="tmp-list">
                            <li>
                                <div class="tips"><span class="red">*</span>IP 地址图</div>
                                <div class="upload" @click="checkPhotoFun('tmp1')">
                                    <span v-if="tmp1.uploadResult==='progress'" class="percent">{{tmp1.progress}}<i>%</i></span>
                                    <img :src="tmp1.imageUrl" alt="">
                                    <input type="file" ref="tmp1" name="multipartFiles" accept="image/*" @change="uploadPhotoFun('tmp1')">
                                </div>
                            </li>
                            <li>
                                <div class="tips"><span class="red">*</span>搜索图</div>
                                <div class="upload" @click="checkPhotoFun('tmp2')">
                                    <span v-if="tmp2.uploadResult==='progress'" class="percent">{{tmp2.progress}}<i>%</i></span>
                                    <img :src="tmp2.imageUrl" alt="">
                                    <input type="file" ref="tmp2" name="multipartFiles" accept="image/*" @change="uploadPhotoFun('tmp2')">
                                </div>
                            </li>
                            <li>
                                <div class="tips"><span class="red">*</span>对比图一</div>
                                <div class="upload" @click="checkPhotoFun('tmp3')">
                                    <span v-if="tmp3.uploadResult==='progress'" class="percent">{{tmp3.progress}}<i>%</i></span>
                                    <img :src="tmp3.imageUrl" alt="">
                                    <input type="file" ref="tmp3" name="multipartFiles" accept="image/*" @change="uploadPhotoFun('tmp3')">
                                </div>
                            </li>
                        </ul>
                        <ul class="tmp-list">
                            <li>
                                <div class="tips"><span class="red">*</span>对比图二</div>
                                <div class="upload" @click="checkPhotoFun('tmp4')">
                                    <span v-if="tmp4.uploadResult==='progress'" class="percent">{{tmp4.progress}}<i>%</i></span>
                                    <img :src="tmp4.imageUrl" alt="">
                                    <input type="file" ref="tmp4" name="multipartFiles" accept="image/*" @change="uploadPhotoFun('tmp4')">
                                </div>
                            </li>
                            <li>
                                <div class="tips"><span class="red">*</span>对比图三</div>
                                <div class="upload" @click="checkPhotoFun('tmp5')">
                                    <span v-if="tmp5.uploadResult==='progress'" class="percent">{{tmp5.progress}}<i>%</i></span>
                                    <img :src="tmp5.imageUrl" alt="">
                                    <input type="file" ref="tmp5" name="multipartFiles" accept="image/*" @change="uploadPhotoFun('tmp5')">
                                </div>
                            </li>
                            <li>
                                <div class="tips"><span class="red">*</span>入店图</div>
                                <div class="upload" @click="checkPhotoFun('tmp6')">
                                    <span v-if="tmp6.uploadResult==='progress'" class="percent">{{tmp6.progress}}<i>%</i></span>
                                    <img :src="tmp6.imageUrl" alt="">
                                    <input type="file" ref="tmp6" name="multipartFiles" accept="image/*" @change="uploadPhotoFun('tmp6')">
                                </div>
                            </li>
                        </ul>
                        <ul class="tmp-list">
                            <li>
                                <div class="tips"><span class="red">*</span>查看评价图</div>
                                <div class="upload" @click="checkPhotoFun('tmp7')">
                                    <span v-if="tmp7.uploadResult==='progress'" class="percent">{{tmp7.progress}}<i>%</i></span>
                                    <img :src="tmp7.imageUrl" alt="">
                                    <input type="file" ref="tmp7" name="multipartFiles" accept="image/*" @change="uploadPhotoFun('tmp7')">
                                </div>
                            </li>
                            <li>
                                <div class="tips"><span class="red">*</span>查看买家秀图</div>
                                <div class="upload" @click="checkPhotoFun('tmp8')">
                                    <span v-if="tmp8.uploadResult==='progress'" class="percent">{{tmp8.progress}}<i>%</i></span>
                                    <img :src="tmp8.imageUrl" alt="">
                                    <input type="file" ref="tmp8" name="multipartFiles" accept="image/*" @change="uploadPhotoFun('tmp8')">
                                </div>
                            </li>
                            <li>
                                <div class="tips"><span class="red">*</span>详情页面图</div>
                                <div class="upload" @click="checkPhotoFun('tmp9')">
                                    <span v-if="tmp9.uploadResult==='progress'" class="percent">{{tmp9.progress}}<i>%</i></span>
                                    <img :src="tmp9.imageUrl" alt="">
                                    <input type="file" ref="tmp9" name="multipartFiles" accept="image/*" @change="uploadPhotoFun('tmp9')">
                                </div>
                            </li>
                        </ul>
                        <ul class="tmp-list">
                            <li>
                                <div class="tips">咨询图</div>
                                <div class="upload" @click="checkPhotoFun('tmp10')">
                                    <span v-if="tmp10.uploadResult==='progress'" class="percent">{{tmp10.progress}}<i>%</i></span>
                                    <img :src="tmp10.imageUrl" alt="">
                                    <input type="file" ref="tmp10" name="multipartFiles" accept="image/*" @change="uploadPhotoFun('tmp10')">
                                </div>
                            </li>
                            <li>
                                <div class="tips">我的收藏图</div>
                                <div class="upload" @click="checkPhotoFun('tmp11')">
                                    <span v-if="tmp11.uploadResult==='progress'" class="percent">{{tmp11.progress}}<i>%</i></span>
                                    <img :src="tmp11.imageUrl" alt="">
                                    <input type="file" ref="tmp11" name="multipartFiles" accept="image/*" @change="uploadPhotoFun('tmp11')">
                                </div>
                            </li>
                            <li>
                                <div class="tips">关注店铺图</div>
                                <div class="upload" @click="checkPhotoFun('tmp12')">
                                    <span v-if="tmp12.uploadResult==='progress'" class="percent">{{tmp12.progress}}<i>%</i></span>
                                    <img :src="tmp12.imageUrl" alt="">
                                    <input type="file" ref="tmp12" name="multipartFiles" accept="image/*" @change="uploadPhotoFun('tmp12')">
                                </div>
                            </li>
                        </ul>
                        <template v-if="userOrder && userOrder.buyBackType === 1">
                            <div class="bigtips">提示：回购订单必须三天后回购下单，以下图片请三天后上传</div>
                            <ul class="tmp-list">
                                <li>
                                    <div class="tips"><span class="red">*</span>猜你喜欢图1</div>
                                    <div class="upload" @click="checkPhotoFun('tmp13')">
                                        <span v-if="tmp13.uploadResult==='progress'" class="percent">{{tmp13.progress}}<i>%</i></span>
                                        <img :src="tmp13.imageUrl" alt="">
                                        <input type="file" ref="tmp13" name="multipartFiles" accept="image/*" @change="uploadPhotoFun('tmp13')">
                                    </div>
                                </li>
                                <li>
                                    <div class="tips"><span class="red">*</span>猜你喜欢图2</div>
                                    <div class="upload" @click="checkPhotoFun('tmp14')">
                                        <span v-if="tmp14.uploadResult==='progress'" class="percent">{{tmp14.progress}}<i>%</i></span>
                                        <img :src="tmp14.imageUrl" alt="">
                                        <input type="file" ref="tmp14" name="multipartFiles" accept="image/*" @change="uploadPhotoFun('tmp14')">
                                    </div>
                                </li>
                                <li>
                                    <div class="tips"><span class="red">*</span>详情页面图</div>
                                    <div class="upload" @click="checkPhotoFun('tmp15')">
                                        <span v-if="tmp15.uploadResult==='progress'" class="percent">{{tmp15.progress}}<i>%</i></span>
                                        <img :src="tmp15.imageUrl" alt="">
                                        <input type="file" ref="tmp15" name="multipartFiles" accept="image/*" @change="uploadPhotoFun('tmp15')">
                                    </div>
                                </li>
                            </ul>
                        </template>
                        <template v-if="userOrder && userOrder.buyBackType === 2">
                            <div class="bigtips">提示：以下图片请第二天后上传</div>
                            <ul class="tmp-list">
                                <li>
                                    <div class="tips"><span class="red">*</span>手淘首页入店</div>
                                    <div class="upload" @click="checkPhotoFun('tmp16')">
                                        <span v-if="tmp16.uploadResult==='progress'" class="percent">{{tmp16.progress}}<i>%</i></span>
                                        <img :src="tmp16.imageUrl" alt="">
                                        <input type="file" ref="tmp16" name="multipartFiles" accept="image/*" @change="uploadPhotoFun('tmp16')">
                                    </div>
                                </li>
                                <li>
                                    <div class="tips"><span class="red">*</span>详情页面图</div>
                                    <div class="upload" @click="checkPhotoFun('tmp17')">
                                        <span v-if="tmp17.uploadResult==='progress'" class="percent">{{tmp17.progress}}<i>%</i></span>
                                        <img :src="tmp17.imageUrl" alt="">
                                        <input type="file" ref="tmp17" name="multipartFiles" accept="image/*" @change="uploadPhotoFun('tmp17')">
                                    </div>
                                </li>
                                <li></li>
                            </ul>
                        </template>
                        <div class="des">建议尺寸800*800</div>
                    </div>
                    <div class="submit-wrap" v-if="!isShow">
                        <a href="javascript:;" @click.stop="submitFun" class="button button-big button-fill">
                            <template v-if="form.hasSubmit===0">保存图片</template>
                            <template v-if="form.hasSubmit===1">完成提交订单</template>
                        </a>
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
    name: 'orderComplete',
    data() {
        return {
            id: this.$route.params.id,
            defaultImg: '/static/image/tmp-bg.png',
            userOrder: {},
            form: {
                orderId: this.$route.params.id,
                hasSubmit: 0,
                ipScreenshotUrl: '',
                searchPicUrl: '',
                comparePicUrl1: '',
                comparePicUrl2: '',
                comparePicUrl3: '',
                enterStoreUrl: '',
                viewRemarkUrl: '',
                viewBuyershowUrl: '',
                detailPageUrl: '',
                chatUrl: '',
                backBuyImg1: '',
                backBuyImg2: '',
                backBuyImg3: '',
                backBuyImg4: '',
                backBuyImg5: '',
                favoriteAttentionUrl: '',
                favoriteAttentionEntershopUrl: ''
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
            tmp4: {
                imageUrl: '/static/image/tmp-bg.png',
                uploadResult: 'wait',
                progress: '0'
            },
            tmp5: {
                imageUrl: '/static/image/tmp-bg.png',
                uploadResult: 'wait',
                progress: '0'
            },
            tmp6: {
                imageUrl: '/static/image/tmp-bg.png',
                uploadResult: 'wait',
                progress: '0'
            },
            tmp7: {
                imageUrl: '/static/image/tmp-bg.png',
                uploadResult: 'wait',
                progress: '0'
            },
            tmp8: {
                imageUrl: '/static/image/tmp-bg.png',
                uploadResult: 'wait',
                progress: '0'
            },
            tmp9: {
                imageUrl: '/static/image/tmp-bg.png',
                uploadResult: 'wait',
                progress: '0'
            },
            tmp10: {
                imageUrl: '/static/image/tmp-bg.png',
                uploadResult: 'wait',
                progress: '0'
            },
            tmp11: {
                imageUrl: '/static/image/tmp-bg.png',
                uploadResult: 'wait',
                progress: '0'
            },
            tmp12: {
                imageUrl: '/static/image/tmp-bg.png',
                uploadResult: 'wait',
                progress: '0'
            },
            tmp13: {
                imageUrl: '/static/image/tmp-bg.png',
                uploadResult: 'wait',
                progress: '0'
            },
            tmp14: {
                imageUrl: '/static/image/tmp-bg.png',
                uploadResult: 'wait',
                progress: '0'
            },
            tmp15: {
                imageUrl: '/static/image/tmp-bg.png',
                uploadResult: 'wait',
                progress: '0'
            },
            tmp16: {
                imageUrl: '/static/image/tmp-bg.png',
                uploadResult: 'wait',
                progress: '0'
            },
            tmp17: {
                imageUrl: '/static/image/tmp-bg.png',
                uploadResult: 'wait',
                progress: '0'
            },
            isShow: false
        };
    },
    computed: {
        tag0() {
            return this.userOrder.tags[0] || '';
        },
        tag1() {
            return this.userOrder.tags[1] || '';
        },
        tag2() {
            return this.userOrder.tags[2] || '';
        }
    },
    created() {
        if (this.$route.name === 'orderSellerDetail') {
            this.isShow = true;
        }
        this.getOrderDetailFun();
    },
    methods: {
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

                    if (this.userOrder.ipScreenshotUrl) {
                        this.form.ipScreenshotUrl = this.userOrder.ipScreenshotUrl;
                        this.tmp1.imageUrl = this.userOrder.ipScreenshotUrl;
                    }
                    if (this.userOrder.searchPicUrl) {
                        this.form.searchPicUrl = this.userOrder.searchPicUrl;
                        this.tmp2.imageUrl = this.userOrder.searchPicUrl;
                    }
                    if (this.userOrder.comparePicUrl1) {
                        this.form.comparePicUrl1 = this.userOrder.comparePicUrl1;
                        this.tmp3.imageUrl = this.userOrder.comparePicUrl1;
                    }
                    if (this.userOrder.comparePicUrl2) {
                        this.form.comparePicUrl2 = this.userOrder.comparePicUrl2;
                        this.tmp4.imageUrl = this.userOrder.comparePicUrl2;
                    }
                    if (this.userOrder.comparePicUrl3) {
                        this.form.comparePicUrl3 = this.userOrder.comparePicUrl3;
                        this.tmp5.imageUrl = this.userOrder.comparePicUrl3;
                    }
                    if (this.userOrder.enterStoreUrl) {
                        this.form.enterStoreUrl = this.userOrder.enterStoreUrl;
                        this.tmp6.imageUrl = this.userOrder.enterStoreUrl;
                    }
                    if (this.userOrder.viewRemarkUrl) {
                        this.form.viewRemarkUrl = this.userOrder.viewRemarkUrl;
                        this.tmp7.imageUrl = this.userOrder.viewRemarkUrl;
                    }
                    if (this.userOrder.viewBuyershowUrl) {
                        this.form.viewBuyershowUrl = this.userOrder.viewBuyershowUrl;
                        this.tmp8.imageUrl = this.userOrder.viewBuyershowUrl;
                    }
                    if (this.userOrder.detailPageUrl) {
                        this.form.detailPageUrl = this.userOrder.detailPageUrl;
                        this.tmp9.imageUrl = this.userOrder.detailPageUrl;
                    }
                    if (this.userOrder.chatUrl) {
                        this.form.chatUrl = this.userOrder.chatUrl;
                        this.tmp10.imageUrl = this.userOrder.chatUrl;
                    }
                    if (this.userOrder.favoriteAttentionUrl) {
                        this.form.favoriteAttentionUrl = this.userOrder.favoriteAttentionUrl;
                        this.tmp11.imageUrl = this.userOrder.favoriteAttentionUrl;
                    }
                    if (this.userOrder.favoriteAttentionEntershopUrl) {
                        this.form.favoriteAttentionEntershopUrl = this.userOrder.favoriteAttentionEntershopUrl;
                        this.tmp12.imageUrl = this.userOrder.favoriteAttentionEntershopUrl;
                    }
                    if (this.userOrder.backBuyImg1) {
                        this.form.backBuyImg1 = this.userOrder.backBuyImg1;
                        this.tmp13.imageUrl = this.userOrder.backBuyImg1;
                    }
                    if (this.userOrder.backBuyImg2) {
                        this.form.backBuyImg2 = this.userOrder.backBuyImg2;
                        this.tmp14.imageUrl = this.userOrder.backBuyImg2;
                    }
                    if (this.userOrder.backBuyImg3) {
                        this.form.backBuyImg3 = this.userOrder.backBuyImg3;
                        this.tmp15.imageUrl = this.userOrder.backBuyImg3;
                    }
                    if (this.userOrder.backBuyImg4) {
                        this.form.backBuyImg4 = this.userOrder.backBuyImg4;
                        this.tmp16.imageUrl = this.userOrder.backBuyImg4;
                    }
                    if (this.userOrder.backBuyImg5) {
                        this.form.backBuyImg5 = this.userOrder.backBuyImg5;
                        this.tmp17.imageUrl = this.userOrder.backBuyImg5;
                    }

                    let photos = [];
                    if (this.userOrder.goodsPicUrl) photos.push(this.userOrder.goodsPicUrl);
                    if (this.userOrder.searchPicUrl) photos.push(this.userOrder.searchPicUrl);
                    if (this.userOrder.conditionPicUrl) photos.push(this.userOrder.conditionPicUrl);

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
         * @DateTime    2018-06-07
         * @lastTime    2018-06-07
         * @description 选择图片
         */
        checkPhotoFun(name) {
            if (this.isShow) return;
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
                                _that.form.ipScreenshotUrl = response.data.visitUrls[0].fileUrl;
                                break;
                            case 'tmp2':
                                _that.form.searchPicUrl = response.data.visitUrls[0].fileUrl;
                                break;
                            case 'tmp3':
                                _that.form.comparePicUrl1 = response.data.visitUrls[0].fileUrl;
                                break;
                            case 'tmp4':
                                _that.form.comparePicUrl2 = response.data.visitUrls[0].fileUrl;
                                break;
                            case 'tmp5':
                                _that.form.comparePicUrl3 = response.data.visitUrls[0].fileUrl;
                                break;
                            case 'tmp6':
                                _that.form.enterStoreUrl = response.data.visitUrls[0].fileUrl;
                                break;
                            case 'tmp7':
                                _that.form.viewRemarkUrl = response.data.visitUrls[0].fileUrl;
                                break;
                            case 'tmp8':
                                _that.form.viewBuyershowUrl = response.data.visitUrls[0].fileUrl;
                                break;
                            case 'tmp9':
                                _that.form.detailPageUrl = response.data.visitUrls[0].fileUrl;
                                break;
                            case 'tmp10':
                                _that.form.chatUrl = response.data.visitUrls[0].fileUrl;
                                break;
                            case 'tmp11':
                                _that.form.favoriteAttentionUrl = response.data.visitUrls[0].fileUrl;
                                break;
                            case 'tmp12':
                                _that.form.favoriteAttentionEntershopUrl = response.data.visitUrls[0].fileUrl;
                                break;
                            case 'tmp13':
                                _that.form.backBuyImg1 = response.data.visitUrls[0].fileUrl;
                                break;
                            case 'tmp14':
                                _that.form.backBuyImg2 = response.data.visitUrls[0].fileUrl;
                                break;
                            case 'tmp15':
                                _that.form.backBuyImg3 = response.data.visitUrls[0].fileUrl;
                                break;
                            case 'tmp16':
                                _that.form.backBuyImg4 = response.data.visitUrls[0].fileUrl;
                                break;
                            case 'tmp17':
                                _that.form.backBuyImg5 = response.data.visitUrls[0].fileUrl;
                                break;
                        }
                        $.toast('上传成功！');
                        // 设置上传状态为上传图片或者完成订单
                        _that.setSubmitFun();
                        // 提交保存图片到后台
                        // _that.submitFun();
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
         * @DateTime    2018-08-18
         * @lastTime    2018-08-18
         * @description 设置上传状态为上传图片或者完成订单
         */
        setSubmitFun() {
            this.form.hasSubmit = 1;
            if (!this.form.ipScreenshotUrl) {
                // $.toast('请上传IP 地址图');
                // return;
                this.form.hasSubmit = 0;
            }
            if (!this.form.searchPicUrl) {
                // $.toast('请上传搜索图');
                // return;
                this.form.hasSubmit = 0;
            }
            if (!this.form.comparePicUrl1) {
                // $.toast('请上传对比图一');
                // return;
                this.form.hasSubmit = 0;
            }
            if (!this.form.comparePicUrl2) {
                // $.toast('请上传对比图二');
                // return;
                this.form.hasSubmit = 0;
            }
            if (!this.form.comparePicUrl3) {
                // $.toast('请上传对比图三');
                // return;
                this.form.hasSubmit = 0;
            }
            if (!this.form.enterStoreUrl) {
                // $.toast('请上传入店图');
                // return;
                this.form.hasSubmit = 0;
            }
            if (!this.form.viewRemarkUrl) {
                // $.toast('请上传查看评价图');
                // return;
                this.form.hasSubmit = 0;
            }
            if (!this.form.viewBuyershowUrl) {
                // $.toast('请上传查看买家秀图');
                // return;
                this.form.hasSubmit = 0;
            }
            if (!this.form.detailPageUrl) {
                // $.toast('请上传详情页面图');
                // return;
                this.form.hasSubmit = 0;
            }
            if (this.userOrder && this.userOrder.needAlitm === 1) {
                if (!this.form.chatUrl) {
                    // $.toast('请上传咨询图');
                    // return;
                    this.form.hasSubmit = 0;
                }
            }
            if (this.userOrder && this.userOrder.buyBackType === 1) {
                if (!this.form.backBuyImg1 || !this.form.backBuyImg2 || !this.form.backBuyImg3) {
                    // $.toast('加购物车');
                    // return;
                    this.form.hasSubmit = 0;
                }
            }
            if (this.userOrder && this.userOrder.buyBackType === 2) {
                if (!this.form.backBuyImg4 || !this.form.backBuyImg5) {
                    // $.toast('手淘首页');
                    // return;
                    this.form.hasSubmit = 0;
                }
            }
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-08-04
         * @lastTime    2018-08-04
         * @description 提交订单
         */
        submitFun() {
            if (this.form.hasSubmit === 1) {
                this.setSubmitFun();
                $.showPreloader();
            }
            this.$http.post('/order/submit', this.form).then((response) => {
                $.hidePreloader();
                if (response.data.success) {
                    $.toast('保存成功！');
                    // 只有在提交保存订单的时候，才跳转会订单列表页
                    if (this.form.hasSubmit === 1) {
                        let _that = this;
                        setTimeout(() => {
                            _that.$router.replace({
                                path: '/order'
                            });
                        }, 500);
                    }
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
