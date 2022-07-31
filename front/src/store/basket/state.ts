import { Article } from "../../../../commons/Interface/Basket";

export interface BasketStateInterface {
  articles: Article[]
}

function state(): BasketStateInterface {
  return {
    articles: []
  }
};

export default state;
