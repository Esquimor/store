<template>
  <LayoutSettings title="Addresses">
    <template v-slot:actions>
      <q-btn
        color="primary"
        label="Add an Address" 
        :to="{ name: 'settings-address-new' }"
      />
    </template>
    <AddressesCard :addresses="addresses"/>
  </LayoutSettings>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "../../../store/index";
import LayoutSettings from "../../../components/Settings/LayoutSettings.vue";
import AddressesCard from "src/components/Address/AddressesCard.vue";

const $store = useStore()

const addresses = computed(() => $store.state.address.addresses)
</script>