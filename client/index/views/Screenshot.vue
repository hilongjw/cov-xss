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
                <ul class="screenshot-list">
                    <li class="screenshot-item" v-for="screenshot in screenshotList" @click="openRaw(screenshot)">
                        <div 
                            class="screenshot-box" 
                            :style="{
                                'background-image': `url(${screenshot.get('file').thumbnailURL(500, 1000)})`
                            }">
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
        openRaw (item) {
            console.log(item.get('file'))
            window.open(item.get('file').get('url'))
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