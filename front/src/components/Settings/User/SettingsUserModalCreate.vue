<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <div class="q-pa-md" style="max-width: 400px">
        <q-form
          @submit="onSubmit"
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
            v-model="firstname"
            label="First Name"
            lazy-rules
          />

          <q-input
            filled
            v-model="lastname"
            label="Last Name"
            lazy-rules
          />
          
          <q-select filled v-model="role" :options="options" label="Role" />

          <q-card-actions align="right">
            <q-btn color="primary" label="Cancel" @click="onDialogCancel" />
            <q-btn color="primary" label="OK" @click="onSubmit" />
          </q-card-actions>
        </q-form>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref} from "vue";
import { useQuasar } from "quasar"
import { useDialogPluginComponent } from "quasar"
import { useStore } from "../../../store/index";
import UserRequest from "../../../request/UserRequest";
import { ROLE } from "../../../../../commons/Interface/Role";
import { OrganizationActionTypes } from "../../../store/organization/action-types";

const options = Object.values(ROLE)

defineEmits([
  ...useDialogPluginComponent.emits
])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

const email = ref("");
const firstname = ref("");
const lastname = ref("");
const role = ref(ROLE.NORMAL)

const $store = useStore();
const $q = useQuasar()

const onSubmit = () => {
  void UserRequest.CreateUserInSameOrganization({
    firstname: firstname.value,
    lastname: lastname.value,
    email: email.value,
    role: role.value
  })
    .then(({ user }) => {
      void $store.dispatch(`organization/${OrganizationActionTypes.ADD_USER_IN_ORGANIZATION}`, user)
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Submitted"
      })
      onDialogOK()
    })
}

</script>