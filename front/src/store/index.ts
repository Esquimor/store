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
import basket from "./basket"
import { UserStateInterface } from "./user/state"
import { OrganizationStateInterface } from "./organization/state"
import { FurnitureStateInterface } from "./furniture/state"
import { BasketStateInterface } from "./basket/state"

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
  user: UserStateInterface,
  organization: OrganizationStateInterface,
  furniture: FurnitureStateInterface,
  basket: BasketStateInterface,
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
      basket,
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: !!process.env.DEBUGGING,
  })

  return Store;
})

export function useStore() {
  return vuexUseStore(storeKey)
}