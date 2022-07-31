<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card v-for="item in props.items" :key="item.id" class="my-card">
      <q-card-section>
        <div class="text-h6">{{item.furnitureVersion.name}}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <ItemBadge :status="item.status" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{item.furnitureVersion.description}}
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { ItemWithFurnitureVersionWithFurniture } from "../../../../commons/Interface/Item";
import ItemBadge from "../Item/ItemBadge.vue"

const props = defineProps<{
  items: ItemWithFurnitureVersionWithFurniture[]
}>()
</script>

<style>

</style>