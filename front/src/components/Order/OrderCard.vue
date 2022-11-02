<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="text-h6">{{props.order.name}}</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-chip square>
          <q-avatar color="primary" text-color="white">{{props.order.items.length}}</q-avatar>
          {{$t("item.items")}}
        </q-chip>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn unelevated color="primary" fka @click="goToOrder">{{$t("label.see")}}</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router"
import { OrderWithItemWithFurnitureVersionWithFurniture } from "../../../../commons/Interface/Order";

const router = useRouter()

const props = defineProps<{
  order: OrderWithItemWithFurnitureVersionWithFurniture;
}>()

const goToOrder = async () => {
  await router.push({ name: "order", params: { id: props.order.id } })
}
</script>