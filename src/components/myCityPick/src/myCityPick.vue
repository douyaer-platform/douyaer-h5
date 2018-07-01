<!--
* @moduleName: 城市选择框组件
* @Author: weiberzeng
* @Date:   2018-04-25 14:35:32
* @Last Modified by:   weiberzeng
* @Last Modified time: 2018-06-11 18:06:11
-->
<template>
<div class="citypick">
    <input readonly type="text" :value="textStr" @focus="handleFocus" @blur="handleBlur" @click="handleClick" placeholder="请选择所在地区">
    <div class="citypic-wrap" :class="{hide:!show}">
        <div class="item-wrap">
            <ul>
                <template v-for="item in pdata">
                    <li :class="{active:item.id===value[0]}"  :key="item.id" @click.stop="setValueFun(item,0)">{{item.name}}</li>
                </template>
            </ul>
        </div>
        <div class="item-wrap">
            <ul>
                <template v-for="item in cdata">
                    <li :class="{active:item.id===value[1]}" :key="item.id" @click.stop="setValueFun(item,1)">{{item.name}}</li>
                </template>
            </ul>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: 'myCityPick',
    props: {
        value: [Array]
    },
    data() {
        return {
            show: false,
            textStr: '',
            pdata: [],
            cdata: []
        };
    },
    created() {
        this.getDataFun();
    },
    watch: {
        'value': 'setTextFun'
    },

    methods: {
        // 聚焦事件
        handleFocus(event) {
            this.$emit('focus', event);
        },
        // 失焦事件
        handleBlur(event) {
            this.show = false;
            this.$emit('blur', event);
        },
        handleClick(event) {
            this.show = !this.show;
        },
        // 设置文本显示
        setTextFun(to, from) {
            let text = [];
            if (to[0]) {
                for (let i = 0; i < this.pdata.length; i++) {
                    if (this.pdata[i].id === to[0]) {
                        text.push(this.pdata[i].name);
                        break;
                    }
                }
            }
            if (to[1] && text[0]) {
                for (let j = 0; j < this.cdata.length; j++) {
                    if (this.cdata[j].id === to[1]) {
                        text.push(this.cdata[j].name);
                        break;
                    }
                }
            }
            this.textStr = text.join(' ');
        },
        // 设置返回值
        setValueFun(item, index, type) {
            let val = [];
            switch (index) {
                case 0:
                    val[0] = item.id;
                    this.getDataFun(item.id);
                    break;
                case 1:
                    val[0] = this.value[0];
                    val[1] = item.id;
                    if (type !== 'default') {
                        this.show = false;
                    }
                    break;
            }
            this.$emit('input', val);
            this.$emit('change', val);
        },
        // 获取省份城市列表
        getDataFun(id, type) {
            this.$http.get('/sys/listCitys', {
                params: {
                    parent: id || ''
                }
            }).then((response) => {
                if (response.data.success) {
                    let data = response.data.data;
                    if (id) {
                        this.cdata = data.citys;
                        if (type === 'init') {
                            this.setTextFun(this.value);
                        } else {
                            // 默认选中第一个
                            if (this.cdata.length > 0) {
                                this.setValueFun(this.cdata[0], 1, 'default');
                            } else {
                                // 如果城市没有值，直接关闭弹窗
                                this.show = false;
                            }
                        }
                    } else {
                        this.pdata = data.citys;
                        switch (this.value.length) {
                            case 1:
                                this.setTextFun(this.value);
                                break;
                            case 2:
                                this.getDataFun(this.value[0], 'init');
                                break;
                        }
                    }
                }
            });
        }
    }
};
</script>
