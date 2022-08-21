// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { store } from "quasar/wrappers"
import { InjectionKey } from "vue"
import {
  createStore,
  Store as VuexStore,
  useStore as vuexUseStore,
} from "vuex"
import user from "./user"
import organization from "./organization"
import furniture from "./furniture"
import order from "./order"
import basket from "./basket"
import inventory from "./inventory"
import address from "./address"
import tag from "./tag"
import category from "./category"
import attribut from "./attribut"
import { UserStateInterface } from "./user/state"
import { OrganizationStateInterface } from "./organization/state"
import { FurnitureStateInterface } from "./furniture/state"
import { OrderStateInterface } from "./order/state"
import { BasketStateInterface } from "./basket/state"
import { InventoryStateInterface } from "./inventory/state"
import { AddressStateInterface } from "./address/state"
import { TagStateInterface } from "./tag/state"
import { CategoryStateInterface } from "./category/state"
import { AttributStateInterface } from "./attribut/state"
import TagRequest from "src/request/TagRequest"
import AddressRequest from "src/request/AddressRequest"
import InventoryRequest from "src/request/InventoryRequest"
import AttributRequest from "src/request/AttributRequest"
import CategoryRequest from "src/request/CategoryRequest"
import { TagMutationTypes } from "./tag/mutation-types"
import { AddressMutationTypes } from "./address/mutation-types"
import { InventoryMutationTypes } from "./inventory/mutation-types"
import { AttributMutationTypes } from "./attribut/mutation-types"
import { CategoryMutationTypes } from "./category/mutation-types"

// import example from './module-example'
// import { ExampleStateInterface } from './module-example/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export interface StateInterface {
  loadingBootStrap: boolean;
  user: UserStateInterface,
  organization: OrganizationStateInterface,
  furniture: FurnitureStateInterface,
  order: OrderStateInterface,
  basket: BasketStateInterface,
  inventory: InventoryStateInterface,
  address: AddressStateInterface,
  tag: TagStateInterface,
  category: CategoryStateInterface,
  attribut: AttributStateInterface
}

// provide typings for `this.$store`
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: VuexStore<StateInterface>;
  }
}

// provide typings for `useStore` helper
export const storeKey: InjectionKey<VuexStore<StateInterface>> = Symbol("vuex-key")

export default store(function (/* { ssrContext } */) {
  const Store = createStore<StateInterface>({
    modules: {
      user,
      organization,
      furniture,
      order,
      basket,
      inventory,
      address,
      tag,
      category,
      attribut
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: !!process.env.DEBUGGING,

    state: {
      loadingBootStrap: true
    },

    getters: {
      loadingBootStrap: (state: StateInterface) => state.loadingBootStrap
    },

    actions: {
      bootstrap({ commit }) {
        commit("startLoadingBootstrap")
        const promises = [
          TagRequest.Get(),
          AddressRequest.Get(),
          InventoryRequest.Get(),
          AttributRequest.Get(),
          CategoryRequest.GetTree(),
        ];
        void Promise.all(promises).then(([tags, addresses, inventories, attributs, categories]) => {
          commit(`tag/${TagMutationTypes.SET_TAGS}`, tags.tags)
          commit(`address/${AddressMutationTypes.SET_ADDRESSES}`, addresses.addresses)
          commit(`inventory/${InventoryMutationTypes.SET_INVENTORIES}`, inventories.inventories)
          commit(`attribut/${AttributMutationTypes.SET_ATTRIBUTS}`, attributs.attributs)
          commit(`category/${CategoryMutationTypes.SET_CATEGORIES_TREE}`, categories.categories)
        })
        .finally(() => {
          commit("endLoadingBootstrap")
        })
      }
    },

    mutations: {
      startLoadingBootstrap(state: StateInterface) {
        state.loadingBootStrap = true
      },
      endLoadingBootstrap(state: StateInterface) {
        state.loadingBootStrap = false
      },
    }
  })

  return Store;
})

export function useStore() {
  return vuexUseStore(storeKey)
}