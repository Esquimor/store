/* eslint-disable @typescript-eslint/no-unsafe-return */
import { AttributWithVariations, AttributDefaultWithVariationDefaults } from "app/../commons/Interface/Attribut";
import Api from "./Api";

export default class AttributRequest {

  static Get(): Promise<{attributs: AttributWithVariations[]}>
  {
    return Api.get("/attribut")
  }

  static Create(payload: AttributDefaultWithVariationDefaults): Promise<{attribut: AttributWithVariations}>
  {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Api.post("/attribut", payload)
  }

  static Update(idAttribut: string, payload: AttributDefaultWithVariationDefaults): Promise<{attribut: AttributWithVariations}>
  {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Api.put(`/attribut/${idAttribut}`, payload)
  }

  static Delete(idAttribut: string): Promise<unknown>
  {
    return Api.delete(`/attribut/${idAttribut}`)
  }
}