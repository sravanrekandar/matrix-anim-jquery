/*
globals describe, before, it
*/
import assert from 'assert'
import jsdom from 'mocha-jsdom'

import { CELL_PROPS, GUTTER } from '../src/constants'
import { generateMatrix } from '../src/model-controls'
import { generateViewModel, nextViewModel } from '../src/view-model-controls'
describe('view-controls', () => {
  let $
  const ROWS = Math.floor(Math.random() * 10) + 1
  const COLUMNS = Math.floor(Math.random() * 5) + 1
  let createCellViews
  let updateCellPositions
  let container
  let viewModel

  jsdom()

  before(() => {
    $ = require('jquery')
    createCellViews = require('../src/view-controls').createCellViews
    updateCellPositions = require('../src/view-controls').updateCellPositions

    const matrix = generateMatrix(ROWS, COLUMNS)
    viewModel = generateViewModel(matrix)
    container = $('<div/>')
  })

  describe('#createCellViews()', () => {
    it('should update the given container with proper cells', (done) => {
      createCellViews(container, viewModel)
      const childCount = container.find('.cell').length
      assert.equal(ROWS * COLUMNS, childCount)

      done()
    })

    it('cells should have positions complying with cell size and gutter', (done) => {
      createCellViews(container, viewModel)
      for (let i = 0; i < 10; i++) {
        const x = Math.floor(Math.random() * (ROWS - 1))
        const y = Math.floor(Math.random() * (COLUMNS - 1))
        const cellId = `#cell-${x}-${y}`
        const cell = container.find(cellId)

        const { cellSize } = CELL_PROPS
        const position = {
          x: (cellSize * x) + ((x + 1) * GUTTER),
          y: (cellSize * y) + ((y + 1) * GUTTER),
        }

        assert.equal(`${position.x}px`, $(cell).css('top'))
        assert.equal(`${position.y}px`, $(cell).css('left'))
      }

      done()
    })
  })
})
