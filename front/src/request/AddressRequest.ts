/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Address, AddressDefault, AddressDefaultWithPlacementsDefault } from "app/../commons/Interface/Address";
import { Placement, PlacementDefault } from "app/../commons/Interface/Placement";
import Api from "./Api";

export default class AddressRequest {

  static Create(payload: AddressDefaultWithPlacementsDefault): Promise<{address: Address}>
  {
    return Api.post("/address", payload)
  }

  static Get(): Promise<{addresses: Address[]}>
  {
    return Api.get("/address")
  }

  static Update(idAdress: string, payload: AddressDefault): Promise<{address: Address}>
  {
    return Api.put(`/address/${idAdress}`, payload)
  }

  static Delete(idAdress: string): Promise<{ message: string }>
  {
    return Api.delete(`/address/${idAdress}`)
  }

  static GetPlacement(idAdress: string): Promise<{placements: Placement[]}>
  {
    return Api.get(`/address/${idAdress}/placement`)
  }

  static CreatePlacement(idAdress: string, payload: PlacementDefault): Promise<{placement: Placement}>
  {
    return Api.post(`/address/${idAdress}/placement`, payload)
  }
}