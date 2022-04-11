export default interface FilterInformation {
  'columnList': Array<string>,
  'searchValue': string,
  'searchMinValue': string,
  'searchMaxValue': string,
  'searchMode': 'searchByValue' | 'searchByMinMax',
  'searchColumn': string,
  'orderColumn': string,
  'orderRule': 'ASC' | 'DESC',
  'resultQuantity': number,
  'pageNum': number
};