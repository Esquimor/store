<template>
  <LayoutSettings title="Add Address">
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
        
      <q-toolbar class="bg-white">
        <q-space />
        <q-card-actions class="q-pl-lg">
          <q-btn label="Cancel" color="grey-9" :to="{ name: 'settings-address' }"></q-btn>
          <q-btn color="primary" type="submit" label="Submit"/>
        </q-card-actions>
      </q-toolbar>
    </Form>
  </LayoutSettings>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import { useStore } from "../../../store/index"
import { useQuasar } from "quasar"
import { Form, FieldArray } from "vee-validate";
import * as yup from "yup";
import { AddressDefaultWithPlacementsDefault } from "../../../../../commons/Interface/Address";
import AddressRequest from "../../../request/AddressRequest";
import { AddressActionTypes } from "../../../store/address/action-types";
import LayoutSettings from "../../../components/Settings/LayoutSettings.vue";
import QInputWithValidation from "../../../components/Global/Form/QInputWithValidation.vue"
import { isNotEmpty } from "../../../../../commons/Technical/Empty";

const $q = useQuasar()
const $store = useStore()
const router = useRouter()

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
    name: yup.string()
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
    name: ""
  }]
}

function onSubmit(values: AddressDefaultWithPlacementsDefault) {

  const removedEmptyPlacements = values.placements.filter(placement => isNotEmpty(placement.name))

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  void AddressRequest.Create({...values, placements: removedEmptyPlacements})
    .then(({address}) => {
      void $store.dispatch(`address/${AddressActionTypes.ADD_ADDRESS}`, address)
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Submitted"
      })
    })
    .finally(() => {
      void router.push({ name: "settings-address" })
    })
}
</script>