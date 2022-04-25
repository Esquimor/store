<template>
  <layout-settings
    :title="$t('setting.my_personal_information')"
    @submit="onSubmit"
    @reset="onReset"
  >
    <q-input
      class="col-6"
      v-model="firstname"
      :label="$t('label.firstname')"
      lazy-rules
    />
    <q-input
      class="col-6"
      v-model="lastname"
      :label="$t('label.lastname')"
      lazy-rules
    />
  </layout-settings>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar"
import { useStore } from "../../store/index";
import { UserActionTypes } from "../../store/user/action-types";
import UserRequest from "../../request/UserRequest";
import LayoutSettings from "../../components/Settings/LayoutSettings.vue";

export default defineComponent({
  components: { LayoutSettings },
  name: "SettingsUser",
  setup() {
    const $store = useStore();
    const $q = useQuasar()

    const firstname = ref($store.state.user.user?.firstname || "");
    const lastname = ref($store.state.user.user?.lastname || "");

    const onSubmit = () => {
      void UserRequest.Update({ firstname: firstname.value, lastname: lastname.value })
        .then(({ user }) => {
          void $store.dispatch(`user/${UserActionTypes.SET_USER}`, user)
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "Submitted"
          })
        })
    }

    const onReset = () => {
      firstname.value = $store.state.user.user?.firstname || "";
      lastname.value = $store.state.user.user?.lastname || "";
    }

    return {
      firstname,
      lastname,
      onSubmit,
      onReset
    }
  }
})
</script>

<style>

</style>