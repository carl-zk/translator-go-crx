import translateService from '../../core/TranslateService'
import QueryDto from '../../core/QueryDto'
import { _AUTO_POP } from '../../common/constants'

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.get(_AUTO_POP, function (data) {
    // let checked = data._AUTO_POP || true
    // chrome.storage.sync.set({ key: checked }, () => {})
  })
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.translate) {
    translateService
      .translate(new QueryDto('auto', 'zh', request.translate))
      .then((res) => {
        sendResponse(res)
      })
  }
  return true
})

chrome.contextMenus.create({
  title: 'Translator Go',
  contexts: ['page', 'selection'],
  onclick: (info, tab) => {
    console.log(info.selectionText)
  },
})
