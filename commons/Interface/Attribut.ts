import { Variation, VariationDefault } from "./Variation";

export interface AttributWithVariations extends Attribut {
  variations: Variation[]
}

export interface Attribut extends AttributDefault {
  id: string;
}

export interface AttributDefaultWithVariationDefaults extends AttributDefault {
  variations: VariationDefault[]
}

export interface AttributDefault {
  name: string;
}