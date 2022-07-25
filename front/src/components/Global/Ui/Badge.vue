<template>
  <q-badge :color="badge.color">
    {{badge.label}}
  </q-badge>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
  value: string|number,
  status: {
    value: string|number;
    color: string;
    label: string;
  }[]
}>()
    
const badge = computed<{color: string; label: string}>(
  () =>  props.status.find(status => status.value === props.value) || {
          color: "",
          label: "Empty"
        }
)
</script>