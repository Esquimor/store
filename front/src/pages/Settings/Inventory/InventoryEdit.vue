<template>
  <LayoutSettings title="Add Inventory">
    <Form
      :validation-schema="schema"
      @submit="onSubmit"
      :initial-values="initialValues"
    >
      <q-card-section class="row wrap justify-between">
        <QInputWithValidation
          name="name"
          label="Name"
          class="col col-5"
        />
      </q-card-section>
        
      <q-toolbar class="bg-white">
        <q-space />
        <q-card-actions class="q-pl-lg">
          <q-btn label="Cancel" color="grey-9" :to="{ name: 'settings-inventory' }"></q-btn>
          <q-btn color="primary" type="submit" label="Submit"/>
        </q-card-actions>
      </q-toolbar>
    </Form>
  </LayoutSettings>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router"
import { useStore } from "../../../store/index"
import { useQuasar } from "quasar"
import { Form } from "vee-validate";
import * as yup from "yup";
import { InventoryDefault } from "../../../../../commons/Interface/Inventory";
import InventoryRequest from "../../../request/InventoryRequest";
import { InventoryActionTypes } from "../../../store/inventory/action-types";
import LayoutSettings from "../../../components/Settings/LayoutSettings.vue";
import QInputWithValidation from "../../../components/Global/Form/QInputWithValidation.vue"

const $q = useQuasar()
const $store = useStore()
const router = useRouter()
const route = useRoute()

const schema = yup.object({
  name: yup.string().required(),
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
const initialValues = computed(() => $store.getters["inventory/getInventoryById"](route.params.id) as number)

function onSubmit(values: InventoryDefault) {

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  void InventoryRequest.Update(route.params.id as string, values)
    .then(({inventory}) => {
      void $store.dispatch(`inventory/${InventoryActionTypes.UPDATE_INVENTORY}`, inventory)
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Submitted"
      })
    })
    .finally(() => {
      void router.push({ name: "settings-inventory" })
    })
}
</script>