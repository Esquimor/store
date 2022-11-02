<template>
  <q-img
    v-if="props.image"
    :src="props.image"
  />
  <div
    v-else
    class="row justify-center items-center Image-empty"
  >
    <q-icon name="mdi-camera-off" size="3em"/>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  image?: string
}>()
</script>

<style lang="scss">
.Image {
  &-empty {
    background-color: $grey-4;
  }
}
</style>