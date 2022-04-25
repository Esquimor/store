<template>
  <q-page padding>
    <div class="row justify-center">
      <q-card class="col col-lg-8 col-md-10 col-sx-12">
        <q-card-section>
          <div class="text-h5">{{title}}</div>
        </q-card-section>

        <q-separator/>

        <q-card-section>
          <q-form @submit="submit" @reset="reset" class="row q-col-gutter-lg">
            <div class="row q-col-gutter-lg col-12">
              <slot />
            </div>
            <div class="row q-col-gutter-lg col-12">
              <div class="col-6">
                <q-btn :label="$t('label.submit')" type="submit" color="primary" />
                <q-btn :label="$t('label.reset')" type="reset" color="primary" flat class="q-ml-sm" />
              </div>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LayoutSettings",
  props: {
    title: String,
    submit: Function,
    reset: Function
  }
})
</script>

<style>

</style>