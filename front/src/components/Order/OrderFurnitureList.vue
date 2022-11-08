<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" :full-width="true" :full-height="true">
    <q-card >
      <Furniturelist @addOrder="addInOrder"/>
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
  orderId: string;
}>()

const { mutate: addItemInOrder } = useMutation(gql`
  mutation addItemInOrder ($furnitureId: String!, $orderId: String!) {
    addItemInOrder (furnitureId: $furnitureId, orderId: $orderId) {
      id
    }
  }
`)

const addInOrder = (furniture: FurnitureWithLastFurnitureVersion) => {
  addItemInOrder({orderId: props.orderId, furnitureId: furniture.id})
    .then(() => {
      onDialogOK();
    })
    .catch((e) => console.log(e))
}
</script>