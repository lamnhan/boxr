<script lang="ts" setup>
import {ref} from 'vue';

import {WEBGL} from './vendor/webGL'
import {Design, DesignUnit} from './types/design'

import Editor from './components/Editor.vue'
import Preview from './components/Preview.vue'

import sampleDesignUrl from './assets/images/box1.png'

const WEBGL_AVAILABLE = WEBGL.isWebGLAvailable()

const sampleDesign: Design = {
  sc: .9,
  units: [
    {
      outside: {
        image: sampleDesignUrl,
        parts: [
          {
            id: 201,
            x: 50,
            y: 65,
            w: 305,
            h: 150,
            pc: {x: 0, y: 200, z: -75, r: {x: -90}},
            po: {x: 0, y: 0, z: 0},
            t0: 'SOUT'
          },
          {
            id: 202,
            x: 50,
            y: 213,
            w: 305,
            h: 400,
            pc: {x: 0, y: 0, z: 0},
            po: {x: 0, y: 0, z: 0},
            t0: 'SOUT'
          },
          {
            id: 203,
            x: 355,
            y: 215,
            w: 150,
            h: 400,
            pc: {x: 152.5, y: 0, z: -75, r: {y: 90}},
            po: {x: 0, y: 0, z: 0},
            t0: 'SOUT'
          },
          {
            id: 204,
            x: 510,
            y: 217,
            w: 305,
            h: 400,
            pc: {x: 0, y: 0, z: -150, r: {y: 180}},
            po: {x: 0, y: 0, z: 0},
            t0: 'SOUT'
          },
          {
            id: 205,
            x: 815,
            y: 215,
            w: 150,
            h: 400,
            pc: {x: -152.5, y: 0, z: -75, r: {y: -90}},
            po: {x: 0, y: 0, z: 0},
            t0: 'SOUT'
          },
          {
            id: 206,
            x: 510,
            y: 610,
            w: 305,
            h: 150,
            pc: {x: 0, y: -200, z: -75, r: {x: 90}},
            po: {x: 0, y: 0, z: 0},
            t0: 'SOUT'
          },
        ]
      },
      inside: {
        image: '',
        parts: []
      }
    }
  ]
}

const mode = ref<'design' | 'preview'>('design')
const unit = ref(0)
const side = ref('outside' as keyof DesignUnit)
const textureData = ref<Record<string, string>>({})

function dataChange(value: Record<string, string>) {
  textureData.value = value
}

</script>

<template>
  <div class="webgl-unavailable" v-if="!WEBGL_AVAILABLE">No WebGL available!</div>
  <div class="main" v-else>

    <div class="header">
      <h1>BOX-R DESIGN</h1>
    </div>

    <div class="body">
      <div class="design-view" :style="{zIndex: mode === 'design' ? 1 : -1}">
        <Editor :design="sampleDesign" :unit="unit" :side="side" @change="dataChange($event)"></Editor>
      </div>
      <div class="preview-view" :style="{zIndex: mode === 'preview' ? 1 : -1}">
        <Preview :design-side="sampleDesign.units[unit][side]" :texture-data="textureData"></Preview>
      </div>
    </div>

    <div class="footer">
      <div class="mode">
        <button @click="mode = 'design'" :style="{background: mode === 'design' ? '#ddd' : '#fff'}">Design</button>
        <button @click="mode = 'preview'" :style="{background: mode === 'preview' ? '#ddd' : '#fff'}">Preview</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.main {
  position: relative;

  .header {
    position: fixed;
    z-index: 9;
    width: 100vw;
    height: 55px;
    top: 0;
    padding: 10px;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    
    h1 {
      font-size: 1.2rem;
    }
  }

  .body {
    position: relative;
    width: 100vw;
    height: 100vh;

    .design-view, .preview-view {
      background: #f1f1f1;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }

  .footer {
    position: fixed;
    z-index: 9;
    bottom: 1rem;
    left: 50%;
    margin-left: -120px;
    padding: 5px;

    button {
      background: #fff;
      border: none;
      outline: none;
      padding: 10px;
      width: 150px;
      cursor: pointer;

      &:hover {
        background: #ddd;
      }
    }
  }
}

</style>
