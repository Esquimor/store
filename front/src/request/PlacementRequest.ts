/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Placement, PlacementDefault } from "app/../commons/Interface/Placement";
import Api from "./Api";

export default class PlacementRequest {

  static Update(idPlacement: string, payload: PlacementDefault): Promise<{placement: Placement}>
  {
    return Api.put(`/placement/${idPlacement}`, payload)
  }

  static Delete(idPlacement: string): Promise<{ message: string }>
  {
    return Api.delete(`/placement/${idPlacement}`)
  }
}