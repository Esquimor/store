<template>
  <q-page padding class="row justify-center">
    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <FurnitureDrawer />
    </q-drawer>
    <div class="col col-lg-10 col-md-12">
      <div class="row justify-between items-center">
        <h2 style="margin-top: 0px; margin-bottom: 0px;">{{$t("furniture.furnitures")}}</h2>
      </div>
      <div class="q-pa-md row wrap q-col-gutter-md">
        <FurnituresCard
          :furnitures="furnitures" 
          @addOrder="addInBasket"
          @selectFurniture="goToFurniture"
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
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router"
import { useStore } from "../../store/index";
import FurnituresCard from "../../components/Furniture/Card/FurnituresCard.vue";
import FurnitureDrawer from "../../components/Furniture/Drawer/FurnitureDrawer.vue";
import { FurnitureWithLastFurnitureVersion } from "../../../../commons/Interface/Furniture";
import { BasketActionTypes } from "../../store/basket/action-types";
import { getNbPageByItems } from "app/../commons/Technical/Pagination";
import { useQuery, UseQueryReturn } from "@vue/apollo-composable";
import gql from "graphql-tag";

const $store = useStore()
const route = useRoute()
const router = useRouter();

const leftDrawerOpen = ref(true)
const page = ref(route.query?.p || 0)
const countItems = ref(0)

const NB_ITEMS = 50

const variablesFurnitures = computed(() => ({
  search: (route.query?.s ?? "") as unknown as string,
  category: (route.query?.k ?? "") as unknown as string,
  start: +page.value as unknown as number,
  quantity: +NB_ITEMS
}))

const { result }: UseQueryReturn<{
  furnitures: {
    id: string;
    lastFurnitureVersion: {
      id: string;
      name: string;
      description: string;
      medias: {
        id: string;
        base64: string;
      }[]
    }
  }[];
}, {
  search?: string;
  category?: string;
  start: number;
  quantity: number;
}> = useQuery(gql`
  query furnitures($search: String, $start: Int, $quantity: Int, $category: String) {
    furnitures(search: $search, start: $start, quantity: $quantity, category: $category) {
      id
      lastFurnitureVersion {
        id
        name
        description
        medias {
          id
          base64
        }
      }
    }
  }
`, variablesFurnitures)

const furnitures = computed(() => result.value?.furnitures ?? [])

const paginationMax = computed(() => getNbPageByItems(countItems.value, NB_ITEMS))

watch(
  page,
  (newValue) => {
    void router.push({path: route.path, query: {...route.query, p: newValue}})
  }
)

const addInBasket = (furniture: FurnitureWithLastFurnitureVersion) => {
  void $store.dispatch(`basket/${BasketActionTypes.ADD_ARTICLE}`, {
    quantity: 1,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    furniture_version: furniture.lastFurnitureVersion
  })
}

const goToFurniture = async(furniture: FurnitureWithLastFurnitureVersion) => {
  await router.push({name: "furniture", params: { id: furniture.id }})
}
</script>