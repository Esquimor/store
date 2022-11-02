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
import { ref, defineProps} from "vue";
import { useQuasar } from "quasar"
import { useDialogPluginComponent } from "quasar"
import { Tag } from "../../../../../commons/Interface/Tag";
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { useI18n } from "vue-i18n"

const props = defineProps<{
  tag: Tag
}>()

defineEmits([
  ...useDialogPluginComponent.emits
])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

const name = ref(props.tag.name)

const $q = useQuasar()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n() 

const { mutate: updateTag } = useMutation(gql`
  mutation updateTag ($name: String, $id: String) {
    updateTag (name: $name, id: $id) {
      id
    }
  }
`)

const onSubmit = () => {
  updateTag({
    id: props.tag.id,
    name: name.value
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