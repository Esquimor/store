<template>
  <LayoutSettings title="Inventories">
    <template v-slot:actions>
      <q-btn
        color="primary"
        label="Add an Inventory" 
        :to="{ name: 'settings-inventory-new' }"
      />
    </template>
    <InventoriesCard :inventories="inventories" />
  </LayoutSettings>
</template>

<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { useStore } from "../../../store/index";
import LayoutSettings from "../../../components/Settings/LayoutSettings.vue";
import InventoryRequest from "../../../request/InventoryRequest";
import { InventoryActionTypes } from "../../../store/inventory/action-types";
import InventoriesCard from "src/components/Inventory/InventoriesCard.vue";

const $store = useStore()

const inventories = computed(() => $store.state.inventory.inventories)

onMounted(() => {
  void InventoryRequest.Get()
    .then(({ inventories }) => {
      void $store.dispatch(`inventory/${InventoryActionTypes.SET_INVENTORIES}`, inventories)
    })
})
</script>