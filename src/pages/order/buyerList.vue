<!--
* @moduleName:
* @Author: weiberzeng
* @Date:   2018-08-02 22:57:40
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-08-18 22:12:37
-->
<template>
    <div class="page page-current">
        <header class="bar bar-nav">
            <router-link to="/order/buyer" class="button button-link button-nav pull-left"><span class="icon icon-left"></span></router-link>
            <h1 class="title">我的任务</h1>
        </header>
        <bottomBar></bottomBar>
        <div class="sub-tab">
            <ul>
                <li :class="{'active':status===0}" @click.stop="setTabFun(0)">已接单</li>
                <li :class="{'active':status===1}" @click.stop="setTabFun(1)">
                    <i class="sep" v-if="total1>0"></i> 待商家评价
                </li>
                <li :class="{'active':status===2}" @click.stop="setTabFun(2)">待刷手评价</li>
                <li :class="{'active':status===3}" @click.stop="setTabFun(3)">
                    <i class="sep" v-if="total3>0"></i> 待放款
                </li>
                <li :class="{'active':status===4}" @click.stop="setTabFun(4)">已结束</li>
            </ul>
        </div>
        <div class="content" v-on:scroll="onScroll">
            <div class="scroll">
                <div class="main-box" v-if="total>0">
                    <div class="box-bd">
                        <ul class="order-list">
                            <li v-for="item in listData" :key="item.orderId" class="item clearfix">
                                <div class="img-wrap">
                                    <img :src="item.goodsPicUrl" alt="">
                                </div>
                                <div class="inner">
                                    <div class="name">刷手账号：{{item.taobaoAccount}}</div>
                                    <div class="state">
                                        <span>接单时间：{{dateFormatter(item.createTime)}}</span>
                                    </div>
                                </div>
                                <div class="ctrl">
                                    <a href="javascript:;" class="button" @click.stop="evaluateOrderFun(item)" v-if="status===1">评价</a>
                                    <a href="javascript:;" class="button" @click.stop="showEvaluateOrderFun(item)" v-if="status!==0&&status!==1">订单详情</a>
                                    <a href="javascript:;" class="button" @click.stop="doneFun(item)" v-if="status===3">去放款</a>
                                    <a href="javascript:;" class="button" @click.stop="showDoneFun(item)" v-if="status===4">评价详情</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="no-tmpl" v-else>
                    <span class="icon"><i class="icon-addtmpl"></i></span>
                    <span class="text">暂无数据</span>
                </div>
                <!-- 加载提示符 -->
                <!--  <div class="infinite-scroll-preloader">
                <div class="preloader"></div>
            </div> -->
            </div>
        </div>
    </div>
</template>
<script>
import bottomBar from '@/components/bottomBar';
import {
    dateFormatter
} from '@/javascript/utils';
export default {
    name: 'orderbuyerList',
    data() {
        return {
            id: this.$route.params.id,
            status: 0,
            listData: [],
            total: 0,
            total1: 0,
            total3: 0,
            loading: false,
            page: {
                pageIndex: 1,
                pageSize: 10
            }
        };
    },
    created() {
        let _that = this;
        this.getOrderListFun(false, 0, function() {
            _that.getOrderListFun(true, 1, function() {
                _that.getOrderListFun(true, 3);
            });
        });
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
         * @DateTime    2018-06-11
         * @lastTime    2018-06-11
         * @description 获取订单列表
         */
        getOrderListFun(noData, status, cb) {
            if (this.loading) return;
            this.loading = true;
            this.$http.get('/order/taskOrders', {
                params: {
                    taskId: this.id,
                    status: status ? status : this.status,
                    pageIndex: this.page.pageIndex,
                    pageSize: this.page.pageSize
                }
            }).then((response) => {
                this.loading = false;

                if (response.data.success) {
                    // 正常路径获取数据和总量
                    if (!noData) {
                        let data = response.data.data.list;
                        if (this.page.pageIndex === 1) {
                            this.listData = data;
                        } else {
                            for (let j in data) {
                                this.listData.push(data[j]);
                            }
                        }
                        this.total = response.data.data.total;
                    } else {
                        if (status === 1) {
                            this.total1 = response.data.data.total;
                        }
                        if (status === 3) {
                            this.total3 = response.data.data.total;
                        }
                    }
                    // 有回调函数，执行回调函数
                    if (cb) {
                        cb();
                    }
                }
            }).catch(() => {
                this.loading = false;
            });
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-08-04
         * @lastTime    2018-08-04
         * @description 去评价
         */
        evaluateOrderFun(item) {
            this.$router.replace({
                path: '/order/buyer/detail/' + this.id + '/' + item.orderId
            });
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-08-18
         * @lastTime    2018-08-18
         * @description 显示订单详情
         */
        showEvaluateOrderFun(item) {
            this.$router.replace({
                path: '/order/buyer/showDetail/' + this.id + '/' + item.orderId
            });
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-08-04
         * @lastTime    2018-08-04
         * @description 去放款
         */
        doneFun(item) {
            this.$router.replace({
                path: '/order/buyer/done/' + this.id + '/' + item.orderId
            });
        },

        /**
         * @Author      weiberZeng
         * @DateTime    2018-08-18
         * @lastTime    2018-08-18
         * @description 显示评价详情
         * @return      {[type]}      [description]
         */
        showDoneFun(item) {
            this.$router.replace({
                path: '/order/buyer/showDone/' + this.id + '/' + item.orderId
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
