<style>
.screenshot-list {
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    list-style: none;
}
.screenshot-item {
    position: relative;
    width: 32.333333%;
    background: #fff;
    padding: .5rem;
    box-shadow: 0 0 1rem #ccc;
    margin: .5%;
    box-sizing: border-box;
    text-align: center;
}
.screenshot-box {
    height: 0;
    background-size: cover;
    padding-bottom: 100%;
    cursor: pointer;
}
.screenshot-list-state {
    width: 100%;
    padding: 1rem;
    text-align: center;
    color: #ccc;
}
.screenshot-item-del-icon {
    color: #7b7b7b;
    font-size: 1.2rem;
    position: absolute;
    top: -.3rem;
    right: -.3rem;
}
.screenshot-item-del-icon:hover{
    color: #f00;
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-active {
  opacity: 0;
  transform: translateY(30px);
}
</style>

<template>
<transition-group name="list-item" class="screenshot-list" tag="ul">
    <li 
        class="screenshot-item" 
        v-for="screenshot in screenshotList" 
        @click="touchItem(screenshot)"
        :key="screenshot.id"
    >
        <span 
            class="ion-close-circled screenshot-item-del-icon" 
            v-if="state.contrl" 
            @click="removeAction($event, screenshot)"
        ></span>
        <div 
            class="screenshot-box" 
            v-lazy:background-image="screenshot.get('file').thumbnailURL(500, 1000)"
        >
        </div>
    </li>
    <div class="screenshot-list-state" v-show="state.loading" key="loading">
        加载中
    </div>
    <div class="screenshot-list-state" v-if="!screenshotList.length" key="empty">
        这里什么都没有
    </div>
    <div class="screenshot-list-state" v-if="state.noMore" key="loadend">
        已全部加载
    </div>
</transition-group>
</template>

<script>
export default {
    props: {
        state: Object,
        screenshotList: Array
    },
    methods: {
        touchItem (item) {
            window.open(item.get('file').get('url'))
        },
        removeAction (e, item) {
            e.stopPropagation()
            item.get('file').destroy()
                .then(done => {
                    return item.destroy()
                })
                .then(done => {
                    this.$Notify('success', '删除成功', '', 2000)
                    this.$emit('remove', item)
                })
        }
    }
}
</script>