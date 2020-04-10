enum TranslatorKind {
  Sogou = 'Sogou',
  Google = 'Google',
}

type KindStrings = keyof typeof TranslatorKind

export { TranslatorKind, KindStrings }
