<template>
    <div class="i-copyright">{{ copyright }}</div>
</template>
<script>
    export default {
        name: 'i-copyright',
        data () {
            return {
                copyright: 'Copyright © 2019-2020'
            }
        }
    }
</script>
<style lang="less">
    .i-copyright{
        display: flex;
        justify-content: center;
        font-size: 14px;
        margin-bottom: 25px;
        color: #808695;
    }
</style>
