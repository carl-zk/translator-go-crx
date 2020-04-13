import Translator from './Translator'
import QueryDto from './QueryDto'
import sogou from './Sogou'

class TranslateService {
  private translators: Translator[] = [sogou]

  private constructor() {}

  async translate(queryDTO: QueryDto) {
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
