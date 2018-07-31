/*
 * @Author: weiberzeng
 * @Date:   2018-06-04 19:44:48
 * @Last Modified by:   weiberzeng
 * @Last Modified time: 2018-07-31 11:35:50
 */

/**
 * @Author      weiberZeng
 * @DateTime    2018-07-31
 * @lastTime    2018-07-31
 * @description 字符串去空格
 */
export function trim(v) {
    if (!v) return v;
    return v.replace(/^\s+/g, '').replace(/\s+$/g, '');
};

/**
 * @Author      weiberZeng
 * @DateTime    2018-07-31
 * @lastTime    2018-07-31
 * @description 设置回购文本
 */
export function setBuyBackType(type) {
    let str = '';
    switch (type) {
        case 0:
            str = '无需回购';
            break;
        case 1:
            str = '加收藏后3-5天内回购';
            break;
        case 2:
            str = '关注店铺后6-10天内回购';
            break;
    }
    return str;
}

/**
 * @Author      weiberZeng
 * @DateTime    2018-07-31
 * @lastTime    2018-07-31
 * @description 格式化时间
 */
export function dateFormatter(date, format) {
    if (date) {
        let str = format || 'yyyy-MM-dd hh:mm:ss';
        try {
            let d = new Date(date);
            let o = {
                'M+': d.getMonth() + 1,
                'd+': d.getDate(),
                'h+': d.getHours(),
                'm+': d.getMinutes(),
                's+': d.getSeconds(),
                'q+': Math.floor((d.getMonth() + 3) / 3),
                'S': d.getMilliseconds()
            };
            if (/(y+)/.test(str)) {
                str = str.replace(RegExp.$1, (d.getFullYear() + '').substr(4 -
                    RegExp.$1.length));
            }
            for (let k in o) {
                if (new RegExp('(' + k + ')').test(str)) {
                    str = str.replace(RegExp.$1, (RegExp.$1.length ===
                        1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
                }
            }
            return str;
        } catch (e) {
            return '';
        }
    } else {
        return '';
    }
};

/**
 * @Author      weiberZeng
 * @DateTime    2018-07-31
 * @lastTime    2018-07-31
 * @description 加密手机号
 */
export function hidePhone(val) {
    if (val) {
        let arr = val.split('');
        let tmp = [];
        for (let i = 0; i < arr.length; i++) {
            switch (i) {
                case 0:
                case 1:
                case 2:
                    tmp.push(arr[i]);
                    break;
                case 3:
                    tmp.push(' ');
                    tmp.push('*');
                    break;
                case 4:
                case 5:
                case 6:
                    tmp.push('*');
                    break;
                case 7:
                    tmp.push(' ');
                    tmp.push(arr[i]);
                    break;
                case 8:
                case 9:
                case 10:
                    tmp.push(arr[i]);
                    break;
                default:
                    tmp.push(arr[i]);
                    break;
            }
        }
        return tmp.join('');
    } else {
        return '';
    }
}

/**
 * @Author      weiberZeng
 * @DateTime    2018-07-31
 * @lastTime    2018-07-31
 * @description 正整数校验
 */
export function validateNumber(to, from) {
    return (/^[1-9]\d*$/).test(to);
}

/**
 * @Author      weiberZeng
 * @DateTime    2018-07-31
 * @lastTime    2018-07-31
 * @description 非空校验
 */
export function validateRequire(to, from) {
    if (to || to === 0 || to === '0') {
        return true;
    } else {
        return false;
    }
}
export default {};
