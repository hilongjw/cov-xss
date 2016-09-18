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
</style>

<template>
    <div class="home-content">
        <project-list :list="list" :show-project="showProject"></project-list>
        <div class="data-log-view">
            <div class="card-title">
                <div class="data-log-title-box">
                    记录
                </div>
                <div class="data-log-action">
                    <!-- <button class="card-title-btn" @click="saveAction">保存</button> -->
                </div>
            </div>
            <div class="module-edit-content">
                <data-log :data-log-list="dataLogList"></data-log>
                <button @click="loadMoreDataLog">loadMoreDataLog</button>
            </div>
        </div>
    </div>
</template>

<script>
import ProjectList from '../components/projectList.vue'
import ObjectView from '../components/ObjectView.vue'
import DataLog from '../components/DataLog.vue'

export default {
    data () {
        return {
            query: {
                alias: ''
            },
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
        ObjectView,
        DataLog
    },
    methods: {
        genDataLogQuery () {
            let query = new AV.Query('DataLog')
            if (this.query.alias) {
                query.equalTo('alias', this.query.alias)
            }
            query.limit(1)
            query.descending('createdAt')
            return query
        },
        showProject (item) {
            this.query.alias = item.get('alias')
            this.queryDataLog()
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
        queryDataLog () {
            this.genDataLogQuery()
                .find()
                .then(list => {
                    this.dataLogList = list
                })
        },
        loadMoreDataLog () {
            this.genDataLogQuery()
                .skip(this.dataLogList.length)
                .find()
                .then(list => {
                    this.dataLogList = this.dataLogList.concat(list)
                })
        }
    }
} 
</script>