<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin">
      <div class="q-pa-md" style="max-width: 400px">
        <q-form
          @submit="onSubmit"
          class="q-gutter-md"
        >
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
import { ref, defineProps} from "vue";
import { useQuasar } from "quasar"
import { useDialogPluginComponent } from "quasar"
import { useStore } from "../../../store/index";
import UserRequest from "../../../request/UserRequest";
import { ROLE } from "../../../../../commons/Interface/Role";
import { OrganizationActionTypes } from "../../../store/organization/action-types";
import { User } from "../../../../../commons/Interface/User";

const props = defineProps<{
  user: User
}>()

const options = Object.values(ROLE)

defineEmits([
  ...useDialogPluginComponent.emits
])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

const role = ref(props.user.role)

const $store = useStore();
const $q = useQuasar()

const onSubmit = () => {
  void UserRequest.UpdateUserRoleInSameOrganization({
    role: role.value,
    userId: props.user.id
  })
    .then(({ user }) => {
      void $store.dispatch(`organization/${OrganizationActionTypes.UPDATE_USER_IN_ORGANIZATION}`, user)
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Updated"
      })
      onDialogOK()
    })
}

</script>