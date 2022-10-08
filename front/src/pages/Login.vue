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
import { useMutation } from "@vue/apollo-composable"
import gql from "graphql-tag"
import LoginLayout from "../layouts/LoginLayout.vue";
import { User } from "app/../commons/Interface/User";
import { Organization } from "app/../commons/Interface/Organization";
import { useStore } from "../store/index";
import { UserActionTypes } from "../store/user/action-types";
import { OrganizationActionTypes } from "../store/organization/action-types";
import { useRouter } from "vue-router";

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

    
    const { mutate: login  } = useMutation(gql`
      mutation login ($email: String!, $password: String!) {
        login (email: $email, password: $password) {
          token
          user {
            email
            firstname
            id
            lastname
            phone
            role
            status
          }
          organization {
            id
            name
          }
        }
      }
    `)

    const onSubmit = async () => {
      await login({
        email: email.value,
        password: password.value
      })
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore 
        .then((
          {
            data
          } : {
            data: {
              login :{
                token: string;
                user: User;
                organization: Organization;
              }
          }
        }) => {
          
          localStorage.setItem("token", data.login.token)
          void $store.dispatch(`user/${UserActionTypes.SET_USER}`, data.login.user)
          void $store.dispatch(`organization/${OrganizationActionTypes.SET_ORGANIZATION}`, data.login.organization)
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Submitted"
          })
          void router.push({name: "home"})
        })
        .catch(e => console.log(e))
    }

    const onReset = () => {
      email.value = "";
      password.value = "";
    }

    return { 
      email,
      password,
      onSubmit,
      onReset,
     };
  }
});
</script>
