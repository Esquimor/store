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
        <q-btn flat label="Order" :to="{ name: 'home'}" />
        <q-btn flat label="Inventory" :to="{ name: 'inventory'}" />
        <q-btn flat label="Funitures" :to="{ name: 'furniture'}" />
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
                Settings
              </q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-ripple @click="logout">
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>
              <q-item-section>Logout</q-item-section>
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
import { InventoryActionTypes } from "../../store/inventory/action-types";
import { OrderActionTypes } from "../../store/order/action-types";
import { UserActionTypes } from "../../store/user/action-types";
import { AddressActionTypes } from "../../store/address/action-types";
import { TagActionTypes } from "../../store/tag/action-types";
import { CategoryActionTypes } from "../../store/category/action-types";
import { AttributActionTypes } from "../../store/attribut/action-types";

const $store = useStore()
const router = useRouter()

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
const nbArticlesInBasket = computed(() => $store.getters["basket/getNbArticlesInBasket"] as number)

const logout = async () => {
  void $store.dispatch(`basket/${BasketActionTypes.RESET_BASKET}`)
  void $store.dispatch(`furniture/${FurnitureActionTypes.RESET_FURNITURE}`)
  void $store.dispatch(`inventory/${InventoryActionTypes.RESET_INVENTORY}`)
  void $store.dispatch(`order/${OrderActionTypes.RESET_ORDER}`)
  void $store.dispatch(`organization/${OrganizationActionTypes.RESET_ORGANIZATION}`)
  void $store.dispatch(`user/${UserActionTypes.RESET_USER}`)
  void $store.dispatch(`address/${AddressActionTypes.RESET_ADDRESS}`)
  void $store.dispatch(`tag/${TagActionTypes.RESET_TAG}`)
  void $store.dispatch(`category/${CategoryActionTypes.RESET_CATEGORY}`)
  void $store.dispatch(`attribut/${AttributActionTypes.RESET_ATTRIBUT}`)
  await router.push({ name: "login" })
}
</script>