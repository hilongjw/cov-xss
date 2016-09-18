<template>
    <div class="text-row">
        <div class="text-title">
            {{text.title}}
        </div>
        <div class="text-input">
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