export default interface filterInformation {
  'columnList': Array<string>,
  'searchValue': string,
  'searchMinValue': string,
  'searchMaxValue': string,
  'searchMode': 'searchByValue' | 'searchByMinMax',
  'searchColumn': string,
  'orderColumn': string,
  'orderRule': string,
  'resultQuantity': number,
  'pageNum': number
};