<style>
.module-edit {
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
.module-edit-action {
    text-align: right;
    flex-shrink: 0;
}
.module-edit-content .CodeMirror {
    height: 100%;
}
</style>

<template>
    <div class="module-edit">
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
            <code-editor :edit="edit"></code-editor>
        </div>
    </div>
</template>

<script>
import CodeEditor from './CodeEditor.vue'
export default {
    data () {
        return {
            editor: null
        }
    },
    props: {
        edit: Object,
        clearEdit: Function,
        saveAction: Function
    },
    components: {
        CodeEditor
    }
}
</script>