<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <div class="q-pa-md" style="max-width: 400px">
        <Form
          :validation-schema="schema"
          @submit="onSubmit"
          :initial-values="initialValues"
              class="q-gutter-md"
        >
          <QInputWithValidation
          name="name"
            label="Name"
          />

          <FieldArray name="variations" v-slot="{ fields, push, remove }">
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
                        :name="`variations[${idx}].name`"
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
              <q-btn label="Add" color="primary"  @click="push({ name: '' })" />
            </q-card-actions>
          </FieldArray>

          <q-card-actions align="right">
            <q-btn color="primary" label="Cancel" @click="onDialogCancel" />
            <q-btn color="primary" type="submit" label="Submit" />
          </q-card-actions>
        </Form>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { Form, FieldArray } from "vee-validate";
import * as yup from "yup";
import { useQuasar } from "quasar"
import { useDialogPluginComponent } from "quasar"
import { useStore } from "../../../store/index";
import AttributRequest from "../../../request/AttributRequest";
import { AttributActionTypes } from "../../../store/attribut/action-types";
import { AttributDefaultWithVariationDefaults } from "../../../../../commons/Interface/Attribut";
import QInputWithValidation from "../../Global/Form/QInputWithValidation.vue"
import { isNotEmpty } from "../../../../../commons/Technical/Empty";

defineEmits([
  ...useDialogPluginComponent.emits
])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

const $store = useStore();
const $q = useQuasar()


const schema = yup.object({
  name: yup.string().required(),
  variations: yup.array().of(yup.object({
    name: yup.string()
  }))
});

const initialValues = {
  name: "",
  variations: [{
    name: ""
  }]
}

const onSubmit = (values: AttributDefaultWithVariationDefaults) => {

  const removedEmptyVariations = values.variations.filter(variation => isNotEmpty(variation.name))

  void AttributRequest.Create({...values, variations: removedEmptyVariations })
    .then(({ attribut }) => {
      void $store.dispatch(`attribut/${AttributActionTypes.ADD_ATTRIBUT}`, attribut)
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Submitted"
      })
      onDialogOK()
    })
}

</script>