export const getSearchParam = (
  search: string,
  param: string,
): string | null => {
  const urlSearchParams = new URLSearchParams(search);
  const myParam = urlSearchParams.get(param);

  return myParam;
};

export const createArrayFromNumber = (num: number): number[] => {
  const arr: number[] = [];
  for (let i = 1; i <= num; i++) {
    arr.push(i);
  }
  return arr;
};
