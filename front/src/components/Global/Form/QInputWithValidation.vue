
<template>
  <q-input
    v-model="value"
    :error-message="errorMessage"
    :error="!!errorMessage"
    :type="type || 'text'"
  />
</template>

<script setup lang="ts">
import { defineProps} from "vue";
import { useField } from "vee-validate";

const props = defineProps<{
  name: string
  type?: "text" | "textarea"
}>()

const { errorMessage, value } = useField(props.name);
</script>
