<template>
  <q-layout view="hHh lpR fFf">

    <q-page-container>
      <q-page padding class="flex justify-center items-start">
        <q-card bordered flat>
          <q-card-section>
            <div class="text-h6">{{ $t("user.login") }}</div>
          </q-card-section>
          <q-card-section>
            test
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script  lang="ts">
export default {
  name: 'LayoutLogin',
};
</script>
