<template>
  <q-layout view="hHh Lpr lFf">
    <q-inner-loading :showing="loadingBootStrap">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
    <template v-if="!loadingBootStrap">
      <layout-header/>
      <q-page-container>
        <router-view />
      </q-page-container>
    </template>
  </q-layout>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "../store/index";
import LayoutHeader from "../components/Layout/LayoutHeader.vue"

const $store = useStore()

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
const loadingBootStrap = computed(() => $store.state.loadingBootStrap)

</script>
