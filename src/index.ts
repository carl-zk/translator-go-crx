import translateService from './core/TranslateService'
import QueryDto from './core/QueryDto'
import './assets/styles/content.scss'

let dto = new QueryDto('en', 'zh', 'target', 'Sogou')
console.log(translateService.translate(dto))

let div = document.createElement('div')
div.id = '__panel'
translateService.translate(dto).then((res) => {
  div.innerHTML = res
})

document.body.appendChild(div)
