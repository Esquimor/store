<template>
  <LayoutContent>
    <div class="full-width row justify-between items-center" style="border-bottom: 2px solid black">
      <h2 style="margin-top: 0px; margin-bottom: 0px;">{{props.title}}</h2>
    </div>
    <slot/>
  </LayoutContent>
</template>

<script lang="ts" setup>
import LayoutContent from "./LayoutContent.vue";

const props = defineProps<{
  title: string
}>()
</script>
