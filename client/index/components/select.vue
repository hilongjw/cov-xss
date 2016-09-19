<style>
    .select-wrapper {
        position: relative;
        width: 100%;
    }
    .select-value {
        display: flex;
        box-sizing: border-box;
        width: 100%;
        background: #fff;
        min-height: 2rem;
        overflow-x: auto;
        border-bottom: 1px solid #ccc;
    }
    .select-tag {
        display: inline-block;
        flex-shrink: 0;
        margin-right: .5rem;
        height: 1.5rem;
        line-height: 1.5rem;
        padding: 0 .5rem;
        border: 1px solid #5edaa4;
        border-radius: .8rem;
        color: #5edaa4;
    }
    .select-tag-value {
        display: inline-block;
    }
    .select-tag-value-icon {
        margin-left: 1rem;
    }
    .select-options {
        position: absolute;
        width: 100%;
        background: #fff;
        box-shadow: 0 0 1rem #ccc;
        max-height: 18rem;
        overflow-y: auto;
        z-index: 5;
    }
    .select-option-item {
        position: relative;
        padding: 1rem; 
    }
    .select-option-item:hover {
        background-color: #eee;
    }
    .select-option-item.selected .select-option-item-icon {
        color: #57d8a0;
    }
    .select-option-item-icon {
        position: absolute;
        right: 1rem;
        font-size: 1rem;
    }
</style>
<template>
    <div class="select-wrapper">
        <div class="select-value" @click="show">
            <div class="select-tag" v-for="tag in select.value">
                <div class="select-tag-value">{{tag.text}}</div>
                <span class="ion-ios-close-outline select-tag-value-icon" @click="unSelectOption($event, tag)"></span>
            </div>
        </div>
        <div class="select-options" v-show="state.showOptions">
            <div 
                class="select-option-item" 
                :class="{ 'selected': option.selected }"
                v-for="option in select.options" 
                @click="touchOption(option)"
            >{{option.text}}
            <span class="ion-ios-checkmark-outline select-option-item-icon"></span>
            </div>
        </div>
    </div>
</template>

<script>
import { catIn } from '../utils'
export default {
    props: {
        select: Object
    },
    data () {
        return {
            state: {
                showOptions: false
            }
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
                this.state.showOptions = false
            }
        },
        show () {
            this.state.showOptions = true
        },
        touchOption (item) {
            if (!item.selected) {
                item.selected = true
                if (!this.select.value.find(i => i === item)) {
                    this.select.value.push(item)
                }
            } else {
                this.unSelectOption(null, item)
            }
            this.$emit('update')
        },
        addRemoveList (item) {
            if (!this.select.remove.find(i => i === item)) {
                this.select.remove.push(item)
            }
        },
        unSelectOption (e, item) {
            if (e) e.stopPropagation()
            item.selected = false
            this.select.value.forEach((t, i) => {
                if (t === item) {
                    this.addRemoveList(t)
                    this.select.value.splice(i, 1)
                }
            })
        }
    }
}
</script>