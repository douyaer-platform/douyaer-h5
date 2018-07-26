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
订单列表： 缺少商品关联信息，状态等。 订单超过10分钟不能取消，以下状态不能全部包含
（订单状态 0=待完成,1=待商家发布评价,2=待刷手评价,3=待放款,4=已结束,查询结果中-1为已取消订单）
## 商家
个人中心：我的积分显示
认证： 身份证图片回显（个人信息接口少身份证图片地址）
我的积分: 邀请好友过后，没有增加我的积分
邀请好友： 邀请好友积分无值

## 后台
金币审核： 后台审核金币过后，会强制导致用户登录失效

## 前端
下拉刷新暂无，等待联调过后，测试数据量大了再加
