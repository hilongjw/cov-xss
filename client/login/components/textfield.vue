<template>
    <div class="text-row">
        <div class="text-title">
            {{text.title}}
        </div>
        <div class="text-input">
            <input :type="text.type || 'text'" v-model="text.value">
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            text: Object
        }
    }
</script>