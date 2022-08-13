export const replaceObjectValueFromToObject = (objectFrom: Object, objectTo: Object) => {
  return Object.entries(objectFrom).reduce((newObject, [key, value]) => {
    if (!objectTo[key]) return newObject;
    return {...newObject, [key]: value}
  }, {...objectTo})
}