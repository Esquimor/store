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
import { useStore } from "../../../store/index";
import { CategoryActionTypes } from "../../../store/category/action-types";
import { Tag } from "../../../../../commons/Interface/Tag";
import CategoryRequest from "../../../request/CategoryRequest";

const props = defineProps<{
  category: Tag
}>()

defineEmits([
  ...useDialogPluginComponent.emits
])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

const name = ref(props.category.name)

const $store = useStore();
const $q = useQuasar()

const onSubmit = () => {
  void CategoryRequest.UpdateTree(props.category.id, {
    name: name.value
  })
    .then(({ categories }) => {
      void $store.dispatch(`category/${CategoryActionTypes.SET_CATEGORIES_TREE}`, categories)
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Updated"
      })
      onDialogOK()
    })
}

</script>