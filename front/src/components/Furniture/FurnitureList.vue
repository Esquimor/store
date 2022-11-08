<template>
  <div class="row FurnitureList">
    <div class="col col-2 FurnitureList-drawer">
      <FurnitureDrawer v-model="search" @changeCategory="handleCategory" :category="category"/>
    </div>
    <div class="col col-lg-10 col-md-12 q-pa-md">
      <div class="row justify-between items-center">
        <h2 style="margin-top: 0px; margin-bottom: 0px;">{{$t("furniture.furnitures")}}</h2>
      </div>
      <div class="q-pa-xs row wrap q-col-gutter-md">
        <FurnituresCard
          :furnitures="furnitures" 
          @addOrder="(addFurniture) => $emit('addOrder', addFurniture)"
          @selectFurniture="goToFurniture"
        />
      </div>
    </div>
    <q-pagination
      v-model="page"
      :max="paginationMax"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router"
import FurnituresCard from "./Card/FurnituresCard.vue";
import FurnitureDrawer from "./Drawer/FurnitureDrawer.vue";
import { FurnitureWithLastFurnitureVersion } from "../../../../commons/Interface/Furniture";
import { getNbPageByItems } from "app/../commons/Technical/Pagination";
import { useQuery, UseQueryReturn } from "@vue/apollo-composable";
import gql from "graphql-tag";

const route = useRoute()
const router = useRouter();

// Drawer
const search = ref("")

const category = ref("")

const handleCategory = (categoryId: string) => {
  category.value = categoryId;
}

// Pagination

const page = ref(0)
const countItems = ref(0)

const NB_ITEMS = 50

const paginationMax = computed(() => getNbPageByItems(countItems.value, NB_ITEMS))

watch(
  page,
  (newValue) => {
    void router.push({path: route.path, query: {...route.query, p: newValue}})
  }
)

// Furnitures

const variablesFurnitures = computed(() => ({
  search: search.value,
  category: category.value,
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

const goToFurniture = async(furniture: FurnitureWithLastFurnitureVersion) => {
  await router.replace({name: "furniture", params: { id: furniture.id }})
}
</script>

<style lang="scss">
.FurnitureList {
  height: 100%;

  &-drawer {
    border-right: 1px solid $grey-6;
    height: 100%;
    overflow-y: auto;
  }
}
</style>