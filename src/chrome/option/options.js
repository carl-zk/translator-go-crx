import * as d3 from 'd3'
import anime from 'animejs'
import Storage from '../../common/Storage'
import { _WORD_MAP } from '../../common/constants'

const _column_num = 4

Storage.get(_WORD_MAP, []).then((res) => {
  for (let i in res) {
    let card = d3
      .select('#c' + (i % _column_num))
      .append('div')
      .attr('class', 'card-container')
      .append('div')
      .attr('class', 'card')
      .attr('id', 'card-' + i)
    card.append('div').attr('class', 'front').text(res[i][0])
    card
      .append('div')
      .attr('class', 'back')
      .html(res[i][0] + '<br />' + res[i][1])
    card.on('click', () => {
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
  }
})
