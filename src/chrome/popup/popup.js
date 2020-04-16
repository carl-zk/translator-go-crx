import { _AUTO_POP } from '../../common/constants'
import Storage from '../../common/Storage'

var checkbox = document.querySelector(
  'div.switch_pop .switch-wrap input[type=checkbox]'
)

Storage.get(_AUTO_POP, true).then((res) => (checkbox.checked = res))

document
  .querySelector('div.switch_pop .switch-wrap')
  .addEventListener('click', () => {
    checkbox.checked = !checkbox.checked
    Storage.set(_AUTO_POP, checkbox.checked)
  })
