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
    <q-pagination
      v-model="page"
      :max="paginationMax"
    />
  </q-page>
</template>

<script lang="ts" setup>
import { computed, watch, ref } from "vue";
import { useRoute, useRouter } from "vue-router"
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
import { isEmpty } from "app/../commons/Technical/Empty";
import { getNbPageByItems } from "app/../commons/Technical/Pagination";

const $store = useStore()
const route = useRoute()
const router = useRouter();

const leftDrawerOpen = ref(true)
const page = ref(route.query?.p || 0)
const countItems = ref(0)

const NB_ITEMS = 50

const furnitures = computed(() => $store.state.furniture.furnituresWithLastestFurnitureVersion)

const paginationMax = computed(() => getNbPageByItems(countItems.value, NB_ITEMS))

watch(
  page,
  (newValue) => {
    void router.push({path: route.path, query: {...route.query, p: newValue}})
  }
)

watch(
  () => route.query as unknown as { s?: string; k?: string; p?: number},
  (newValue) => {

    let categoryId = newValue.k;
    if (isEmpty(categoryId)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      categoryId = $store.getters["category/getFirstCategory"].id as unknown as string
    }

    void FurnitureRequest.Get({
      search: newValue.s,
      category: categoryId,
      start: +page.value as unknown as number,
      quantity: +NB_ITEMS
    })
      .then(({ furnitures, count }) => {
        console.log(count)
        void $store.dispatch(
          `furniture/${FurnitureActionTypes.SET_FURNITURES_WITH_LATEST_FURNITURE_VERSION}`,
          furnitures
        )
        countItems.value = count
      })
  },
  {
    immediate: true
  }
)

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