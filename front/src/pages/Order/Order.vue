<template>
  <q-page padding class="row justify-center">
    <div v-if="loading">loader</div>
    <div v-else class="col col-lg-8 col-md-10 col-sx-12">
      <q-card class="q-pa-xs row justify-between items-center">
        <div class="col col-4">
          <h2 class="q-pa-xs q-ma-xs text-h4">{{order.name}}</h2>
        </div>
        <div class="col col-1">
          <OrderBadge :status="order.status" />
        </div>
      </q-card>
      <q-card class="q-pa-md q-mt-md">
        <q-card-section class="row justify-between items-center">
          <div class="col col-4">
            <div class="text-h6">Furnitures</div>
          </div>
          <div class="col col-1">
            <OrderBadge :status="order.status" />
          </div>
        </q-card-section>
        <q-card-section>
          <Items :items="order.items" />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router"
import { computed } from "vue";
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import Items from "../../components/Item/Items.vue";
import OrderBadge from "../../components/Order/OrderBadge.vue";
import { ORDER_STATUS } from "../../../../commons/Interface/Order";
import { ITEM_STATUS } from "app/../commons/Interface/Item";

const route = useRoute()

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const { result, loading }: {
  result: {
    value:{
      order: {
        id: string;
        name: string;
        status: ORDER_STATUS;
        items: {
          id: string;
          status: ITEM_STATUS;
          furnitureVersion: {
            name: string;
            description: string;
          }
        }[]
      }
    }
  }
} = useQuery(gql`
  query order (
    $id: String
  ) {
    order (id: $id) {
      name
      status
      items {
        id
        status
        furnitureVersion {
          name
          description
        }
      }
    }
  }
`, {
  id: route.params.id
})

const order = computed(() => result.value?.order)
</script>