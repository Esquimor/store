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
import { computed, onMounted } from "vue";
import { useStore } from "../../../store/index";
import LayoutSettings from "../../../components/Settings/LayoutSettings.vue";
import AddressRequest from "../../../request/AddressRequest";
import { AddressActionTypes } from "../../../store/address/action-types";
import AddressesCard from "src/components/Address/AddressesCard.vue";

const $store = useStore()

const addresses = computed(() => $store.state.address.addresses)

onMounted(() => {
  void AddressRequest.Get()
    .then(({ addresses }) => {
      void $store.dispatch(`address/${AddressActionTypes.SET_ADDRESSES}`, addresses)
    })
})
</script>