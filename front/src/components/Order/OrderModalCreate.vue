<template>
  <q-btn color="primary" label="Add a Order" @click="open = true" />
  <q-dialog v-model="open" >
    <q-layout view="lHh lpr lFf" container style="width: 700px; max-width: 80vw;height: 80vh">
      <Form
        :validation-schema="schema"
        @submit="onSubmit"
        :initial-values="initialValues"
      >
        <q-header elevated>
          <q-toolbar>
            <q-toolbar-title>Add furnitures to order</q-toolbar-title>
          </q-toolbar>
        </q-header>
        <q-page-container>
          <q-page class="bg-grey-1">
            <q-card flat bordered>
              <q-card-section>
                <QInputWithValidation
                  :name="`name`"
                  label="Name"
                />
              </q-card-section>
            </q-card>

            <FieldArray name="furnitures" v-slot="{ fields, push, remove }">
              <q-card-section
                v-for="(field, idx) in fields"
                :key="field.key"
              >
                <q-card class="full-width" flat bordered>
                  <q-card-section>
                    <q-card-section horizontal>
                      <div 
                          class="full-width">
                        <QInputWithValidation
                          :name="`furnitures[${idx}].name`"
                          label="Name"
                        />
                        <QInputWithValidation
                          :name="`furnitures[${idx}].description`"
                          label="Description"
                          type="textarea"
                        />
                      </div>

                      <q-card-actions vertical class="justify-start items-start content-start">
                        <q-btn flat round color="red" icon="delete" @click="remove(idx)"/>
                      </q-card-actions>
                    </q-card-section>
                  </q-card-section>
                </q-card>
              </q-card-section>
              <q-card-actions class="q-pl-lg">
                <q-btn label="Add" color="primary"  @click="push({ description: '', name: '' })" />
              </q-card-actions>
            </FieldArray>
          </q-page>
          
          <q-footer elevated>
            <q-toolbar class="bg-grey-1">
              <q-space />
              <q-card-actions class="q-pl-lg">
                <q-btn label="Cancel" color="grey-9" v-close-popup></q-btn>
                <q-btn color="primary" type="submit" label="Submit"/>
              </q-card-actions>
            </q-toolbar>
          </q-footer>
        </q-page-container>
      </Form>
    </q-layout>
  </q-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useQuasar } from "quasar"
import { useStore } from "../../store/index"
import { Form, FieldArray } from "vee-validate";
import * as yup from "yup";
import QInputWithValidation from "../Global/Form/QInputWithValidation.vue"
import OrderRequest from "../../request/OrderRequest";
import { OrderActionTypes } from "../../store/order/action-types";

const $q = useQuasar()
const $store = useStore()
const open = ref(false)

const schema = yup.object({
  name: yup.string().required(),
  furnitures: yup.array().of(yup.object({
    name: yup.string().required().label("Name"),
    description: yup.string().optional()
  }))
});

const initialValues = {
  furnitures: [{
    name: "",
    description: ""
  }]
}

function onSubmit(values) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  void OrderRequest.Create(values)
    .then(({ order }) => {
      void $store.dispatch(`order/${OrderActionTypes.ADD_ORDER}`, order)
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