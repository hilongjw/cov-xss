<style>
.textfield-row {
    margin-bottom: 1rem;
}
.textfield-title {
    color: #ccc;
    font-size: .8rem;
}
.textfield-input input {
    line-height: 2rem;
    width: 100%;
    border: none;
    border-bottom: 1px solid #e4e4e4;
    outline: none;
    font-size: 1.2rem;
}
</style>
<template>
    <div class="textfield-row">
        <div class="textfield-title">
            {{text.title}}
        </div>
        <div class="textfield-input">
            <input :type="text.type || 'text'" v-model="text.value" @keyup.enter="keyEnter">
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            text: Object
        },
        methods: {
            keyEnter () {
                this.$emit('enter-key')
            }
        }
    }
</script>