<template>
  <q-page padding class="row justify-center">
    <div class="col col-lg-8 col-md-10 col-sx-12">
      <div class="row justify-between items-center">
        <h2 style="margin-top: 0px; margin-bottom: 0px;">Inventory</h2>
      </div>
      <div class="q-pa-md row wrap q-col-gutter-md">
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useStore } from "../../store/index";
import InventoryRequest from "../../request/InventoryRequest";
import { InventoryActionTypes } from "../../store/inventory/action-types";

const $store = useStore()

onMounted(() => {
  void InventoryRequest.Get()
    .then(({ inventories }) => {
      void $store.dispatch(`inventory/${InventoryActionTypes.SET_INVENTORIES}`, inventories)
    })
})
</script>
