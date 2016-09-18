<style src="codemirror/lib/codemirror.css"></style>
<style src="codemirror/theme/material.css"></style>

<template>
    <div class="module-edit-textarea"></div>
</template>

<script>
import CodeMirror from 'codemirror'
import 'codemirror/mode/javascript/javascript.js'

export default {
    data () {
        return {
            coder: null,
            edit: {
                code: ''
            }
        }
    },
    mounted () {
        this.coder = CodeMirror(this.$el, {
            value: this.edit.code,
            mode:  'javascript',
            theme: 'material',
            indentWithTabs: true
        })
        this.$on('new-code', (code) => {
            this.coder.setValue(code)
        })
        this.coder.on("change", () => {
            this.$emit('code-change', this.coder.getValue())
        })
    }
}
</script>