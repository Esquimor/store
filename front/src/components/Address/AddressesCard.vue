<template>
  <div class="q-pa-md row wrap q-col-gutter-md full-width">
    <AddressCard
      class="col-6 q-pa-md"
      v-for="address in addressesSorted"
      :key="address.id"
      :address="address"
      @onDelete="(id: string) => $emit('onDelete', id)"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import AddressCard from "./AddressCard.vue"
import { sortString } from "../../../../commons/Technical/Sort"

const props = defineProps<{
  addresses: {
    id: string;
    country: string;
    city: string;
    comment: string;
    ligne1: string;
    ligne2: string;
    name: string;
    number: string;
    zipCode: string;
  }[];
}>();

const addressesSorted = computed(() => [...props.addresses].sort((a, b) => sortString(a.name, b.name)))

</script>