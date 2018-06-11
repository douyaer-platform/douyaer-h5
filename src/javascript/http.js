/*
 * @Author: weiberzeng
 * @Date:   2018-06-04 19:21:25
 * @Last Modified by:   weiberzeng
 * @Last Modified time: 2018-06-11 19:43:31
 */
import Vue from 'vue';
import VueResource from 'vue-resource';
let $ = window.$;

Vue.use(VueResource);
Vue.http.interceptors.push((request, next) => {
    // 使用 formdata 传值
    request.headers.set('Content-Type', 'application/x-www-form-urlencoded');
    request.body = setParams(request.body);
    // 初始化请求地址
    request.url = '/douyaer-api' + request.url;
    // 请求返回拦截器
    next((response) => {
        console.log('response>>', response.data);
        // 请求返回特殊状态的统一处理
        switch (response.data.code) {
            case -100:
                $.alert('登录失效', function() {
                   window.location.href = '#/account/login';
                });
                break;
            default:
                break;
        }
    });
});
export default {};

/**
 * @Author      weiberZeng
 * @DateTime    2017-06-05
 * @lastTime    2017-06-05
 * @description 使用 formdata来提交数据，重新构造多级object 的提交格式
 * @example     a.b.c[0].d:value
 */
let setParams = function(obj) {
    let params = [];
    let escape = encodeURIComponent;
    params.add = function(key, value) {
        if (isFunction(value)) {
            value = value();
        }
        if (value === null) {
            value = '';
        }
        this.push(escape(key) + '=' + escape(value));
    };
    serialize(params, obj);
    return params.join('&').replace(/%20/g, '+');
};

/**
 * @Author      weiberZeng
 * @DateTime    2017-06-05
 * @lastTime    2017-06-05
 * @description 对象序列化为字符串
 */
let serialize = function(params, obj, scope) {
    // 默认接受数组这么处理，暂时只接受一维数组
    if (isArray(obj) && !scope) {
        for (let i = 0; i < obj.length; i++) {
            if (isObject(obj[i])) {
                serialize(params, obj[i], '[' + i + ']');
            } else {
                params.add('[' + i + ']', obj[i]);
            }
        }
    } else {
        let array = isArray(obj);
        let plain = isPlainObject(obj);
        let hash;
        each(obj, (value, key) => {
            hash = isObject(value) || isArray(value);
            if (scope) {
                if (isNaN(key)) {
                    key = scope + '.' + (plain || hash ? key : '');
                } else {
                    key = scope + '[' + key + ']';
                }
            }
            if (!scope && array) {
                params.add(value.name, value.value);
            } else if (hash) {
                serialize(params, value, key);
            } else {
                params.add(key, value);
            }
        });
    }
};

/**
 * @Author      weiberZeng
 * @DateTime    2017-06-05
 * @lastTime    2017-06-05
 * @description 是否是函数
 */
let isFunction = function(val) {
    return typeof val === 'function';
};

/**
 * @Author      weiberZeng
 * @DateTime    2017-06-05
 * @lastTime    2017-06-05
 * @description 是否是对象
 */
let isObject = function(obj) {
    return obj !== null && typeof obj === 'object';
};
/**
 * 是否是数组
 * @type {Boolean}
 */
const isArray = Array.isArray;

/**
 * @Author      weiberZeng
 * @DateTime    2017-06-05
 * @lastTime    2017-06-05
 * @description 是否是简单对象
 */
let isPlainObject = function(obj) {
    return isObject(obj) && Object.getPrototypeOf(obj) === Object.prototype;
};

/**
 * @Author      weiberZeng
 * @DateTime    2017-06-05
 * @lastTime    2017-06-05
 * @description 循环函数
 */
let each = function(obj, iterator) {
    var i, key;
    if (isArray(obj)) {
        for (i = 0; i < obj.length; i++) {
            iterator.call(obj[i], obj[i], i);
        }
    } else if (isObject(obj)) {
        for (key in obj) {
            if (hasOwnProperty.call(obj, key)) {
                iterator.call(obj[key], obj[key], key);
            }
        }
    }
    return obj;
};
