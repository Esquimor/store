<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="text-h6">{{props.address.name}}</div>
      </q-card-section>

      <q-card-section>
        <div>{{props.address.number}}</div>
        <div>{{props.address.ligne1}}</div>
        <div>{{props.address.ligne2}}</div>
        <div>{{props.address.city}}</div>
        <div>{{props.address.zipCode}} {{props.address.country}}</div>
        <div>{{props.address.comment}}</div>
      </q-card-section>

      <q-separator inset/>

      <q-card-actions align="right">
        <q-btn color="negative" icon="delete" label="Delete" @click="onDelete"/>
        <q-btn
          color="secondary"
          icon="edit"
          label="Edit"
          :to="{ name: 'settings-address-edit', params: {id: props.address.id } }"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from "quasar"
import { useStore } from "../../store/index";
import { AddressWithPlacements } from "../../../../commons/Interface/Address";
import AddressRequest from "../../request/AddressRequest";
import { AddressActionTypes } from "../../store/address/action-types";

const $q = useQuasar()
const $store = useStore()

const props = defineProps<{
  address: AddressWithPlacements;
}>();

const onDelete = () => {
  $q.dialog({
    title: "Confirm",
    message: "Would you like to delete this address ?",
    cancel: true,
    persistent: true
  }).onOk(() => {
  void AddressRequest.Delete(props.address.id)
    .then(() => {
      void $store.dispatch(`address/${AddressActionTypes.REMOVE_ADDRESS}`, props.address.id)
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