import { KindStrings } from './TranslatorKind'
import QueryDto from './QueryDto'

export default interface Translator {
  translate(queryDTO: QueryDto): Promise<string>
  accept(kind: KindStrings): boolean
}
