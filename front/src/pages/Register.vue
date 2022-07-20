<template>
  <login-layout>
    <q-card-section>
      <div class="text-h6">Register</div>
    </q-card-section>
    <q-card-section>
      <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
        <q-input
          filled
          v-model="organization"
          label="Organization"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
        <q-input
          filled
          v-model="email"
          label="Email"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-input
          filled
          v-model="password"
          label="Password"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-input
          filled
          v-model="confirm"
          label="Confirm Password"
          lazy-rules
          :rules="[
            val => val && val.length > 0 || 'Please type something',
            val => val === password || 'Password doesn\'t match'
          ]"
        />

        <div>
          <q-btn label="Submit" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </q-card-section>
  </login-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar"
import LoginLayout from "../layouts/LoginLayout.vue";
import { useStore } from "../store/index";
import { UserActionTypes } from "../store/user/action-types";
import { OrganizationActionTypes } from "../store/organization/action-types";
import { useRouter } from "vue-router";
import UserRequest from "../request/UserRequest";

export default defineComponent({
  name: "Register",
  components: {
    LoginLayout
   },
  setup() {
    const $store = useStore()
    const $q = useQuasar()
    const router = useRouter()

    const email = ref("")
    const password = ref("")
    const confirm = ref("")
    const organization = ref("")

    const onSubmit = () => {
      void UserRequest.Register({ email: email.value, password: password.value, organization: organization.value })
        .then(({ user, token, organization }) => {
          localStorage.setItem("token", token)
          void $store.dispatch(`user/${UserActionTypes.SET_USER}`, user)
          void $store.dispatch(`organization/${OrganizationActionTypes.SET_ORGANIZATION}`, organization)
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Submitted"
          })
          void router.push({name: "home"})
        })
    }

    const onReset = () => {
      email.value = "";
      password.value = "";
      confirm.value = "";
      organization.value = "";
    }

    return { 
      email,
      password,
      confirm,
      organization,
      onSubmit,
      onReset
     };
  }
});
</script>

<style>

</style>