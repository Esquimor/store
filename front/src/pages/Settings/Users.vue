<template>
  <LayoutSettings :title="$t('user.users')">
    <template v-slot:actions>
      <q-btn color="primary" icon="add" :label="$t('user.add_user')" @click="create" />
    </template>
    <q-table
      :rows="users"
      :columns="columns"
      row-key="name"
      :loading="loading"
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

                      <q-item-section>{{$t("label.edit")}}</q-item-section>
                    </q-item>
                    <q-item clickable @click="deleteUser(props.row)" v-close-popup v-if="meId !== props.row.id">
                      <q-item-section avatar>
                        <q-icon color="primary" name="delete" />
                      </q-item-section>

                      <q-item-section>{{$t("label.remove")}}</q-item-section>
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
import { computed } from "vue";
import LayoutSettings from "../../components/Settings/LayoutSettings.vue";
import SettingsUserModalCreate from "../../components/Settings/User/SettingsUserModalCreate.vue";
import SettingsUserModalEdit from "../../components/Settings/User/SettingsUserModalEdit.vue";
import { User } from "../../../../commons/Interface/User";
import { useQuery, useMutation, UseQueryReturn } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { ROLE } from "app/../commons/Interface/Role";
import { useI18n } from "vue-i18n"

const $q = useQuasar()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n() 

const { result, loading, refetch }: UseQueryReturn<{
  users: {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    role: ROLE;
  };
  me: {
    id: string;
  }
}, undefined> = useQuery(gql`
  query users {
    users {
      firstname
      lastname
      email
      id
      role
    }
    me {
      id
    }
  }
`)

const users = computed(() => result.value?.users ?? [])
const meId = computed(() => result.value?.me.id ?? "")

const columns = [
  {
    name: "email",
    required: true,
    label: t("label.email"),
    align: "left",
    field: "email"
  },
  {
    name: "firstname",
    required: true,
    label: t("label.first_name"),
    align: "left",
    field: "firstname"
  },
  {
    name: "lastname",
    required: true,
    label: t("label.last_name"),
    align: "left",
    field: "lastname"
  },
  {
    name: "role",
    required: true,
    label: t("label.role"),
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
  }).onOk(() => {
    refetch?.()
      .catch(e => console.log(e))
  })
}

const updateRole = (user: User) => {
  $q.dialog({
    component: SettingsUserModalEdit,
    componentProps: {
      user
    },
  }).onOk(() => {
    refetch?.()
      .catch(e => console.log(e))
  })
}

const { mutate: deleteUserMutation  } = useMutation(gql`
  mutation deleteUser ($id: String!) {
    deleteUser (id: $id)
  }
`)

const deleteUser = (user: User) => {
  $q.dialog({
    title: t("user.want_to_delete_the_user"),
    message: t("label.are_you_sur"),
    cancel: true,
    persistent: true
  }).onOk(() => {
    deleteUserMutation({
      id: user.id,
    }).then(() => {
        refetch?.()
          .catch(e => console.log(e))
        $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: t("label.updated")
          })
      })
      .catch((e) => console.log(e))
  })
}
</script>