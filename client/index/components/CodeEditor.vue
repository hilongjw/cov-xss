<style src="codemirror/lib/codemirror.css"></style>
<style src="codemirror/theme/material.css"></style>

<template>
    <div class="module-edit-textarea"></div>
</template>

<script>
import CodeMirror from 'codemirror/'
import 'codemirror/mode/javascript/javascript.js'

export default {
    props: {
        edit: Object
    },
    data () {
        return {
            coder: null
        }
    },
    mounted () {
        this.coder = CodeMirror(this.$el, {
            value: this.edit.code,
            mode:  'javascript',
            theme: 'material',
            indentWithTabs: true
        })
        this.coder.on("change", () => {
            this.edit.code = this.coder.getValue()
        })
    },
    watch: {
        'edit.code': function (val) {
            if (this.coder) {
                this.coder.setValue(val)
            }
        }
    }
}
</script>