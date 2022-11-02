<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <div class="q-pa-md" style="max-width: 400px">
        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
        >
          <q-input
            filled
            v-model="email"
            :label="$t('label.email')"
            lazy-rules
            :rules="[ val => val && val.length > 0 || $t('error.field_required')]"
          />

          <q-input
            filled
            v-model="firstname"
            :label="$t('label.first_name')"
            lazy-rules
          />

          <q-input
            filled
            v-model="lastname"
            :label="$t('label.last_name')"
            lazy-rules
          />
          
          <q-select filled v-model="role" :options="options" :label="$t('label.role')" />

          <q-card-actions align="right">
            <q-btn color="primary" :label="$t('label.cancel')" @click="onDialogCancel" />
            <q-btn color="primary" :label="$t('label.submit')" @click="onSubmit" />
          </q-card-actions>
        </q-form>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref} from "vue";
import { useQuasar } from "quasar"
import { useDialogPluginComponent } from "quasar"
import { ROLE } from "../../../../../commons/Interface/Role";
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { useI18n } from "vue-i18n"

const options = Object.values(ROLE)

defineEmits([
  ...useDialogPluginComponent.emits
])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

const email = ref("");
const firstname = ref("");
const lastname = ref("");
const role = ref(ROLE.NORMAL)

const $q = useQuasar()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n() 

const { mutate: createUser } = useMutation(gql`
  mutation createUser ($firstname: String!, $lastname: String!, $email: String!, $role: String!) {
    createUser (firstname: $firstname, lastname: $lastname, email: $email, role: $role) {
      id
    }
  }
`)

const onSubmit = () => {
  createUser({
    firstname: firstname.value,
    lastname: lastname.value,
    email: email.value,
    role: role.value
  }).then(() => {
      $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: t("label.updated")
        })
      onDialogOK()
    })
    .catch((e) => console.log(e))
}

</script>