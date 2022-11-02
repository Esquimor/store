<template>
  <LayoutSettings :title="$t('attribut.attributs')">
    <template v-slot:actions>
      <q-btn color="primary" icon="add" :label="$t('attributs.add_attribut')" @click="create" />
    </template>
    <q-table
      :rows="attributs"
      :columns="columns"
      row-key="name"
      :loading="loading"
    >
      <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props">
              {{ props.row.name }}
            </q-td>
            <q-td key="menu" :props="props">
              <q-btn round icon="more_vert" >
                <q-menu>
                  <q-list style="min-width: 100px">
                    <q-item clickable @click="update(props.row)" v-close-popup>
                      <q-item-section avatar>
                        <q-icon color="primary" name="edit" />
                      </q-item-section>

                      <q-item-section>{{$t("label.edit")}}</q-item-section>
                    </q-item>
                    <q-item clickable @click="deleteAttribut(props.row)" v-close-popup >
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
import SettingsAttributModalCreate from "../../components/Settings/Attribut/SettingsAttributModalCreate.vue";
import SettingsAttributModalEdit from "../../components/Settings/Attribut/SettingsAttributModalEdit.vue";
import { Attribut } from "../../../../commons/Interface/Attribut";
import { useQuery, useMutation, UseQueryReturn } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { useI18n } from "vue-i18n"

const $q = useQuasar()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n() 

const columns = [
  {
    name: "name",
    required: true,
    label: t("label.name"),
    align: "left",
    field: "name"
  },{
    name: "menu",
    style: "width: 50px",
  }
]

const { result, loading, refetch }: UseQueryReturn<{
  attributs: {
    id: string;
    name: string;
  };
}, undefined> = useQuery(gql`
  query attributs {
    attributs {
      name
      id
    }
  }
`)

const attributs = computed(() => result.value?.attributs ?? [])

const create = () => {
  $q.dialog({
    component: SettingsAttributModalCreate,
  }).onOk(() => {
    refetch?.()
      .catch(e => console.log(e))
  })
}

const update = (attribut: Attribut) => {
  $q.dialog({
    component: SettingsAttributModalEdit,
    componentProps: {
      attributId: attribut.id
    }
  }).onOk(() => {
    refetch?.()
      .catch(e => console.log(e))
  })
}

const { mutate: deleteAttributMutation  } = useMutation(gql`
  mutation deleteAttribut ($id: String!) {
    deleteAttribut (id: $id)
  }
`)

const deleteAttribut = (attribut: Attribut) => {
  $q.dialog({
    title: t("attribut.want_to_delete_the_attribut"),
    message: t("attribut.are_you_sur"),
    cancel: true,
    persistent: true
  }).onOk(() => {
    deleteAttributMutation({
      id: attribut.id,
    }).then(() => {
        refetch?.()
          .catch(e => console.log(e))
        $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: t("label.deleted")
          })
      })
      .catch((e) => console.log(e))
  })
}
</script>