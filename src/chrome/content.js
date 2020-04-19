import { _AUTO_POP, _WORD_MAP } from '../common/constants'
import Storage from '../common/Storage'
import Card from '../core/Card'

var panel

initPanel()

document.addEventListener('mouseup', (event) => {
  const _source = event.srcElement
  let selectText = window.getSelection().toString()
  selectText = selectText.trim()
  if (!panel) initPanel()
  if (selectText.length) {
    doTranslation(selectText, event)
  } else if (!panel.isMouseOver) {
    hide()
  } else if (_source.className == 'star5') {
    starWord()
  }
})

document.addEventListener('keyup', (e) => {
  if (e.keyCode == 27 || e.key === 'Escape') {
    if (panel) hide()
  }
})

function initPanel() {
  panel = document.getElementById('__panel')
  if (!panel) {
    panel = document.createElement('div')
    panel.id = '__panel'
    initOnMouse()
    document.body.appendChild(panel)
    linkCss()
  }
}

function linkCss() {
  let cssURI = chrome.extension.getURL('app.css')
  let linkNode = document.createElement('link')
  linkNode.rel = 'stylesheet'
  linkNode.type = 'text/css'
  linkNode.href = cssURI
  document.getElementsByTagName('HEAD')[0].appendChild(linkNode)
}

function initOnMouse() {
  panel.isMouseOver = false
  panel.onmouseover = () => {
    panel.isMouseOver = true
  }
  panel.onmouseout = () => {
    panel.isMouseOver = false
  }
}

async function doTranslation(selectText, event) {
  let pop = await Storage.get([_AUTO_POP], true)
  if (!pop) return
  chrome.runtime.sendMessage({ translate: selectText }, (res) => {
    panel.style.left = event.pageX + 5 + 'px'
    panel.style.top = event.pageY + 5 + 'px'
    panel.innerHTML = res
    show()
    chrome.runtime.sendMessage({ card_has: selectText }, (res) => {
      if (res) lightStar()
    })
  })
}

function starWord() {
  lightStar()
  let word = panel.querySelector('.__word').innerHTML.trim()
  let dit = panel.querySelector('.__dit').innerHTML.trim()
  chrome.runtime.sendMessage({
    card_save: new Card(word, dit, new Date().getTime()),
  })
}

function lightStar() {
  let star = document.querySelector(
    '#__panel > div > div.__header > div.rating > label'
  )
  if (star) star.style.color = '#f9df4a'
}

function hide() {
  panel.style.display = 'none'
}

function show() {
  panel.style.display = ''
}
