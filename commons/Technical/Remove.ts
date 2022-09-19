export const removeValueFromObject = (object: Object, key: string|number) => {
  const copyObject = Object({...object});
  delete copyObject[key];
  return copyObject
}