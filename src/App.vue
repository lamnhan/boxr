<script lang="ts" setup>
import {WEBGL} from './vendor/webGL.vendor'
const WEBGL_AVAILABLE = WEBGL.isWebGLAvailable()
</script>

<template>
  <div class="webgl-unavailable" v-if="!WEBGL_AVAILABLE">No WebGL available!</div>
  <div class="page-container" v-else>
    <router-view></router-view>
  </div>
</template>

<style lang="scss"></style>
