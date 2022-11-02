<template>
  <q-field borderless :label="props.label" stack-label>
    <template v-slot:control>
      <div class="self-center full-width no-outline" tabindex="0">{{props.value}}</div>
    </template>
  </q-field>
</template>

<script lang="ts" setup>
const props = defineProps<{
  value: string|number,
  label: string
}>()
</script>