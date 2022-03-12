<script lang="ts" setup>
import {defineEmits} from 'vue';

const emits = defineEmits<{
  (eventName: 'click'): void;
}>();

</script>

<template>
  <button @click="emits('click')">
    <img src="https://img.icons8.com/external-xnimrodx-lineal-xnimrodx/75/000000/external-new-e-commerce-and-business-xnimrodx-lineal-xnimrodx.png"/>
  </button>
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

    &:hover {
      background: #f1f1f1;
    }

    img {
      opacity: .5;
    }
  }

</style>
