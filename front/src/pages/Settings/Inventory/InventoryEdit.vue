<template>
  <LayoutSettings title="Add Inventory">
    <Form
      :validation-schema="schema"
      @submit="onSubmit"
      ref="myForm"
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
import { ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router"
import { useQuasar } from "quasar"
import { Form } from "vee-validate";
import * as yup from "yup";
import { InventoryDefault } from "../../../../../commons/Interface/Inventory";
import LayoutSettings from "../../../components/Settings/LayoutSettings.vue";
import QInputWithValidation from "../../../components/Global/Form/QInputWithValidation.vue"
import { useQuery, UseQueryReturn, useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";

const $q = useQuasar()
const router = useRouter()
const route = useRoute()

const schema = yup.object({
  name: yup.string().required(),
});

const { result }: UseQueryReturn<{
  inventory: {
    id: string;
    name: string;
  };
}, {
  id: string
}> = useQuery(gql`
  query inventory($id: String) {
    inventory(id: $id) {
      id
      name
    }
  }
`, {
  id: route.params.id
})

const myForm = ref(null);

watch(
  result,
  () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    myForm.value.setValues({...result.value?.inventory})
  }
)

const { mutate: updateInventory } = useMutation(gql`
  mutation updateInventory (
    $id: String
    $name: String
  ) {
    updateInventory(id: $id, name: $name) {
      id
    }
  }
`)

function onSubmit(values: InventoryDefault) {
  updateInventory({
    id: route.params.id,
    ...values
  })
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