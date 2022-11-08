<template>
  <div>
    <FurnitureDrawerSearch v-bind="$attrs"/>
    <q-separator />
    <FurnitureDrawerCategories v-bind="$attrs" @changeCategory="(id) => $emit('changeCategory', id)" />
  </div>
</template>

<script lang="ts" setup>
import FurnitureDrawerSearch from "./FurnitureDrawerSearch.vue"
import FurnitureDrawerCategories from "./FurnitureDrawerCategories.vue"
</script>