<template>
  <q-page padding class="row justify-center">
    <div v-if="!order">loader</div>
    <div v-else class="col col-lg-8 col-md-10 col-sx-12">
      <q-card class="q-pa-xs row justify-between items-center">
        <div class="col col-4">
          <h2 class="q-pa-xs q-ma-xs text-h4">{{order.name}}</h2>
        </div>
        <div class="col col-1">
          <OrderBadge :status="order.status" />
        </div>
      </q-card>
      <q-card class="q-pa-md q-mt-md">
        <q-card-section class="row justify-between items-center">
          <div class="col col-4">
            <div class="text-h6">Furnitures</div>
          </div>
          <div v-if="canUpdateStatusOrder" class="col col-1">
            <q-btn v-if="order.status === ORDER_STATUS.CREATED" color="primary" label="Valid" @click="onValid"/>
            <q-btn v-if="order.status === ORDER_STATUS.VALIDATED" color="primary" label="Order" @click="onUpdate({status: ORDER_STATUS.ORDERED})"/>
            <q-btn v-if="order.status === ORDER_STATUS.ORDERED" color="primary" label="Finish" @click="onUpdate({status: ORDER_STATUS.FINISHED})"/>
          </div>
          <div v-else class="col col-1">
            <OrderBadge :status="order.status" />
          </div>
        </q-card-section>
        <q-card-section>
          <Items :items="order.items" />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router"
import { onMounted, computed } from "vue";
import OrderRequest from "../../request/OrderRequest";
import { OrderActionTypes } from "../../store/order/action-types";
import { useStore } from "../../store/index";
import Items from "../../components/Item/Items.vue";
import OrderBadge from "../../components/Order/OrderBadge.vue";
import { ORDER_STATUS } from "../../../../commons/Interface/Order";

const route = useRoute()
const $store = useStore()

const order = computed(() => $store.state.order.order)

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
const canUpdateStatusOrder = computed(() => $store.getters["user/canChangeOrderStatus"] as boolean)

onMounted(() => {
  void OrderRequest.GetById(route.params.id as unknown as string)
    .then(({ order }) => {
      void $store.dispatch(`order/${OrderActionTypes.SET_ORDER}`, order)
    })
})

const onValid = () => {
  void OrderRequest.ValidateOrder(route.params.id as unknown as string)
    .then(({ order }) => {
      void $store.dispatch(`order/${OrderActionTypes.SET_ORDER}`, order)
    })
}

const onUpdate = (payload: {status: ORDER_STATUS}) => {
  void OrderRequest.UpdateOrder(route.params.id as unknown as string, payload)
    .then(({ order }) => {
      void $store.dispatch(`order/${OrderActionTypes.SET_ORDER}`, order)
    })
}
</script>
<style>

</style>