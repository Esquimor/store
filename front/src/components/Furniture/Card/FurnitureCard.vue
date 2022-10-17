<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">{{props.furniture?.lastFurnitureVersion?.name}}</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      {{props.furniture?.lastFurnitureVersion?.description}}
    </q-card-section>
    

    <q-separator />

    <q-card-actions align="right">
      <q-btn flat @click="$emit('addOrder')">Add to order</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps<{
  furniture: {
    id: string;
    lastFurnitureVersion: {
      id: string;
      name: string;
      description: string;
    }
  }
}>()
</script>