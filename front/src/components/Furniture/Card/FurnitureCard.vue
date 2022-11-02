<template>
  <q-card class="cursor-pointer">
    <Image
      :image="props.furniture.lastFurnitureVersion.medias?.[0]?.base64 ?? undefined"
      style="width: 100%;height: 200px"
      @click="$emit('select')"
    />
    <q-card-section
      @click="$emit('select')"
    >
      <div class="text-h6">{{props.furniture?.lastFurnitureVersion?.name}}</div>
    </q-card-section>
    
    <q-separator />

    <q-card-actions align="right">
      <q-btn flat color="grey-6" @click="$emit('addOrder')">{{$t("order.add_to_order")}}</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import Image from "../../Global/Ui/Image.vue"

const props = defineProps<{
  furniture: {
    id: string;
    lastFurnitureVersion: {
      id: string;
      name: string;
      description: string;
      medias: {
        id: string;
        base64: string;
      }[]
    }
  }
}>()
</script>