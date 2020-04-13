import { KindStrings } from './TranslatorKind'

export default class QueryDto {
  readonly from: string
  readonly to: string
  readonly text: string
  readonly kind: KindStrings

  constructor(from: string, to: string, text: string, kind: KindStrings) {
    this.from = from
    this.to = to
    this.text = text
    this.kind = kind
  }
}
