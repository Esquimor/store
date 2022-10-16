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
            label="Name"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <q-card-actions align="right">
            <q-btn color="primary" label="Cancel" @click="onDialogCancel" />
            <q-btn color="primary" label="OK" @click="onSubmit" />
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

const props = defineProps<{
  parentId: string
}>()

defineEmits([
  ...useDialogPluginComponent.emits
])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

const name = ref("");

const $q = useQuasar()

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
        message: "Submitted"
      })
      onDialogOK()
    })
    .catch((e) => console.log(e))
}

</script>