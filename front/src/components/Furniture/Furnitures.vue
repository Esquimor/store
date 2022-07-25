<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card v-for="furniture in props.furnitures" :key="furniture.id" class="my-card">
      <q-card-section>
        <div class="text-h6">{{furniture.name}}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <FurnitureBadge :status="furniture.status" />
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{furniture.description}}
      </q-card-section>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { Furniture } from "../../../../commons/Interface/Furniture";
import FurnitureBadge from "./FurnitureBadge.vue"

const props = defineProps<{
  furnitures: Furniture[]
}>()
</script>

<style>

</style>