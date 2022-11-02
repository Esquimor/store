<template>
  <LayoutSettings :title="$t('address.edit_address')">
    <div>
    <Form
      :validation-schema="schema"
      @submit="onSubmit"
      ref="myForm"
    >
      <q-card-section class="row wrap justify-between">
        <QInputWithValidation
          name="name"
          :label="$t('label.name')"
          class="col col-5"
        />
        <QInputWithValidation
          name="number"
          :label="$t('lable.number')"
          class="col col-5 col-of-2"
        />
        <QInputWithValidation
          name="ligne1"
          :label="$t('address.ligne1')"
          class="col col-5"
        />
        <QInputWithValidation
          name="ligne2"
          :label="$t('address.lign2')"
          class="col col-5"
        />
        <QInputWithValidation
          name="city"
          :label="$t('address.city')"
          class="col col-5"
        />
        <QInputWithValidation
          name="zipCode"
          :label="$t('address.zip_code')"
          class="col col-5"
        />
        <QInputWithValidation
          name="country"
          :label="$t('address.country')"
          class="col col-5"
        />
        <QInputWithValidation
          name="comment"
          :label="$t('label.comment')"
          class="col col-12"
          type="textarea"
        />
      </q-card-section>

      <FieldArray name="placements" v-slot="{ fields, push, remove }">
        <q-card-section
          v-for="(field, idx) in fields || []"
          :key="field.key"
        >
          <q-card class="full-width" flat bordered>
            <q-card-section>
              <q-card-section horizontal>
                <div class="full-width">
                  <QInputWithValidation
                    :name="`placements[${idx}].name`"
                    :label="$t('label.name')"
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
          <q-btn :label="$t('label.add')" color="primary"  @click="push({ name: '' })" />
        </q-card-actions>
      </FieldArray>
        
      <q-toolbar class="bg-white">
        <q-space />
        <q-card-actions class="q-pl-lg">
          <q-btn :label="$t('label.cancel')" color="grey-9" :to="{ name: 'settings-address' }"></q-btn>
          <q-btn color="primary" type="submit" :label="$t('label.submit')"/>
        </q-card-actions>
      </q-toolbar>
    </Form></div>
  </LayoutSettings>
</template>

<script setup lang="ts">
import { watch, ref } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useQuasar } from "quasar"
import { Form, FieldArray } from "vee-validate";
import * as yup from "yup";
import { AddressDefaultWithPlacementsDefault } from "../../../../../commons/Interface/Address";
import LayoutSettings from "../../../components/Settings/LayoutSettings.vue";
import QInputWithValidation from "../../../components/Global/Form/QInputWithValidation.vue"
import { isNotEmpty } from "../../../../../commons/Technical/Empty";
import { useQuery, UseQueryReturn, useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { useI18n } from "vue-i18n"


const $q = useQuasar()
const router = useRouter()
const route = useRoute()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n() 

const schema = yup.object({
  name: yup.string().required(),
  number: yup.string().optional(),
  ligne1: yup.string().optional(),
  ligne2: yup.string().optional(),
  city: yup.string().optional(),
  zipCode: yup.string().optional(),
  country: yup.string().optional(),
  comment: yup.string().optional(),
  placements: yup.array().of(yup.object().shape({
    id: yup.string().optional(),
    name: yup.string().optional()
  }))
});

const { result }: UseQueryReturn<{
  address: {
    id: string;
    country: string;
    city: string;
    comment: string;
    ligne1: string;
    ligne2: string;
    name: string;
    number: string;
    zipCode: string;
    placements: {
      id: string;
      name: string
    }[];
  };
}, {
  id: string
}> = useQuery(gql`
  query address($id: String) {
    address(id: $id) {
      id
      country
      city
      comment
      ligne1
      ligne2
      name
      number
      zipCode
      placements {
        id
        name
      }
    }
  }
`, {
  id: route.params.id
})

const myForm = ref(null);

watch(
  result,
  () => {
    // Sanitize Placements
    const placements = result.value?.address?.placements.map(placement => ({id: placement.id, name: placement.name}))
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    myForm.value.setValues({...result.value?.address, placements})
  }
)

const { mutate: updateAddress } = useMutation(gql`
  mutation updateAddress (
    $id: String
    $name: String
    $number: String
    $ligne1: String
    $ligne2: String
    $city: String
    $zipCode: String
    $country: String
    $comment: String
  ) {
    updateAddress (
      id: $id
      name: $name
      number: $number
      ligne1: $ligne1
      ligne2: $ligne2
      city: $city
      zipCode: $zipCode
      country: $country
      comment: $comment
    ) {
      id
    }
  }
`)

const { mutate: updatePlacementsForAddress } = useMutation(gql`
  mutation updatePlacementsForAddress (
    $addressId: String
    $placements: [PlacementUpdate]
  ) {
    updatePlacementsForAddress(addressId: $addressId, placements: $placements) {
      id
    }
  }
`)

function onSubmit(values: AddressDefaultWithPlacementsDefault) {
  const removedEmptyPlacements = values.placements.filter(placement => isNotEmpty(placement.name))
  updateAddress({
    ...values,
    id: route.params.id
  })
    .then(() => {
      updatePlacementsForAddress({
        addressId: route.params.id,
        placements: removedEmptyPlacements
      })
        .then(() => {
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: t("label.submited")
          })
          void router.push({ name: "settings-address" })
        })
        .catch((e) => console.log(e))
    })
    .catch((e) => console.log(e))
}
</script>