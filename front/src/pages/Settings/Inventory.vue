<template>
  <LayoutSettings title="Inventories">
    <template v-slot:actions>
      <q-btn color="primary" icon="add" label="Add Inventory" @click="create" />
    </template>
  </LayoutSettings>
</template>

<script lang="ts" setup>
import LayoutSettings from "../../components/Settings/LayoutSettings.vue";
</script>