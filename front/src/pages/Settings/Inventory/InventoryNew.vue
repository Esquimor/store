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
import { useRouter } from "vue-router"
import { useQuasar } from "quasar"
import { Form } from "vee-validate";
import * as yup from "yup";
import { InventoryDefault } from "../../../../../commons/Interface/Inventory";
import LayoutSettings from "../../../components/Settings/LayoutSettings.vue";
import QInputWithValidation from "../../../components/Global/Form/QInputWithValidation.vue"
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";

const $q = useQuasar()
const router = useRouter()

const schema = yup.object({
  name: yup.string().required(),
});

const initialValues = {
  name: "",
}

const { mutate: createInventory } = useMutation(gql`
  mutation createInventory (
    $name: String
  ) {
    createInventory (
      name: $name
    ) {
      id
    }
  }
`)

function onSubmit(values: InventoryDefault) {

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  createInventory(values)
    .then(() => {
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Submitted"
      })
      void router.push({ name: "settings-inventory" })
    })
    .catch(e => console.log(e))
}
</script>