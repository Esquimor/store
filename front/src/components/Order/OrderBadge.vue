<template>
  <Badge :value="props.status" :status="status"/>
</template>

<script lang="ts" setup>
import { ORDER_STATUS } from "../../../../commons/Interface/Order"
import { getColorForOrderStatus } from "../../../../commons/Technical/Order"
import Badge from "../Global/Ui/Badge.vue";

const props = defineProps<{
  status: ORDER_STATUS
}>()

const status = [
  {
    value: ORDER_STATUS.CREATED,
    color: getColorForOrderStatus(ORDER_STATUS.CREATED),
    label: "Created"
  },
  {
    value: ORDER_STATUS.VALIDATED,
    color: getColorForOrderStatus(ORDER_STATUS.VALIDATED),
    label: "Validated"
  },
  {
    value: ORDER_STATUS.ORDERED,
    color: getColorForOrderStatus(ORDER_STATUS.ORDERED),
    label: "Ordered"
  },
  {
    value: ORDER_STATUS.FINISHED,
    color: getColorForOrderStatus(ORDER_STATUS.FINISHED),
    label: "In Work"
  },
  {
    value: ORDER_STATUS.ERROR,
    color: getColorForOrderStatus(ORDER_STATUS.ERROR),
    label: "In Work"
  },
]
</script>