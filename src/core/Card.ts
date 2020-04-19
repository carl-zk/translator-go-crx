export default class Card {
  readonly word: string
  readonly dit: string
  readonly createAt: number

  constructor(word: string, dit: string, createAt: number) {
    this.word = word
    this.dit = dit
    this.createAt = createAt
  }
}
