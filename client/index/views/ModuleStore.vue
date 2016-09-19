<style>
.module-content {
    display: flex;
}
.module-edit {
    position: relative;
    padding-top: 3rem;
    width: calc(100% - 21rem);
    background: #fff;
    margin-left: 1rem;
    box-shadow: 0 0 .5rem #d0d0d0;
}
.module-edit-title-box {
    width: 100%;
    padding-right: 1rem;
    margin-right: 1rem;
}
.module-edit-title {
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
    font-size: 1rem;
    padding: .2rem .5rem;
    width: 100%;
}
.module-nav {
    position: absolute;
    width: 100%;
    top: 0;
    display: flex;
    color: #969696;
    box-shadow: 0 0 .5rem #eaeaea;
}
.module-nav-item {
    font-size: 1rem;
    padding: 1rem;
    min-width: 4rem;
    text-align: center;
}
.module-nav-item.active {
    color: #000;
    border-bottom: 2px solid #e6e6e6;
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
                <div class="module-nav-item" :class="{ 'active': state.edit }" @click="moduleNav('edit')">代码</div>
                <!-- <div class="module-nav-item">设置</div> -->
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
    name: 'Module',
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
        moduleNav (type) {
            switch (type) {
                case 'edit':
                    this.state.edit = true
                    break
                case 'setting':
                    if (this.edit.current) {
                        this.state.edit = false
                    }
                    break
            }
        },
        showSetting () {
            this.state.edit = false
        },
        goEdit (item) {
            this.state.edit = true
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
            query.equalTo('public', true)
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
        forkAction () {
            if (!this.edit.current) return
            this.create('fork_from_' + this.edit.current.get('title'), this.edit.current.get('code'), null)
        },
        create (title, code, current) {
            const Module = AV.Object.extend('Module')

            if (!current) {
                current = new Module()
            }
            
            current.save({
                title: title,
                code: code,
                public: false,
                creator: AV.User.current()
            })
            .then(module => {
                this.$store.dispatch('loadModuleList')
                this.$Notify('success', title + ' 保存成功', '', 3000)
            })
        }
    }
} 
</script>