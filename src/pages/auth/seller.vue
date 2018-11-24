<!--
* @moduleName: 刷手认证
* @Author: weiberzeng
* @Date:   2018-04-25 14:35:32
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-11-24 13:54:56
-->
<template>
    <div class="page page-current">
        <header class="bar bar-nav">
            <router-link to="/uc/default" class="button button-link button-nav pull-left"><span class="icon icon-left"></span></router-link>
            <h1 class="title">刷手认证</h1>
        </header>
        <div class="content" ref="content">
            <div class="description">(1)本平台是基于亲友所搭建的一个互助平台，不以盈利为目的，不收取任何保证金！
                <br> (2)在本平台做任务，每个月能赚300-400元，不像网络骗局所说的月入上万！
                <br> (3)请确保信息真实有效，确保审核通过。
            </div>
            <div class="main-box">
                <div class="box-bd">
                    <div class="list-block">
                        <ul class="thinForm">
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label">性别</div>
                                        <div class="item-input">
                                            <el-radio-group v-model="form.sex" :disabled="isAudit">
                                                <el-radio label="male">男</el-radio>
                                                <el-radio label="female">女</el-radio>
                                            </el-radio-group>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label">IP地址</div>
                                        <div class="item-input">
                                            <input @input="inputHandleFun" type="text" :disabled="isAudit" v-model="form.ip" maxlength="15" placeholder="请输入真实 IP" autofocus>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li v-if="!isAudit">
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label">所在地区</div>
                                        <div class="item-input">
                                            <myCityPick v-model="cityArray" @change="setCityFun"></myCityPick>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label">收货地址</div>
                                        <div class="item-input">
                                            <input @input="inputHandleFun" type="text" :disabled="isAudit" v-model="form.address" placeholder="请输入详细地址">
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label">淘宝会员名</div>
                                        <div class="item-input">
                                            <input @input="inputHandleFun" type="text" :disabled="isAudit" v-model="form.taobaoAccount" placeholder="请输入淘宝会员名">
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="main-box">
                <div class="box-bd">
                    <ul class="seller-upload-list">
                        <li class="upload-item">
                            <div class="hd">IP地址查询截图</div>
                            <div class="bd">
                                <div class="left">
                                    <div class="upload" @click="checkPhotoFun('ipUpload')">
                                        <span v-if="ipUpload.uploadResult==='progress'" class="percent">{{ipUpload.progress}}<i>%</i></span>
                                        <img :src="ipUpload.imageUrl" alt="">
                                        <input type="file" ref="ipUpload" name="multipartFiles" accept="image/*" @change="uploadPhotoFun('ipUpload')">
                                    </div>
                                    <span class="tips">*百度搜索 IP，就能搜索到你的 IP</span>
                                </div>
                                <div class="right">
                                    <span>拍摄示例</span>
                                    <div class="eg">
                                        <img src="/static/image/eg1.png" alt="">
                                    </div>
                                    </div>
                                </div>
                        </li>
                        <li class="upload-item">
                            <div class="hd">我的淘宝页面截图</div>
                            <div class="bd">
                                <div class="left">
                                    <div class="upload" @click="checkPhotoFun('tbUpload')">
                                        <span v-if="tbUpload.uploadResult==='progress'" class="percent">{{tbUpload.progress}}<i>%</i></span>
                                        <img :src="tbUpload.imageUrl" alt="">
                                        <input type="file" ref="tbUpload" name="multipartFiles" accept="image/*" @change="uploadPhotoFun('tbUpload')">
                                    </div>
                                </div>
                                <div class="right">
                                    <span>拍摄示例</span>
                                    <div class="eg">
                                        <img src="/static/image/eg2.png" alt="">
                                    </div>
                                    </div>
                                </div>
                        </li>
                        <li class="upload-item">
                            <div class="hd">淘宝个人资料截图</div>
                            <div class="bd">
                                <div class="left">
                                    <div class="upload" @click="checkPhotoFun('zfbUpload')">
                                        <span v-if="zfbUpload.uploadResult==='progress'" class="percent">{{zfbUpload.progress}}<i>%</i></span>
                                        <img :src="zfbUpload.imageUrl" alt="">
                                        <input type="file" ref="zfbUpload" name="multipartFiles" accept="image/*" @change="uploadPhotoFun('zfbUpload')">
                                    </div>
                                </div>
                                <div class="right">
                                    <span>拍摄示例</span>
                                    <div class="eg">
                                        <img src="/static/image/eg3.png" alt="">
                                    </div>
                                    </div>
                                </div>
                        </li>
                    </ul>
                </div>
                <div class="submit-wrap">
                    <a href="javascript:;" @click.stop="submitFun" class="button button-big button-fill" v-if="!isAudit">提交刷手认证</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import upload from '@/javascript/upload';
import {
    validateRequire
} from '@/javascript/utils';
let $ = window.$;
export default {
    name: 'authSeller',
    data() {
        return {
            cityArray: [],
            form: {
                id: '',
                sex: 'male',
                ip: '',
                provnce: '',
                city: '',
                address: '',
                taobaoAccount: '',
                ipScreenshotUrl: '',
                taobaoScreenshotUrl: '',
                alipayScreenshotUrl: ''
            },
            ipUpload: {
                imageUrl: '/static/image/ip-bg.png',
                uploadResult: 'wait',
                progress: '0'
            },
            tbUpload: {
                imageUrl: '/static/image/tb-bg.png',
                uploadResult: 'wait',
                progress: '0'
            },
            zfbUpload: {
                imageUrl: '/static/image/zfb-bg.png',
                uploadResult: 'wait',
                progress: '0'
            },
            isAudit: false,
            validate: {
                ip: false,
                address: false,
                taobaoAccount: false,
                ipScreenshotUrl: false,
                taobaoScreenshotUrl: false,
                alipayScreenshotUrl: false
            }
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
    watch: {
        'form.ip': 'validateIp',
        'form.address': 'validateAddress',
        'form.taobaoAccount': 'validateTaobaoAccount',
        'form.ipScreenshotUrl': 'validateIpScreenshotUrl',
        'form.taobaoScreenshotUrl': 'validateTaobaoScreenshotUrl',
        'form.alipayScreenshotUrl': 'validateAlipayScreenshotUrl'
    },
    created() {
        if (this.userInfo.ip) {
            this.isAudit = true;
        }
        for (let i in this.form) {
            switch (i) {
                case 'sex':
                    if (this.userInfo[i]) { this.form[i] = this.userInfo[i]; }
                    break;
                default:
                    this.form[i] = this.userInfo[i] || this.userCert[i] || '';
                    break;
            }
        }
        if (this.form.ipScreenshotUrl) {
            this.ipUpload.imageUrl = this.form.ipScreenshotUrl;
        }
        if (this.form.taobaoScreenshotUrl) {
            this.tbUpload.imageUrl = this.form.taobaoScreenshotUrl;
        }
        if (this.form.alipayScreenshotUrl) {
            this.zfbUpload.imageUrl = this.form.alipayScreenshotUrl;
        }
    },
    methods: {
        validateIp(to, from) {
            this.validate.ip = validateRequire(to, from);
        },
        validateAddress(to, from) {
            this.validate.address = validateRequire(to, from);
        },
        validateTaobaoAccount(to, from) {
            this.validate.taobaoAccount = validateRequire(to, from);
        },
        validateIpScreenshotUrl(to, from) {
            this.validate.ipScreenshotUrl = validateRequire(to, from);
        },
        validateTaobaoScreenshotUrl(to, from) {
            this.validate.taobaoScreenshotUrl = validateRequire(to, from);
        },
        validateAlipayScreenshotUrl(to, from) {
            this.validate.alipayScreenshotUrl = validateRequire(to, from);
        },
        inputHandleFun() {
            this.$refs['content'].scrollTop = this.$refs['content'].scrollTop + 1;
            this.$nextTick(() => {
                this.$refs['content'].scrollTop = this.$refs['content'].scrollTop - 1;
            });
        },
        /**
         * @Author      weiberZeng
         * @DateTime    2018-06-07
         * @lastTime    2018-06-07
         * @description 选择图片
         */
        checkPhotoFun(name) {
            if (this.isAudit) return;

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
                            case 'ipUpload':
                                _that.form.ipScreenshotUrl = response.data.visitUrls[0].fileUrl;
                                break;
                            case 'tbUpload':
                                _that.form.taobaoScreenshotUrl = response.data.visitUrls[0].fileUrl;
                                break;
                            case 'zfbUpload':
                                _that.form.alipayScreenshotUrl = response.data.visitUrls[0].fileUrl;
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
         * @description 设置省份和城市
         */
        setCityFun(val) {
            this.form.provnce = val[0] || '';
            this.form.city = val[1] || '';
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-06-27
         * @lastTime    2018-06-27
         * @description 提交认证
         */
        submitFun() {
            if (!this.validate.ip) {
                $.toast('请输入正确的IP 地址！');
                return;
            }
            if (!this.validate.address) {
                $.toast('请输入正确的收货地址！');
                return;
            }
            if (!this.validate.taobaoAccount) {
                $.toast('请输入正确的淘宝会员名！');
                return;
            }
            if (!this.validate.ipScreenshotUrl) {
                $.toast('请上传 IP 地址截图！');
                return;
            }
            if (!this.validate.taobaoScreenshotUrl) {
                $.toast('请上传我的淘宝页面截图！');
                return;
            }
            if (!this.validate.alipayScreenshotUrl) {
                $.toast('请上传支付宝截图！');
                return;
            }
            $.showPreloader();
            this.$http.post('/cert/brushhandAddOrUpdate', this.form).then((response) => {
                $.hidePreloader();
                if (response.data.success) {
                    $.toast('保存成功！');
                    let _that = this;
                    setTimeout(() => {
                        _that.$router.replace({
                            path: '/uc'
                        });
                    }, 500);
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
