<template>
  <q-header elevated>
    <q-toolbar>
      <q-toolbar-title >
        <q-btn flat label="Order" :to="{ name: 'home'}" />
        <q-btn flat label="Funitures" :to="{ name: 'furniture'}" />
      </q-toolbar-title>

      <div>
        <q-btn
          round
          color="white"
          text-color="primary"
          icon="list_alt"
          class="q-mr-md"
          :to="{ name: 'basket'}"
        >
          <q-badge color="red" floating>{{nbArticlesInBasket}}</q-badge>
        </q-btn>
        <q-btn
          round
          color="white"
          text-color="primary"
          icon="person"
        >
          <q-menu auto-close>
            <q-item clickable :to="{ name: 'settings-account'}" v-ripple>
              <q-item-section avatar>
                <q-icon name="settings" />
              </q-item-section>
              <q-item-section>
                Settings
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>
              <q-item-section>Logout</q-item-section>
            </q-item>
          </q-menu>
        </q-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts" setup>
import { useStore } from "../../store"
import { computed } from "vue";

const $store = useStore()

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
const nbArticlesInBasket = computed(() => $store.getters["basket/getNbArticlesInBasket"] as number)

</script>