import { Article, ArticleSetQuantity } from "app/../commons/Interface/Basket";
import { ActionTree } from "vuex";
import { StateInterface } from "../index";
import { BasketActionTypes } from "./action-types";
import { BasketMutationTypes } from "./mutation-types";
import { BasketStateInterface } from "./state";

const actions: ActionTree<BasketStateInterface, StateInterface> = {
  [BasketActionTypes.ADD_ARTICLE]({ commit }, article: Article) {
    commit(BasketMutationTypes.ADD_ARTICLE, article)
  },
  [BasketActionTypes.RESET_ARTICLES]({ commit }) {
    commit(BasketMutationTypes.RESET_ARTICLES)
  },
  [BasketActionTypes.SET_QUANTITY_TO_ARTICLE]({ commit }, payload: ArticleSetQuantity) {
    commit(BasketMutationTypes.SET_QUANTITY_TO_ARTICLE, payload)
  },
  [BasketActionTypes.ADD_ONE_QUANTITY_TO_ARTICLE]({ commit, state }, payload: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const article = state.articles.find(art => art.furniture_version.id === payload) as Article;
    const { quantity } = article;
    commit(BasketMutationTypes.SET_QUANTITY_TO_ARTICLE, { quantity: quantity + 1, furniture_version_id: payload})
  },
  [BasketActionTypes.REMOVE_ONE_QUANTITY_TO_ARTICLE]({ commit, state }, payload: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const article = state.articles.find(art => art.furniture_version.id === payload) as Article

    if (article?.quantity <= 0) {
      commit(BasketMutationTypes.SET_QUANTITY_TO_ARTICLE, { quantity: 0, furniture_version_id: payload})
      return
    }
    const { quantity } = article;
    commit(BasketMutationTypes.SET_QUANTITY_TO_ARTICLE, { quantity: quantity - 1, furniture_version_id: payload})
  },
};

export default actions;
