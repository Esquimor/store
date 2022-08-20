<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="text-h6">{{props.inventory.name}}</div>
      </q-card-section>

      <q-separator inset/>

      <q-card-actions align="right">
        <q-btn color="negative" icon="delete" label="Delete" @click="onDelete"/>
        <q-btn
          color="primary"
          icon="edit"
          label="Edit"
          :to="{ name: 'settings-inventory-edit', params: {id: props.inventory.id } }"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { useQuasar } from "quasar"
import { useStore } from "../../store/index";
import { Inventory } from "../../../../commons/Interface/Inventory";
import InventoryRequest from "../../request/InventoryRequest";
import { InventoryActionTypes } from "../../store/inventory/action-types";

const $q = useQuasar()
const $store = useStore()

const props = defineProps<{
  inventory: Inventory
}>()

const onDelete = () => {
  $q.dialog({
    title: "Confirm",
    message: "Would you like to delete this inventory ?",
    cancel: true,
    persistent: true
  }).onOk(() => {
  void InventoryRequest.Delete(props.inventory.id)
    .then(() => {
      void $store.dispatch(`inventory/${InventoryActionTypes.REMOVE_INVENTORY}`, props.inventory.id)
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Deleted"
      })
    })
  })
}
</script>