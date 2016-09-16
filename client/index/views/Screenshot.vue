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
                    Screenshot
                </div>
                <div class="data-log-action">
                    <!-- <button class="card-title-btn" @click="saveAction">保存</button> -->
                </div>
            </div>
            <div class="module-edit-content">
                <button @click="test">233</button>
                <img v-for="screenshot in screenshotList" :src="screenshot.get('file').thumbnailURL(500, 1000)" alt="">
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
            this.queryScreenshot(item.get('alias'))
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
        queryScreenshot (alias) {
            let query = new AV.Query('Screenshot')
            if (alias) {
                query.equalTo('alias', alias)
            }
            query.include('file')
            query.descending('createdAt')
            query.find()
                .then(list => {
                    this.screenshotList = list
                })
        },
        test () {
            html2canvas(document.body)
            .then(canvas => {
                let base64 = canvas.toDataURL('image/jpeg')
                console.log(base64.substring(22))
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