<style>
.module-code {
    height: 100%;
    padding-bottom: 4rem;
    box-sizing: border-box;
}
.module-edit-content {
    height: 100%;
    padding: 0;
}
.module-edit-action {
    text-align: right;
    flex-shrink: 0;
}
.module-edit-content .CodeMirror {
    height: 100%;
    border: none;
}
.module-code .card-title{
    margin: 0;
    background: #263238;
    color: #fff;
}
.module-code .module-edit-textarea  {
    border: none;
}
</style>

<template>
    <div class="module-code">
        <div class="card-title">
            <div class="module-edit-title-box">
                <input type="text" v-if="canEdit" placeholder="模块标题" class="module-edit-title" v-model="edit.title">
                <span v-if="!canEdit">{{edit.title}}</span> 
            </div>
            <div class="module-edit-action">
                <button 
                    class="card-title-btn common" 
                    @click="clearEdit" 
                    v-show="edit.current"
                    v-if="canEdit"
                >取消编辑</button>
                <button 
                    v-if="canEdit"
                    class="card-title-btn" 
                    :class="{ 'disable': (!edit.title || !edit.code) }" 
                    @click="saveAction"
                >{{edit.current ? '保存' : '创建'}}</button>
                <button 
                    v-if="!canEdit"
                    class="card-title-btn"
                    @click="forkAction"
                >fork</button>
            </div>
        </div>
        <div class="module-edit-content">
            <code-editor
                @code-change="codeChange"
                ref="codeEditor"
            ></code-editor>
        </div>
    </div>
</template>

<script>
import CodeEditor from './CodeEditor.vue'
export default {
    props: {
        canEdit: Boolean,
        edit: Object,
        clearEdit: Function,
        saveAction: Function,
        showSetting: Function
    },
    components: {
        CodeEditor
    },
    mounted () {
        this.$on('module-switch', () => {
            this.newCode(this.edit.code)
        })
    },
    methods: {
        forkAction () {
            this.$emit('fork-code')
        },
        codeChange (code) {
            this.edit.code = code
        },
        newCode (code) {
            this.$refs.codeEditor.$emit('new-code', code)
        }
    }
}
</script>