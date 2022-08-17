<template>
  <LayoutSettings title="Addresses">
    <template v-slot:actions>
      <AddressModalCreate />
    </template>
  </LayoutSettings>
</template>

<script lang="ts" setup>
import LayoutSettings from "../../components/Settings/LayoutSettings.vue";
import AddressModalCreate from "src/components/Address/AddressModalCreate.vue";
</script>