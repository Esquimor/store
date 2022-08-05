<template>
  <q-page padding class="row justify-center">
    <div class="col col-lg-8 col-md-10 col-sx-12">
      <div class="row justify-between items-center">
        <h2 style="margin-top: 0px; margin-bottom: 0px;">Orders</h2>
      </div>
      <div class="q-pa-md row wrap q-col-gutter-md">
        <OrderSections :orders="ordersOrganizeByStatus" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { onMounted, computed } from "vue";
import { useStore } from "../store/index";
import OrderRequest from "../request/OrderRequest";
import { OrderActionTypes } from "../store/order/action-types";
import OrderSections from "../components/Order/OrderSections.vue"
import { OrderWithItemWithFurnitureVersionWithFurniture, ORDER_STATUS } from "../../../commons/Interface/Order";

const $store = useStore()

const orders = computed(() => $store.state.order.orders);

const ordersOrganizeByStatus = orders.value.reduce<{
  [order: string]: OrderWithItemWithFurnitureVersionWithFurniture[]
}>((acc, order: OrderWithItemWithFurnitureVersionWithFurniture) => {
  acc[order.status] = [...acc[order.status], order];
  return acc;
}, { 
    [ORDER_STATUS.CREATED]: [],
    [ORDER_STATUS.VALIDATED]: [],
    [ORDER_STATUS.ORDERED]: [],
    [ORDER_STATUS.FINISHED]: []
  }
)

onMounted(() => {
  void OrderRequest.GetForMe()
    .then(({ orders }) => {
      void $store.dispatch(`order/${OrderActionTypes.SET_ORDERS}`, orders)
    })
})
</script>
