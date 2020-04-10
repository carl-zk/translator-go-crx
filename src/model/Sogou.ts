import Translator from './Translator'
import { KindStrings, TranslatorKind } from './TranslatorKind'
import QueryDTO from './QueryDTO'
import { post } from '../common/http'
import * as template from '../assets/template.handlebars'
import { sogouResultAdapter } from '../common/utils'

class Sogou implements Translator {
  private constructor() {}

  async translate(queryDTO: QueryDTO) {
    let res: JSON
    res = await post('http://localhost:8090', { q: queryDTO.text })
    let after = sogouResultAdapter(res)
    console.log(after)
    return template(after)
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
