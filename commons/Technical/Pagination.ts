export const getNbPageByItems = (nbItems: number, nbItemByPage:number = 50) => {
  return Math.floor(nbItems / nbItemByPage)
}