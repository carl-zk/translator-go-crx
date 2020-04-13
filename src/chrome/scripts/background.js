import translateService from '../../core/TranslateService'
import QueryDto from '../../core/QueryDto'

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ color: '#3aa757' }, function () {
    console.log('The color is green.')
  })

  chrome.storage.sync.get(['color'], function (result) {
    console.log('result is : ' + result.color)
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
