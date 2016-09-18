<style>
.data-log-list {
    list-style: none;
}
.data-log-item {
    margin-bottom: 1rem;
    box-shadow: 0 0 1rem #efefef;
    padding: .5rem;
}
.data-log-params {
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
</style>

<template>
    <ul class="data-log-list">
        <li class="data-log-item" v-for="logRow in dataLogList">
            <div class="data-log-item-title">
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
        <li class="data-log-item data-log-list-empty" v-show="!dataLogList.length">
            没有记录
        </li>
    </ul>
</template>

<script>
import ObjectView from '../components/ObjectView.vue'

export default {
    props: {
        dataLogList: Array
    },
    components: {
        ObjectView
    }
}
</script>