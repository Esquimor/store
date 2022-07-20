<template>
  <LayoutSettings title="Users">
    <template v-slot:actions>
      <q-btn color="primary" icon="add" label="Add User" @click="create" />
    </template>
    <q-table
      title="Treats"
      :rows="users"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="email" :props="props">
              {{ props.row.email }}
            </q-td>
            <q-td key="firstname" :props="props">
              {{ props.row.firstname }}
            </q-td>
            <q-td key="lastname" :props="props">
              {{ props.row.lastname }}
            </q-td>
            <q-td key="role" :props="props">
              {{ props.row.role }}
            </q-td>
            <q-td key="menu" :props="props">
              <q-btn round icon="more_vert" >
                <q-menu>
                  <q-list style="min-width: 100px">
                    <q-item clickable @click="updateRole(props.row)" v-close-popup>
                      <q-item-section avatar>
                        <q-icon color="primary" name="edit" />
                      </q-item-section>

                      <q-item-section>Edit</q-item-section>
                    </q-item>
                    <q-item clickable @click="deleteUser(props.row)" v-close-popup v-if="user.id !== props.row.id">
                      <q-item-section avatar>
                        <q-icon color="primary" name="delete" />
                      </q-item-section>

                      <q-item-section>Remove</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </q-td>
          </q-tr>
        </template>
    </q-table>
  </LayoutSettings>
</template>

<script lang="ts" setup>
import { useQuasar } from "quasar"
import { onMounted, computed } from "vue";
import OrganizationRequest from "../../request/OrganizationRequest";
import { useStore } from "../../store/index";
import LayoutSettings from "../../components/Settings/LayoutSettings.vue";
import SettingsUserModalCreate from "../../components/Settings/User/SettingsUserModalCreate.vue";
import SettingsUserModalEdit from "../../components/Settings/User/SettingsUserModalEdit.vue";
import { OrganizationActionTypes } from "../../store/organization/action-types";
import { User } from "../../../../commons/Interface/User";
import UserRequest from "../../request/UserRequest";

const $q = useQuasar()
const $store = useStore()

const user = computed(() => $store.state.user.user)

const users = computed(() => $store.state.organization.users)

onMounted(() => {
  void OrganizationRequest.GetUsersForMyOrganization()
    .then((data) => {
      void $store.dispatch(`organization/${OrganizationActionTypes.SET_USERS_IN_ORGANIZATION}`, data.users)
    })
})

const columns = [
  {
    name: "email",
    required: true,
    label: "Email",
    align: "left",
    field: "email"
  },
  {
    name: "firstname",
    required: true,
    label: "First Name",
    align: "left",
    field: "firstname"
  },
  {
    name: "lastname",
    required: true,
    label: "Last Name",
    align: "left",
    field: "lastname"
  },
  {
    name: "role",
    required: true,
    label: "Role",
    align: "left",
    field: "role"
  },{
    name: "menu",
    style: "width: 50px",
  }
]

const create = () => {
  $q.dialog({
    component: SettingsUserModalCreate,
  })
}

const updateRole = (user: User) => {
  $q.dialog({
    component: SettingsUserModalEdit,
    componentProps: {
      user
    }
  })
}

const deleteUser = (user: User) => {
  $q.dialog({
    title: "Want to delete the user",
    message: "Are you sur ?",
    cancel: true,
    persistent: true
  }).onOk(() => {
    void UserRequest.DeleteUserInSameOrganization({
      userId: user.id
    })
      .then(() => {
        void $store.dispatch(`organization/${OrganizationActionTypes.DELETE_USER_IN_ORGANIZATION}`, user.id)
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Updated"
        })
      })
  })
}
</script>

<style>

</style>