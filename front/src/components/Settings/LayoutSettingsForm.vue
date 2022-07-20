<template>
  <layout-settings :title="title">
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
  </layout-settings>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LayoutSettings from "./LayoutSettings.vue";

export default defineComponent({
  components: { LayoutSettings },
  name: "LayoutSettingsForm",
  props: {
    title: String,
    submit: Function,
    reset: Function
  }
})
</script>

<style>

</style>