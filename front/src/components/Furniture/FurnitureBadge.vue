<template>
  <q-badge :color="badge.color">
    {{badge.label}}
  </q-badge>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { FURNITURE_STATUS } from "../../../../commons/Interface/Furniture"

const props = defineProps<{
  status: FURNITURE_STATUS
}>()
    
const badge = computed<{color: string; label: string}>(
  () => {
    switch ((props.status as unknown as FURNITURE_STATUS)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      case FURNITURE_STATUS.CREATED:
        return {
          color: "blue",
          label: "Created"
        };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      case FURNITURE_STATUS.VALIDATED:
        return {
          color: "yellow",
          label: "Validated"
        };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      case FURNITURE_STATUS.IN_WORKING:
        return {
          color: "purple",
          label: "IN Working"
        };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      case FURNITURE_STATUS.FINISHED:
        return {
          color: "green",
          label: "Finished"
        };
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      case FURNITURE_STATUS.ERROR:
        return {
          color: "red",
          label: "Error"
        };
      default:
        return {
          color: "",
          label: "Empty"
        };
    }
  }
)
</script>