export const isEmpty = (value: any): boolean => {
  if (value === null) return true;
  switch (typeof value) {
    case "string":
      return value.length === 0;
    case "symbol":
      return value.toString() === Symbol().toString();
    case "undefined":
      return true;
    case "object":
      return value ? Object.keys(value).length === 0 : true;
    case "number":
      return isNaN(value);
    default:
      return false;
  }
};

export const isNotEmpty = (value: any): boolean => !isEmpty(value);

export const removeObjectEmptyValue = (obj: any) => {
  const newObj = { ...obj };
  for (const propName in newObj) {
    if (isEmpty(newObj[propName])) {
      delete newObj[propName];
    }
  }
  return newObj;
};
