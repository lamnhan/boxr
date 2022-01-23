<script lang="ts" setup>
import {ref, defineProps, watch} from 'vue';

import Toolbar2DGeneral from './toolbar2d-general.component.vue';
import Toolbar2DText from './toolbar2d-text.component.vue';

const props = defineProps<{ selection: any }>()

const name = ref<string>('none')

function onSelected() {
  // TODO: handle aelection
}

watch(props, onSelected)
</script>

<template>
  <Toolbar2DGeneral></Toolbar2DGeneral>
  <Toolbar2DText v-if="name==='text'"></Toolbar2DText>
</template>

<style lang="scss" scoped>

</style>