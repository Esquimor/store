<template>
  <q-page padding class="row justify-center">
    <div v-if="loading || !inventory">loader</div>
    <LayoutSection v-else>
      <template v-slot:header>
        <div class="row justify-between items-center">
          <div class="col col-4">
            <h2 class="q-pa-xs q-ma-xs text-h4">{{inventory.name}}</h2>
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
        <q-tab name="description" icon="mdi-text-long" :label="$t('label.description')" />
      </q-tabs>
      <q-card-section>
        <Items :items="inventory.items" />
      </q-card-section>
      <template v-slot:sidebar>
        <q-btn class="full-width" align="between" color="primary" icon-right="mdi-chevron-right" :label="$t('label.next')"/>
        <template v-if="!!inventory.user">
          <q-separator class="q-my-md"/>
          <Info
            :label="$t('label.create_by')"
            :value="`${inventory.user.firstname} ${inventory.user.lastname}`"
          />
        </template>
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
import { useRoute } from "vue-router"
import { computed, ref } from "vue";
import gql from "graphql-tag";
import { useQuery, UseQueryReturn } from "@vue/apollo-composable";
import Items from "../../components/Item/Items.vue";
import { ITEM_STATUS } from "app/../commons/Interface/Item";
import dayjs from "dayjs"
import LayoutSection from "../../components/Layout/LayoutSection.vue"
import Info from "../../components/Global/Ui/Info.vue"

const route = useRoute()

const tab = ref("furnitures")

const { result, loading }: UseQueryReturn<{
  inventory: {
    id: string;
    name: string;
    created_at: string;
    user: {
      id: string;
      firstname: string;
      lastname: string;
    } | null;
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
  id: string;
}> = useQuery(gql`
  query inventory (
    $id: String
  ) {
    inventory (id: $id) {
      name
      created_at
      user {
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

const inventory = computed(() => result.value?.inventory)

const dateCreated = computed(() => dayjs(inventory.value?.created_at).format("DD/MM/YYYY"))
</script>