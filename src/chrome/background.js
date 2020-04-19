import translateService from '../core/TranslateService'
import QueryDto from '../core/QueryDto'
import { _AUTO_POP, _FOCUS_WORKING, _CARD_LIST } from '../common/constants'
import Storage from '../common/Storage'
import CardService from '../core/CardService.ts'

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.get(_AUTO_POP, function (data) {
    // let checked = data._AUTO_POP || true
    // chrome.storage.sync.set({ key: checked }, () => {})
  })
})

var _timer
var _cardService

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.translate) {
    translateService
      .translate(new QueryDto('auto', 'zh', request.translate))
      .then((res) => {
        sendResponse(res)
      })
    return true
  }
  if (request.timer) {
    let remain = request.timer
    Storage.set(_FOCUS_WORKING, remain)
    chrome.browserAction.setBadgeText({ text: '' + remain })
    _timer = focusWorking(remain)
  }
})

function focusWorking(remain) {
  if (_timer) clearInterval(_timer)
  return setInterval(() => {
    remain = remain - 1
    if (remain < 0) {
      Storage.set(_FOCUS_WORKING, 0)
      chrome.runtime.sendMessage({ focusWorkingDone: true })
      clearInterval(_timer)
    } else chrome.browserAction.setBadgeText({ text: '' + remain })
  }, 1000 * 60)
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (!_cardService) {
    await initCardService()
  }

  if (request.card_has) {
    sendResponse(_cardService.has(request.card_has))
    return true
  }
  if (request.card_save) {
    _cardService.save(request.card_save)
  }
})

async function initCardService() {
  let t = await Storage.get(_CARD_LIST, [])
  _cardService = new CardService(t)
}

chrome.contextMenus.create({
  title: 'Translator Go',
  contexts: ['page', 'selection'],
  onclick: (info, tab) => {
    console.log(info.selectionText)
  },
})
