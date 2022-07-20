<template>
  <q-page padding>
    <FurnitureModalCreate />
    <Furnitures :furnitures="$store.state.furniture.furnitures"/>
  </q-page>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useStore } from "../store/index";
import FurnitureRequest from "../request/FunitureRequest";
import { FurnitureActionTypes } from "../store/furniture/action-types";
import Furnitures from "../components/Furniture/Furnitures.vue"
import FurnitureModalCreate from "../components/Furniture/FurnitureModalCreate.vue"

const $store = useStore()

onMounted(() => {
  const $store = useStore()

  void FurnitureRequest.GetForMe()
    .then(({ furnitures }) => {
      void $store.dispatch(`furniture/${FurnitureActionTypes.SET_FURNITURES}`, furnitures)
    })
})
</script>
