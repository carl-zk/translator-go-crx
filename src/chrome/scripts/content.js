function createNode() {
  let div = document.getElementById('__panel')
  if (!div) {
    // link css
    let tmp = chrome.extension.getURL('style.css')
    // console.log(tmp)
    let link = document.createElement('link')
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = tmp
    document.getElementsByTagName('HEAD')[0].appendChild(link)
    // create panel
    div = document.createElement('div')
    div.id = '__panel'
    initOnMouse(div)
    document.body.appendChild(div)
  }
  return div
}

function initOnMouse(div) {
  div.isMouseOver = false
  div.onmouseover = () => {
    div.isMouseOver = true
  }
  div.onmouseout = () => {
    div.isMouseOver = false
  }
}

createNode()

document.addEventListener('mouseup', function (event) {
  var El = event.srcElement
  var selectText = window.getSelection().toString()
  let div = document.getElementById('__panel')
  if (!div) div = createNode()
  if (selectText.length) {
    chrome.runtime.sendMessage({ translate: selectText }, function (res) {
      div.style.left = event.pageX + 5 + 'px'
      div.style.top = event.pageY + 5 + 'px'
      div.innerHTML = res
      div.style.display = ''
      // console.log(JSON.stringify(res))
    })
  } else if (!div.isMouseOver) {
    div.style.display = 'none'
  }
})
