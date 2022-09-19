/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Category, CategoryDefault, CategoryTree, CategoryWithParent } from "app/../commons/Interface/Category";
import Api from "./Api";

export default class CategoryRequest {

  static Get(): Promise<{categories: CategoryWithParent[]}>
  {
    return Api.get("/category")
  }

  static GetTree(): Promise<{categories: CategoryTree}>
  {
    return Api.get("/category/tree")
  }

  static Create(payload: CategoryDefault): Promise<{category: Category}>
  {
    return Api.post("/category", payload)
  }

  static CreateTree(payload: CategoryDefault): Promise<{categories: CategoryTree}>
  {
    return Api.post("/category/tree", payload)
  }

  static Update(idCategory: string, payload: CategoryDefault): Promise<{category: Category}>
  {
    return Api.put(`/category/${idCategory}`, payload)
  }

  static UpdateTree(idCategory: string, payload: CategoryDefault): Promise<{categories: CategoryTree}>
  {
    return Api.put(`/category/tree/${idCategory}`, payload)
  }

  static Delete(idCategory: string): Promise<unknown>
  {
    return Api.delete(`/category/${idCategory}`)
  }

  static DeleteTree(idCategory: string): Promise<{categories: CategoryTree}>
  {
    return Api.delete(`/category/tree/${idCategory}`)
  }
}