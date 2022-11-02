<template>
  <login-layout>
    <q-card-section>
      <div class="text-h6">{{$t("label.register")}}</div>
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
          :label="$t('organization.organization')"
          lazy-rules
          :rules="[ val => val && val.length > 0 || $t('error.field_required')]"
        />
        <q-input
          filled
          v-model="email"
          :label="$t('label.email')"
          lazy-rules
          :rules="[ val => val && val.length > 0 || $t('error.field_required')]"
        />

        <q-input
          filled
          v-model="password"
          :label="$t('label.password')"
          lazy-rules
          :rules="[ val => val && val.length > 0 || $t('error.field_required')]"
        />

        <q-input
          filled
          v-model="confirm"
          :label="$t('label.confirm_password')"
          lazy-rules
          :rules="[
            val => val && val.length > 0 || $t('error.field_required'),
            val => val === password || $t('error.password_doesn_t_match')
          ]"
        />

        <div>
          <q-btn :label="$t('label.submit')" type="submit" color="primary"/>
          <q-btn :label="$t('label.reset')" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </q-card-section>
  </login-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar"
import { useI18n } from "vue-i18n"
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
    const lang = useI18n() 

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
            message: lang.t("label.submited")
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