<template>
  <div class="q-pa-md row wrap q-col-gutter-md full-width">
    <div 
      class="col-6 q-pa-md"
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
import { Inventory } from "../../../../../commons/Interface/Inventory";
import InventoryCard from "./InventoryCard.vue";

const props = defineProps<{
  inventories: Inventory[]
}>()
</script>

<style>

</style>