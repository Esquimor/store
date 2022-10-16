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
import { ref, defineProps} from "vue";
import { useQuasar } from "quasar"
import { useDialogPluginComponent } from "quasar"
import { Tag } from "../../../../../commons/Interface/Tag";
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";

const props = defineProps<{
  category: Tag
}>()

defineEmits([
  ...useDialogPluginComponent.emits
])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

const name = ref(props.category.name)

const $q = useQuasar()

const { mutate: updateCategory } = useMutation(gql`
  mutation updateCategory ($name: String, $id: String) {
    updateCategory (name: $name, id: $id) {
      id
    }
  }
`)

const onSubmit = () => {
  updateCategory({
    id: props.category.id,
    name: name.value
  }).then(() => {
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Updated"
      })
      onDialogOK()
    })
    .catch((e) => console.log(e))
}

</script>