<template>
  <layout-settings-form :title="$t('setting.my_organization')" :submit="onSubmit" :reset="onReset">
    <q-input
      class="col-6"
      v-model="name"
      :label="$t('label.name')"
      lazy-rules
    />
  </layout-settings-form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar"
import { useStore } from "../../store/index";
import { OrganizationActionTypes } from "../../store/organization/action-types";
import OrganizationRequest from "../../request/OrganizationRequest";
import LayoutSettingsForm from "../../components/Settings/LayoutSettingsForm.vue";

export default defineComponent({
  components: { LayoutSettingsForm },
  name: "SettingOrganization",
  setup() {
    const $store = useStore();
    const $q = useQuasar()

    const name = ref($store.state.organization.organization?.name || "");

    const onSubmit = () => {
      void OrganizationRequest.Update({ name: name.value })
        .then(({ organization }) => {
          void $store.dispatch(`organization/${OrganizationActionTypes.SET_ORGANIZATION}`, organization)
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Submitted"
          })
        })
    }

    const onReset = () => {
      name.value = $store.state.organization.organization?.name || "";
    }

    return {
      name,
      onSubmit,
      onReset
    }
  }
})
</script>

<style>

</style>