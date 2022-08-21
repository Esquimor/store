<template>
  <LayoutSettings title="Attributs">
    <template v-slot:actions>
      <q-btn color="primary" icon="add" label="Add Attribut" @click="create" />
    </template>
    <q-table
      :rows="attributs"
      :columns="columns"
      row-key="name"
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

                      <q-item-section>Edit</q-item-section>
                    </q-item>
                    <q-item clickable @click="deleteAttribut(props.row)" v-close-popup >
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
import AttributRequest from "../../request/AttributRequest";
import { useStore } from "../../store/index";
import LayoutSettings from "../../components/Settings/LayoutSettings.vue";
import { AttributActionTypes } from "../../store/attribut/action-types";
import SettingsAttributModalCreate from "../../components/Settings/Attribut/SettingsAttributModalCreate.vue";
import SettingsAttributModalEdit from "../../components/Settings/Attribut/SettingsAttributModalEdit.vue";
import { Attribut } from "../../../../commons/Interface/Attribut";

const $q = useQuasar()
const $store = useStore()

const attributs = computed(() => $store.state.attribut.attributs)

onMounted(() => {
  void AttributRequest.Get()
    .then((data) => {
      void $store.dispatch(`attribut/${AttributActionTypes.SET_ATTRIBUTS}`, data.attributs)
    })
})

const columns = [
  {
    name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: "name"
  },{
    name: "menu",
    style: "width: 50px",
  }
]

const create = () => {
  $q.dialog({
    component: SettingsAttributModalCreate,
  })
}

const update = (attribut: Attribut) => {
  $q.dialog({
    component: SettingsAttributModalEdit,
    componentProps: {
      attributId: attribut.id
    }
  })
}

const deleteAttribut = (attribut: Attribut) => {
  $q.dialog({
    title: "Want to delete the attribut",
    message: "Are you sur ?",
    cancel: true,
    persistent: true
  }).onOk(() => {
    void AttributRequest.Delete(attribut.id)
      .then(() => {
        void $store.dispatch(`attribut/${AttributActionTypes.REMOVE_ATTRIBUT}`, attribut.id)
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