<script lang="ts" setup>
import {ref, computed, defineProps, defineEmits, onMounted, onUpdated} from 'vue'

import {Design, EditingData} from '../types/design.type'
import {TemplateSideName} from '../types/template.type'

import {Design2D} from '../objects/design2d.object';

// inputs
const props = defineProps<{
  design: Design;
  data: EditingData;
  unit: number;
}>();

// ref
const side = ref<TemplateSideName>('outside')

// computed
const currentUnit = computed(() => props.data.template.spec.units[props.unit])
const currentSide = computed(() => currentUnit.value[side.value])
const currentParts = computed(() => currentSide.value.parts)

// outputs
const emits = defineEmits<{
  (event: 'canvasChanged', design2D: Design2D): void;
}>();

// canvas
let design2D!: Design2D

// methods
function render() {
  design2D = new Design2D()
    .setScale(currentUnit.value.width_2d, currentUnit.value.height_2d)
    .renderCanvas('canvas-2d', (design2D: Design2D) => emits('canvasChanged', design2D))
    .renderBackdrop(side.value, props.design.design_data, currentParts.value)
}

// init
onMounted(() => {
  render()
})

// updated
onUpdated(() => {
  design2D.clear()
  render()
})
</script>

<template>
  <div class="main">
    <div class="left-tools"></div>
    <div id="editor-container"><canvas id="canvas-2d"></canvas></div>
    <div class="right-tools"></div>
  </div>
  <div class="footer">
    <div class="side-chooser">
      <button @click="side='outside'" :style="{background: side === 'outside' ? '#ddd' : '#fff'}">Outside</button>
      <button @click="side='inside'" :style="{background: side === 'inside' ? '#ddd' : '#fff'}">Inside</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.main {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  padding-top: 75px;

  .left-tools {
    width: 149px;
    height: calc(100vh - 100px);
    background: #fff;
    border-right: 1px solid #ccc;
  }

  #editor-container {
    flex: 1;
    width: calc(100vw - 200px);
    height: calc(100vh - 100px);
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
  }

  .right-tools {
    width: 49px;
    height: calc(100vh - 100px);
    background: #fff;
    border-left: 1px solid #ccc;
  }
}

.footer {
  z-index: 3;
  position: relative;
  width: 100vw;
  height: 25px;
  background: #fff;
  border-top: 1px solid #ccc;

  .side-chooser {
    position: absolute;
    top: -45px;
    left: 50%;
    margin-left: -120px;

    button {
      background: #fff;
      border: none;
      outline: none;
      padding: .5rem;
      width: 120px;
      cursor: pointer;

      &:hover {
        background: #ddd;
      }

      &:first-child {
        border-right: 1px solid #ccc;
        border-radius: 5px 0 0 5px;
      }

      &:last-child {
        border-radius: 0 5px 5px 0;
      }
    }
  }
}

</style>