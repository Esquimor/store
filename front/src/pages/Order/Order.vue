<template>
  <q-page padding class="row justify-center">
    <div v-if="loading || !order">loader</div>
    <LayoutSection v-else>
      <template v-slot:header>
        <div class="row justify-between items-center">
          <div class="col col-4">
            <h2 class="q-pa-xs q-ma-xs text-h4">{{order.name}}</h2>
          </div>
          <div class="col col-1">
            <OrderBadge :status="order.status" />
          </div>
        </div>
      </template>
      <q-tabs
        v-model="tab"
        inline-label
        class="bg-grey-2 text-black shadow-2"
        align="left"
      >
        <q-tab name="furnitures" icon="mdi-tools" :label="$t('furniture.furnitures')" />
      </q-tabs>
      <q-card-section>
        <div class="row q-pb-md">
          <div class="col col-9"></div>
          <div class="col col-3 row justify-end">
            <q-btn color="primary" :label="$t('furniture.add_a_furniture')" @click="onAddFurniture"/>
          </div>
        </div>
        <Items :items="order.items" @clickItem="onClickItem"/>
      </q-card-section>
      <template v-slot:sidebar>
        <q-btn
          class="full-width"
          align="between"
          color="primary"
          icon-right="mdi-chevron-right"
          :label="$t('label.next')"
        />
        <q-separator class="q-my-md"/>
        <Info
          :label="$t('label.create_by')"
          :value="`${order.creator.firstname} ${order.creator.lastname}`"
        />
        <q-separator class="q-my-xs"/>
        <Info
          :label="$t('label.date_created')"
          :value="dateCreated"
        />
      </template>
    </LayoutSection>
  </q-page>
</template>

<script lang="ts" setup>
import { useQuasar } from "quasar"
import { useRoute } from "vue-router"
import { computed, ref } from "vue";
import gql from "graphql-tag";
import { useQuery, UseQueryReturn } from "@vue/apollo-composable";
import Items from "../../components/Item/Items.vue";
import OrderBadge from "../../components/Order/OrderBadge.vue";
import { ORDER_STATUS } from "../../../../commons/Interface/Order";
import { ITEM_STATUS } from "app/../commons/Interface/Item";
import dayjs from "dayjs"
import LayoutSection from "../../components/Layout/LayoutSection.vue"
import Info from "../../components/Global/Ui/Info.vue"
import FurnitureVersionModal from "../../components/Furniture/Modal/FurnitureVersionModal.vue";
import OrderFurnitureList from "../../components/Order/OrderFurnitureList.vue"

const $q = useQuasar()
const route = useRoute()

const tab = ref("furnitures")

const { result, loading, refetch }: UseQueryReturn<{
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
        id: string;
        name: string;
        description: string;
        medias: {
          id: string;
          base64: string;
        }[]
      }
    }[]
  }
}, {
  id: string
}> = useQuery(gql`
  query order (
    $id: String
  ) {
    order (id: $id) {
      id
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
          medias {
            id
            base64
          }
        }
      }
    }
  }
`, {
  id: route.params.id
})

const order = computed(() => result.value?.order)

const dateCreated = computed(() => dayjs(order.value?.created_at).format("DD/MM/YYYY"))

const onClickItem = (item: {
  status: ITEM_STATUS;
  id: string;
  furnitureVersion: {
    id: string;
    description: string;
    name: string;
    medias: {
      id: string;
      base64: string;
    }[]
  }
}) => {
  $q.dialog({
    component: FurnitureVersionModal,
    componentProps: {
      id: item.furnitureVersion.id
    },
    fullWidth: true
  })
}

const onAddFurniture = () => {
  $q.dialog({
    component: OrderFurnitureList,
    componentProps: {
      orderId: route.params.id
    }
  })
  .onOk(() => {
    refetch?.()
      .catch(e => console.log(e))
  })
}
</script>