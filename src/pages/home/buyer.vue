<!--
* @moduleName: 商家首页
* @Author: weiberzeng
* @Date:   2018-04-24 15:46:18
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-06-11 23:15:22
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
    <!-- <div class="topTips warning"><i class="icon-warning"></i>重要通知：关于对某某账户的违规操作处理。</div> -->
    <bottomBar></bottomBar>
    <div class="content">
        <!-- 商家首页 -->
        <div class="description">建立当天活动功能介绍
            <br> （1）让精准标签的人参与当天的活动形成精准标签，有效成交带来更多符合精准人群的展现和流量
            <br> （2）配合模特试客回购活动，实现让模特试客1 5天后回购，从而打散轨迹，拒绝批量化行为
            <br> （3）模特试客会默认提交产品测评图片费用，如需高质量测评图片，请在左侧菜单栏点击［返客秀］
        </div>
        <div class="main-box">
            <div class="box-hd">
                <span class="text">选择模板</span></div>
            <div class="box-bd">
                <ul class="tmpl-list clearfix" v-if="templateTotal>0">
                    <li class="item active">
                        <div class="inner">
                            <div class="img-wrap">
                                <img src="/static/demo/demo.jpg" alt="">
                            </div>
                            <div class="name">曼秀雷敦（Menthonlatum）新碧清透防晒乳 水凝乳 50…</div>
                            <div class="ctrl">
                                <span class="money"><i>￥</i>398</span>
                                <a href="javascipt:;"><i class="icon-more"></i></a>
                            </div>
                            <span class="checkbox is-checked"></span>
                        </div>
                        <div class="mask">
                            <a href="javascipt:;" class="edit-btn">编辑</a>
                            <a href="javascipt:;" class="del-btn">删除</a>
                        </div>
                    </li>
                    <li class="item">
                        <div class="inner">
                            <div class="img-wrap">
                                <img src="/static/demo/demo.jpg" alt="">
                            </div>
                            <div class="name">曼秀雷敦（Menthonlatum）新碧清透防晒乳 水凝乳 50…</div>
                            <div class="ctrl">
                                <span class="money"><i>￥</i>398</span>
                                <a href="javascipt:;"><i class="icon-more"></i></a>
                            </div>
                            <span class="checkbox"></span>
                        </div>
                        <div class="mask">
                            <a href="javascipt:;" class="edit-btn">编辑</a>
                            <a href="javascipt:;" class="del-btn">删除</a>
                        </div>
                    </li>
                    <li class="item">
                        <div class="inner">
                            <div class="img-wrap">
                                <img src="/static/demo/demo.jpg" alt="">
                            </div>
                            <div class="name">曼秀雷敦（Menthonlatum）新碧清透防晒乳 水凝乳 50…</div>
                            <div class="ctrl">
                                <span class="money"><i>￥</i>398</span>
                                <a href="javascipt:;"><i class="icon-more"></i></a>
                            </div>
                            <span class="checkbox is-checked"></span>
                        </div>
                        <div class="mask">
                            <a href="javascipt:;" class="edit-btn">编辑</a>
                            <a href="javascipt:;" class="del-btn">删除</a>
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
                                        <el-radio-group v-model="radio2">
                                            <el-radio :label="3">不限</el-radio>
                                            <el-radio :label="6">男</el-radio>
                                            <el-radio :label="9">女</el-radio>
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
                        <div class="clearfix">
                            <template v-for="(city,index) in cities" v-if="index<=21">
                                    <el-checkbox :label="city" :key="city">{{city}}</el-checkbox>
                                </template>
                        </div>
                        <div class="clearfix half">
                            <template v-for="(city,index) in cities" v-if="index>21&&index<=25">
                                    <el-checkbox :label="city" :key="city">{{city}}</el-checkbox>
                                </template>
                        </div>
                        <div class="clearfix all">
                            <template v-for="(city,index) in cities" v-if="index===26">
                                    <el-checkbox :label="city" :key="city">{{city}}</el-checkbox>
                                </template>
                        </div>
                        <div class="clearfix">
                            <template v-for="(city,index) in cities" v-if="index>26&&index<=30">
                                    <el-checkbox :label="city" :key="city">{{city}}</el-checkbox>
                                </template>
                        </div>
                        <div class="clearfix">
                            <template v-for="(city,index) in cities" v-if="index>30">
                                    <el-checkbox :label="city" :key="city">{{city}}</el-checkbox>
                                </template>
                        </div>
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
                                        <input type="text" placeholder="请输入订单数量">
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="item-content">
                                <div class="item-inner">
                                    <div class="item-title label">任务有效期</div>
                                    <div class="item-input">
                                        <input type="text" placeholder="请输入任务有效期">
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
                        <li>
                            <div class="item-content">
                                <div class="item-inner">
                                    <div class="item-input">
                                        <textarea placeholder="任务说明"></textarea>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import bottomBar from '@/components/bottomBar';
// 城市列表
const cityOptions = ['河北', '山西', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '海南', '四川', '贵州', '云南', '陕西', '甘肃', '青海', '内蒙古自治区', '广西壮族自治区', '西藏自治区', '宁夏回族自治区', '新疆维吾尔族自治区', '北京', '天津', '上海', '重庆', '香港', '澳门'];

export default {
    name: 'homeBuyer',
    data() {
        return {
            checkAll: false,
            checkedCities: [],
            cities: cityOptions,
            isIndeterminate: true,
            radio2: 3,
            templateData: [],
            templateTotal: 0
        };
    },
    created() {
        this.getTemplateFun();
    },
    methods: {
        /**
         * @Author      weiberZeng
         * @DateTime    2018-06-11
         * @lastTime    2018-06-11
         * @description 选择不限城市
         */
        handleCheckAllChange(val) {
            this.checkedCities = val ? cityOptions : [];
            this.isIndeterminate = false;
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-06-11
         * @lastTime    2018-06-11
         * @description 选择单个城市
         */
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-06-11
         * @lastTime    2018-06-11
         * @description 获取模板列表
         */
        getTemplateFun() {
            this.$http.get('/tasktemplate/list', {
                params: {
                    pageIndex: 1,
                    pageSize: 10
                }
            }).then((response) => {
                if (response.data.success) {
                    this.templateData = response.data.data.list;
                    this.templateTotal = response.data.data.total;
                }
            });
        }
    },
    components: {
        bottomBar
    }
};
</script>
