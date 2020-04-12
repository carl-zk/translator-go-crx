import translateService from './model/TranslateService'
import QueryDTO from './model/QueryDTO'
import './assets/styles/style.scss'

let dto = new QueryDTO('en', 'zh', 'hello world', 'Sogou')
console.log(translateService.translate(dto))

let div = document.createElement('div')
div.id = '__panel'
translateService.translate(dto).then((res) => {
  div.innerHTML = res
})

document.body.appendChild(div)
