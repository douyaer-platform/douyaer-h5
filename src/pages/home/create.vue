<!--
* @moduleName: 商家-创建模板
* @Author: weiberzeng
* @Date:   2018-04-24 15:46:18
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-06-12 20:48:08
-->
<template>
<div class="page page-current">
    <header class="bar bar-nav">
        <router-link to="/home/buyer" class="button button-link button-nav pull-left"><span class="icon icon-left"></span></router-link>
        <h1 class="title">创建模板</h1>
    </header>
    <div class="footer-submit">
        <div class="tips">
            <div class="main">
                此模板将消耗金币 <span class="money"> <span class="unit">￥</span> 398</span>
            </div>
            <div class="sub">
                另需平台服务费￥2
            </div>
        </div>
        <div class="submit">
            <a href="javascipt:;" @click.stop="submitFun">确定保存</a>
        </div>
    </div>
    <div class="content">
        <!-- 创建 -->
        <div class="description">商家发起互助注意事项
            <br> 违规及处罚方式：
            <br> （1）一个身份证，一个IP只能在本平台注册一个帐号，一个帐号只能绑定一个淘宝店铺。
            <br> （2）发布互助时只能发布帐号绑定的店铺宝贝，违规者直接拉黑。
            <br> （3）本平台的刷手都是各位商家自己邀请的亲朋好友，并不是专业的刷手，希望大家发起互助时友好对待。
            <br> （4）本平台严禁发红包合虚假单号，发包的最低标准是一瓶未开启的矿泉水，包的重量控制在500g内
            <br> （5）邀请好友互助时，一定把握好被邀请者的人品，本平台是非盈利机构
        </div>
        <div class="main-box mt10">
            <div class="box-bd">
                <div class="list-block">
                    <ul class="thinForm">
                        <li>
                            <div class="item-content">
                                <div class="item-inner">
                                    <div class="item-title label">店铺名称</div>
                                    <div class="item-input">
                                        <el-input v-model="form.storeName" placeholder="请输入店铺名称" autofocus></el-input>
                                    </div>
                                    <!-- <div class="newUser">最近300000人成交</div> -->
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="item-content">
                                <div class="item-inner">
                                    <div class="item-title label">宝贝链接</div>
                                    <div class="item-input">
                                        <el-input v-model="form.goodsUrl" placeholder="请填写正确的宝贝链接"></el-input>
                                    </div>
                                </div>
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
                            <div class="tips">
                                <span class="red">*</span> 主图
                            </div>
                            <div class="upload" @click="checkPhotoFun('tmp1')">
                                <span v-if="tmp1.uploadResult==='progress'" class="percent">{{tmp1.progress}}<i>%</i></span>
                                <img :src="tmp1.imageUrl" alt="">
                                <input type="file" ref="tmp1" name="multipartFiles" accept="image/*" @change="uploadPhotoFun('tmp1')">
                            </div>
                        </li>
                        <li>
                            <div class="tips">
                                <span class="red">*</span> 搜索截图
                            </div>
                            <div class="upload" @click="checkPhotoFun('tmp2')">
                                <span v-if="tmp2.uploadResult==='progress'" class="percent">{{tmp2.progress}}<i>%</i></span>
                                <img :src="tmp2.imageUrl" alt="">
                                <input type="file" ref="tmp2" name="multipartFiles" accept="image/*" @change="uploadPhotoFun('tmp2')">
                            </div>
                        </li>
                        <li>
                            <div class="tips">
                                <span class="red">*</span> 卡条件截图
                            </div>
                            <div class="upload" @click="checkPhotoFun('tmp3')">
                                <span v-if="tmp3.uploadResult==='progress'" class="percent">{{tmp3.progress}}<i>%</i></span>
                                <img :src="tmp3.imageUrl" alt="">
                                <input type="file" ref="tmp3" name="multipartFiles" accept="image/*" @change="uploadPhotoFun('tmp3')">
                            </div>
                        </li>
                    </ul>
                    <div class="des">建议尺寸800*800</div>
                </div>
            </div>
        </div>
        <div class="main-box">
            <div class="box-bd">
                <div class="list-block">
                    <ul>
                        <li>
                            <div class="item-content">
                                <div class="item-inner">
                                    <div class="item-title label" style="width:7.5rem">产品价格 <span class="sub">(包含运费)</span><span class="red">*</span></div>
                                    <div class="item-input">
                                        <el-input v-model="form.goodsPrice" placeholder="请输入价格"></el-input>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="item-content">
                                <div class="item-inner noflex">
                                    <div class="item-title label">搜索关键词<span class="red">*</span></div>
                                    <div class="item-input">
                                        <el-input v-model="tags[0]" placeholder="请输入关键词1 如 女鞋"></el-input>
                                    </div>
                                    <div class="item-input">
                                        <el-input v-model="tags[1]" placeholder="请输入关键词2 如 尖头鞋"></el-input>
                                    </div>
                                    <div class="item-input">
                                        <el-input v-model="tags[2]" placeholder="请输入关键词3"></el-input>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="item-content">
                                <div class="item-inner noflex">
                                    <div class="item-title label">回购类型</div>
                                    <div class="item-input">
                                        <el-radio-group v-model="form.buyBackType">
                                            <el-radio :label="0">无需回购</el-radio>
                                            <el-radio :label="1">加收藏后3-5内回购，费用＋5</el-radio>
                                            <el-radio :label="2">关注店铺后6-10内回购，费用＋6</el-radio>
                                        </el-radio-group>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="item-content">
                                <div class="item-inner noflex">
                                    <div class="item-title label" style="width:100%">是否需要假聊</div>
                                    <div class="item-input">
                                        <el-radio-group v-model="form.needAlitm">
                                            <el-radio :label="0">不需要</el-radio>
                                            <el-radio :label="1">旺旺咨询，费用＋1</el-radio>
                                        </el-radio-group>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <br>
    </div>
</div>
</template>
<script>
import upload from '@/javascript/upload';
let $ = window.$;
export default {
    name: 'homeCreate',
    data() {
        return {
            tags: [],
            form: {
                storeName: '',
                goodsUrl: '',
                goodsPicUrl: '',
                searchPicUrl: '',
                conditionPicUrl: '',
                goodsPrice: '',
                tags: '',
                buyBackType: 0,
                needAlitm: 0
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
            }
        };
    },
    created() {

    },
    methods: {
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
                                _that.form.goodsPicUrl = response.data.visitUrls[0].fileUrl;
                                break;
                            case 'tmp2':
                                _that.form.searchPicUrl = response.data.visitUrls[0].fileUrl;
                                break;
                            case 'tmp3':
                                _that.form.conditionPicUrl = response.data.visitUrls[0].fileUrl;
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
         * @DateTime    2018-06-27
         * @lastTime    2018-06-27
         * @description 提交认证
         */
        submitFun() {
            let tags = [];
            for (var i = 0; i < this.tags.length; i++) {
                if (this.tags[i]) {
                    tags.push(this.tags[i]);
                }
            }
            this.form.tags = tags.join(',');

            $.showPreloader();
            this.$http.post('/tasktemplate/add', this.form).then((response) => {
                $.hidePreloader();
                if (response.data.success) {
                    $.toast('保存成功！');
                } else {
                    $.alert(response.data.message);
                }
            }).catch(() => {
                $.hidePreloader();
            });
        }
    },
    components: {}
};
</script>
