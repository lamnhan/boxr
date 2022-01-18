<script lang="ts" setup>
import {ref, computed, defineProps, onMounted, onUpdated, watch} from 'vue';

import {Design2D} from '../objects/design2d.object';
import {Preview3D} from '../objects/preview3d.object';

import {Design, EditingData} from '../types/design.type'
import {PlacementMode} from '../types/template.type'

// props
const props = defineProps<{
  design: Design;
  data: EditingData;
  unit: number;
}>();

// refs
const previewContainerRef = ref();
const mode = ref<PlacementMode>('closed');

// computed
const currentUnit = computed(() => props.data.template.spec.units[props.unit])

let preview3D!: Preview3D;

function renderCanvas() {
  preview3D = new Preview3D()
    .setScale(currentUnit.value.width_3d, currentUnit.value.height_3d)
    .renderCanvas(previewContainerRef.value)
    .animate();
}

async function renderDesign() {
  const outsideDesign2D = await new Design2D()
    .setScale(currentUnit.value.width_2d, currentUnit.value.height_2d)
    .createCanvas()
    .renderDesign('front', props.design.design_data['front'], currentUnit.value);
  const insideDesign2D = await new Design2D()
    .setScale(currentUnit.value.width_2d, currentUnit.value.height_2d)
    .createCanvas()
    .renderDesign('back', props.design.design_data['back'], currentUnit.value)
  const outsideTextures = outsideDesign2D.getDataUrls();
  const insideTextures = insideDesign2D.getDataUrls();
  preview3D
    .renderDesign(mode.value, currentUnit.value, {outsideTextures, insideTextures});
}

function init() {
  renderCanvas();
  renderDesign();
}

function update() {
  preview3D.clear();
  renderDesign();
}

function changeMode(newMode: PlacementMode) {
  mode.value = newMode;
}

onMounted(init)
watch(props, update)
watch(mode, update)
</script>

<template>
  <div class="main">
    <div ref="previewContainerRef"></div>
  </div>
  <div class="footer">
    <div class="mode-chooser">
      <button @click="changeMode('closed')" :style="{background: mode === 'closed' ? '#ddd' : '#fff'}">Closed</button>
      <button @click="changeMode('opened')" :style="{background: mode === 'opened' ? '#ddd' : '#fff'}">Opened</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.main {}

.footer {
  z-index: 3;
  position: relative;
  width: 100vw;
  height: 0;

  .mode-chooser {
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
        border-left: 1px solid #ccc;
        border-radius: 0 5px 5px 0;
      }
    }
  }
}

</style>
