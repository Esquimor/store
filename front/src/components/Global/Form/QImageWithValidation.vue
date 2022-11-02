
<template>
  <div>
    <q-card
      class="q-pa-lg fit column justify-center items-center content-start"
      style="cursor: pointer;"
      @click="onAdd"
    >
      <div class="text-h5">{{$t("media.add_picture")}}</div>
      <q-icon name="add" color="primary" size="2rem" />
    </q-card>
    <input
      type="file"
      ref="input"
      multiple
      accept="image/png, image/jpeg"
      @change="onFile"
      :style="{display: 'none'}"
    >
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"

const emit = defineEmits<{
  (e: "add", imageBase64: string): void
}>()

const input = ref(null)

const onAdd = () => {
  if(!input.value) return;
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  input.value?.click();
}

const onFile = (event: Event) => {
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

        emit("add", result)
      };
    } catch (error) {
      console.log(error);
    } 
}
</script>
