import { isEmpty } from "./Empty";

export const sortNumber = (a?: any, b?: any) => {
  if (isEmpty(a) || isEmpty(b)) {
    if (isEmpty(a) && isEmpty(b)) return 0;
    if (isEmpty(a)) return 1;
    if (isEmpty(b)) return -1;
  }
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(a) || isNaN(b)) {
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(a) && isNaN(b)) return 0;
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(a)) return 1;
    return -1;
  }
  return a - b;
};

export const sortString = (a?: string, b?: string) => {
  if (typeof a !== "string" || typeof b !== "string") {
    if (typeof a !== "string" && typeof b !== "string") return 0;
    if (typeof a !== "string") return 1;
    return -1;
  }
  if (isEmpty(a)) return 1;

  if (isEmpty(b)) return -1;

  return a.localeCompare(b);
};

export const sortBoolean = (a: any, b: any) => {
  const copyA = Boolean(a);
  const copyB = Boolean(b);
  // eslint-disable-next-line no-nested-ternary
  return copyA === copyB ? 0 : copyA ? -1 : 1;
};

export const sortDate = (a: string | Date, b: string | Date) => {
  const copyA = new Date(a);
  const copyB = new Date(b);

  return copyB.getTime() - copyA.getTime();
};
