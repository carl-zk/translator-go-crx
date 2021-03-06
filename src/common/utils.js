function sogouResultAdapter(raw) {
  let res = {
    word: raw['translate']['text'],
    dit: raw['translate']['dit'],
    content: null,
  }
  // console.log(raw)
  if (raw['common_dict'] && raw['common_dict']['dict']) {
    let obj = raw['common_dict']['dict'][0]['content'][0]['value'][0]
    if (!Array.isArray(obj['content'])) return res
    res['content'] = []
    for (let x of obj['content']) {
      let y = x['item']['core'][0]['detail']
      let item = { en: y['en'], zh: y['zh'], pos: x['item']['pos'] }
      res['content'].push(item)
    }
    res['phonetic'] = obj['phonetic']
  }
  return res
}

export { sogouResultAdapter }
