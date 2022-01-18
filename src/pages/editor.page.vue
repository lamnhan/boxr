<script lang="ts" setup>
import {ref, computed} from 'vue';

import Editor2D from '../components/design2d.component.vue'
import Preview3D from '../components/preview3d.component.vue'

import {router} from '../router';
import {store} from '../store';

const design = computed(() => store.state.editingDesign)
const data = computed(() => store.state.editingData)

const mode = ref<'design' | 'preview'>('design')
const unit = ref(0)

store.dispatch(
  'loadEditingData',
  +((router.currentRoute.value.params.iid as string).split('-').pop() as string)
)
</script>

<template>

  <div class="main" v-if="design && data">

    <div class="header">
      <div class="info">
        <h1 class="title">{{ design.title }}</h1>
        <p>{{ data.template.display_size }}</p>
      </div>
      <div class="mode">
        <button @click="mode = 'design'" :style="{background: mode === 'design' ? '#ddd' : '#fff'}">Design</button>
        <button @click="mode = 'preview'" :style="{background: mode === 'preview' ? '#ddd' : '#fff'}">Preview</button>
      </div>
      <div class="purchasing">
        <div class="price"><strong>{{ data.template.base_price - data.template.sale_off + data.material.offset_price }}</strong><em>₫</em></div>
        <div class="action"><button>Purchase now</button></div>
      </div>
    </div>

    <div class="body">
      <div class="design-view" :style="{zIndex: mode === 'design' ? 1 : -1}">
        <Editor2D
          :design="design"
          :data="data"
          :unit="unit"
          @design-changed="store.dispatch('updateDesignData', $event)"
        ></Editor2D>
      </div>
      <div class="preview-view" :style="{zIndex: mode === 'preview' ? 1 : -1}">
        <Preview3D
          :design="design"
          :data="data"
          :unit="unit"
        ></Preview3D>
      </div>
    </div>

  </div>

</template>

<style lang="scss" scoped>
  .main {
    position: relative;

    .header {
      z-index: 3;
      position: fixed;
      top: 0;
      left: 0;
      width: calc(100% - 2rem);
      height: 59px;
      padding: .5rem 1rem;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      background: #ffffff;
      border-bottom: 1px solid #ccc;

      .info {

        h1 {
          font-size: 1.2rem;
          margin: 0;
        }

        p {
          margin: 0;
          font-size: .9rem;
          color: #777777;
        }
      }

      .mode {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;

        button {
          background: #fff;
          border: none;
          outline: none;
          padding: 10px;
          width: 150px;
          cursor: pointer;
          border: 1px solid #777777;

          &:hover {
            background: #ddd;
          }

          &:first-child {
            border-right: 0;
            border-radius: 5px 0 0 5px;
          }

          &:last-child {
            border-radius: 0 5px 5px 0;
          }
        }
      }

      .purchasing {
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        
        .price {
          margin-right: 1.5rem;

          strong {
            margin-right: .25rem;
            font-size: 1.1rem;
          }
        }

        .action {

          button {
            background: #333333;
            color: #ffffff;
            border: none;
            border-radius: 5px;
            outline: none;
            padding: 10px;
            width: 150px;
            cursor: pointer;

            &:hover {
              opacity: .7;
            }
          }
        }
      }
    }

    .body {
      position: relative;
      overflow: hidden;
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
  }
</style>