<template>
  <q-header elevated>
    <q-toolbar>
      <q-toolbar-title >
        <q-btn
          round
          color="white"
          text-color="primary"
          icon="home"
          class="q-mr-md"
          :to="{ name: 'home'}"
        />
        <q-btn flat :label="$t('order.orders')" :to="{ name: 'home'}" />
        <q-btn flat :label="$t('inventory.inventories')" :to="{ name: 'inventories'}" />
        <q-btn flat :label="$t('furniture.furnitures')" :to="{ name: 'furnitures'}" />
        <q-btn color="black" icon="add" :label="$t('label.add')">
          <q-menu auto-close>
            <q-item clickable v-ripple :to="{ name: 'furniture-add'}" >
              <q-item-section avatar>
                <q-icon name="mdi-tools" />
              </q-item-section>
              <q-item-section>
                {{$t("furniture.furniture")}}
              </q-item-section>
            </q-item>
          </q-menu>
        </q-btn>
      </q-toolbar-title>

      <div>
        <q-btn
          round
          color="white"
          text-color="primary"
          icon="list_alt"
          class="q-mr-md"
          :to="{ name: 'basket'}"
        >
          <q-badge color="red" floating>{{nbArticlesInBasket}}</q-badge>
        </q-btn>
        <q-btn
          round
          color="white"
          text-color="primary"
          icon="person"
        >
          <q-menu auto-close>
            <q-item clickable :to="{ name: 'settings-account'}" v-ripple>
              <q-item-section avatar>
                <q-icon name="settings" />
              </q-item-section>
              <q-item-section>
                {{$t("label.settings")}}
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-ripple @click="logout">
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>
              <q-item-section>{{$t("label.logout")}}</q-item-section>
            </q-item>
          </q-menu>
        </q-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script lang="ts" setup>
import { useStore } from "../../store"
import { useRouter } from "vue-router"
import { computed } from "vue";
import { OrganizationActionTypes } from "../../store/organization/action-types";
import { BasketActionTypes } from "../../store/basket/action-types";
import { FurnitureActionTypes } from "../../store/furniture/action-types";
import { UserActionTypes } from "../../store/user/action-types";

const $store = useStore()
const router = useRouter()

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
const nbArticlesInBasket = computed(() => $store.getters["basket/getNbArticlesInBasket"] as number)

const logout = async () => {
  void $store.dispatch(`basket/${BasketActionTypes.RESET_BASKET}`)
  void $store.dispatch(`furniture/${FurnitureActionTypes.RESET_FURNITURE}`)
  void $store.dispatch(`organization/${OrganizationActionTypes.RESET_ORGANIZATION}`)
  void $store.dispatch(`user/${UserActionTypes.RESET_USER}`)
  await router.push({ name: "login" })
}
</script>