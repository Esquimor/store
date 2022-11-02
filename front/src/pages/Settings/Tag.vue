<template>
  <LayoutSettings :title="$t('tag.tags')">
    <template v-slot:actions>
      <q-btn color="primary" icon="add" :label="$t('tag.add_tag')" @click="create" />
    </template>
    <q-table
      :rows="tags"
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
                    <q-item clickable @click="deleteTag(props.row)" v-close-popup >
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

<script setup lang="ts">
import { useQuasar } from "quasar"
import {  computed } from "vue";
import LayoutSettings from "../../components/Settings/LayoutSettings.vue";
import SettingsTagModalCreate from "../../components/Settings/Tag/SettingsTagModalCreate.vue";
import SettingsTagModalEdit from "../../components/Settings/Tag/SettingsTagModalEdit.vue";
import { Tag } from "../../../../commons/Interface/Tag";
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
  tags: {
    id: string;
    name: string;
  };
}, undefined> = useQuery(gql`
  query tags {
    tags {
      name
      id
    }
  }
`)

const tags = computed(() => result.value?.tags ?? [])

const create = () => {
  $q.dialog({
    component: SettingsTagModalCreate,
  }).onOk(() => {
    refetch?.()
      .catch(e => console.log(e))
  })
}

const update = (tag: Tag) => {
  $q.dialog({
    component: SettingsTagModalEdit,
    componentProps: {
      tag
    }
  }).onOk(() => {
    refetch?.()
      .catch(e => console.log(e))
  })
}

const { mutate: deleteTagMutation  } = useMutation(gql`
  mutation deleteTag ($id: String!) {
    deleteTag (id: $id)
  }
`)

const deleteTag = (tag: Tag) => {
  $q.dialog({
    title: t("tag.want_to_delete_the_tag"),
    message: t("label.are_you_sur"),
    cancel: true,
    persistent: true
  }).onOk(() => {
    deleteTagMutation({
      id: tag.id,
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