<script lang="ts" setup>
import {ref, computed, onMounted, watch} from 'vue'

import Toolbar2d from './toolbar2d.component.vue';

import {Design, EditingData, DesignSide} from '../types/design.type'
import {TemplateUnit} from '../types/template.type';

import {Design2D} from '../objects/design2d.object';

import { store } from '../store';

import recycleSymbol from '../assets/recycle.png';
import upSymbol from '../assets/up.png';
import drySymbol from '../assets/dry.png';

const sampleSymbols = [recycleSymbol, upSymbol, drySymbol];

let design2D!: Design2D;

// ref
const side = ref<DesignSide>('front')
const showSubmenu = ref<Record<string, boolean>>({})
const canvasSelection = ref<any>();

// computed
const unitId = computed(() => store.state.editingUnitId)
const design = computed(() => store.state.editingDesign as Design)
const data = computed(() => store.state.editingData as EditingData)
const lastSaved = computed(() => store.state.lastSaved || new Date(design.value.updated_at));
const templateUnits = computed(() => data.value.template.spec.units)
const currentUnit = computed(() => data.value.template.spec.units.find(item => item.id === unitId.value) as TemplateUnit)

// helpers
function emitDesignChanged(data: any) {
  store.dispatch('updateLastSaved')
  store.dispatch('updateDesign', { side: side.value, data })
}

// methods
function renderCanvas() {
  design2D = new Design2D()
    .setScale(currentUnit.value.width_2d, currentUnit.value.height_2d)
    .renderCanvas('canvas-2d', (design2D: Design2D) => emitDesignChanged({ canvasJSON: JSON.stringify(design2D.toJSON()) }))
    .onSelected(e => canvasSelection.value = e);
}

function renderDesign() {
  design2D.renderDesign(side.value, design.value.design_data[unitId.value][side.value], currentUnit.value)
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

function changeUnit(unitId: number) {
  store.dispatch('updateUnitId', unitId)
    .then(() => side.value === 'front' ? false : changeSide('front'))
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

function downloadPDF() {
  design2D.toPDF().then(doc => doc.save(`${design.value.title} - ${side.value}.pdf`))
}

function toggleBackdrop(e: any) {
  const showBackdrop = e.target.checked;
  design2D.toggleBackdrop(showBackdrop);
  emitDesignChanged({ showBackdrop });
}

function toggleNumbering(e: any) {
  const showNumbering = e.target.checked;
  design2D.toggleNumbering(showNumbering);
  emitDesignChanged({ showNumbering });
}

function toggleFolding(e: any) {
  const showFolding = e.target.checked;
  design2D.toggleFolding(showFolding);
  emitDesignChanged({ showFolding });
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
watch(unitId, () => {
  design2D.canvas.dispose()
  init()
})
</script>

<template>
  <div class="header">
    <div class="toolbar">
      <Toolbar2d :selection="canvasSelection"></Toolbar2d>
    </div>
  </div>
  <div class="main">
    <div class="left-tools">
      <section class="units">
        <div class="head">Units</div>
        <div class="body">
          <ul>
            <li
              v-for="(unitItem, i) in templateUnits"
              :key="i"
              :class="{ active: unitItem.id === currentUnit.id }"
              @click="changeUnit(unitItem.id)"
            >
              <img :src="unitItem.thumbnail" :alt="unitItem.title">
              <span>{{ unitItem.title }}</span>
            </li>
          </ul>
        </div>
      </section>
      <section class="export">
        <div class="head">Export</div>
        <div class="body">
          <button @click="downloadPDF()">Save PDF</button>
        </div>
      </section>
    </div>
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
              <ul><li v-for="(symbolItem, i) in sampleSymbols" @click="addSymbol(symbolItem)" :key="i"><img :src="symbolItem"></li></ul>
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
                <input type="checkbox" @change="toggleBackdrop($event)" :checked="design.design_data[unitId][side].showBackdrop">
              </label>
              <label>
                <span>Show part number</span>
                <input type="checkbox" @change="toggleNumbering($event)" :checked="design.design_data[unitId][side].showNumbering">
              </label>
              <label>
                <span>Show folding lines</span>
                <input type="checkbox" @change="toggleFolding($event)" :checked="design.design_data[unitId][side].showFolding">
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
    <div class="left">
      <span>Last saved: </span><strong>{{ lastSaved }}</strong>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.header {
  z-index: 3;
  position: relative;
  width: 100vw;
  height: 0;
  padding-top: 75px;

  .toolbar {
    position: absolute;
    width: calc(100vw - 200px);
    height: 45px;
    top: 75px;
    left: 150px;
    background: #fff;
    border-bottom: 1px solid #ccc;

    ul {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  }
}

.main {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;

  .left-tools {
    width: 149px;
    height: calc(100vh - 100px);
    background: #fff;
    border-right: 1px solid #ccc;

    section {

      .head {
        background: #f1f1f1;
        font-size: 14px;
        color: #333333;
        padding: 5px 10px;
        border-top: 1px solid #cccccc;
        border-bottom: 1px solid #cccccc;
      }

      .body {
        padding: 10px;
      }
    }

    .units {
      height: 50%;

      ul {
        list-style: none;
        margin: 0;
        padding: 0 15px;

        li {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          padding: 10px;
          margin: 10px 0;
          border: 1px solid #f1f1f1;
          border-radius: 5px;
          cursor: pointer;

          &:hover {
            background: #f1f1f1;
          }

          &.active {
            background: #f1f1f1;
            border-color: #333333;
          }

          img {
            width: 48px;
          }
          
          span {
            display: block;
            width: 100%;
            text-align: center;
            margin-top: 5px;
            font-size: 12px;
            color: #777777;
          }
        }
      }
    }

    .export {

      button {
        background: #333333;
        color: #ffffff;
        border: none;
        border-radius: 5px;
        outline: none;
        padding: 10px;
        width: 100%;
        cursor: pointer;

        &:hover {
          opacity: .7;
        }
      }      
    }
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
            font-size: 14px;
            padding: 5px 10px;
            border-bottom: 1px solid #cccccc;
            color: #333333;
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

  .left {
    font-size: 10px;
    padding: 5px 10px;
  }
}

</style>