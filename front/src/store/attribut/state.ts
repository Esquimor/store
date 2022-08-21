import { Attribut } from "../../../../commons/Interface/Attribut";

export interface AttributStateInterface {
  attributs: Attribut[];
}

function state(): AttributStateInterface {
  return {
    attributs: [],
  }
};

export default state;
