import * as d3 from 'd3'
import anime from 'animejs'
import Storage from '../../common/Storage'
import { _CARD_LIST } from '../../common/constants'

const _column_num = 4

Storage.get(_CARD_LIST, []).then((res) => {
  for (let i in res) {
    let card = d3
      .select('#c' + (i % _column_num))
      .append('div')
      .attr('class', 'card-container')
      .style('height', rand(200, 700) + 'px')
      .append('div')
      .attr('class', 'card')
      .attr('id', 'card-' + i)
    card
      .append('div')
      .attr('class', 'front')
      .text(res[i].word)
      .on('click', () => {
        ;((i) => {
          anime({
            targets: document.querySelector('#card-' + i),
            scale: [{ value: 1 }, { value: 1.4 }, { value: 1, delay: 250 }],
            rotateY: { value: '+=180', delay: 200 },
            easing: 'easeInOutSine',
            duration: 400,
          }).restart()
        })(i)
      })

    card
      .append('div')
      .attr('class', 'back')
      .html(res[i].word + '<br />' + res[i].dit)
  }
})

function rand(min, max) {
  return Math.random() * (max - min) + min
}
