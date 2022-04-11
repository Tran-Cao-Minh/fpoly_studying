export default interface TableColumnItem {
  readonly name: string,
  readonly key: string,
  readonly width: number,
  readonly formatFunction?: Function,
  readonly formatPrameterKeyList?: Array<string>
};