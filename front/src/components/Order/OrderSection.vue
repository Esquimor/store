<template>
  <q-card flat bordered class="q-my-md q-pa-none">
    <q-card bordered :class="classTitleSection">
      <h3 class="text-h6 q-ma-none q-pa-md">
        {{props.orderStatus.label}}
      </h3>
    </q-card>
    <div class="q-pa-md row wrap q-col-gutter-md">
      <OrdersCard :orders="props.orders" />
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { OrderWithItemWithFurnitureVersionWithFurniture, ORDER_STATUS_ITEM_INTERFACE } from "../../../../commons/Interface/Order";
import OrdersCard from "./OrdersCard.vue";

const props = defineProps<{
  orderStatus: ORDER_STATUS_ITEM_INTERFACE,
  orders: OrderWithItemWithFurnitureVersionWithFurniture[]
}>()

const classTitleSection = computed(() => {
  return `bg-${props.orderStatus.color || "primary"} text-white q-pa-none`
})
</script>