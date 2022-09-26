<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">{{latestFurnitureVersion.name}}</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      {{latestFurnitureVersion.description}}
    </q-card-section>
    

    <q-separator />

    <q-card-actions align="right">
      <q-btn flat @click="$emit('addOrder')">Add to order</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts" setup>
import { defineProps, computed } from "vue";
import { FurnitureWithLatestFurnitureVersion } from "../../../../../commons/Interface/Furniture";

const props = defineProps<{
  furniture: FurnitureWithLatestFurnitureVersion
}>()

const latestFurnitureVersion = computed(() => props.furniture.furnitureVersions[0]);
</script>