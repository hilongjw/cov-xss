<style>
.screenshot-content {
    display: flex;
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
                    <button class="card-title-btn" @click="contrlAction">{{ state.contrl ? '完成' : '管理' }}</button>
                </div>
            </div>
            <div class="module-edit-content" v-load-more="{ method: loadMoreScreenshot }">
                <screenshot-list 
                    :state="state" 
                    :screenshot-list="screenshotList"
                    @remove="removeScreenshot"
                ></screenshot-list>
            </div>
        </div>
    </div>
</template>

<script>
import ProjectList from '../components/projectList.vue'
import ObjectView from '../components/ObjectView.vue'
import ScreenshotList from '../components/ScreenshotList.vue'

export default {
    name: 'Screenshot',
    data () {
        return {
            state: {
                contrl: false,
                loading: false,
                noMore: false
            },
            query: {
                alias: ''
            },
            screenshotList: []
        }
    },
    mounted () {
        if (!this.list.length) {
            this.$store.dispatch('loadProjectList')
        }
        this.queryScreenshot()
    },
    components: {
        ProjectList,
        ObjectView,
        ScreenshotList
    },
    computed: {
        list () {
            return this.$store.state.Projects
        }
    },
    methods: {
        contrlAction () {
            this.state.contrl = !this.state.contrl
        },
        showProject (item) {
            this.query.alias = item.get('alias')
            this.queryScreenshot()
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
        removeScreenshot (item) {
            this.screenshotList.$remove(item)
        },
        test () {
            // html2canvas(document.body)
            // .then(canvas => {
            //     let base64 = canvas.toDataURL('image/jpeg')
            //     return this.$http.post('api/screenshot', {
            //         file: base64,
            //         id: '5f8f327fe17dcfab074f468ca1fe70e4'
            //     })
            // })
            // .then(res => {
            //     console.log(res.data)
            // })
        }
    }
} 
</script>