<template>
  <q-layout view="hHh Lpr lFf">
    <layout-header/>
    <q-page-container class="MainLayout-container bg-grey-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import LayoutHeader from "../components/Layout/LayoutHeader.vue"
</script>

<style lang="scss">
.MainLayout {
  &-container {
    min-height: 100vh;
  }
}
</style>