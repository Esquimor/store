<template>
  <q-layout view="hHh Lpr fFf">
    <q-inner-loading :showing="loadingBootStrap">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>
    <template v-if="!loadingBootStrap">
      <layout-header/>
      <q-drawer
        show-if-above
        :width="200"
        :breakpoint="700"
        elevated
      >
        <q-scroll-area class="fit">
          <q-list bordered>
            <q-item clickable v-ripple :to="{ name: 'settings-account'}">
              <q-item-section avatar>
                <q-icon color="primary" name="person" />
              </q-item-section>
              <q-item-section>{{$t("setting.my_account")}}</q-item-section>
            </q-item>
            <q-item clickable v-ripple :to="{ name: 'settings-organization'}">
              <q-item-section avatar>
                <q-icon color="primary" name="store" />
              </q-item-section>
              <q-item-section>{{$t("setting.my_organization")}}</q-item-section>
            </q-item>
            <q-item clickable v-ripple :to="{ name: 'settings-users'}">
              <q-item-section avatar>
                <q-icon color="primary" name="groups" />
              </q-item-section>
              <q-item-section>{{$t("setting.users")}}</q-item-section>
            </q-item>
            <q-item clickable v-ripple :to="{ name: 'settings-address'}">
              <q-item-section avatar>
                <q-icon color="primary" name="place" />
              </q-item-section>
              <q-item-section>Address</q-item-section>
            </q-item>
            <q-item clickable v-ripple :to="{ name: 'settings-inventory'}">
              <q-item-section avatar>
                <q-icon color="primary" name="warehouse" />
              </q-item-section>
              <q-item-section>Inventory</q-item-section>
            </q-item>
            <q-item clickable v-ripple :to="{ name: 'settings-tag'}">
              <q-item-section avatar>
                <q-icon color="primary" name="label" />
              </q-item-section>
              <q-item-section>Tag</q-item-section>
            </q-item>
            <q-item clickable v-ripple :to="{ name: 'settings-category'}">
              <q-item-section avatar>
                <q-icon color="primary" name="category" />
              </q-item-section>
              <q-item-section>Category</q-item-section>
            </q-item>
            <q-item clickable v-ripple :to="{ name: 'settings-attribut'}">
              <q-item-section avatar>
                <q-icon color="primary" name="list" />
              </q-item-section>
              <q-item-section>Attribut</q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>
      <q-page-container>
        <router-view />
      </q-page-container>
    </template>
  </q-layout>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "../store/index";
import LayoutHeader from "../components/Layout/LayoutHeader.vue"

const $store = useStore()

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
const loadingBootStrap = computed(() => $store.state.loadingBootStrap)
</script>
