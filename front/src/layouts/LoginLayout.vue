<template>
  <q-layout view="hHh lpR fFf">

    <q-page-container>
      <q-page class="row items-center justify-evenly">
        <q-card class="my-card">
          <slot />
        </q-card>
      </q-page>
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script lang="ts">

import { defineComponent, ref } from "vue"

export default defineComponent({
  name: "LoginLayout",

  components: {
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
