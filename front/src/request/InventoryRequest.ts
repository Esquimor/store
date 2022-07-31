/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Inventory } from "app/../commons/Interface/Inventory";
import Api from "./Api";

export default class InventoryRequest {

  static Get(): Promise<{inventories: Inventory[]}>
  {
    return Api.get("/inventory")
  }

  static Create(payload: { furnitureVersionId: string; quantity: number }): Promise<{inventory: Inventory}>
  {
    return Api.post("/inventory", payload)
  }

  static Update(idInventory: string, payload: { quantity: number }): Promise<{inventory: Inventory}>
  {
    return Api.put(`/inventory/${idInventory}`, payload)
  }

  static Delete(idInventory: string): Promise<unknown>
  {
    return Api.delete(`/inventory/${idInventory}`)
  }
}