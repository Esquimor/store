<template>
  <div class="q-pa-md row wrap q-col-gutter-md full-width">
    <div 
      class="col-3"
      v-for="furniture in props.furnitures"
      :key="furniture.id"
    >
      <FurnitureCard
        :furniture="furniture"
        @addOrder="$emit('addOrder', furniture)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import FurnitureCard from "./FurnitureCard.vue";

const props = defineProps<{
  furnitures: {
    id: string;
    lastFurnitureVersion: {
      id: string;
      name: string;
      description: string;
    }
  }[]
}>()
</script>

<style>

</style>