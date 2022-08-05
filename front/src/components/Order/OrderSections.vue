<template>
  <template
    v-for="orderSection in Object.entries(props.orders)"
    :key="orderSection[0]"
  >
    <OrderSection
      v-if="orderSection[1].length !== 0"
      :orders="orderSection[1]"
      :orderStatus="getOrderStatusItemForOrderStatus(orderSection[0])"
      class="full-width"
    />
  </template>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { OrdersRangedByStatusWithItemWithFurnitureVersionWithFurniture } from "../../../../commons/Interface/Order";
import OrderSection from "./OrderSection.vue";
import { getOrderStatusItemForOrderStatus } from "../../../../commons/Technical/Order";

const props = defineProps<{
  orders: OrdersRangedByStatusWithItemWithFurnitureVersionWithFurniture
}>()
</script>