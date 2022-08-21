<template>
  <login-layout>
    <q-card-section>
      <div class="text-h6">{{$t('user.login')}}</div>
    </q-card-section>
    <q-card-section>
      <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
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

        <div>
          <q-btn label="Submit" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
      <q-btn class="q-mt-md" flat color="primary" size="sm" label="Password forget ?" :to="{name: 'passwordForgotten'}"/>
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
  name: "LoginIndex",
  components: {
    LoginLayout
   },
  setup() {
    const $store = useStore()
    const $q = useQuasar()
    const router = useRouter()

    const email = ref("")
    const password = ref("")

    const onSubmit = () => {
      void UserRequest.Login({ email: email.value, password: password.value })
        .then(({ user, token, organization }) => {
          localStorage.setItem("token", token)
          void $store.dispatch(`user/${UserActionTypes.SET_USER}`, user)
          void $store.dispatch(`organization/${OrganizationActionTypes.SET_ORGANIZATION}`, organization)
          void $store.dispatch("bootstrap");
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
    }

    return { 
      email,
      password,
      onSubmit,
      onReset
     };
  }
});
</script>
