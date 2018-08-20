<!--
* @moduleName: 刷手完成订单订单
* @Author: weiberzeng
* @Date:   2018-04-25 14:35:32
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-08-20 17:23:06
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
                                            <el-input disabled v-model="userOrder.storeName"></el-input>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label">产品价格</div>
                                        <div class="item-input">
                                            <el-input disabled v-model="userOrder.goodsPrice"></el-input>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="multi">
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label">搜索关键词</div>
                                        <div class="item-input" v-if="userOrder.tags">
                                            <input type="text" disabled :value="'1、' + userOrder.tags[0]">
                                            <input type="text" disabled :value="'2、' + userOrder.tags[1]">
                                            <input type="text" disabled :value="'3、' + userOrder.tags[2]">
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="multi">
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label">任务说明</div>
                                        <div class="item-input">
                                            <el-input v-model="form.remark" type="textarea" :rows="3" placeholder="任务说明" disabled></el-input>
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
                                <div class="tips">IP 地址图</div>
                                <div class="upload" @click="checkPhotoFun('tmp1')">
                                    <span v-if="tmp1.uploadResult==='progress'" class="percent">{{tmp1.progress}}<i>%</i></span>
                                    <img :src="tmp1.imageUrl" alt="">
                                    <input type="file" ref="tmp1" name="multipartFiles" accept="image/*" @change="uploadPhotoFun('tmp1')">
                                </div>
                            </li>
                            <li>
                                <div class="tips">搜索图</div>
                                <div class="upload" @click="checkPhotoFun('tmp2')">
                                    <span v-if="tmp2.uploadResult==='progress'" class="percent">{{tmp2.progress}}<i>%</i></span>
                                    <img :src="tmp2.imageUrl" alt="">
                                    <input type="file" ref="tmp2" name="multipartFiles" accept="image/*" @change="uploadPhotoFun('tmp2')">
                                </div>
                            </li>
                            <li>
                                <div class="tips">对比图一</div>
                                <div class="upload" @click="checkPhotoFun('tmp3')">
                                    <span v-if="tmp3.uploadResult==='progress'" class="percent">{{tmp3.progress}}<i>%</i></span>
                                    <img :src="tmp3.imageUrl" alt="">
                                    <input type="file" ref="tmp3" name="multipartFiles" accept="image/*" @change="uploadPhotoFun('tmp3')">
                                </div>
                            </li>
                        </ul>
                        <ul class="tmp-list">
                            <li>
                                <div class="tips">对比图二</div>
                                <div class="upload" @click="checkPhotoFun('tmp4')">
                                    <span v-if="tmp4.uploadResult==='progress'" class="percent">{{tmp4.progress}}<i>%</i></span>
                                    <img :src="tmp4.imageUrl" alt="">
                                    <input type="file" ref="tmp4" name="multipartFiles" accept="image/*" @change="uploadPhotoFun('tmp4')">
                                </div>
                            </li>
                            <li>
                                <div class="tips">对比图三</div>
                                <div class="upload" @click="checkPhotoFun('tmp5')">
                                    <span v-if="tmp5.uploadResult==='progress'" class="percent">{{tmp5.progress}}<i>%</i></span>
                                    <img :src="tmp5.imageUrl" alt="">
                                    <input type="file" ref="tmp5" name="multipartFiles" accept="image/*" @change="uploadPhotoFun('tmp5')">
                                </div>
                            </li>
                            <li>
                                <div class="tips">入店图</div>
                                <div class="upload" @click="checkPhotoFun('tmp6')">
                                    <span v-if="tmp6.uploadResult==='progress'" class="percent">{{tmp6.progress}}<i>%</i></span>
                                    <img :src="tmp6.imageUrl" alt="">
                                    <input type="file" ref="tmp6" name="multipartFiles" accept="image/*" @change="uploadPhotoFun('tmp6')">
                                </div>
                            </li>
                        </ul>
                        <ul class="tmp-list">
                            <li>
                                <div class="tips">查看评价图</div>
                                <div class="upload" @click="checkPhotoFun('tmp7')">
                                    <span v-if="tmp7.uploadResult==='progress'" class="percent">{{tmp7.progress}}<i>%</i></span>
                                    <img :src="tmp7.imageUrl" alt="">
                                    <input type="file" ref="tmp7" name="multipartFiles" accept="image/*" @change="uploadPhotoFun('tmp7')">
                                </div>
                            </li>
                            <li>
                                <div class="tips">查看买家秀图</div>
                                <div class="upload" @click="checkPhotoFun('tmp8')">
                                    <span v-if="tmp8.uploadResult==='progress'" class="percent">{{tmp8.progress}}<i>%</i></span>
                                    <img :src="tmp8.imageUrl" alt="">
                                    <input type="file" ref="tmp8" name="multipartFiles" accept="image/*" @change="uploadPhotoFun('tmp8')">
                                </div>
                            </li>
                            <li>
                                <div class="tips">详情页面图</div>
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
            isShow: false
        };
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
            if (this.userOrder && this.userOrder.buyBackType === 1) {
                if (!this.form.favoriteAttentionUrl) {
                    // $.toast('请上传我的收藏图');
                    // return;
                    this.form.hasSubmit = 0;
                }
            }
            if (this.userOrder && this.userOrder.buyBackType === 2) {
                if (!this.form.favoriteAttentionEntershopUrl) {
                    // $.toast('请上传关注店铺图');
                    // return;
                    this.form.hasSubmit = 0;
                }
            }
            if (this.userOrder && this.userOrder.needAlitm === 1) {
                if (!this.form.chatUrl) {
                    // $.toast('请上传咨询图');
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
