<style>
.module-content.module-store {
    display: flex;
}

</style>

<template>
    <div class="module-content module-store">
        <div class="module-card">
            <div class="card-title">
                <span>公开模块</span>
                <!-- <button class="card-title-btn" @click="clearEdit">新增</button> -->
            </div>
            <div class="card-content">
                <ul class="module-list">
                    <li class="module-list-item" v-for="item in list" @click="goEdit(item)">
                        <div class="item-title">
                            {{item.get('title')}}
                        </div> 
                        <div class="item-other">
                            <div class="item-quote">
                                <span class="module-tag" v-for="tag in item.get('tag')">{{tag}}</span>
                            </div>
                            <div class="item-date">
                                <span class="module-author"> {{item.get('creator').get('username')}} 编辑于 </span>
                                {{item.updatedAt | timeAgo}}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="module-edit">
            <div class="module-nav">
                <div class="module-nav-item active" >
                代码
                </div>
            </div>
            <module-edit 
                ref="moduleEdit" 
                :can-edit="false"
                :edit="edit" 
                @fork-code="forkAction"
            ></module-edit>
        </div>
    </div>
</template>

<script>
import ModuleEdit from '../components/ModuleEdit.vue'

export default {
    name: 'ModuleStore',
    data () {
        return {
            state: {
                edit: true
            },
            list: [],
            edit: {
                current: null,
                code: '',
                title: ''
            }
        }
    },
    mounted () {
        this.queryList()
    },
    components: {
        ModuleEdit
    },
    methods: {
        goEdit (item) {
            this.state.edit = true
            this.edit.current = item
            this.edit.code = this.edit.current.get('code')
            this.edit.title = this.edit.current.get('title')
            this.$refs.moduleEdit.$emit('module-switch')
        },
        queryList () {
            this.$Progress.start()
            const query = new AV.Query('Module')
            query.equalTo('public', true)
            query.include('creator')
            query.descending('updatedAt')
            query.find()
                .then(list => {
                    this.$Progress.finished()
                    this.list = list
                })
                .catch(err => {
                    this.$Progress.failed()
                })
        },
        forkAction () {
            if (!this.edit.current) return
            this.create('fork_from_' + this.edit.current.get('title'), this.edit.current.get('code'), null)
        }
    }
} 
</script>