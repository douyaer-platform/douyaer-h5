<!--
* @moduleName: 商家订单
* @Author: weiberzeng
* @Date:   2018-04-25 14:35:39
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-09-20 14:46:48
-->
<template>
    <div class="page page-current">
        <header class="bar bar-nav">
            <h1 class="title">我的任务</h1>
        </header>
        <bottomBar></bottomBar>
        <div class="sub-tab">
            <ul>
                <li :class="{'active':status===0}" @click.stop="setTabFun(0)">进行中</li>
                <li :class="{'active':status===1}" @click.stop="setTabFun(1)">已结束</li>
            </ul>
        </div>
        <div class="content" v-on:scroll="onScroll">
            <div class="scroll">
                <div class="main-box" v-if="total>0">
                    <div class="box-bd">
                        <ul class="order-list">
                            <li v-for="item in listData" :key="item.taskId" class="item clearfix" @click.stop="getListFun(item.taskId)">
                                <div class="img-wrap">
                                    <img :src="item.goodsPicUrl" alt="">
                                </div>
                                <div class="inner">
                                    <div class="name">{{item.storeName}}</div>
                                    <div class="state">
                                        <span v-if="item.buyBackText">{{item.buyBackText}}</span>
                                        <span v-if="item.needAlitm==1">假聊</span>
                                        <span class="right">垫付</span>
                                    </div>
                                    <div class="money">
                                        <span>￥</span>{{item.goodsPrice}}
                                    </div>
                                </div>
                                <div class="detail">
                                    <span class="text">共计：</span>
                                    <span class="attr">
                                    <span class="name">放单量</span>
                                    <span class="val">{{item.orderCount}}</span>
                                    </span>
                                    <span class="attr">
                                    <span class="name">订单收益</span>
                                    <span class="val">{{item.incomePrice ||'--'}}</span>
                                    </span>
                                </div>
                                <div class="detail">
                                    <span class="attr">
                                    <span class="name">发布时间：</span>
                                    <span class="val">{{dateFormatter(item.createTime)}}</span>
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="no-tmpl" v-else>
                    <router-link to="/home">
                        <span class="icon"><i class="icon-addtmpl"></i></span>
                        <span class="text">尝试添加第一个任务</span>
                    </router-link>
                </div>
                <!-- 加载提示符 -->
                <div class="infinite-scroll-preloader" v-if="loading">
                    <div class="preloader"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import bottomBar from '@/components/bottomBar';
import {
    dateFormatter,
    setBuyBackType
} from '@/javascript/utils';
export default {
    name: 'orderbuyer',
    data() {
        return {
            status: 0,
            listData: [],
            total: 0,
            loading: false,
            page: {
                pageIndex: 1,
                pageSize: 10
            }
        };
    },
    created() {
        this.getOrderListFun();
    },
    methods: {
        /**
         * @Author      weiberZeng
         * @DateTime    2018-08-02
         * @lastTime    2018-08-02
         * @description 获取不同状态的任务列表
         */
        setTabFun(val) {
            if (this.loading) return;
            this.status = val;
            this.page = {
                pageIndex: 1,
                pageSize: 10
            };
            this.getOrderListFun();
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-08-02
         * @lastTime    2018-08-02
         * @description 获取任务下的订单列表
         */
        getListFun(taskId) {
            this.$router.replace({
                path: '/order/buyer/' + taskId
            });
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-06-11
         * @lastTime    2018-06-11
         * @description 获取任务列表
         */
        getOrderListFun() {
            if (this.loading) return;
            this.loading = true;

            this.$http.get('/task/list', {
                params: {
                    status: this.status,
                    pageIndex: this.page.pageIndex,
                    pageSize: this.page.pageSize
                }
            }).then((response) => {
                this.loading = false;

                if (response.data.success) {
                    let data = response.data.data.list;
                    for (let i = 0; i < data.length; i++) {
                        data[i].buyBackText = setBuyBackType(data[i].buyBackType);
                    }
                    if (this.page.pageIndex === 1) {
                        this.listData = data;
                    } else {
                        for (let j in data) {
                            this.listData.push(data[j]);
                        }
                    }
                    this.total = response.data.data.total;
                }
            }).catch(() => {
                this.loading = false;
            });
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-08-13
         * @lastTime    2018-08-13
         * @description 滚动
         */
        onScroll(event) {
            // 监听滚动所在节点
            let el = event.target;
            // 滚动内容高度
            let innerHeight = el.querySelector('.scroll').offsetHeight;
            // 滚动判断
            if (el.scrollTop + el.offsetHeight + 10 >= innerHeight) {
                if (this.page.pageIndex * this.page.pageSize < this.total) {
                    this.page.pageSize += 1;
                    this.getOrderListFun();
                }
            }
        },

        dateFormatter(val) {
            return dateFormatter(val);
        }
    },
    components: {
        bottomBar
    }
};

</script>
