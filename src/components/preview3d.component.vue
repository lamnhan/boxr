<script lang="ts" setup>
import {ref, computed, onMounted, watch} from 'vue';

import {Design2D} from '../objects/design2d.object';
import {Preview3D} from '../objects/preview3d.object';

import {Design, EditingData} from '../types/design.type'
import {TemplateUnit, PlacementMode} from '../types/template.type'

import { store } from '../store';

// refs
const previewContainerRef = ref();
const mode = ref<PlacementMode>('closed');

// computed
const lastSaved = computed(() => store.state.lastSaved);
const unitId = computed(() => store.state.editingUnitId)
const design = computed(() => store.state.editingDesign as Design)
const data = computed(() => store.state.editingData as EditingData)
const currentUnit = computed(() => data.value.template.spec.units.find(item => item.id === unitId.value) as TemplateUnit)
const modeChooserAvailable = computed(() => !!currentUnit.value.parts.find(item => !!item.po))

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
    .renderDesign('front', design.value.design_data['front'], currentUnit.value);
  const insideDesign2D = await new Design2D()
    .setScale(currentUnit.value.width_2d, currentUnit.value.height_2d)
    .createCanvas()
    .renderDesign('back', design.value.design_data['back'], currentUnit.value)
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
watch(mode, update)
watch(unitId, update)
watch(lastSaved, update)
</script>

<template>
  <div class="main">
    <div ref="previewContainerRef"></div>
  </div>
  <div class="footer">
    <div class="mode-chooser" v-if="modeChooserAvailable">
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
