<template>
  <q-page padding class="row justify-center">
    <div class="col col-lg-8 col-md-10 col-sx-12">
      <div class="row justify-between items-center">
        <h2 style="margin-top: 0px; margin-bottom: 0px;">Furnitures</h2>
        <FurnitureModalCreate />
      </div>
      <div class="q-pa-md row wrap q-col-gutter-md">
        <FurnituresCard :furnitures="furnitures" @add="addInBasket"/>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "../../store/index";
import FurnitureModalCreate from "../../components/Furniture/FurnitureModalCreate.vue"
import FurnituresCard from "../../components/Furniture/Card/FurnituresCard.vue";
import { onMounted } from "vue";
import FurnitureRequest from "../../request/FunitureRequest";
import { FurnitureActionTypes } from "../../store/furniture/action-types";
import { FurnitureWithLatestFurnitureVersion } from "../../../../commons/Interface/Furniture";
import { BasketActionTypes } from "../../store/basket/action-types";

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

</script>

<style>

</style>