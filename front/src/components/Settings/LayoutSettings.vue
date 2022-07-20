<template>
  <q-page padding>
    <div class="row justify-center">
      <q-card class="col col-lg-8 col-md-10 col-sx-12">
        <q-card-section>
          <div class="row justify-between items-center">
            <div class="col">
              <div class="text-h5">{{title}}</div>
            </div>
            <div class="col row justify-end">
              <slot name="actions"/>
            </div>
          </div>
        </q-card-section>

        <q-separator/>

        <q-card-section>
          <slot/>
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
  }
})
</script>