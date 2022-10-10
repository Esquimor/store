<template>
  <LayoutSettingsForm :title="$t('setting.my_organization')" :submit="onSubmit">
    <q-input
      class="col-6"
      v-model="name"
      :label="$t('label.name')"
      lazy-rules
    />
  </LayoutSettingsForm>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { useQuasar } from "quasar"
import { useQuery, useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import LayoutSettingsForm from "../../components/Settings/LayoutSettingsForm.vue";

const $q = useQuasar()

const name = ref("");

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const { result, loading }: {
  result: {
    value:{
      myOrganization: {
        name: string;
      }
    }
  }
} = useQuery(gql`
  query me {
    myOrganization {
      name
    }
  }
`)

watch(
  result,
  () => {
    if (!loading) return;
    name.value = result.value.myOrganization.name
  }
)

const { mutate: updateMyOrganization  } = useMutation(gql`
  mutation updateMyOrganization ($name: String!) {
    updateMyOrganization(name: $name) {
      name
    }
  }
`)

const onSubmit = async () => {
  await updateMyOrganization({
    name: name.value,
  })
    .then(() => {
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Submitted"
      })
    })
    .catch(e => {
      console.log(e)
    })
}
</script>