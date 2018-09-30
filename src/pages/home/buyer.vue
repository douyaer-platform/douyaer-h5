<!--
* @moduleName: 商家首页
* @Author: weiberzeng
* @Date:   2018-04-24 15:46:18
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-09-30 15:06:09
-->
<template>
    <div class="page page-current">
        <header class="bar bar-nav">
            <h1 class="title">首页</h1>
        </header>
        <div class="bar bar-header-secondary-home">
            <router-link to="/home/create">
                <span class="icon icon-home"></span>
                <span class="tab-label">创建模板</span>
            </router-link>
            <router-link to="/home/friend">
                <span class="icon icon-home"></span>
                <span class="tab-label">邀请好友</span>
            </router-link>
        </div>
        <div class="topTips warning" v-if="notices&&notices.length>0">
            <span class="notices-hd"><i class="icon-warning"></i></span>
            <div class="notices-wrap">
                <ul class="notices-list" ref="noticesList">
                    <li v-for="item in notices" :key="item.noticeId">{{item.content}}</li>
                </ul>
            </div>
        </div>
        <bottomBar></bottomBar>
        <div class="footer-submit">
            <div class="tips">
                <div class="one">
                    合计金额 <span class="money"> <span class="unit">￥</span> {{templatePrice*form.orderCount}}</span>
                </div>
            </div>
            <div class="submit">
                <a href="javascript:;" @click.stop="submitFun">确认放单</a>
            </div>
        </div>
        <div class="content">
            <!-- 商家首页 -->
            <div class="description" v-html="text"> </div>
            <div class="main-box">
                <div class="box-hd">
                    <span class="text">选择模板</span></div>
                <div class="box-bd">
                    <ul class="tmpl-list clearfix" v-if="templateTotal>0">
                        <li class="item" :key="item.templateId" :class="{active:item.showMore}" v-for="item in templateData">
                            <div class="inner" @click.stop="checkedFun(item)">
                                <div class="img-wrap">
                                    <img :src="item.goodsPicUrl" alt="">
                                </div>
                                <div class="name">{{item.storeName}}</div>
                                <div class="ctrl">
                                    <span class="money"><i>￥</i>{{item.goodsPrice}}</span>
                                    <a href="javascript:;" @click.stop="showMoreFun(item)"><i class="icon-more"></i></a>
                                </div>
                                <span class="checkbox" :class="{'is-checked':item.checked}"></span>
                            </div>
                            <div class="mask" @click.stop="item.showMore=false">
                                <a href="javascript:;" class="edit-btn" @click.stop="modifyTempFun(item)">编辑</a>
                                <a href="javascript:;" class="del-btn" @click.stop="delTempFun(item)">删除</a>
                            </div>
                        </li>
                    </ul>
                    <div class="no-tmpl" v-else>
                        <router-link to="/home/create">
                            <span class="icon"><i class="icon-addtmpl"></i></span>
                            <span class="text">尝试添加新的模板</span>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="main-box">
                <div class="box-hd">
                    <span class="text">选择刷手</span></div>
                <div class="box-bd">
                    <div class="list-block">
                        <ul>
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label">性别</div>
                                        <div class="item-input">
                                            <el-radio-group v-model="form.brushhandSex">
                                                <el-radio label="">不限</el-radio>
                                                <el-radio label="male">男</el-radio>
                                                <el-radio label="female">女</el-radio>
                                            </el-radio-group>
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
                    <span class="text">选择所在省份</span></div>
                <div class="box-bd">
                    <div class="list-block">
                        <ul>
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label">省市区范围</div>
                                        <div class="item-input">
                                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">不限</el-checkbox>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="province-wrap">
                        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                            <template v-for="item in citys">
                                <el-checkbox :label="item.id" :key="item.id">{{item.name}}</el-checkbox>
                            </template>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>
            <div class="main-box">
                <div class="box-hd">
                    <span class="text">任务属性</span></div>
                <div class="box-bd">
                    <div class="list-block">
                        <ul>
                            <li>
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label">订单数量</div>
                                        <div class="item-input">
                                            <input type="number" v-model="form.orderCount" placeholder="请输入订单数量" autofocus>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li class="multi">
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-title label">任务有效期</div>
                                        <div class="item-input">
                                            <input id="datetime-picker-start" type="text" placeholder="请输入任务起始时间">
                                            <input id="datetime-picker-end" type="text" placeholder="请输入任务终止时间">
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
                    <span class="text">任务说明</span></div>
                <div class="box-bd">
                    <div class="list-block">
                        <ul>
                            <li class="multi">
                                <div class="item-content">
                                    <div class="item-inner">
                                        <div class="item-input">
                                            <textarea v-model="form.remark" :rows="3" placeholder="任务说明"></textarea>
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
import {
    dateFormatter,
    validateNumber,
    validateRequire
} from '@/javascript/utils';
import bottomBar from '@/components/bottomBar';
let $ = window.$;
export default {
    name: 'homeBuyer',
    data() {
        return {
            checkAll: false,
            // 已选择城市
            checkedCities: [],
            // 城市列表
            citys: [],
            isIndeterminate: true,
            radio2: 3,
            templateData: [],
            templateTotal: 0,
            // 模板金币价格
            templatePrice: 0,
            form: {
                templateId: '',
                brushhandSex: '',
                provinces: '',
                orderCount: '',
                remark: '',
                startTime: '',
                endTime: ''
            },
            validate: {
                templateId: false,
                orderCount: false
            },
            text: window.config.mark.home.t1
        };
    },
    computed: {
        notices() {
            return this.$store.state.notices || [];
        }
    },
    watch: {
        'form.templateId': 'validateTemplateId',
        'form.orderCount': 'validateOrderCount',
        'form.startTime': 'validateStartTime',
        'form.endTime': 'validateEndTime',
        'notices': function(to, from) {
            if (to && to.length > 0 && this.$refs.noticesList) {
                this.showNoticesFun();
            }
        }
    },
    created() {
        this.getCitysFun();
        this.getTemplateFun();
    },
    mounted() {
        let _that = this;
        $('#datetime-picker-start').calendar({
            onClose: function(picker) {
                _that.form.startTime = dateFormatter(picker.value[0]);
            }
        });
        $('#datetime-picker-end').calendar({
            onClose: function(picker) {
                _that.form.endTime = dateFormatter(picker.value[0]);
            }
        });
        this.showNoticesFun();
    },
    methods: {
        /**
         * @Author      weiberZeng
         * @DateTime    2018-08-18
         * @lastTime    2018-08-18
         * @description 显示公告
         */
        showNoticesFun() {
            if (this.notices.length > 0) {
                let max = this.notices.length;
                let count = 0;
                let _that = this;
                let _setTopFun = function(count) {
                    if (count >= max) {
                        count = 0;
                    }
                    if (_that.$refs.noticesList) {
                        _that.$refs.noticesList.style.top = -count * 1.4 + 'rem';
                        count += 1;
                        setTimeout(function() {
                            _setTopFun(count);
                        }, 2500);
                    }
                };
                _setTopFun(count);
            }
        },

        // 校验是否选择模板
        validateTemplateId(to, from) {
            this.validate.templateId = validateRequire(to, from);
        },

        // 校验订单数量
        validateOrderCount(to, from) {
            this.validate.orderCount = validateNumber(to, from);
        },

        // 校验开始时间
        validateStartTime(to, from) {
            this.validate.startTime = validateRequire(to, from);
        },

        // 校验结束时间
        validateEndTime(to, from) {
            this.validate.endTime = validateRequire(to, from);
        },

        // 获取城市列表
        getCitysFun(id, type) {
            this.$http.get('/sys/listCitys').then((response) => {
                if (response.data.success) {
                    this.citys = response.data.data.citys;
                }
            });
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-06-11
         * @lastTime    2018-06-11
         * @description 选择不限城市
         */
        handleCheckAllChange(val) {
            let allCitys = [];
            for (let i in this.citys) {
                allCitys.push(this.citys[i].id);
            }
            this.checkedCities = val ? allCitys : [];
            this.isIndeterminate = false;
            this.form.provinces = '';
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-06-11
         * @lastTime    2018-06-11
         * @description 选择单个城市
         */
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.citys.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.citys.length;

            this.form.provinces = this.checkAll ? '' : this.checkedCities.join(',');
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-06-11
         * @lastTime    2018-06-11
         * @description 获取模板列表
         */
        getTemplateFun() {
            this.$http.get('/tasktemplate/list').then((response) => {
                if (response.data.success) {
                    let data = response.data.data.list;
                    for (let i in data) {
                        data[i].showMore = false;
                        data[i].checked = false;
                    }
                    this.templateData = data;
                    this.templateTotal = response.data.data.total;
                }
            });
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-06-11
         * @lastTime    2018-06-11
         * @description 显示更多
         */
        showMoreFun(item) {
            for (let i in this.templateData) {
                this.templateData[i].showMore = false;
            }
            item.showMore = true;
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-06-11
         * @lastTime    2018-06-11
         * @description 选择模板
         */
        checkedFun(item) {
            // 设置模板价格为选中模板价格
            this.templatePrice = item.templatePrice;

            for (let i in this.templateData) {
                this.templateData[i].checked = false;
            }
            item.checked = true;

            this.form.templateId = item.templateId;
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-06-11
         * @lastTime    2018-06-11
         * @description 删除模板
         */
        delTempFun(item) {
            this.$http.get('/tasktemplate/delete', {
                params: {
                    templateId: item.templateId
                }
            }).then((response) => {
                if (response.data.success) {
                    $.toast('删除成功！');
                    this.getTemplateFun();
                } else {
                    $.alert(response.data.message);
                }
            });
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-06-11
         * @lastTime    2018-06-11
         * @description 修改模板
         */
        modifyTempFun(item) {
            this.$router.replace({
                path: '/home/modify/' + item.templateId
            });
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-06-27
         * @lastTime    2018-06-27
         * @description 添加任务
         */
        submitFun() {
            if (!this.validate.templateId) {
                $.toast('请选择模板！');
                return;
            }
            if (!this.validate.orderCount) {
                $.toast('请填写正确订单数量！');
                return;
            }
            if (!this.validate.startTime) {
                $.toast('请选择开始时间！');
                return;
            }
            if (!this.validate.endTime) {
                $.toast('请选择结束时间！');
                return;
            }
            if (this.form.startTime >= this.form.endTime) {
                $.toast('结束时间必须大于开始时间！');
                return;
            }

            this.$http.post('/task/add', this.form).then((response) => {
                if (response.data.success) {
                    $.toast('保存成功！');
                    this.form.brushhandSex = '';
                    this.form.provinces = '';
                    this.form.orderCount = '';
                    this.form.remark = '';
                    this.form.startTime = '';
                    this.form.endTime = '';

                    $('#datetime-picker-start').val('');
                    $('#datetime-picker-end').val('');
                } else {
                    $.alert(response.data.message);
                }
            });
        }
    },
    components: {
        bottomBar
    }
};

</script>
