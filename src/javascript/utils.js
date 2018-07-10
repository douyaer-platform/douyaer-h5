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
export default {};
