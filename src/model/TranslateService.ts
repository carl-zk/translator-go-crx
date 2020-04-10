import Translator from './Translator'
import QueryDTO from './QueryDTO'
import sogou from './Sogou'

class TranslateService {
  private translators: Translator[] = [sogou]
  private using: number = 0

  private constructor() {}

  async translate(queryDTO: QueryDTO) {
    let tor = this.translators[0]
    this.translators.forEach((x, i, a) => {
      if (x.accept(queryDTO.kind)) tor = x
    })
    return await tor.translate(queryDTO)
  }

  // why can't const?
  private static instance = new TranslateService()

  public static getInstance() {
    return TranslateService.instance
  }
}

export default TranslateService.getInstance()
