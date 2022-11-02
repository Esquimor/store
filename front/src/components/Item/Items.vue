<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <Item v-for="item in props.items" :key="item.id" :item="item" @clickItem="$emit('clickItem', item)"/>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { ITEM_STATUS } from "../../../../commons/Interface/Item";
import Item from "../Item/Item.vue"

const props = defineProps<{
  items: {
    status: ITEM_STATUS;
    id: string;
    furnitureVersion: {
      id: string;
      description: string;
      name: string;
      medias: {
        id: string;
        base64: string;
      }[]
    }
  }[]
}>()
</script>