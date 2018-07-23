# douyaer

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# TODO
用户通知少接口
## 刷手
任务列表： 少佣金字段（和商家通一个接口 task/list）
订单列表： 缺少商品关联信息，状态等。
## 商家
个人中心：我的积分显示
认证： 身份证图片回显（个人信息接口少身份证图片地址）
资金流水： 流水列表，少类型字段（充值，消费之类的类型），少新增和扣减资金字段，只有一个 count 字段
我的积分: 少积分列表，需要类型字段和积分扣减字段等
邀请好友： 列表少积分增加字段
订单： 用户任务列表，没有根据任务状态查询的字段，返回列表内也没有任务状态标识字段,返回列表缺少任务佣金数

## 后台
金币审核： 后台审核金币过后，会强制导致用户登录失效

## 前端
下拉刷新暂无，等待联调过后，测试数据量大了再加
