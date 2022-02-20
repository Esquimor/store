<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h5">My personal information</div>
      </q-card-section>

      <q-separator/>

      <q-card-section>
        <q-form @submit="onSubmit">
          <div class="row">
            <q-input
              class="col-6"
              v-model="firstname"
              label="Firstname"
              lazy-rules
            />
            <q-input
              class="col-6"
              v-model="lastname"
              label="Lastname"
              lazy-rules
            />
          </div>
          <div>
            <q-btn label="Submit" type="submit" color="primary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useQuasar } from 'quasar'

export default defineComponent({
  name: "SettingsUser",
  setup() {
    const $q = useQuasar();

    const firstname = ref("");
    const lastname = ref("");

    return {
      firstname,
      lastname,
      onSubmit() {
        console.log({ firstname: firstname.value, lastname: lastname.value })
      }
    }
  }
})
</script>

<style>

</style>