<style>
.module-content {
    display: flex;
}
.card {
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
.module-list {
    list-style: none;
    padding: 0 1rem;
}
.module-list-item {
    color: #868686;
    padding: .75rem .5rem;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
}
.module-list-item:hover {
    opacity: .6;
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
.module-edit {
    width: 100%;
    background: #fff;
    margin-left: 1rem;
    box-shadow: 0 0 .5rem #d0d0d0;
}
.module-edit-title {
    border: none;
    border-bottom: 1px solid #ccc;
    outline: none;
    font-size: 1rem;
    padding: .2rem .5rem;
}
.module-edit-content {
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
</style>

<template>
    <div class="module-content">
        <div class="card">
            <div class="card-title">
                <span>私有模块</span>
                <button class="card-title-btn">新增</button>
            </div>
            <div class="card-content">
                <ul class="module-list">
                    <li class="module-list-item" v-for="item in list" @click="goEdit(item)">
                        <div class="item-title">
                            {{item.get('title')}}
                        </div> 
                        <div class="item-other">
                            <div class="item-quote">
                                掘金抓包专用
                            </div>
                            <div class="item-date">
                                一天前
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="module-edit">
            <div class="card-title">
                <div>
                    <input type="text" placeholder="模块标题" class="module-edit-title" v-model="edit.title">   
                </div>
                <button class="card-title-btn" @click="clearEdit" v-show="edit.current">取消编辑</button>
                <button class="card-title-btn" @click="saveAction">保存</button>
            </div>
            <div class="module-edit-content">
                <textarea class="module-edit-textarea" v-model="edit.code"></textarea>
            </div>
        </div>
    </div>
</template>

<script>
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
        console.log('?')
        this.queryList()
    },
    methods: {
        goEdit (item) {
            this.edit.current = item
            this.edit.code = this.edit.current.get('code')
            this.edit.title = this.edit.current.get('title')
        },
        clearEdit () {
            this.edit.current = null
            this.edit.code = ''
            this.edit.title = ''
        },
        queryList () {
            const query = new AV.Query('Module')
            query.equalTo('creator', AV.User.current())
            query.find()
                .then(list => {
                    this.list = list
                })
        },
        saveAction () {
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
                console.log(module)
                this.queryList()
            })
        }
    }
} 
</script>