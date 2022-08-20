import { Tag } from "app/../commons/Interface/Tag";
import { GetterTree } from "vuex";
import { StateInterface } from "../index";
import { TagStateInterface } from "./state";

const getters: GetterTree<TagStateInterface, StateInterface> = {
  tags: (state) => state.tags,
  // eslint-disable-next-line
  getTagById: (_, getters: any) => (id: string) => getters.tags.find((address: Tag) => address.id === id),
};

export default getters;
