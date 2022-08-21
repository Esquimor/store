import { Attribut } from "../../../../commons/Interface/Attribut";
import { MutationTree } from "vuex";
import { AttributMutationTypes } from "./mutation-types";
import { AttributStateInterface } from "./state";

const mutation: MutationTree<AttributStateInterface> = {
  [AttributMutationTypes.RESET_ATTRIBUT] (state: AttributStateInterface) {
    state.attributs = []
  },
  [AttributMutationTypes.SET_ATTRIBUTS] (state: AttributStateInterface, payload: Attribut[]) {
    state.attributs = payload;
  },
  [AttributMutationTypes.ADD_ATTRIBUT] (state: AttributStateInterface, payload: Attribut) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    state.attributs = [...state.attributs, payload];
  },
  [AttributMutationTypes.UPDATE_ATTRIBUT] (state: AttributStateInterface, payload: Attribut) {
    state.attributs = state.attributs.map((attribut) => {
      if (attribut.id !== payload.id) return attribut;
      return payload
    });
  },
  [AttributMutationTypes.REMOVE_ATTRIBUT] (state: AttributStateInterface, payload: string) {
    state.attributs = state.attributs.filter((attribut) => attribut.id !== payload)
  },
};

export default mutation;
