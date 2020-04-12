document.addEventListener('DOMContentLoaded', function (event) {
  createNode()
})

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
    div.onmouseleave = (event) => {
      div.style.display = 'none'
    }
    document.body.appendChild(div)
  }
  console.log('create node done!!!!!!!!!!!!!')
}

createNode()

document.addEventListener('mouseup', function (event) {
  var El = event.srcElement
  var selectText = window.getSelection().toString()

  if (selectText.length) {
    chrome.runtime.sendMessage({ translate: selectText }, function (res) {
      let div = document.getElementById('__panel')
      if (!div) createNode()
      div.style.left = event.pageX + 5 + 'px'
      div.style.top = event.pageY + 5 + 'px'

      div.innerHTML = res
      div.style.display = ''
      console.log(JSON.stringify(res))
    })
  } else {
    console.log('just clicke.')
  }
})
