<template>
  <q-card class="Item q-pb-xs cursor-pointer" @click="$emit('clickItem')">
    <Image
      :image="props.item.furnitureVersion.medias?.[0]?.base64 ?? undefined"
      style="width: 100%;height: 200px"
    />
    <q-card-section>
      <div class="text-h6 ellipsis">{{props.item.furnitureVersion.name}}</div>
    </q-card-section>

    <q-card-section class="q-py-none">
      <ItemBadge :status="props.item.status" />
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { ITEM_STATUS } from "../../../../commons/Interface/Item";
import ItemBadge from "../Item/ItemBadge.vue"
import Image from "../Global/Ui/Image.vue"

const props = defineProps<{
  item: {
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
  }
}>()
</script>

<style>
.Item {
  width: 14rem;
}
</style>