<template>
  <q-page padding class="row justify-center">
    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <FurnitureDrawer />
    </q-drawer>
    <div class="col col-lg-10 col-md-12">
      <div class="row justify-between items-center">
        <h2 style="margin-top: 0px; margin-bottom: 0px;">Furnitures</h2>
        <FurnitureModalCreate />
      </div>
      <div class="q-pa-md row wrap q-col-gutter-md">
        <FurnituresCard
          :furnitures="furnitures" 
          @addInventory="addInInventory"
          @addOrder="addInBasket"
        />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { useStore } from "../../store/index";
import FurnitureModalCreate from "../../components/Furniture/FurnitureModalCreate.vue"
import FurnituresCard from "../../components/Furniture/Card/FurnituresCard.vue";
import FurnitureDrawer from "../../components/Furniture/Drawer/FurnitureDrawer.vue";
import FurnitureRequest from "../../request/FurnitureRequest";
import { FurnitureActionTypes } from "../../store/furniture/action-types";
import { FurnitureWithLatestFurnitureVersion } from "../../../../commons/Interface/Furniture";
import { BasketActionTypes } from "../../store/basket/action-types";
import InventoryRequest from "../../request/InventoryRequest";
import { InventoryActionTypes } from "../../store/inventory/action-types";

const $store = useStore()

const furnitures = computed(() => $store.state.furniture.furnituresWithLastestFurnitureVersion)

onMounted(() => {
  void FurnitureRequest.Get()
    .then(({ furnitures }) => {
      void $store.dispatch(`furniture/${FurnitureActionTypes.SET_FURNITURES_WITH_LATEST_FURNITURE_VERSION}`, furnitures)
    })
})

const addInBasket = (furniture: FurnitureWithLatestFurnitureVersion) => {
  void $store.dispatch(`basket/${BasketActionTypes.ADD_ARTICLE}`, { quantity: 1, furniture_version: furniture.furnitureVersions[0]})
}

const addInInventory = (furniture: FurnitureWithLatestFurnitureVersion) => {
  void InventoryRequest.Create({ quantity: 1, furnitureVersionId: furniture.furnitureVersions[0].id})
    .then(({ inventory }) => {
      void $store.dispatch(`inventory/${InventoryActionTypes.ADD_INVENTORY}`, inventory)
    })
}
</script>