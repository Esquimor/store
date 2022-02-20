<template>
  <q-layout view="hHh Lpr fFf">
    <layout-header/>
    <q-drawer
      show-if-above
      :width="200"
      :breakpoint="700"
      elevated
    >
      <q-scroll-area class="fit">
        <q-list bordered>
          <q-item clickable v-ripple :to="{ name: 'settings-user'}">
            <q-item-section avatar>
              <q-icon color="primary" name="person" />
            </q-item-section>
            <q-item-section>My Account</q-item-section>
          </q-item>
          <q-item clickable v-ripple :to="{ name: 'settings-organization'}">
            <q-item-section avatar>
              <q-icon color="primary" name="groups" />
            </q-item-section>
            <q-item-section>My Organization</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import LayoutHeader from "../components/Layout/LayoutHeader.vue"

export default defineComponent({
  name: "SettingLayout",
  components: {
    LayoutHeader
  },
})
</script>
