import { Article, ArticleSetQuantity } from "app/../commons/Interface/Basket";
import { MutationTree } from "vuex";
import { BasketMutationTypes } from "./mutation-types";
import { BasketStateInterface } from "./state";

const mutation: MutationTree<BasketStateInterface> = {
  [BasketMutationTypes.ADD_ARTICLE] (state: BasketStateInterface, payload: Article) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const findSameArticle = state.articles.find(art => art.furniture_version.id === payload.furniture_version.id)

    if (findSameArticle) {
      findSameArticle.quantity += payload.quantity
      return;
    }

    state.articles = [...state.articles, payload];
  },
  [BasketMutationTypes.RESET_ARTICLES] (state: BasketStateInterface) {
    state.articles = []
  },
  [BasketMutationTypes.SET_QUANTITY_TO_ARTICLE] (state: BasketStateInterface, payload: ArticleSetQuantity) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const findSameArticle = state.articles.find(art => art.furniture_version.id === payload.furniture_version_id)

    if (findSameArticle) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      findSameArticle.quantity = payload.quantity
      state.articles = state.articles.map((art) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (art.furniture_version.id !== payload.furniture_version_id) return art;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
        return {...art, quantity: payload.quantity};
      })
      return;
    }
  },
};

export default mutation;
