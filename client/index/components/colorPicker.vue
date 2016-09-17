<style>
    .color-picker {
        position: relative;
        display: inline-block;
    }
    .color-value-box {
        width: 1rem;
        height: 1rem;
        background: #ccc;
    }
    .color-options {
        position: absolute;
        box-shadow: 0 0 .5rem #a7a7a7;
        border: 1px solid #fff;
        left: -.2rem;
        top: 1.2rem;
    }
    .color-option {
        margin: .2rem;
    }
</style>

<template>
    <div class="color-picker">
        <div class="color-value-box" :style="{ 'background': color.value }" @click="toggle"></div>
        <div class="color-options" v-show="state.show">
            <div 
                class="color-option color-value-box" 
                v-for="item in options" 
                :style="{ 'background': item }"
                @click="touchColor(item)"
            ></div>
        </div>
    </div>
</template>

<script>
import { catIn } from '../utils'

export default {
    props: {
        color: Object
    },
    data () {
        return {
            state: {
                show: false,
            },
            options: ['#CDDC39', '#F44336', '#E91E63', '#673AB7', '#FFEB3B', '#795548', '#009688', '#00BCD4', '#607D8B']
        }
    },
    mounted () {
        window.addEventListener('click', this.hide)
    },
    beforeDestroy () {
        window.removeEventListener('click', this.hide)
    },
    methods: {
        hide (e) {
            if (!catIn(e.target, this.$el)) {
                this.state.show = false
            }
        },
        toggle () {
            this.state.show = !this.state.show
        },
        touchColor (color) {
            this.color.value = color
        }
    }
}
</script>