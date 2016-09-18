<style>
.obj-view {
    display: flex;
    background: #f9f9f9;
    width: 100%;
    word-break: break-all;
    overflow: visible;
    font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
    font-size: 12px;
    color: #333;
    word-wrap: normal;
}
.obj-row {
    display: flex;
    padding: .5rem;
    border-bottom: 1px solid #efefef;
}
.obj-view-key {
    margin-right: 6px;
    flex-shrink: 0;
    color: #795da3;
}
.obj-view-value {
}
.obj-view-title {
    font-size: 12px;
    line-height: 2rem;
    width: 3rem;
    text-align: left;
    flex-shrink: 0;
    padding-left: .5rem;
}
.obj-view-content {
    width: 100%;
}
</style>
<template>
    <div class="obj-view">
        <div class="obj-view-title">
            {{title}}
        </div>
        <div class="obj-view-content">
            <div class="obj-row" v-for="(value, key) in obj">
                <div class="obj-view-key">{{key}}:</div>
                <div class="obj-view-value">{{value}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        obj: Object
    }
}
</script>