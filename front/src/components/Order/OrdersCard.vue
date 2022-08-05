<template>
  <OrderCard class="col-4" v-for="order in props.orders" :key="order.id" :order="order" :color="props.color"/>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { OrderWithItemWithFurnitureVersionWithFurniture } from "../../../../commons/Interface/Order";
import OrderCard from "./OrderCard.vue"

const props = defineProps<{
  orders: OrderWithItemWithFurnitureVersionWithFurniture[];
  color?: string;
}>()
</script>