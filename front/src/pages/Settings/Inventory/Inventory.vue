<template>
  <LayoutSettings title="Inventories">
    <template v-slot:actions>
      <q-btn
        color="primary"
        label="Add an Inventory" 
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

const $q = useQuasar()

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
    title: "Confirm",
    message: "Would you like to delete this inventory ?",
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
            message: "Deleted"
          })
      })
      .catch((e) => console.log(e))
  })
}
</script>