<style>
.data-log-list {
    position: relative;
    list-style: none;
    padding: 0 1rem;
    height: 100%;
}
.data-log-item {
    margin-bottom: 1rem;
    box-shadow: 0 0 1rem #efefef;
    padding: .5rem;
}
.data-log-params {
    display: none;
}
.data-log-item.open .data-log-params {
    display: flex;
}
.data-log-params-title {
    width: 5rem;
    flex-shrink: 0;
}
.data-log-params-content {
    padding: .5rem;
}
.data-log-params-content {
    background: #f9f9f9;
    border-bottom: 1px solid #ccc;
    width: 100%;
}
.data-log-item-title {
    display: flex;
    justify-content: space-between;
    padding: .5rem;
    font-size: .8rem;
    color: #a2a2a2;
}
.data-log-item-ip {
    color: #a71d5d;
}
.data-log-list-empty {
    padding: 4rem;
    text-align: center;
    font-size: 1.2rem;
    color: #ccc;
}
.list-state {
    position: absolute;
    bottom: 2rem;
    width: 100%;
    padding: 1rem;
    text-align: center;
    color: #ccc;
    box-sizing: border-box;
}
</style>

<template>
    <ul class="data-log-list">
        <li class="data-log-item" :class="{ 'open': logRow.__show }" v-for="logRow in dataLogList">
            <div class="data-log-item-title" @click="toggle(logRow)">
                <span class="data-log-item-ip">IP :  {{logRow.get('ip')}}</span>
                <span>时间 :  {{logRow.get('createdAt')}}</span>
            </div>
            <div class="data-log-params" v-if="logRow.get('get')">
                <object-view :obj="logRow.get('get')" title="get"></object-view>  
            </div>
            <div class="data-log-params" v-if="logRow.get('post')">
                <object-view :obj="logRow.get('post')" title="post"></object-view>
            </div>
            <div class="data-log-params" v-if="logRow.get('header')">
                <object-view :obj="logRow.get('header')" title="header"></object-view>
            </div>
            <div class="data-log-params" v-if="logRow.get('cookie')">
                <object-view :obj="{cookie: logRow.get('cookie')}" title="cookie"></object-view>
            </div>
        </li>
        <div class="list-state" v-if="state.loading">
            <span class="ion-load-c icon-loading"></span>
            加载中
        </div>
        <div class="list-state" v-if="!dataLogList.length">
            这里什么都没有
        </div>
        <div class="list-state" v-if="dataLogList.length && !state.loading && state.noMore">
            已全部加载
        </div>
    </ul>
</template>

<script>
import ObjectView from '../components/ObjectView.vue'

export default {
    props: {
        state: Object,
        dataLogList: Array
    },
    components: {
        ObjectView
    },
    methods: {
        toggle (item) {
            item.__show = !item.__show 
        }
    }
}
</script>