<template>
  <div class="q-pa-md row wrap q-col-gutter-md full-width">
    <AddressCard
      class="col-6 q-pa-md"
      v-for="address in addressesSorted"
      :key="address.id"
      :address="address"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { AddressWithPlacements } from "../../../../commons/Interface/Address";
import AddressCard from "./AddressCard.vue"
import { sortString } from "../../../../commons/Technical/Sort"

const props = defineProps<{
  addresses: AddressWithPlacements[];
}>();

const addressesSorted = computed(() => [...props.addresses].sort((a, b) => sortString(a.name, b.name)))

</script>