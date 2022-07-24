
<template>
  <q-field
    :borderless="true"
    :error="!!errorMessage"
    :error-message="errorMessage"
  >
    <q-checkbox :label="label" v-model="value" />
  </q-field>
</template>

<script lang="ts" setup>
import { defineProps} from "vue";
import { useField } from "vee-validate";

const props = defineProps<{
  name: string,
  label: string
}>()

const { errorMessage, value } = useField(props.name, undefined, {
  type: "checkbox",
  uncheckedValue: false,
  valueProp: true, // the checkbox "checked" value
});
</script>
