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
            <q-item-section>{{$t("address.address")}}</q-item-section>
          </q-item>
          <q-item clickable v-ripple :to="{ name: 'settings-inventory'}">
            <q-item-section avatar>
              <q-icon color="primary" name="warehouse" />
            </q-item-section>
            <q-item-section>{{$t("inventory.inventory")}}</q-item-section>
          </q-item>
          <q-item clickable v-ripple :to="{ name: 'settings-tag'}">
            <q-item-section avatar>
              <q-icon color="primary" name="label" />
            </q-item-section>
            <q-item-section>{{$t("tag.tag")}}</q-item-section>
          </q-item>
          <q-item clickable v-ripple :to="{ name: 'settings-category'}">
            <q-item-section avatar>
              <q-icon color="primary" name="category" />
            </q-item-section>
            <q-item-section>{{$t("category.category")}}</q-item-section>
          </q-item>
          <q-item clickable v-ripple :to="{ name: 'settings-attribut'}">
            <q-item-section avatar>
              <q-icon color="primary" name="list" />
            </q-item-section>
            <q-item-section>{{$t("attribut.attribut")}}</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import LayoutHeader from "../components/Layout/LayoutHeader.vue"
</script>
