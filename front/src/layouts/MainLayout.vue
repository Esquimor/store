<template>
  <q-layout view="lHh Lpr lFf">
    <layout-header/>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import LayoutHeader from "../components/Layout/LayoutHeader.vue"

export default defineComponent({
  name: "MainLayout",
  components: {
    LayoutHeader
  },
})
</script>
