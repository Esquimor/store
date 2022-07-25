<template>
  <Badge :value="props.status" :status="status"/>
</template>

<script lang="ts" setup>
import { FURNITURE_STATUS } from "../../../../commons/Interface/Furniture"
import Badge from "../Global/Ui/Badge.vue";

const props = defineProps<{
  status: FURNITURE_STATUS
}>()

const status = [
  {
    value: FURNITURE_STATUS.WANTED,
    color: "blue",
    label: "Wanted"
  },
  {
    value: FURNITURE_STATUS.DECLINED,
    color: "yellow",
    label: "Declined"
  },
  {
    value: FURNITURE_STATUS.VALIDED,
    color: "purple",
    label: "Valided"
  },
]
</script>