/*
 * @Author: 城市下拉框
 * @Date:   2018-06-04 19:21:25
 * @Last Modified by:   weiberzeng
 * @Last Modified time: 2018-06-12 20:46:44
 */

import myCityPick from './src/myCityPick';
const citypick = {
    install: function(Vue) {
        Vue.component(myCityPick.name, myCityPick);
    }
};
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(citypick);
} else {
    myCityPick.install = function(Vue) {
        Vue.component(myCityPick.name, myCityPick);
    };
}
// 导出模块
export default myCityPick;
