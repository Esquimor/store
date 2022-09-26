<template>
  <q-page padding class="row justify-center">
    <div class="col col-lg-8 col-md-10 col-sx-12">
      <div class="full-width row justify-between items-center" style="border-bottom: 2px solid black">
        <h2 style="margin-top: 0px; margin-bottom: 0px;">Inventories</h2>
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
            :name="TAB.USER"
          >
            <q-chip>{{countedInventories.user}}</q-chip> Mine
          </q-tab>
          <q-tab
            v-if="user.placement"
            :name="TAB.PLACEMENT"
          >
            <q-chip>{{countedInventories.placement}}</q-chip> Same Placement
          </q-tab>
          <q-tab 
            v-if="user.address"
            :name="TAB.ADDRESS"
          >
            <q-chip>{{countedInventories.address}}</q-chip> Same Localisation
          </q-tab>
          <q-tab 
            :name="TAB.ORGANIZATION"
          >
            <q-chip>{{countedInventories.organization}}</q-chip> In my organization
          </q-tab>
        </q-tabs>

        <div class="q-mt-md">
          <q-table
            :loading="loading"
            :rows="inventories"
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
import { useStore } from "../../store/index";
import InventoryRequest from "../../request/InventoryRequest";
import { InventoriesCounted, Inventory } from "../../../../commons/Interface/Inventory";
import { InventoryActionTypes } from "../../store/inventory/action-types";

const $store = useStore()
const router = useRouter()

const TAB = {
  USER: "user",
  PLACEMENT: "placement",
  ADDRESS: "address",
  ORGANIZATION: "organization"
}

const tab = ref(TAB.USER)
const loading = ref(false)
const pagination = ref({
  page: 1,
  rowsNumber : 0, 
  rowsPerPage: 50
})

// eslint-disable-next-line
const countedInventories: Ref<InventoriesCounted> = ref({
  organization: 0,
  address: 0,
  placement: 0,
  user: 0,
}) as unknown as InventoriesCounted

const inventories = computed(() => $store.state.inventory.inventories);
const user = computed(() => $store.state.user.user);

const columns = [
  {
    name: "name",
    label: "Name",
    field: "name",
    align: "left",
  },
]

const onRowClick = async (evt: Event, row: Inventory) => {
  await router.push({ name: "inventory", params: { id: row.id } })
}

const onRequest = (props: {
  pagination: {
    page: number
  }
}) => {
  const { page } = props.pagination;
  
  let payload: {
    start: number
    user?: boolean;
    placement?: boolean;
    address?: boolean;
    organization?: boolean;
  } = {
    start: +page - 1,
    [tab.value]: true
  }

  loading.value = true
  void InventoryRequest.GetForMe(payload)
  .then(({ inventories, count }) => {
    pagination.value.rowsNumber = count
    void $store.dispatch(`inventory/${InventoryActionTypes.SET_INVENTORIES}`, inventories);
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
    InventoryRequest.GetInventoriesCounted()
  ])
    .then(([ { count }]) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      countedInventories.value = count as unknown as InventoriesCounted
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
