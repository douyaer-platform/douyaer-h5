<!--
* @moduleName: 商家-创建模板
* @Author: weiberzeng
* @Date:   2018-04-24 15:46:18
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-09-28 17:08:52
-->
<template>
    <div class="page page-current">
        <header class="bar bar-nav">
            <router-link to="/home/buyer" class="button button-link button-nav pull-left"><span class="icon icon-left"></span></router-link>
            <h1 class="title">{{title}}</h1>
        </header>
        <div class="footer-submit">
            <div class="tips">
                <div class="main">
                    此模板将消耗金币 <span class="money"> <span class="unit">￥</span> {{templatePrice}}</span>
                </div>
                <div class="sub">
                    另需平台服务费￥2
                </div>
            </div>
            <div class="submit">
                <a href="javascript:;" @click.stop="submitFun">确定保存</a>
            </div>
        </div>
        <div class="content">
            <!-- 创建 -->
            <div class="description" v-html="text"></div>
            <div class="main-box mt10">
                <div class="box-bd">
                    <div class="list-block">
                        <ul class="thinForm">
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label">店铺名称</div>
                                        <div class="item-input">
                                            {{userInfo.taobaoAccount||'--'}}
                                        </div>
                                        <!-- <div class="newUser">最近300000人成交</div> -->
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label">宝贝名称</div>
                                        <div class="item-input">
                                            <input v-model="form.storeName" placeholder="请输入宝贝名称" autofocus>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label">宝贝链接</div>
                                        <div class="item-input">
                                            <input type="url" v-model="form.goodsUrl" placeholder="请填写正确的宝贝链接">
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
                                <div class="tips">搜索截图</div>
                                <div class="upload" @click="checkPhotoFun('tmp2')">
                                    <span v-if="tmp2.uploadResult==='progress'" class="percent">{{tmp2.progress}}<i>%</i></span>
                                    <img :src="tmp2.imageUrl" alt="">
                                    <input type="file" ref="tmp2" name="multipartFiles" accept="image/*" @change="uploadPhotoFun('tmp2')">
                                </div>
                            </li>
                            <li>
                                <div class="tips"> 卡条件截图</div>
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
                                            <input type="number" v-model="form.goodsPrice" placeholder="请输入价格">
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="item-content">
                                    <div class="item-inner noflex">
                                        <div class="item-title label">搜索关键词<span class="red">*</span></div>
                                        <div class="item-input">
                                            <input v-model="tags[0]" placeholder="请输入关键词1 如 女鞋">
                                        </div>
                                        <div class="item-input">
                                            <input v-model="tags[1]" placeholder="请输入关键词2 如 尖头鞋">
                                        </div>
                                        <div class="item-input">
                                            <input v-model="tags[2]" placeholder="请输入关键词3">
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
                                                <el-radio :label="1">加购物车后3-5内回购，费用＋2</el-radio>
                                                <el-radio :label="2">手淘首页回购，费用＋6</el-radio>
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
import {
    validateNumber,
    validateRequire
} from '@/javascript/utils';
let $ = window.$;
export default {
    name: 'homeCreate',
    data() {
        return {
            title: '创建模板',
            tags: [],
            templatePrice: 0,
            form: {
                templateId: '',
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
            },
            validate: {
                storeName: false,
                goodsUrl: false,
                goodsPrice: false,
                goodsPicUrl: false
            },
            text: window.config.mark.home.t3
        };
    },
    computed: {
        userInfo() {
            return this.$store.state.userInfo;
        },
        userCert() {
            return this.$store.state.userCert || {};
        }
    },
    created() {
        if (this.$route.name === 'homeModify') {
            let id = this.$route.params.id;
            this.title = '修改模板';
            this.getDetailFun(id);
        }
    },
    watch: {
        'form.goodsPrice': function(to, from) {
            this.validateGoodsPrice(to, from);
            this.getFeeFun(to, from);
        },
        'form.buyBackType': 'getFeeFun',
        'form.needAlitm': 'getFeeFun',
        'form.storeName': 'validateStoreName',
        'form.goodsUrl': 'validateGoodsUrl',
        'form.goodsPicUrl': 'validateGoodsPicUrl'
    },
    methods: {
        // 校验店铺名称
        validateStoreName(to, from) {
            this.validate.storeName = validateRequire(to, from);
        },
        // 校验宝贝链接
        validateGoodsUrl(to, from) {
            this.validate.goodsUrl = validateRequire(to, from);
        },
        // 校验宝贝价格
        validateGoodsPrice(to, from) {
            this.validate.goodsPrice = validateNumber(to, from);
        },
        // 校验主图
        validateGoodsPicUrl(to, from) {
            this.validate.goodsPicUrl = validateRequire(to, from);
        },
        // 获取模板详情
        getDetailFun(id) {
            this.$http.get('/tasktemplate/get', {
                params: {
                    templateId: id
                }
            }).then((response) => {
                if (response.data.success) {
                    let data = response.data.data.taskTemplate;
                    for (let i in this.form) {
                        switch (i) {
                            case 'tags':
                                this.form[i] = data[i];
                                if (data[i]) {
                                    this.tags = data[i].split(',');
                                }
                                break;
                            case 'goodsPicUrl':
                                this.form[i] = data[i] || '';
                                if (data[i]) {
                                    this.tmp1.imageUrl = data[i];
                                }
                                break;
                            case 'searchPicUrl':
                                this.form[i] = data[i] || '';
                                if (data[i]) {
                                    this.tmp2.imageUrl = data[i];
                                }
                                break;
                            case 'conditionPicUrl':
                                this.form[i] = data[i] || '';
                                if (data[i]) {
                                    this.tmp3.imageUrl = data[i];
                                }
                                break;
                            default:
                                this.form[i] = data[i];
                                break;
                        }
                    }
                }
            });
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
         * @DateTime    2018-06-27
         * @lastTime    2018-06-27
         * @description 获取模板费用
         */
        getFeeFun(to, from) {
            if (!this.validate.goodsPrice) return;
            this.$http.get('/tasktemplate/queryPrice', {
                params: {
                    goodsPrice: this.form.goodsPrice,
                    buyBackType: this.form.buyBackType,
                    needAlitm: this.form.needAlitm
                }
            }).then((response) => {
                if (response.data.success) {
                    this.templatePrice = response.data.data.templatePrice;
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
            if (!this.validate.storeName) {
                $.toast('请输入正确的店铺名称！');
                return;
            }
            if (!this.validate.goodsUrl) {
                $.toast('请输入正确的宝贝链接！');
                return;
            }
            if (!this.validate.goodsPrice) {
                $.toast('请输入正确的产品价格！');
                return;
            }
            if (!this.validate.goodsPicUrl) {
                $.toast('请选择产品主图！');
                return;
            }

            let tags = [];
            for (var i = 0; i < this.tags.length; i++) {
                if (this.tags[i]) {
                    tags.push(this.tags[i]);
                }
            }
            this.form.tags = tags.join(',');

            if (!this.form.tags) {
                $.toast('请最少输入一个搜索关键词！');
                return;
            }

            let url;
            if (this.$route.name === 'homeModify') {
                url = '/tasktemplate/update';
            } else {
                url = '/tasktemplate/add';
            }

            this.$http.post(url, this.form).then((response) => {
                if (response.data.success) {
                    $.toast('保存成功！');
                    let _that = this;
                    setTimeout(() => {
                        _that.$router.replace({
                            path: '/home/buyer'
                        });
                    }, 500);
                } else {
                    $.alert(response.data.message);
                }
            });
        }
    },
    components: {}
};

</script>
