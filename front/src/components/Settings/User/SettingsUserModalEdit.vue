<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <div class="q-pa-md" style="max-width: 400px">
        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
        >
          <q-select filled v-model="role" :options="options" label="Role" />

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
import { ref, defineProps} from "vue";
import { useQuasar } from "quasar"
import { useDialogPluginComponent } from "quasar"
import { ROLE } from "../../../../../commons/Interface/Role";
import { User } from "../../../../../commons/Interface/User";
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { useI18n } from "vue-i18n"

const props = defineProps<{
  user: User
}>()

const options = Object.values(ROLE)

defineEmits([
  ...useDialogPluginComponent.emits
])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

const role = ref(props.user.role)

// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n() 
const $q = useQuasar()

const { mutate: updateUser } = useMutation(gql`
  mutation updateUser ($role: String!, $id: String) {
    updateUser (role: $role, id: $id) {
      id
    }
  }
`)

const onSubmit = () => {
  updateUser({
    id: props.user.id,
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