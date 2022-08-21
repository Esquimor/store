import { Attribut } from "app/../commons/Interface/Attribut";
import { GetterTree } from "vuex";
import { StateInterface } from "../index";
import { AttributStateInterface } from "./state";

const getters: GetterTree<AttributStateInterface, StateInterface> = {
  attributs: (state) => state.attributs,
  // eslint-disable-next-line
  getAttributById: (_, getters: any) => (id: string) => getters.attributs.find((inventory: Attribut) => inventory.id === id),
};

export default getters;
