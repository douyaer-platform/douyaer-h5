/*
 * @Author: weiberzeng
 * @Date:   2018-06-04 19:44:48
 * @Last Modified by:   weiberzeng
 * @Last Modified time: 2018-06-04 21:35:17
 */
module.exports = {
    trim: (v) => {
        if (!v) return v;
        return v.replace(/^\s+/g, '').replace(/\s+$/g, '');
    }
};
