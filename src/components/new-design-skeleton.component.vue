<script lang="ts" setup>
import {defineEmits} from 'vue';

const emits = defineEmits<{
  (eventName: 'click'): void;
}>();

</script>

<template>
  <button @click="emits('click')">NEW</button>
</template>

<style lang="scss" scoped>

  button {
    background: none;
    border: 1px dashed #333;
    border-radius: 5px;
    padding: .5;
    width: 10rem;
    height: 15rem;
    cursor: pointer;
    font-size: 1.5rem;

    &:hover {
      background: #f1f1f1;
    }
  }

</style>
