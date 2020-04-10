import Handlebars from 'handlebars'
import { post } from '../../common/http.js'

export default () => {
  var TRANS

  document.addEventListener('mouseup', function (event) {
    var El = event.srcElement
    var selectText = window.getSelection().toString()

    if (selectText.length) {
      post('http://localhost:8090', { q: selectText }).then((res) => {
        let div = document.getElementById('translator')
        if (!div) {
          let templ1 =
            '<ul> {{#each content}} <li>{{this.item.pos}} : {{this.item.core.[0].detail.en}} {{this.item.core.[0].detail.zh}}</li> {{/each}} <br/> </ul>'
          TRANS = Handlebars.compile(templ1)
          div = document.createElement('div')
          div.id = 'translator'
          div.setAttribute('class', '__result')
          div.onmouseleave = (event) => {
            div.style.display = 'none'
          }

          document.body.appendChild(div)
        }
        div.style.left = event.pageX + 5 + 'px'
        div.style.top = event.pageY + 5 + 'px'

        div.innerHTML = res.content
          ? TRANS({ content: res.content[0].value[0].content })
          : '<p>' + res.dit
        ;+'</p>'
        div.style.display = ''
        console.log(JSON.stringify(res))
      })
    } else {
      chrome.runtime.sendMessage({ greeting: 'hello' }, function (response) {
        // console.log(response.farewell);
        let tmp = chrome.extension.getURL('translator/template.htm')
        console.log(tmp)
      })
    }
  })
}
