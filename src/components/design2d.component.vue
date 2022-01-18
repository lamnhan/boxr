<script lang="ts" setup>
import {ref, computed, defineProps, defineEmits, onMounted, watch} from 'vue'

import {Design, EditingData, DesignSide} from '../types/design.type'

import {Design2D} from '../objects/design2d.object';

import recycleSymbol from '../assets/recycle.png';
import upSymbol from '../assets/up.png';
import drySymbol from '../assets/dry.png';

// inputs
const props = defineProps<{
  design: Design;
  data: EditingData;
  unit: number;
}>();

// ref
const side = ref<DesignSide>('front')

const showSubmenu = ref<Record<string, boolean>>({})

// computed
const currentUnit = computed(() => props.data.template.spec.units[props.unit])

// outputs
const emits = defineEmits<{
  (event: 'designChanged', data: Record<string, any>): void;
}>();

// canvas
let design2D!: Design2D

const sampleShapes = [recycleSymbol, upSymbol, drySymbol];

// helpers
function buildDataForDesignChanged(data: any) {
  return { side: side.value, data }
}

// methods
function renderCanvas() {
  design2D = new Design2D()
    .setScale(currentUnit.value.width_2d, currentUnit.value.height_2d)
    .renderCanvas(
      'canvas-2d',
      (design2D: Design2D) =>
        emits(
          'designChanged',
          buildDataForDesignChanged({ canvasJSON: JSON.stringify(design2D.toJSON()) })
        )
    );
}

function renderDesign() {
  design2D.renderDesign(side.value, props.design.design_data[side.value], currentUnit.value)
}

function init() {
  renderCanvas()
  renderDesign()
}

function update() {
  design2D.clear()
  renderDesign()
}

function changeSide(newSide: DesignSide) {
  side.value = newSide;
}

function addText() {
  design2D.addText()
}

function addSymbol(url: string) {
  design2D.addImage(url)
}

function uploadImage(e: any) {
  if (!e.target.files[0]) return
  const reader = new FileReader();
  reader.addEventListener('load', e => design2D.addImage(e.target?.result as string)); 
  reader.readAsDataURL(e.target.files[0]);
}

function toggleBackdrop(e: any) {
  const showBackdrop = e.target.checked;
  emits('designChanged', buildDataForDesignChanged({ showBackdrop }));
  design2D.toggleBackdrop(showBackdrop);
}

function toggleNumbering(e: any) {
  const showNumbering = e.target.checked;
  emits('designChanged', buildDataForDesignChanged({ showNumbering }));
  design2D.toggleNumbering(showNumbering);
}

function toggleSubmenu(name: string) {
  Object.keys(showSubmenu.value).forEach(key => {
    if (key === name) {
      showSubmenu.value[key] = !showSubmenu.value[key]
    } else {
      showSubmenu.value[key] = false
    }
  })
  if (showSubmenu.value[name] === undefined) {
    showSubmenu.value[name] = true;
  }
}

onMounted(init)
watch(side, update)
</script>

<template>
  <div class="main">
    <div class="left-tools"></div>
    <div id="editor-container"><canvas id="canvas-2d"></canvas></div>
    <div class="right-tools">
      <ul class="menu">
        <li class="text">
          <button @click="addText()"><i class="icon icon-text"></i></button>
        </li>
        <li class="image">
          <label>
            <i class="icon icon-image"></i>
            <input type="file" @change="uploadImage($event)" style="display:none;" />
          </label>
        </li>
        <li class="symbol">
          <button  @click="toggleSubmenu('symbol')"><i class="icon icon-symbol"></i></button>
          <div class="sub-menu" v-if="showSubmenu['symbol']">
            <div class="head">Add symbol</div>
            <div class="body">
              <ul><li v-for="(item, i) in sampleShapes" @click="addSymbol(item)"><img :src="item"></li></ul>
            </div>
          </div>
        </li>
        <li class="view">
          <button @click="toggleSubmenu('view')"><i class="icon icon-eye"></i></button>
          <div class="sub-menu" v-if="showSubmenu['view']">
            <div class="head">View options</div>
            <div class="body">
              <label>
                <span>Show background</span>
                <input type="checkbox" @change="toggleBackdrop($event)" :checked="design.design_data[side].showBackdrop">
              </label>
              <label>
                <span>Show part number</span>
                <input type="checkbox" @change="toggleNumbering($event)" :checked="design.design_data[side].showNumbering">
              </label>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div class="footer">
    <div class="side-chooser">
      <button @click="changeSide('front')" :style="{background: side === 'front' ? '#ddd' : '#fff'}">Outside</button>
      <button @click="changeSide('back')" :style="{background: side === 'back' ? '#ddd' : '#fff'}">Inside</button>
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

    .icon {
      display: inline-block;
      width: 32px;
      height: 32px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      content: '';

      &.icon-text {
        background-image: url('https://icons.getbootstrap.com/assets/icons/fonts.svg');
      }

      &.icon-image {
        background-image: url('https://icons.getbootstrap.com/assets/icons/image.svg');
      }

      &.icon-symbol {
        background-image: url('https://icons.getbootstrap.com/assets/icons/star-fill.svg');
      }

      &.icon-eye {
        background-image: url('https://icons.getbootstrap.com/assets/icons/eye-fill.svg');
      }
    }

    ul.menu {
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        position: relative;
        margin-top: 10px;

        & > button, & > label {
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          border-radius: 5px;
          background: none;
          text-align: center;
          padding: 10px 12px;

          .icon {
            width: 25px;
            height: 25px;
          }

          &:hover, &:focus {
            background: #f1f1f1;
          }
        }

        .sub-menu {
          width: 200px;
          position: absolute;
          top: 0;
          right: 50px;
          border-radius: 5px;
          background: #ffffff;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

          .head {
            padding: 5px 10px;
            border-bottom: 1px solid #cccccc;
            color: #777777;
          }

          .body {
            padding: 10px;
          }
        }

        &.symbol {

          .sub-menu {

            .body ul {
              list-style: none;
              margin: 0;
              padding: 0;

              li {
                display: inline-block;
                width: 50px;
                margin-right: 10px;

                img {
                  width: 100%;
                }
              }
            }
          }
        }

        &.view {

          .sub-menu {

            .body label {
              display: flex;
              flex-wrap: nowrap;
              align-items: center;

              span {
                flex: 1;
              }
            }
          }
        }
      }
    }

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