/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Tag, TagDefault } from "app/../commons/Interface/Tag";
import Api from "./Api";

export default class TagRequest {

  static Get(): Promise<{tags: Tag[]}>
  {
    return Api.get("/tag")
  }

  static Create(payload: TagDefault): Promise<{tag: Tag}>
  {
    return Api.post("/tag", payload)
  }

  static Update(idTag: string, payload: TagDefault): Promise<{tag: Tag}>
  {
    return Api.put(`/tag/${idTag}`, payload)
  }

  static Delete(idTag: string): Promise<unknown>
  {
    return Api.delete(`/tag/${idTag}`)
  }
}