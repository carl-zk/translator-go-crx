chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({ color: '#3aa757' }, function () {
    console.log('The color is green.')
  })

  chrome.storage.sync.get(['color'], function (result) {
    console.log('result is : ' + result.color)
  })
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(
    sender.tab
      ? sender.tab.id + 'from a content script:' + sender.tab.url
      : 'from the extension'
  )

  chrome.runtime.getPackageDirectoryEntry(function (root) {
    root.getFile('translator/template.htm', { create: false }, function (
      fileEntry
    ) {
      fileEntry.file((file) => {
        var reader = new FileReader()
        reader.onloadend = function (e) {
          sendResponse({ farewell: this.result })
          console.log(this.result)
        }
        reader.readAsText(file)
      })
    })
  })
  return true
})

chrome.contextMenus.create({
  title: 'Translator Go',
  contexts: ['page', 'selection'],
  onclick: (info, tab) => {
    console.log(info.selectionText)
  },
})
