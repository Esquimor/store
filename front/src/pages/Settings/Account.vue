<template>
  <LayoutSettingsForm
    :title="$t('setting.my_personal_information')"
    :submit="onSubmit"
  >
    <q-input
      class="col-6"
      v-model="firstname"
      :label="$t('label.firstname')"
      lazy-rules
    />
    <q-input
      class="col-6"
      v-model="lastname"
      :label="$t('label.lastname')"
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
import { useI18n } from "vue-i18n"

const $q = useQuasar()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n() 

const firstname = ref("");
const lastname = ref("");

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const { result, loading }: {
  result: {
    value:{
      me: {
        id: string;
        firstname: string;
        lastname: string;
      }
    }
  }
} = useQuery(gql`
  query me {
    me {
      firstname
      lastname
    }
  }
`)

watch(
  result,
  () => {
    if (!loading) return;
    firstname.value = result.value.me.firstname
    lastname.value = result.value.me.lastname
  }
)

const { mutate: updateMe  } = useMutation(gql`
  mutation updateMe ($lastname: String!, $firstname: String!) {
    updateMe(lastname: $lastname, firstname: $firstname) {
      lastname
      firstname
    }
  }
`)

const onSubmit = async () => {
  await updateMe({
    lastname: lastname.value,
    firstname: firstname.value
  })
    .then(() => {
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: t("label.submited")
      })
    })
    .catch(e => {
      console.log(e)
    })
}
</script>