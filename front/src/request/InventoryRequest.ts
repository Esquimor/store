/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  Inventory,
  InventoryDefaultWithFurnitureVersionId,
  InventoriesCounted
} from "app/../commons/Interface/Inventory";
import Api from "./Api";
import { Search, Pagination } from "app/../commons/Interface/Filter";

interface GetQuery extends Search, Pagination {
}

interface GetForMeQuery extends Search, Pagination {
  user?: boolean;
  address?: boolean;
  placement?: boolean;
}

export default class InventoryRequest {

  static Get(payload: GetQuery): Promise<{inventories: Inventory[], count: number}>
  {
    return Api.get("/inventory", payload)
  }

  static GetForMe(payload: GetForMeQuery): Promise<{inventories: Inventory[], count: number}>
  {
    return Api.get("/inventory/me", payload)
  }

  static Create(payload: InventoryDefaultWithFurnitureVersionId): Promise<{inventory: Inventory}>
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

  static GetInventoriesCounted(): Promise<{count: InventoriesCounted}>
  {
    return Api.get("/inventory/count")
  }
}