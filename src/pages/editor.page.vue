<script lang="ts" setup>
import {ref, computed} from 'vue';

import Editor2D from '../components/design2d.component.vue'
import Preview3D from '../components/preview3d.component.vue'

import {router} from '../router';
import {store} from '../store';

const unitId = computed(() => store.state.editingUnitId)
const design = computed(() => store.state.editingDesign)
const data = computed(() => store.state.editingData)

const notFound = ref<boolean>(false)
const mode = ref<'design' | 'preview'>('design')

function goHome() {
  router.push({ name: 'home' })
}

function goPurchase() {
  alert('Hooray! You bought yourself some boxes!')
}

store.dispatch(
  'loadEditing',
  +(router.currentRoute.value.params.id as string)
)
.catch(() => notFound.value = true)
</script>

<template>

  <template v-if="!notFound">

    <div class="main" v-if="unitId && design && data">
  
      <div class="header">
        <div class="back">
          <button @click="goHome()"><i class="icon icon-back"></i></button>
        </div>
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
          <div class="action"><button @click="goPurchase()">Purchase now</button></div>
        </div>
      </div>
  
      <div class="body">
        <div class="design-view" :style="{zIndex: mode === 'design' ? 1 : -1}">
          <Editor2D></Editor2D>
        </div>
        <div class="preview-view" :style="{zIndex: mode === 'preview' ? 1 : -1}">
          <Preview3D></Preview3D>
        </div>
      </div>
  
    </div>

  </template>

  <div class="not-found" v-else>
    <img src="https://img.icons8.com/external-prettycons-flat-prettycons/250/000000/external-404-web-and-seo-prettycons-flat-prettycons.png" alt="Design not found!">
    <p>Sorry, this design is not available.</p>
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

      .back {

        button {
          border: none;
          background: none;
          cursor: pointer;
        }

        .icon {
          display: inline-block;
          width: 32px;
          height: 32px;
          background-repeat: no-repeat;
          background-position: center;
          background-size: contain;
          content: '';

          &.icon-back {
            background-image: url('https://icons.getbootstrap.com/assets/icons/arrow-left.svg');
          }
        }
      }

      .info {
        margin-left: 1rem;

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

  .not-found {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: 7rem 0;

    p {
      width: 100%;
      margin-top: 2rem;
      color: #333333;
      font-size: 1.3rem;
      text-align: center;
    }
  }
</style>