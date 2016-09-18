<style>
.module-content {
    display: flex;
}
.module-card {
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
.module-list {
    list-style: none;
}
.module-list-item {
    color: #868686;
    padding: .75rem 1rem;
    border-left: 4px solid #CDDC39;
    margin-bottom: .5rem; 
    cursor: pointer;
}
.module-list-item:hover {
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
</style>

<template>
    <div class="module-content">
        <div class="module-card">
            <div class="card-title">
                <span>模块</span>
                <button class="card-title-btn" @click="clearEdit">新增</button>
            </div>
            <div class="card-content">
                <ul class="module-list">
                    <li class="module-list-item" v-for="item in list" @click="goEdit(item)">
                        <div class="item-title">
                            {{item.get('title')}}
                        </div> 
                        <div class="item-other">
                            <div class="item-quote">
                                <span class="module-tag">JS</span>
                            </div>
                            <div class="item-date">
                                {{item.updatedAt | timeAgo}}
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <module-edit ref="moduleEdit" :edit="edit" :save-action="saveAction" :clear-edit="clearEdit"></module-edit>
        <!-- <div class="module-edit">
            <div class="card-title">
                <div class="module-edit-title-box">
                    <input type="text" placeholder="模块标题" class="module-edit-title" v-model="edit.title">   
                </div>
                <div class="module-edit-action">
                    <button class="card-title-btn common" @click="clearEdit" v-show="edit.current">取消编辑</button>
                    <button class="card-title-btn" :class="{ 'disable': (!edit.title || !edit.code) }" @click="saveAction">{{edit.current ? '保存' : '创建'}}</button>
                </div>
            </div>
            <div class="module-edit-content">
                <textarea class="module-edit-textarea" v-model="edit.code"></textarea>
            </div>
        </div> -->
    </div>
</template>

<script>
import ModuleEdit from '../components/ModuleEdit.vue'

export default {
    data () {
        return {
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
            this.edit.current = item
            this.edit.code = this.edit.current.get('code')
            this.edit.title = this.edit.current.get('title')
            this.$refs.moduleEdit.$emit('module-switch')
        },
        clearEdit () {
            this.edit.current = null
            this.edit.code = ''
            this.edit.title = ''
        },
        queryList () {
            this.$Progress.start()
            const query = new AV.Query('Module')
            query.equalTo('creator', AV.User.current())
            query.include('creator')
            query.find()
                .then(list => {
                    this.$Progress.finished()
                    this.list = list
                })
                .catch(err => {
                    this.$Progress.failed()
                })
        },
        saveAction () {
            if (!this.edit.title || !this.edit.code) return
            this.create(this.edit.title, this.edit.code, this.edit.current)
        },
        create (title, code, current) {
            const Module = AV.Object.extend('Module')

            if (!current) {
                current = new Module()
            }
            
            current.save({
                title: title,
                code: code,
                creator: AV.User.current()
            })
            .then(module => {
                this.$Notify('success', title + ' 保存成功', '', 3000)
                this.queryList()
            })
        }
    }
} 
</script>