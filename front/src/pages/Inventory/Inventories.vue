<template>
  <LayoutList :title="$t('inventory.inventories')">
    <div class="q-pa-md q-mt-md">
      <q-tabs
        v-model="tab"
        inline-label
        class="bg-primary text-white shadow-2"
        align="left"
        dense
      >
        <q-tab 
          :name="INVENTORY_TYPE.ME"
        >
          <q-chip>{{inventoriesCount[INVENTORY_TYPE.ME]}}</q-chip> {{$t("label.mine")}}
        </q-tab>
        <q-tab
          :name="INVENTORY_TYPE.PLACEMENT"
        >
          <q-chip>{{inventoriesCount[INVENTORY_TYPE.PLACEMENT]}}</q-chip> {{$t("label.same_placement")}}
        </q-tab>
        <q-tab 
          :name="INVENTORY_TYPE.ADDRESS"
        >
          <q-chip>{{inventoriesCount[INVENTORY_TYPE.ADDRESS]}}</q-chip> {{$t("label.same_localisation")}}
        </q-tab>
        <q-tab 
          :name="INVENTORY_TYPE.ALL"
        >
          <q-chip>{{inventoriesCount[INVENTORY_TYPE.ALL]}}</q-chip> {{$t("label.in_my_organization")}}
        </q-tab>
      </q-tabs>

      <div class="q-mt-md">
        <q-table
          :loading="loading"
          :rows="inventories"
          :columns="columns"
          v-model:pagination="pagination"
          :rows-per-page-options="[50]"
          @row-click="onRowClick"
        />
      </div>
    </div>
  </LayoutList>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router"
import { computed, ref, watch } from "vue";
import { Inventory } from "../../../../commons/Interface/Inventory";
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import { useI18n } from "vue-i18n"
import LayoutList from "../../components/Layout/LayoutList.vue"

enum INVENTORY_TYPE {
  ALL = "ALL",
  ME = "ME",
  ADDRESS = "ADDRESS",
  PLACEMENT = "PLACEMENT"
}

const router = useRouter()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n() 

const tab = ref(INVENTORY_TYPE.ME)
const pagination = ref({
  page: 1,
  rowsNumber : 0, 
  rowsPerPage: 50
})

const columns = [
  {
    name: "name",
    label: t("label.name"),
    field: "name",
    align: "left",
  },
]

const onRowClick = async (evt: Event, row: Inventory) => {
  await router.push({ name: "inventory", params: { id: row.id } })
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
const variablesInventories = computed(() => ({
  type: tab.value,
}))

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const { result, loading, variables }: {
  result: {
    value:{
      inventories: {
        id: string;
        name: string;
      }[];
      allInventoriesCount: number;
      meInventoriesCount: number;
      placementInventoriesCount: number;
      addressInventoriesCount: number;
    }
  }
} = useQuery(gql`
  query inventories (
    $type: String, 
  ) {
    inventories (type: $type) {
      id
      name
    }
    allInventoriesCount: inventoriesCount(type: ALL)
    meInventoriesCount: inventoriesCount(type: ME)
    addressInventoriesCount: inventoriesCount(type: ADDRESS)
    placementInventoriesCount: inventoriesCount(type: PLACEMENT)
  }
`, variablesInventories)

const inventories = computed(() => result.value?.inventories ?? [])

const inventoriesCount = computed(() => ({
  [INVENTORY_TYPE.ALL]: result?.value?.allInventoriesCount ?? 0,
  [INVENTORY_TYPE.ME]: result?.value?.meInventoriesCount ?? 0,
  [INVENTORY_TYPE.ADDRESS]: result?.value?.addressInventoriesCount ?? 0,
  [INVENTORY_TYPE.PLACEMENT]: result?.value?.placementInventoriesCount ?? 0,
}))

watch(
  variablesInventories,
  (newValue) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    variables.value = newValue
  }
)
</script>
