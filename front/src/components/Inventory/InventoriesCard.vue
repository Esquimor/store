<template>
  <div class="q-pa-md row wrap q-col-gutter-md full-width">
    <div 
      class="col-3"
      v-for="inventory in props.inventories"
      :key="inventory.id"
    >
      <InventoryCard
        :inventory="inventory"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { InventoryWithFurnitureVersion } from "../../../../../commons/Interface/Inventory";
import InventoryCard from "./InventoryCard.vue";

const props = defineProps<{
  inventories: InventoryWithFurnitureVersion[]
}>()
</script>

<style>

</style>