<template>
  <Badge :value="props.status" :status="status"/>
</template>

<script lang="ts" setup>
import { ORDER_STATUS } from "../../../../commons/Interface/Order"
import { getColorForOrderStatus } from "../../../../commons/Technical/Order"
import Badge from "../Global/Ui/Badge.vue";
import { useI18n } from "vue-i18n"

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n() 

const props = defineProps<{
  status: ORDER_STATUS
}>()

const status = [
  {
    value: ORDER_STATUS.CREATED,
    color: getColorForOrderStatus(ORDER_STATUS.CREATED),
    label: t("order.order_status.CREATED")
  },
  {
    value: ORDER_STATUS.VALIDATED,
    color: getColorForOrderStatus(ORDER_STATUS.VALIDATED),
    label: t("order.order_status.VALIDATED")
  },
  {
    value: ORDER_STATUS.ORDERED,
    color: getColorForOrderStatus(ORDER_STATUS.ORDERED),
    label: t("order.order_status.ORDERED")
  },
  {
    value: ORDER_STATUS.FINISHED,
    color: getColorForOrderStatus(ORDER_STATUS.FINISHED),
    label: t("order.order_status.FINISHED")
  },
  {
    value: ORDER_STATUS.ERROR,
    color: getColorForOrderStatus(ORDER_STATUS.ERROR),
    label: t("order.order_status.ERROR")
  },
]
</script>