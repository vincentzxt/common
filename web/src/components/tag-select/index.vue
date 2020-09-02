<template>
    <div class="tag-select">
        <div class="tag-select-title">{{title}}</div>
        <div class="tag-select-list" :class="!extend ? 'hide' : 'show'">
            <div 
                class="tag-select-list-item"
                :class="item.checked ? 'tag-select-list-checked' : 'tag-select-list-unChecked'"
                v-for = "(item, index) in fliterData"
                :key = "index"
                @click="handleClick(item)"
                >{{item[value]}}</div>
        </div>
        <div class="tag-select-extend" @click="handleExtend()">
            <div v-if="!extend">展开<Icon type="ios-arrow-down" /></div>
            <div v-else>收起<Icon type="ios-arrow-up" /></div>
        </div>
    </div>
</template>
<script>
    export default {
        name: "tag-select",
        props: {
            data: {
                type: Array,
                default: []
            },
            name: {
                type: String,
                default: ''
            }, 
            value: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                extend: false
            }
        },
        computed: {
            fliterData() {
                let i = 1;
                for(let item of this.data) {
                    if (i == 1) {
                        this.$set(item, 'checked', true);
                        i++;
                    } else {
                        this.$set(item, 'checked', false);
                    }
                }
                return this.data;
            }
        },
        methods: {
            handleExtend() {
                this.extend = !this.extend;
            },
            handleClick(item) {
                if (!item.checked) {
                    for (let i of this.data) {
                        if (i[this.name] == item[this.name]) {
                            i.checked = true;
                        } else {
                            i.checked = false;
                        }
                    }
                    this.$emit('click', item);
                }
            }
        }
    }
</script>
<style lang="less">
    .hide {
        overflow:hidden;
        height: 30px;
    }
    .show {
        overflow:none;
        height: auto;
    }
    .tag-select {
        display: flex;
        justify-content: space-between;
        align-items: center;
        &-title {
            display: flex;
            justify-content: center;
            width: 7%;
        }
        &-list {
            display: flex;
            flex-wrap: wrap;
            width: 88%;
            font-size: 8pt;
            &-item {
                padding: 5px 10px;
                border-radius: 5px;
                margin-right: 30px;
                margin-bottom: 5px;
            }
            &-checked {
                background-color: #2d8cf0;
                color: #ffffff;
            }
            &-unChecked {
                background-color: #ffffff;
                color: #515a6e;
            }
        }
        &-extend {
            display: flex;
            width: 5%;
            justify-content: center;
            align-items: center;
            color: #2d8cf0;
        }
    }
</style>
