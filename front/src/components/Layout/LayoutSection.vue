<template>
  <div class="col col-lg-9 col-sx-12 row">
    <section class="col-9">
      <div class="q-pa-xs q-pr-md">
        <slot name="header" />
      </div>
      <q-separator class="q-my-md"/>
      <div class="q-pa-md">
        <slot />
      </div>
    </section>
    <section class="col-3 LayoutSection-sidebar q-pl-md">
      <slot name="sidebar" />
    </section>
  </div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss">
.LayoutSection-sidebar {
  border-left: 1px solid $grey-5;
}
</style>