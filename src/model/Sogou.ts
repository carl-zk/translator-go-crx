import Translator from './Translator'
import { KindStrings, TranslatorKind } from './TranslatorKind'
import QueryDTO from './QueryDTO'
import { post } from '../common/http'
import * as wordTemplate from '../assets/word_template.handlebars'
import * as textTemplate from '../assets/text_template.handlebars'
import { sogouResultAdapter } from '../common/utils'

class Sogou implements Translator {
  private constructor() {}

  async translate(queryDTO: QueryDTO) {
    let res: JSON
    res = await post('http://localhost:8090', { q: queryDTO.text })
    console.log(res)
    let after = sogouResultAdapter(res)

    console.log(after)
    return after.content ? wordTemplate(after) : textTemplate(after)
  }

  accept(kind: KindStrings) {
    return TranslatorKind.Sogou == kind
  }

  private static instance = new Sogou()

  public static getInstance() {
    return Sogou.instance
  }
}

export default Sogou.getInstance()
