/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Furniture } from "app/../commons/Interface/Furniture";
import Api from "./Api";

export default class FurnitureRequest {

  static Create(payload: { name: string; description?: string; }): Promise<{furniture: Furniture}>
  {
    return Api.post("/furniture", payload)
  }

  static Get(payload: {search?: string; category?: string, start?: number, quantity?: number }): Promise<{furnitures: Furniture[]; count: number }>
  {
    return Api.get("/furniture", payload)
  }
}