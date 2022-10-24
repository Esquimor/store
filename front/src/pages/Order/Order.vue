<template>
  <q-page padding class="row justify-center">
    <div v-if="loading">loader</div>
    <div v-else class="col col-lg-10 col-sx-12 row">
      <section class="col-9">
        <div class="q-pa-xs row justify-between items-center q-pr-md">
          <div class="col col-4">
            <h2 class="q-pa-xs q-ma-xs text-h4">{{order.name}}</h2>
          </div>
          <div class="col col-1">
            <OrderBadge :status="order.status" />
          </div>
        </div>
        <q-separator class="q-my-md"/>
        <div class="q-pa-md">
          <q-tabs
            v-model="tab"
            inline-label
            class="bg-grey-2 text-black shadow-2"
            align="left"
          >
            <q-tab name="furnitures" icon="mdi-tools" label="Furnitures" />
            <q-tab name="description" icon="mdi-text-long" label="Description" />
          </q-tabs>
          <q-card-section>
            <Items :items="order.items" />
          </q-card-section>
        </div>
      </section>
      <section class="col-3 Order-sidebar q-pl-md">
        <q-btn class="full-width" align="between" color="primary" icon-right="mdi-chevron-right" label="Next"/>
        <q-separator class="q-my-md"/>
        <q-field borderless label="Create by" stack-label>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">{{order.creator.firstname}} {{order.creator.lastname}}</div>
          </template>
        </q-field>
        <q-separator class="q-my-xs"/>
        <q-field borderless label="Date created" stack-label>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">{{dateCreated}}</div>
          </template>
        </q-field>
      </section>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router"
import { computed, ref } from "vue";
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import Items from "../../components/Item/Items.vue";
import OrderBadge from "../../components/Order/OrderBadge.vue";
import { ORDER_STATUS } from "../../../../commons/Interface/Order";
import { ITEM_STATUS } from "app/../commons/Interface/Item";
import dayjs from "dayjs"

const route = useRoute()

const tab = ref("furnitures")

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const { result, loading }: {
  result: {
    value:{
      order: {
        id: string;
        name: string;
        status: ORDER_STATUS;
        created_at: string;
        creator: {
          id: string;
          firstname: string;
          lastname: string;
        };
        items: {
          id: string;
          status: ITEM_STATUS;
          furnitureVersion: {
            id
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
      created_at
      creator {
        id
        firstname
        lastname
      }
      items {
        id
        status
        furnitureVersion {
          id
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

const dateCreated = computed(() => dayjs(order.value?.created_at).format("DD/MM/YYYY"))
</script>

<style lang="scss">
.Order-sidebar {
  border-left: 1px solid $grey-5;
}
</style>