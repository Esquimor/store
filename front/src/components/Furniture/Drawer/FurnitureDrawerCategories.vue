<template>
  <section class="q-pa-md">
    <h3 class="text-subtitle1 q-ma-xs text-weight-bolder">Category</h3>
    <div
      v-for="cat in category.ancestors"
      :key="cat.id"
      @click="() => handleCategory(cat.id)"
      class="cursor-pointer"
    >
      <q-icon
        size="xs"
        name="chevron_left"
      />
      {{cat.name}}
    </div>
    <div class="q-pl-md text-weight-bold">{{category.category.name}}</div>
    <div
      v-for="cat in category.children"
      :key="cat.id"
      @click="() => handleCategory(cat.id)"
      class="q-pl-lg cursor-pointer"
    >
      {{cat.name}}
    </div>
    <br/>
  </section>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router"
import { useStore } from "../../../store"
import { Category } from "app/../commons/Interface/Category";

const router = useRouter();
const route = useRoute();
const store = useStore();

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
const category = computed(() => store.getters["category/getCategoryWithAncestorsAndChildrenForSidebarFurnitureByUsingId"](route.query.k || "") as string) as unknown as {
  category: Category;
  children: Category[];
  ancestors: Category[]
}

const handleCategory = (categoryId: string) => {
  void router.push({path: route.path, query: {...route.query, k: categoryId}})
}
</script>