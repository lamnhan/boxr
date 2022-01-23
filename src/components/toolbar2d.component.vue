<script lang="ts" setup>
import {defineProps, watch} from 'vue';

const props = defineProps<{ selection: any }>()

function onSelected() {
  console.log(props.selection)
}

watch(props, onSelected)
</script>

<template>
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>
</template>

<style lang="scss" scoped>
</style>