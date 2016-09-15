<style>
.info-notify {
    position: absolute;
    top: 1.5rem;
    font-size: .8rem;
    border: 1px solid #FF5722;
    padding: .5rem;
    width: 100%;
    color: #F44336;
    box-sizing: border-box;
}
.info-notify.success {
    color: #52d89c;
    border: 1px solid #52d99c;
}
</style>

<template>
    <div class="info-notify" :class="classList">
        {{msg}}
    </div>
</template>

<script>
export default {
    props: {
        msg: String,
        type: String
    },
    computed: {
        classList () {
            if (this.type) {
                return [this.type]
            }
            return []
        }
    }
}
</script>