<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <div class="q-pa-md" style="max-width: 400px">
        <Form
          :validation-schema="schema"
          @submit="onSubmit"
          ref="myForm"
          class="q-gutter-md"
        >
          <QInputWithValidation
          name="name"
            label="Name"
          />

          <FieldArray name="variations" v-slot="{ fields, push, remove }">
            <q-card-section
              v-for="(field, idx) in fields || []"
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
import { ref, watch } from "vue"
import { Form, FieldArray } from "vee-validate";
import * as yup from "yup";
import { useQuasar } from "quasar"
import { useDialogPluginComponent } from "quasar"
import { AttributDefaultWithVariationDefaults } from "../../../../../commons/Interface/Attribut";
import QInputWithValidation from "../../Global/Form/QInputWithValidation.vue"
import { isNotEmpty } from "../../../../../commons/Technical/Empty";
import { useQuery, UseQueryReturn, useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";

defineEmits([
  ...useDialogPluginComponent.emits
])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

const $q = useQuasar()


const schema = yup.object({
  name: yup.string().required(),
  variations: yup.array().of(yup.object({
    id: yup.string().optional(),
    name: yup.string()
  }))
});


const props = defineProps<{
  attributId: string
}>()

const { result, loading }: UseQueryReturn<{
  attribut: {
    id: string;
    name: string;
    variations: {
      id: string;
      name: string
    }[];
  };
}, {
  id: string
}> = useQuery(gql`
  query attribut($id: String) {
    attribut(id: $id) {
      id
      name
      variations {
        id
        name
      }
    }
  }
`, {
  id: props.attributId
})

const myForm = ref(null);

watch(
  result,
  (resultValue) => {
    if (!loading || !resultValue) return
    // Sanitize Variations
    const variations = resultValue.attribut?.variations.map(variation => ({id: variation.id, name: variation.name})) || []
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    myForm.value.setValues({...resultValue.attribut, variations})
  }
)

const { mutate: updateAttribut } = useMutation(gql`
  mutation updateAttribut (
    $id: String
    $name: String
  ) {
    updateAttribut (
      id: $id
      name: $name
    ) {
      id
    }
  }
`)

const { mutate: updateVariationsForAttribut } = useMutation(gql`
  mutation updateVariationsForAttribut (
    $attributId: String
    $variations: [VariationUpdate]
  ) {
    updateVariationsForAttribut(attributId: $attributId, variations: $variations) {
      id
    }
  }
`)

function onSubmit(values: AttributDefaultWithVariationDefaults) {
  const removedEmptyVariations = values.variations.filter(variation => isNotEmpty(variation.name))
  updateAttribut({
    ...values,
    id: props.attributId
  })
    .then(() => {
      updateVariationsForAttribut({
        attributId: props.attributId,
        variations: removedEmptyVariations
      })
        .then(() => {
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Submitted"
          })
          onDialogOK()
        })
        .catch((e) => console.log(e))
    })
    .catch((e) => console.log(e))
}

</script>