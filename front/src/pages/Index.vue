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
            <q-chip>{{all}}</q-chip> All
          </q-tab>
          <q-tab
            v-for="status in ORDER_STATUS"
            :key="status"
            :name="status"
          >
          <q-chip>{{ordersCount[status]}}</q-chip> {{ status }}
          </q-tab>
        </q-tabs>

        <div class="q-mt-md">
          <q-table
            :loading="loading"
            :rows="orders"
            :columns="columns"
            v-model:pagination="pagination"
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
import { computed, ref, watch } from "vue";
import {
  ORDER_STATUS,
  OrderWithItemWithFurnitureVersionWithFurniture
} from "../../../commons/Interface/Order";
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";

const router = useRouter()

const tab = ref("all")
const pagination = ref({
  page: 1,
  rowsNumber : 0, 
  rowsPerPage: 50
})

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
    name: "countItems",
    label: "Nb Items",
    field: "countItems",
    align: "left",
  },
]

const onRowClick = async (evt: Event, row: OrderWithItemWithFurnitureVersionWithFurniture) => {
  await router.push({ name: "order", params: { id: row.id } })
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
const variablesOrders = computed(() => ({
  status: tab.value,
  skip: pagination.value.page - 1,
  take: pagination.value.rowsPerPage,
  created: ORDER_STATUS.CREATED,
  validated: ORDER_STATUS.VALIDATED,
  ordered: ORDER_STATUS.ORDERED,
  finished: ORDER_STATUS.FINISHED,
  error: ORDER_STATUS.ERROR,
}))

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const { result, loading, variables }: {
  result: {
    value:{
      orders: {
        id: string;
        name: string;
        status: ORDER_STATUS;
        countItems: number
      }[];
      ordersCount: number;
      createdOrdersCount: number;
      validatedOrdersCount: number;
      orderedOrdersCount: number;
      finishedOrdersCount: number;
      errorOrdersCount: number;
    }
  }
} = useQuery(gql`
  query orders (
    $status: String, 
    $skip: Int,
    $take: Int,
    $created: String,
    $validated: String,
    $ordered: String,
    $finished: String,
    $error: String,
  ) {
    orders (status: $status, take: $take, skip: $skip) {
      id
      name
      status
      countItems
    }
    ordersCount
    createdOrdersCount: ordersCount(status: $created)
    validatedOrdersCount: ordersCount(status: $validated)
    orderedOrdersCount: ordersCount(status: $ordered)
    finishedOrdersCount: ordersCount(status: $finished)
    errorOrdersCount: ordersCount(status: $error)
  }
`, variablesOrders)

const orders = computed(() => result.value?.orders ?? [])

const all = computed(() => result.value?.ordersCount)
const ordersCount = computed(() => ({
  [ORDER_STATUS.CREATED]: result?.value?.createdOrdersCount ?? 0,
  [ORDER_STATUS.VALIDATED]: result?.value?.validatedOrdersCount ?? 0,
  [ORDER_STATUS.ORDERED]: result?.value?.orderedOrdersCount ?? 0,
  [ORDER_STATUS.FINISHED]: result?.value?.finishedOrdersCount ?? 0,
  [ORDER_STATUS.ERROR]: result?.value?.errorOrdersCount ?? 0,
}))

watch(
  variablesOrders,
  (newValue) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    variables.value = newValue
  }
)
</script>
