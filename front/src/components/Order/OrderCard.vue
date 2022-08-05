<template>
  <div>
    <q-card>
      <q-card-section :class="classTitleSection">
        <div class="text-h6">{{props.order.name}}</div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat @click="goToOrder">See</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from "vue";
import { useRouter } from "vue-router"
import { OrderWithItemWithFurnitureVersionWithFurniture } from "../../../../commons/Interface/Order";

const router = useRouter()

const props = defineProps<{
  order: OrderWithItemWithFurnitureVersionWithFurniture;
  color?: string;
}>()

const classTitleSection = computed(() => {
  return `bg-${props.color || "primary"} text-white`
})

const goToOrder = async () => {
  await router.push({ name: "order", params: { id: props.order.id } })
}
</script>

<style>

</style>