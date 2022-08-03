<template>
  <login-layout>
    <q-card-section>
      <div class="text-h6">Reset Password</div>
    </q-card-section>
    <q-card-section>
      <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
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
        </div>
      </q-form>
    </q-card-section>
  </login-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar"
import { useRoute } from "vue-router"
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
    const route = useRoute()

    const password = ref("")
    const confirm = ref("")

    const onSubmit = () => {
      void UserRequest.ResetPassword({ password: password.value, email:  route.params.email as unknown as string, code: route.params.code as unknown as string })
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
      password.value = "";
      confirm.value = "";
    }

    return { 
      password,
      confirm,
      onSubmit,
      onReset
     };
  }
});
</script>