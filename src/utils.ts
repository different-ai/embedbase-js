export const stringifyList = (list: any[]) => {
  return list.map((item) => JSON.stringify(item))
}
