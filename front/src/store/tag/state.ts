import { Tag } from "../../../../commons/Interface/Tag";

export interface TagStateInterface {
  tags: Tag[]
}

function state(): TagStateInterface {
  return {
    tags: []
  }
};

export default state;
