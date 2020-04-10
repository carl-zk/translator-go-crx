import { KindStrings } from './TranslatorKind'
import QueryDTO from './QueryDTO'

export default interface Translator {
  translate(queryDTO: QueryDTO): Promise<string>
  accept(kind: KindStrings): boolean
}
