<!--
* @moduleName: 商家认证
* @Author: weiberzeng
* @Date:   2018-04-25 14:35:39
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-10-13 23:07:45
-->
<template>
    <div class="page page-current">
        <header class="bar bar-nav">
            <router-link to="/uc/default" class="button button-link button-nav pull-left"><span class="icon icon-left"></span></router-link>
            <h1 class="title">商家认证</h1>
        </header>
        <div class="content">
            <div class="description">(1)本平台是基于亲友所搭建的一个互助平台，不以盈利为目的，不收取任何保证金！
                <br>(2)每个人只能注册一个帐号，每个帐号智能绑定一个淘宝店铺，只能发布绑定淘宝店铺的宝贝，如有违反，一律封号处理。
                <br>(3)请确保信息真实有效，确保审核通过。</div>
            <div class="main-box">
                <div class="box-bd">
                    <div class="list-block">
                        <ul class="thinForm">
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label">姓名</div>
                                        <div class="item-input">
                                            <input type="text" :disabled="isAudit" v-model="form.realName" placeholder="请输入真实姓名" autofocus>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label">身份证号</div>
                                        <div class="item-input">
                                            <input type="text" :disabled="isAudit" v-model="form.identifyNo" maxlength="18" placeholder="请输入身份证号">
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label">旺旺名</div>
                                        <div class="item-input">
                                            <input type="text" :disabled="isAudit" v-model="form.alitm" placeholder="请输入旺旺名">
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label">店铺名称</div>
                                        <div class="item-input">
                                            <input type="text" :disabled="isAudit" v-model="form.taobaoAccount" placeholder="请输入淘宝账号">
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label">店铺链接</div>
                                        <div class="item-input">
                                            <input type="text" :disabled="isAudit" v-model="form.storeUrl" placeholder="请输入店铺链接">
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="main-box">
                <div class="box-hd"><span class="text">上传身份证</span></div>
                <div class="box-bd">
                    <div class="id-upload">
                        <div class="text">身份证正面</div>
                        <div class="inner">
                            <div class="upload" @click="checkPhotoFun('idPhoto')">
                                <span v-if="uploadResult==='progress'" class="percent">{{progress}}<i>%</i></span>
                                <img :src="imageUrl" alt="">
                                <input type="file" ref="idPhoto" name="multipartFiles" accept="image/*" @change="uploadPhotoFun('idPhoto')">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="submit-wrap" v-if="!isAudit">
                    <a href="javascript:;" @click.stop="submitFun" class="button button-big button-fill">提交商家认证</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import upload from '@/javascript/upload';
let $ = window.$;
export default {
    name: 'authbuyer',
    data() {
        return {
            imageUrl: '/static/image/id-bg.png',
            uploadResult: 'wait',
            progress: '0',
            form: {
                id: '',
                realName: '',
                identifyNo: '',
                taobaoAccount: '',
                alitm: '',
                storeUrl: '',
                identifyNoUrl: ''
            },
            isAudit: false
        };
    },
    computed: {
        userInfo() {
            return this.$store.state.userInfo;
        }
    },
    created() {
        for (let i in this.form) {
            this.form[i] = this.userInfo[i] || '';
        }
        if (this.form.identifyNoUrl) {
            this.imageUrl = this.form.identifyNoUrl;
        }

        if (this.form.realName) {
            this.isAudit = true;
        }
    },
    methods: {
        /**
         * @Author      weiberZeng
         * @DateTime    2018-06-07
         * @lastTime    2018-06-07
         * @description 选择图片
         */
        checkPhotoFun(name) {
            if (this.isAudit) return;

            if (this.uploadResult === 'success' || this.uploadResult === 'wait') {
                this.$refs[name].dispatchEvent(new MouseEvent('click'));
            } else if (this.uploadResult === 'progress') {
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
            this.imageUrl = URL.createObjectURL(file);
            // 上传文件
            upload({
                action: '/douyaer-api/file/upload',
                filename: 'multipartFiles',
                file: file,
                onSuccess(response) {
                    if (response.success) {
                        _that.uploadResult = 'success';
                        _that.form.identifyNoUrl = response.data.visitUrls[0].fileUrl;
                        $.toast('上传成功！');
                    } else {
                        _that.uploadResult = 'fail';
                        $.toast(response.message);
                    }
                },
                onProgress(progress) {
                    _that.uploadResult = 'progress';
                    _that.progress = parseInt(progress.percent);
                },
                onError(e) {
                    _that.uploadResult = 'fail';
                    $.toast('服务器错误！');
                }
            });
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-06-06
         * @lastTime    2018-06-06
         * @description 提交商家认证
         */
        submitFun() {
            $.showPreloader();
            this.$http.post('/cert/businessAddOrUpdate', this.form).then((response) => {
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
