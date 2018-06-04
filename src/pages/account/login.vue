<!--
* @moduleName: 登录页面
* @Author: weiberzeng
* @Date:   2018-04-25 14:17:20
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-06-04 20:59:32
-->
<template>
    <div class="page page-current">
        <div class="content">
            <div class="loginWrap">
                <div></div>
                <div class="list-block">
                    <ul>
                        <li>
                            <div class="item-content">
                                <div class="item-inner">
                                    <div class="item-title label">账号</div>
                                    <div class="item-input">
                                        <input type="text" placeholder="请输入账号" autocomplete="off">
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="item-content">
                                <div class="item-inner">
                                    <div class="item-title label">密码</div>
                                    <div class="item-input">
                                        <input :type="canSee?'text':'password'" placeholder="请输入密码" autocomplete="off">
                                    </div>
                                    <a href="javascript:;" @click.stop="canSeeChangeFun" :class="canSee?'seeBtn active':'seeBtn'">
                                        <i class="icon-see"></i>
                                    </a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="submitWrap">
                    <a href="javascript:;" class="button button-big button-fill">登录</a>
                </div>
                <div class="forgetLink">
                    <a href="javascript:;">忘记密码？</a>
                </div>
                <div class="regLink">
                    <a href="javascript:;">还没有账号？</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'accountLogin',
    data() {
        return {
            canSee: false
        };
    },
    created() {
        this.$http.post('/user/doLogin', {
            account: '15989485025',
            password: '123456'
        }).then((response) => {
            if (response.data.success) {
                localStorage.setItem('userInfo', JSON.stringify(response.data.data.user));
            }
        });
    },
    methods: {
        canSeeChangeFun() {
            console.log(this.canSee);
            this.canSee = !this.canSee;
        }
    }
};

</script>
