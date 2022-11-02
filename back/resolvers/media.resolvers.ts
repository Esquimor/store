import { Media } from "../entity/Media"

export default  {
  Media: {
    id: (parent: Media) => parent.id,
    label: (parent: Media) => parent.label,
    link: (parent: Media) => parent.link,
    base64: (parent: Media) => parent.base64,
  },
}