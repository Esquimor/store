import { FurnitureVersion } from "./FurnitureVersion";

export interface ArticleSetQuantity {
  quantity: number;
  furniture_version_id: string;
}

export interface Article {
  quantity: number;
  furniture_version: FurnitureVersion
}