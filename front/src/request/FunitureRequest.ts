/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Furniture } from "app/../commons/Interface/Furniture";
import Api from "./Api";

export default class FurnitureRequest {

  static Create(payload: { name: string; description?: string; }): Promise<{furniture: Furniture}>
  {
    return Api.post("/furniture", payload)
  }

  static GetForMe(): Promise<{furnitures: Furniture[]}>
  {
    return Api.get("/furniture")
  }
}