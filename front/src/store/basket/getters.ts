import { Article } from "app/../commons/Interface/Basket";
import { GetterTree } from "vuex";
import { StateInterface } from "../index";
import { BasketStateInterface } from "./state";

const getters: GetterTree<BasketStateInterface, StateInterface> = {
  articles: (state) => state.articles,
  // eslint-disable-next-line
  getNbArticlesInBasket: (_, getters: any) => getters.articles.reduce((acc: number, article: Article) => acc + article.quantity, 0),
};

export default getters;
