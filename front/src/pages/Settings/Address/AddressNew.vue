<template>
  <LayoutSettings :title="$t('address.add_address')">
    <Form
      :validation-schema="schema"
      @submit="onSubmit"
      :initial-values="initialValues"
    >
      <q-card-section class="row wrap justify-between">
        <QInputWithValidation
          name="name"
          :label="$t('label.name')"
          class="col col-5"
        />
        <QInputWithValidation
          name="number"
          :label="$t('address.number')"
          class="col col-5 col-of-2"
        />
        <QInputWithValidation
          name="ligne1"
          :label="$t('address.ligne1')"
          class="col col-5"
        />
        <QInputWithValidation
          name="ligne2"
          :label="$t('address.ligne2')"
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
          <q-btn :label="$t('label.add')" color="primary"  @click="push({ description: '', name: '' })" />
        </q-card-actions>
      </FieldArray>
        
      <q-toolbar class="bg-white">
        <q-space />
        <q-card-actions class="q-pl-lg">
          <q-btn :label="$t('label.cancel')" color="grey-9" :to="{ name: 'settings-address' }"></q-btn>
          <q-btn color="primary" type="submit" :label="$t('label.submit')"/>
        </q-card-actions>
      </q-toolbar>
    </Form>
  </LayoutSettings>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import { useQuasar } from "quasar"
import { Form, FieldArray } from "vee-validate";
import * as yup from "yup";
import { AddressDefaultWithPlacementsDefault } from "../../../../../commons/Interface/Address";
import LayoutSettings from "../../../components/Settings/LayoutSettings.vue";
import QInputWithValidation from "../../../components/Global/Form/QInputWithValidation.vue"
import { isNotEmpty } from "../../../../../commons/Technical/Empty";
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { useI18n } from "vue-i18n"

const $q = useQuasar()
const router = useRouter()
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

const { mutate: createAddress } = useMutation(gql`
  mutation createAddress (
    $name: String
    $number: String
    $ligne1: String
    $ligne2: String
    $city: String
    $zipCode: String
    $country: String
    $comment: String
  ) {
    createAddress (
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

const { mutate: createPlacementsForAddress } = useMutation(gql`
  mutation createPlacementsForAddress (
    $addressId: String
    $placements: [PlacementCreate]
  ) {
    createPlacementsForAddress(addressId: $addressId, placements: $placements) {
      id
    }
  }
`)

const onSubmit = (values: AddressDefaultWithPlacementsDefault) => {
  const removedEmptyPlacements = values.placements.filter(placement => isNotEmpty(placement.name))
  
  createAddress(values)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore 
    .then((
      {
        data
      } : {
        data: {
          createAddress :{
            id: string;
          }
        }
      }
    ) => {
      createPlacementsForAddress({
        addressId: data.createAddress.id,
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