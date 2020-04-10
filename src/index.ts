import translateService from './model/TranslateService'
import QueryDTO from './model/QueryDTO'
import * as result from './assets/styles/style.scss'
//import { result, network_mean } from './assets/styles/style.css'

let dto = new QueryDTO('en', 'zh', 'Hello', 'Sogou')
//console.log(translateService.translate(dto))

let div = document.createElement('div')
translateService.translate(dto).then((res) => {
  div.innerHTML = res
})
//div.id = 'result'
let st = document.createElement('style')
let tn = document.createTextNode(result.toString())
st.appendChild(tn)
document.head.appendChild(st)
document.body.appendChild(div)
