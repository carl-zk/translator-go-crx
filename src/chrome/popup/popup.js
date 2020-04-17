import { _AUTO_POP, _FOCUS_WORKING } from '../../common/constants'
import Storage from '../../common/Storage'

var checkbox = document.querySelector(
  'div.switch_pop .switch-wrap input[type=checkbox]'
)

let b = document.querySelector('.dog-body')
let t = document.querySelector('.dog-torso')
let h = document.querySelector('.dog-head')
let ball = document.querySelector('.ball')

rest()

Storage.get(_AUTO_POP, true).then((res) => (checkbox.checked = res))
Storage.get(_FOCUS_WORKING, 0).then((res) => {
  if (res) play()
})

initListeners()

function initListeners() {
  document
    .querySelector('div.switch_pop .switch-wrap')
    .addEventListener('click', () => {
      checkbox.checked = !checkbox.checked
      Storage.set(_AUTO_POP, checkbox.checked)
    })

  document.querySelector('#timer_btn').addEventListener('click', (e) => {
    let remain = 40
    chrome.runtime.sendMessage({ timer: remain })
    play()
  })

  document.querySelector('.ball').addEventListener('focus', () => {
    play()
  })

  document.querySelector('.ball').addEventListener('blur', () => {
    rest()
  })

  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request.focusWorkingDone) {
      rest()
    }
  })
}

function play() {
  b.style.animationPlayState = 'running'
  t.style.animationPlayState = 'running'
  h.style.animationPlayState = 'running'
  ball.focus()
}

function rest() {
  b.style.animationPlayState = 'paused'
  t.style.animationPlayState = 'paused'
  h.style.animationPlayState = 'paused'
  ball.blur()
}
