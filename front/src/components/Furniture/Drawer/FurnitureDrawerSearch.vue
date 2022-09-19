<template>
  <section class="q-pa-md">
    <q-input outlined v-model="search" label="Search" debounce="500"/>
  </section>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useRouter, useRoute, LocationQueryRaw } from "vue-router"
import { removeValueFromObject } from "app/../commons/Technical/Remove";

const router = useRouter();
const route = useRoute();
const search = ref(route.query.s || "")

watch(search, (newValue) => {
  if (newValue === "") {
    const copyRouteQuery = removeValueFromObject(route.query, "s") as unknown as LocationQueryRaw
    void router.push({path: route.path, query: copyRouteQuery})
    return;
  }
  void router.push({path: route.path, query: {...route.query, s: newValue}})
})
</script>