<template>
  <login-layout>
    <q-card-section>
      <div class="text-h6">{{$t('user.login')}}</div>
    </q-card-section>
    <q-card-section>
      <template v-if="sendLink" >
        <q-banner inline-actions class="text-white bg-primary">
          {{$t("error.an_email_has_been_seend_if_your_email_exist")}}
        </q-banner>
        <div class="q-pb-md"/>
      </template>
      <q-form
          @submit="onSubmit"
          class="q-gutter-md"
        >
        <q-input
          filled
          v-model="email"
          :label="$t('label.email')"
          lazy-rules
          :rules="[ val => val && val.length > 0 || $t('error.field_required')]"
        />
        <div>
          <q-btn :label="$t('label.submit')" type="submit" color="primary"/>
        </div>
      </q-form>
      <q-btn class="q-mt-md" flat color="primary" size="sm" :label="$t('label.go_to_login')" :to="{name: 'login'}"/>
    </q-card-section>
  </login-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import LoginLayout from "../layouts/LoginLayout.vue";
import UserRequest from "../request/UserRequest";

export default defineComponent({
  name: "LoginIndex",
  components: {
    LoginLayout
   },
  setup() {
    const email = ref("");
    const sendLink = ref(false);

    const onSubmit = () => {
      void UserRequest.PasswordForgotten({ email: email.value })
        .then(() => {
          sendLink.value = true
        })
    }

    return { 
      email,
      onSubmit,
      sendLink
     };
  }
});
</script>