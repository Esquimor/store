<template>
  <q-page padding class="row justify-center">
    <div class="col col-lg-8 col-md-10 col-sx-12">
      <div class="full-width row justify-between items-center" style="border-bottom: 2px solid black">
        <h2 style="margin-top: 0px; margin-bottom: 0px;">Orders</h2>
      </div>
      <div class="q-pa-md q-mt-md">
        <q-tabs
          v-model="tab"
          inline-label
          class="bg-primary text-white shadow-2"
          align="left"
          dense
        >
          <q-tab 
            name="all"
          >
            <q-chip>{{allCounted}}</q-chip> All
          </q-tab>
          <q-tab
            v-for="status in ORDER_STATUS"
            :key="status"
            :name="status"
          >
            <q-chip>{{countedOrders[status]}}</q-chip> {{ status }}
          </q-tab>
        </q-tabs>

        <div class="q-mt-md">
          <q-table
            :loading="loading"
            :rows="orders"
            :columns="columns"
            v-model:pagination="pagination"
            @request="onRequest"
            :rows-per-page-options="[50]"
            @row-click="onRowClick"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router"
import { onMounted, computed, ref, watch } from "vue";
import type { Ref } from "vue"
import { useStore } from "../store/index";
import OrderRequest from "../request/OrderRequest";
import { OrderActionTypes } from "../store/order/action-types";
import {
  ORDER_STATUS,
  OrdersCounted,
  OrderWithItemWithFurnitureVersionWithFurniture
} from "../../../commons/Interface/Order";

const $store = useStore()
const router = useRouter()

const tab = ref("all")
const loading = ref(false)
const pagination = ref({
  page: 1,
  rowsNumber : 0, 
  rowsPerPage: 50
})

// eslint-disable-next-line
const countedOrders: Ref<OrdersCounted> = ref(
  // eslint-disable-next-line
  Object.fromEntries(Object.values(ORDER_STATUS).map(status => [status, 0]))
) as unknown as OrdersCounted

const orders = computed(() => $store.state.order.orders);
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
const allCounted = computed(() => Object.values(countedOrders.value)
  .reduce<number>((acc, curr: number) =>  acc + (+curr), 0)
)

const columns = [
  {
    name: "name",
    label: "Name",
    field: "name",
    align: "left",
  },
  {
    name: "status",
    label: "Status",
    field: "status",
    align: "left",
  },
  {
    name: "items",
    label: "Nb Items",
    field: "items",
    align: "left",
    format: (val: unknown[]) => val.length,
  },
]

const onRowClick = async (evt: Event, row: OrderWithItemWithFurnitureVersionWithFurniture) => {
  await router.push({ name: "order", params: { id: row.id } })
}

const onRequest = (props: {
  pagination: {
    page: number
  }
}) => {
  const { page } = props.pagination;
  
  let payload: {
    status?: ORDER_STATUS,
    start: number
  } = {start: +page - 1}

  if (tab.value !== "all") {
    payload = {...payload, status: tab.value as unknown as ORDER_STATUS}
  }
  loading.value = true
  void OrderRequest.GetForMe(payload)
  .then(({ orders, count }) => {
    pagination.value.rowsNumber = count
    void $store.dispatch(`order/${OrderActionTypes.SET_ORDERS}`, orders);
  })
  .finally(() => {
    loading.value = false
  })
}

onMounted(() => {
  onRequest({
    pagination: pagination.value
  })
  void Promise.all([
    OrderRequest.GetOrderCounted()
  ])
    .then(([ { counted }]) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      countedOrders.value = counted as unknown as OrdersCounted
    })
})
watch(
  tab,
  () => {
    onRequest({
    pagination: pagination.value
  })
  }
)
</script>
