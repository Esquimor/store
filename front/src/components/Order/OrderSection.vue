<template>
  <div>
    <h3 class="q-ma-md text-h6">
      {{props.orderStatus.label}}
    </h3>
    <div class="q-pa-md row wrap q-col-gutter-md">
      <OrdersCard :orders="props.orders" :color="props.orderStatus.color" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { OrderWithItemWithFurnitureVersionWithFurniture, ORDER_STATUS_ITEM_INTERFACE } from "../../../../commons/Interface/Order";
import OrdersCard from "./OrdersCard.vue";

const props = defineProps<{
  orderStatus: ORDER_STATUS_ITEM_INTERFACE,
  orders: OrderWithItemWithFurnitureVersionWithFurniture[]
}>()
</script>