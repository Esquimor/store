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
            v-model="name"
            :label="$t('label.name')"
            lazy-rules
            :rules="[ val => val && val.length > 0 || $t('error.field_required')]"
          />

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
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { useI18n } from "vue-i18n"

const props = defineProps<{
  parentId: string
}>()

defineEmits([
  ...useDialogPluginComponent.emits
])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

const name = ref("");

const $q = useQuasar()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n() 

const { mutate: createCategory } = useMutation(gql`
  mutation createCategory ($name: String, $parentId: String) {
    createCategory (name: $name, parentId: $parentId) {
      id
    }
  }
`)

const onSubmit = () => {
  createCategory({
    name: name.value,
    parentId: props.parentId
  }).then(() => {
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: t("label.submited")
      })
      onDialogOK()
    })
    .catch((e) => console.log(e))
}

</script>