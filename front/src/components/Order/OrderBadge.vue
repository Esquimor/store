<template>
  <Badge :value="props.status" :status="status"/>
</template>

<script lang="ts" setup>
import { ORDER_STATUS } from "../../../../commons/Interface/Order"
import Badge from "../Global/Ui/Badge.vue";

const props = defineProps<{
  status: ORDER_STATUS
}>()

const status = [
  {
    value: ORDER_STATUS.CREATED,
    color: "blue",
    label: "Created"
  },
  {
    value: ORDER_STATUS.VALIDATED,
    color: "yellow",
    label: "Validated"
  },
  {
    value: ORDER_STATUS.ORDERED,
    color: "purple",
    label: "Ordered"
  },
  {
    value: ORDER_STATUS.FINISHED,
    color: "green",
    label: "In Work"
  },
  {
    value: ORDER_STATUS.ERROR,
    color: "red",
    label: "In Work"
  },
]
</script>