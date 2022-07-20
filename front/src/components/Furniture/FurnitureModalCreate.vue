<template>
  <q-btn color="primary" label="Add a Order" @click="open = true" />
  <q-dialog v-model="open" >
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h6">Add a Furniture</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input
          filled
          v-model="name"
          label="Name"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
        <q-input
          filled
          v-model="description"
          label="Description"
          lazy-rules
          type="textarea"
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup></q-btn>
        <q-btn label="OK" color="primary" @click="onSubmit"></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useQuasar } from "quasar"
import { useStore } from "../../store/index"
import FurnitureRequest from "../../request/FunitureRequest";
import { FurnitureActionTypes } from "../../store/furniture/action-types";

const $q = useQuasar()
const $store = useStore()

const name = ref("")
const description = ref("")
const open = ref(false)


const onSubmit = () => {
  void FurnitureRequest.Create({name: name.value, description: description.value})
    .then(({ furniture }) => {
      void $store.dispatch(`furniture/${FurnitureActionTypes.ADD_FURNITURE}`, furniture)
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Submitted"
      })
    })
    .finally(() => open.value = false)
}
</script>