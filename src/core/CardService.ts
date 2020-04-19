import Card from './Card'
import Storage from '../common/Storage'
import { _CARD_LIST } from '../common/constants'

export default class CardService {
  private cardList: Card[]

  public constructor(cardList: Card[]) {
    this.cardList = cardList
  }

  public has(word: string): boolean {
    for (let card of this.cardList) if (card.word == word) return true
    return false
  }

  public save(card: Card) {
    if (this.has(card.word)) return
    this.cardList.push(card)
    Storage.set(_CARD_LIST, this.cardList)
  }

  public delete(word: string) {
    let i = 0,
      n = this.cardList.length
    for (; i < n && this.cardList[i].word != word; i++);
    if (i == n) return
    this.swap(i, n - 1)
    this.cardList.pop()
    Storage.set(_CARD_LIST, this.cardList)
  }

  private swap(i: number, j: number) {
    let tmp = this.cardList[i]
    this.cardList[i] = this.cardList[j]
    this.cardList[j] = tmp
  }
}
