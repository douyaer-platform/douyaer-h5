/*
 * @Author: weiberzeng
 * @Date:   2018-06-04 19:44:48
 * @Last Modified by:   weiberzeng
 * @Last Modified time: 2018-07-10 11:09:38
 */
export function trim(v) {
    if (!v) return v;
    return v.replace(/^\s+/g, '').replace(/\s+$/g, '');
};

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
// 加密手机号
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
// 正整数校验
export function validateNumber(to, from) {
    return (/^[1-9]\d*$/).test(to);
}
// 非空校验
export function validateRequire(to, from) {
    if (to || to === 0 || to === '0') {
        return true;
    } else {
        return false;
    }
}
export default {};
