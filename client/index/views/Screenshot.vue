<style>
.screenshot-content {
    display: flex;
}
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
}
.screenshot-list-state {
    width: 100%;
    padding: 1rem;
    text-align: center;
    color: #ccc;
}
</style>

<template>
    <div class="screenshot-content">
        <project-list :list="list" :show-project="showProject"></project-list>
        <div class="data-log-view">
            <div class="card-title">
                <div class="data-log-title-box">
                    截图
                </div>
                <div class="data-log-action">
                    <!-- <button class="card-title-btn" @click="saveAction">保存</button> -->
                </div>
            </div>
            <div class="module-edit-content" v-load-more="{ method: loadMoreScreenshot }">
                <ul class="screenshot-list">
                    <li class="screenshot-item" v-for="screenshot in screenshotList" @click="openRaw(screenshot)">
                        <div 
                            class="screenshot-box" 
                            :style="{
                                'background-image': `url(${screenshot.get('file').thumbnailURL(500, 1000)})`
                            }">
                        </div>
                    </li>
                    <div class="screenshot-list-state" v-show="state.loading">
                        加载中
                    </div>
                    <div class="screenshot-list-state" v-if="!screenshotList.length">
                        这里什么都没有
                    </div>
                    <div class="screenshot-list-state" v-if="state.noMore">
                        已全部加载
                    </div>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import ProjectList from '../components/projectList.vue'
import ObjectView from '../components/ObjectView.vue'
import html2canvas from 'html2canvas'

export default {
    data () {
        return {
            state: {
                loading: false,
                noMore: false
            },
            query: {
                alias: ''
            },
            list: [],
            screenshotList: []
        }
    },
    mounted () {
        this.queryList()
        this.queryScreenshot()
    },
    components: {
        ProjectList,
        ObjectView
    },
    methods: {
        showProject (item) {
            this.query.alias = item.get('alias')
            this.queryScreenshot()
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
        genScreenshotQuery () {
            this.$Progress.start()
            let query = new AV.Query('Screenshot')
            if (this.query.alias) {
                query.equalTo('alias', this.query.alias)
            }
            query.limit(9)
            query.include('file')
            query.descending('createdAt')
            return query
        },
        queryScreenshot (alias) {
            this.genScreenshotQuery().find()
                .then(list => {
                    this.$Progress.finished()
                    this.screenshotList = list
                })
        },
        loadMoreScreenshot () {
            if (this.state.loading || this.state.noMore) return
            this.state.loading = true
            this.genScreenshotQuery().skip(this.screenshotList.length).find()
                .then(list => {
                    if (list.length < 9) {
                        this.state.noMore = true
                    }
                    this.state.loading = false
                    this.$Progress.finished()
                    this.screenshotList = this.screenshotList.concat(list)
                })
        },
        openRaw (item) {
            window.open(item.get('file').get('url'))
        },
        test () {
            html2canvas(document.body)
            .then(canvas => {
                let base64 = canvas.toDataURL('image/jpeg')
                return this.$http.post('api/screenshot', {
                    file: base64,
                    id: '5f8f327fe17dcfab074f468ca1fe70e4'
                })
            })
            .then(res => {
                console.log(res.data)
            })
        }
    }
} 
</script>