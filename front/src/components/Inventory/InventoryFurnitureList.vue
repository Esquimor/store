<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" :full-width="true" :full-height="true">
    <q-card >
      <Furniturelist @addOrder="addInInventory" @close="onDialogHide"/>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDialogPluginComponent } from "quasar"
import { FurnitureWithLastFurnitureVersion } from "../../../../commons/Interface/Furniture"
import Furniturelist from "../Furniture/FurnitureList.vue"
import {useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";

defineEmits([
  ...useDialogPluginComponent.emits
])

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent()


const props = defineProps<{
  inventoryId: string;
}>()

const { mutate: addItemInInventory } = useMutation(gql`
  mutation addItemInInventory ($furnitureId: String!, $inventoryId: String!) {
    addItemInInventory (furnitureId: $furnitureId, inventoryId: $inventoryId) {
      id
    }
  }
`)

const addInInventory = (furniture: FurnitureWithLastFurnitureVersion) => {
  addItemInInventory({inventoryId: props.inventoryId, furnitureId: furniture.id})
    .then(() => {
      onDialogOK();
    })
    .catch((e) => console.log(e))
}
</script>