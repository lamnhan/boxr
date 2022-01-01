<script lang="ts" setup>
import {ref, defineProps, defineEmits, onMounted} from 'vue'

import {Design, DesignUnit, DesignPart} from '../types/design';

const props = defineProps<{
  design: Design;
  unit: number;
  side: keyof DesignUnit;
}>();

const emits = defineEmits<{
  (event: 'change', dataUrls: Record<string, string>): void
}>()

const canvasRef = ref();
let canvasEl!: HTMLCanvasElement;
let canvas!: CanvasRenderingContext2D;

onMounted(() => {
  // set canvas
  canvasEl = canvasRef.value;
  canvas = canvasEl.getContext('2d')!;
  // draw image
  const imgEl = document.createElement('img');
  imgEl.addEventListener('load', () => {
    const width = imgEl.width * props.design.sc
    const height = imgEl.height * props.design.sc
    setTimeout(() => {
      canvas.drawImage(imgEl, 0, 0, width, height)
      canvasEl.style.visibility = 'visible';
      onChange()
    }, 1000)
    canvasEl.width = width;
    canvasEl.height = height;
  });
  imgEl.src = props.design.units[props.unit][props.side].image;
})

function onChange() {
  const dataUrls = props.design.units[props.unit][props.side].parts.reduce(
    (result, item) => {
      result[item.id] = sliceImage(item).toDataURL();
      return result;
    },
    {} as Record<string, string>
  )
  emits('change', dataUrls)
}

function sliceImage(partData: DesignPart) {
  const beginX = partData.x * props.design.sc;
  const beginY = partData.y * props.design.sc;
  const endX = (partData.x + partData.w) * props.design.sc;
  const endY = (partData.y + partData.h) * props.design.sc;
  const imageData = canvas.getImageData(beginX, beginY, endX, endY);
  const canvasEl = document.createElement('canvas');
  canvasEl.width = endX - beginX;
  canvasEl.height = endY - beginY;
  (canvasEl.getContext('2d') as CanvasRenderingContext2D).putImageData(imageData, 0, 0);
  return canvasEl;
}

</script>

<template>
  <div id="editor-container">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<style lang="scss" scoped>

  #editor-container {
    padding: 100px 0 0;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;

    canvas {
      visibility: hidden;
    }
  }

</style>