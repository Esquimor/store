<template>
  <LayoutSettings title="Addresses">
    <template v-slot:actions>
      <q-btn
        color="primary"
        label="Add an Address" 
        :to="{ name: 'settings-address-new' }"
      />
    </template>
    <AddressesCard :addresses="addresses" @onDelete="onDelete"/>
  </LayoutSettings>
</template>

<script lang="ts" setup>
import { useQuasar } from "quasar"
import { computed } from "vue";
import LayoutSettings from "../../../components/Settings/LayoutSettings.vue";
import AddressesCard from "src/components/Address/AddressesCard.vue";
import { useQuery, UseQueryReturn, useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";

const $q = useQuasar()

const { result, refetch }: UseQueryReturn<{
  addresses: {
    id: string;
    country: string;
    city: string;
    comment: string;
    ligne1: string;
    ligne2: string;
    name: string;
    number: string;
    zipCode: string;
  }[];
}, undefined> = useQuery(gql`
  query addresses {
    addresses {
      id
      country
      city
      comment
      ligne1
      ligne2
      name
      number
      zipCode
    }
  }
`)

const addresses = computed(() => result.value?.addresses ?? [])


const { mutate: deleteAddress  } = useMutation(gql`
  mutation deleteAddress ($id: String!) {
    deleteAddress (id: $id)
  }
`)

const onDelete = (id: string) => {
  $q.dialog({
    title: "Confirm",
    message: "Would you like to delete this address ?",
    cancel: true,
    persistent: true
  }).onOk(() => {
    deleteAddress({
      id,
    }).then(() => {
        refetch?.()
          .catch(e => console.log(e))
        $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Deleted"
          })
      })
      .catch((e) => console.log(e))
  })
}
</script>