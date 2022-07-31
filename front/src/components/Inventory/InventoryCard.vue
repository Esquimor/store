<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">{{props.inventory.furnitureVersion.name}}</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      {{props.inventory.furnitureVersion.description}}
    </q-card-section>

    <q-card-section class="q-pt-none">
      {{props.inventory.quantity}}
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { InventoryWithFurnitureVersion } from "../../../../../commons/Interface/Inventory";

const props = defineProps<{
  inventory: InventoryWithFurnitureVersion
}>()
</script>