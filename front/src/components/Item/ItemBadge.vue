<template>
  <Badge :value="props.status" :status="status"/>
</template>

<script lang="ts" setup>
import { ITEM_STATUS } from "../../../../commons/Interface/Item"
import Badge from "../Global/Ui/Badge.vue";

const props = defineProps<{
  status: ITEM_STATUS
}>()

const status = [
  {
    value: ITEM_STATUS.WANTED,
    color: "blue",
    label: "Wanted"
  },
  {
    value: ITEM_STATUS.DECLINED,
    color: "yellow",
    label: "Declined"
  },
  {
    value: ITEM_STATUS.VALIDED,
    color: "purple",
    label: "Valided"
  },
]
</script>