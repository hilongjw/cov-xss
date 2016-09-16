<style>
.home-content {
    display: flex;
}
.data-log-view {
    width: 100%;
    background: #fff;
    margin-left: 1rem;
    box-shadow: 0 0 .5rem #d0d0d0;
}
.data-log-title-box {
    width: 100%;
    padding-right: 1rem;
    margin-right: 1rem;
}
.data-log-title {
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
    font-size: 1rem;
    padding: .2rem .5rem;
    width: 100%;
}
.data-log-content {
    height: calc(100% - 6rem);
    padding: 0 1rem;
}
.module-edit-textarea {
    height: 100%;
    width: 100%;
    border: 1px solid #e8e8e8;
    background: #f7f7f7;
    line-height: 1.7;
    color: #717171;
    outline: none;
}
.module-edit-action {
    text-align: right;
    flex-shrink: 0;
}
.text-row {
    padding: 0 .5rem;
    margin-bottom: 1rem;
    display: flex;
}
.text-row-title {
    min-width: 4rem;
    font-size: 1rem;
    line-height: 1.7rem;
    text-align: right;
    flex-shrink: 0;
    padding-right: 1rem;
}
.text-row-input {
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
    font-size: 1rem;
    padding: .25rem;
    width: 100%;
}
.code-block {
    background: #ececec;
    padding: .5rem 1rem;
    font-size: .8rem;
    margin-bottom: 1rem;
}
.data-log-list {
    list-style: none;
}
.data-log-item {
    border-left: 2px solid #8BC34A;
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
</style>

<template>
    <div class="home-content">
        <project-list :list="list" :show-project="showProject"></project-list>
        <div class="data-log-view">
            <div class="card-title">
                <div class="data-log-title-box">
                    Data Log
                </div>
                <div class="data-log-action">
                    <!-- <button class="card-title-btn" @click="saveAction">保存</button> -->
                </div>
            </div>
            <div class="module-edit-content">
                <ul class="data-log-list">
                    <li class="data-log-item" v-for="logRow in dataLogList">
                        <div class="data-log-item-title">
                            <span>ip: {{logRow.get('ip')}}</span>
                            <span>{{logRow.get('createdAt') | timeAgo}}</span>
                        </div>
                        <div class="data-log-params">
                            <div class="data-log-params-title">get: </div>
                            <object-view :obj="logRow.get('get')"></object-view>  
                        </div>
                        <div class="data-log-params">
                            <div class="data-log-params-title">post: </div>
                            <object-view :obj="logRow.get('post')"></object-view>
                        </div>
                        <div class="data-log-params">
                            <div class="data-log-params-title">header: </div>
                            <object-view :obj="logRow.get('header')"></object-view>
                        </div>
                        <div class="data-log-params">
                            <div class="data-log-params-title">cookie: </div>
                            <div class="data-log-params-content">{{logRow.get('cookie')}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import ProjectList from '../components/projectList.vue'
import ObjectView from '../components/ObjectView.vue'

export default {
    data () {
        return {
            list: [],
            dataLogList: []
        }
    },
    mounted () {
        this.queryList()
        this.queryDataLog()
    },
    components: {
        ProjectList,
        ObjectView
    },
    methods: {
        showProject (item) {
            this.queryDataLog(item.get('alias'))
        },
        queryList () {
            const query = new AV.Query('Project')
            query.equalTo('creator', AV.User.current())
            query.include('creator')
            query.include('Module')
            query.descending('createdAt')
            query.find()
                .then(list => {
                    this.list = list
                })
        },
        queryDataLog (alias) {
            let query = new AV.Query('DataLog')
            if (alias) {
                query.equalTo('alias', alias)
            }
            query.descending('createdAt')
            query.find()
                .then(list => {
                    this.dataLogList = list
                })
        }
    }
} 
</script>