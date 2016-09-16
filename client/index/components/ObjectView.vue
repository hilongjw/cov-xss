<style>
.obj-view {
    background: #f9f9f9;
    margin-bottom: 1rem;
    width: 100%;
    word-break: break-all;
}
.obj-row {
    display: flex;
    padding: .5rem;
    border-bottom: 1px solid #efefef;
}
.obj-view-key {
    min-width: 4rem;
    margin-right: 1rem;
}
.obj-view-value {
    font-size: .8rem;
    line-height: 1rem;
}
</style>
<template>
    <div class="obj-view">
        <div class="obj-row" v-for="(value, key) in obj">
            <div class="obj-view-key">{{key}}:</div>
            <div class="obj-view-value">{{value}}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        obj: Object
    }
}
</script>