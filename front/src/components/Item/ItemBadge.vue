<template>
  <Badge :value="props.status" :status="status"/>
</template>

<script lang="ts" setup>
import { ITEM_STATUS } from "../../../../commons/Interface/Item"
import Badge from "../Global/Ui/Badge.vue";
import { useI18n } from "vue-i18n"

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n() 

const props = defineProps<{
  status: ITEM_STATUS
}>()

const status = [
  {
    value: ITEM_STATUS.WANTED,
    color: "blue",
    label: t("item.item_status.WANTED")
  },
  {
    value: ITEM_STATUS.DECLINED,
    color: "yellow",
    label: t("item.item_status.DECLINED")
  },
  {
    value: ITEM_STATUS.VALIDATED,
    color: "purple",
    label: t("item.item_status.VALIDATED")
  },
]
</script>