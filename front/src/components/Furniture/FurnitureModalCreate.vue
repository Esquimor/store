<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" >
    <q-card style="width: 700px; max-width: 80vw;">
      <Form
        :validation-schema="schema"
        @submit="onSubmit"
        :initial-values="initialValues"
      >
        <q-card-section>
          <div class="text-h6">Add a Furniture</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <QInputWithValidation
            name="name"
            label="Name"
          />
          <QInputWithValidation
            name="description"
            label="Description"
            type="textarea"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" @click="onDialogCancel"></q-btn>
          <q-btn color="primary" type="submit" label="Submit" />
        </q-card-actions>
      </Form>
      <input type="file"
        id="avatar" name="avatar"
        accept="image/png, image/jpeg" @change="onFile">
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { Form } from "vee-validate";
import * as yup from "yup";
import { useQuasar, useDialogPluginComponent } from "quasar"
import QInputWithValidation from "../Global/Form/QInputWithValidation.vue"
import { useMutation } from "@vue/apollo-composable";
import gql from "graphql-tag";

defineEmits([
  ...useDialogPluginComponent.emits
])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

const $q = useQuasar()

const { mutate: saveFile } = useMutation(gql`
  mutation saveFile (
    $file: File!
  ) {
    saveFile (
      file: $file
    )
  }
`)

const onFile = (event) => {
  try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const file = event.target.files[0];

      const reader = new FileReader();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      reader.readAsDataURL(file);
      // eslint-disable-next-line @typescript-eslint/require-await
      reader.onload = async () => {
        const result = reader.result as string;
        if (!result) return;
        const base64 = result.split(",").pop();
        if (!base64) return;


        saveFile({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          file: base64
        })
        .catch((e) => console.log(e))
      };
    } catch (error) {
      console.log(error);
    } 
}

const schema = yup.object({
  name: yup.string().required(),
  description: yup.string()
});

const initialValues = {
  name: "",
  description: ""
}

const { mutate: createFurniture } = useMutation(gql`
  mutation createFurniture (
    $name: String
    $description: String
  ) {
    createFurniture (
      name: $name
      description: $description
    ) {
      id
    }
  }
`)

const onSubmit = (values: {name: string, description?: string}) => {
  createFurniture(values)
    .then(() => {
      onDialogOK()
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Submitted"
      })
    })
    .catch((e) => console.log(e))
}
</script>