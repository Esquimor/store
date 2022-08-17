<template>
  <q-btn color="primary" label="Add an Address" @click="open = true" />
  <q-dialog v-model="open" >
    <q-layout view="lHh lpr lFf" container style="width: 700px; max-width: 80vw;height: 80vh">
      <Form
        :validation-schema="schema"
        @submit="onSubmit"
        :initial-values="initialValues"
      >
        <q-header elevated>
          <q-toolbar>
            <q-toolbar-title>Add Address</q-toolbar-title>
          </q-toolbar>
        </q-header>
        <q-page-container>
          <q-page class="bg-grey-1">
            <q-card-section>
              <q-card flat bordered>
                <q-card-section class="row wrap justify-between">
                  <QInputWithValidation
                    name="name"
                    label="Name"
                    class="col col-5"
                  />
                  <QInputWithValidation
                    name="number"
                    label="Number"
                    class="col col-5 col-of-2"
                  />
                  <QInputWithValidation
                    name="ligne1"
                    label="Ligne 1"
                    class="col col-5"
                  />
                  <QInputWithValidation
                    name="ligne2"
                    label="Ligne 2"
                    class="col col-5"
                  />
                  <QInputWithValidation
                    name="city"
                    label="City"
                    class="col col-5"
                  />
                  <QInputWithValidation
                    name="zipCode"
                    label="Zip Code"
                    class="col col-5"
                  />
                  <QInputWithValidation
                    name="country"
                    label="Country"
                    class="col col-5"
                  />
                  <QInputWithValidation
                    name="comment"
                    label="Comment"
                    class="col col-12"
                    type="textarea"
                  />
                </q-card-section>
              </q-card>
            </q-card-section>

            <FieldArray name="placements" v-slot="{ fields, push, remove }">
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
                          :name="`placements[${idx}].name`"
                          label="Name"
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
import { Form, FieldArray } from "vee-validate";
import * as yup from "yup";
import QInputWithValidation from "../Global/Form/QInputWithValidation.vue"
import { AddressDefaultWithPlacementsDefault } from "app/../commons/Interface/Address";
import AddressRequest from "src/request/AddressRequest";

const $q = useQuasar()
const open = ref(false)

const schema = yup.object({
  name: yup.string().required(),
  number: yup.string().optional(),
  ligne1: yup.string().optional(),
  ligne2: yup.string().optional(),
  city: yup.string().optional(),
  zipCode: yup.string().optional(),
  country: yup.string().optional(),
  comment: yup.string().optional(),
  placements: yup.array().of(yup.object({
    name: yup.string().required().label("Name"),
  }))
});

const initialValues = {
  name: "",
  number: "",
  ligne1: "",
  ligne2: "",
  city: "",
  zipCode: "",
  country: "",
  comment: "",
  placements: [{
    name: "",
  }]
}

function onSubmit(values: AddressDefaultWithPlacementsDefault) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  void AddressRequest.Create(values)
    .then(() => {
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