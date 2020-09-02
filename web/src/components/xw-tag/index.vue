<template>
    <div class="xw-tags">
      <span :class="currentIndex==index ? 'xw-tag-checked' : ''"
                v-for = "(item, index) in items"
               :key = "index"
                @click="handleClick(index)">{{item}}</span>
    </div>
</template>
<script>
    export default {
        name: "xw-tag",
        props: {
            items: {
                type: Array,
                default: []
            },
            currentIndex: {
                type:Number,
                default:0
            }
        },
        data () {
            return {
            }
        },
        computed: {
       
        },
        methods: {
            handleClick(val){
                   this.$emit('item-click', {'currentIndex':val});
                }
        }
    }
</script>
<style lang="less">
	.xw-tags{
		display: flex;
		flex-direction: row;
		font-size: 14px;
		color: #515a6e;
		line-height: 34px;
		padding-top: 8px;
		span{
			padding: 0 15px;
			cursor: pointer;
		}
	}
   .xw-tag-checked{
	  color: #2d8cf0;
	  font-weight: 500;
	  font-size: 14px;
	  border-bottom: 2px solid #2d8cf0;
   }
</style>