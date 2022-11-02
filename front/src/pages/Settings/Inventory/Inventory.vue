<template>
  <LayoutSettings :title="$t('inventory.inventories')">
    <template v-slot:actions>
      <q-btn
        color="primary"
        :label="$t('inventory.add_inventory')" 
        :to="{ name: 'settings-inventory-new' }"
      />
    </template>
    <InventoriesCard :inventories="inventories" @onDelete="onDelete"/>
  </LayoutSettings>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import LayoutSettings from "../../../components/Settings/LayoutSettings.vue";
import InventoriesCard from "src/components/Inventory/InventoriesCard.vue";
import { useQuery, UseQueryReturn, useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { useQuasar } from "quasar"
import { useI18n } from "vue-i18n"

const $q = useQuasar()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n() 

const { result, refetch }: UseQueryReturn<{
  inventories: {
    id: string;
    name: string;
  }[];
}, undefined> = useQuery(gql`
  query inventories {
    inventories {
      id
      name
    }
  }
`)

const inventories = computed(() => result.value?.inventories ?? [])

const { mutate: deleteInventory  } = useMutation(gql`
  mutation deleteInventory ($id: String!) {
    deleteInventory (id: $id)
  }
`)

const onDelete = (id: string) => {
  $q.dialog({
    title: t("label.confirm"),
    message: t("inventory.would_you_like_to_delete_this_inventory"),
    cancel: true,
    persistent: true
  }).onOk(() => {
    deleteInventory({
      id,
    }).then(() => {
        refetch?.()
          .catch(e => console.log(e))
        $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: t("label.deleted")
          })
      })
      .catch((e) => console.log(e))
  })
}
</script>