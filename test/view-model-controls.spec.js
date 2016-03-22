/*
globals describe, it
*/
/* eslint max-len: [2, 800, 2]*/ // maximum length of 800 characters
import assert from 'assert'
import R from 'ramda'

import { generateMatrix } from '../src/model-controls'
import { generateViewModel, nextViewModel } from '../src/view-model-controls'

const twoBytwoMatrix = [
  [1, 2],
  [3, 4],
]

const twoBytwoViewModel = JSON.parse('[{"id":"cell-0-0","text":1,"position":{"x":0,"y":0},"nextPosition":{"x":0,"y":1},"prevPosition":{"x":1,"y":0}},{"id":"cell-0-1","text":2,"position":{"x":0,"y":1},"nextPosition":{"x":1,"y":1},"prevPosition":{"x":0,"y":0}},{"id":"cell-1-1","text":4,"position":{"x":1,"y":1},"nextPosition":{"x":1,"y":0},"prevPosition":{"x":0,"y":1}},{"id":"cell-1-0","text":3,"position":{"x":1,"y":0},"nextPosition":{"x":0,"y":0},"prevPosition":{"x":1,"y":1}}]')

describe('view-model-controls', () => {
  describe('#generateViewModel()', () => {
    it('should generate a serialized array out of matrix', (done) => {
      const viewModel = generateViewModel(twoBytwoMatrix)
      assert(R.equals(twoBytwoViewModel, viewModel))
      done()
    })

    it('viewModel should contain right position info', (done) => {
      const ROWS = 10
      const COLUMNS = 10
      const matrix = generateMatrix(ROWS, COLUMNS)
      const randomRow = Math.floor(Math.random() * ROWS)
      const randomColumn = Math.floor(Math.random() * COLUMNS)
      const randomElement = matrix[randomRow][randomColumn]
      const randomElementPosition = {
        x: randomRow,
        y: randomColumn,
      }

      const viewModel = generateViewModel(matrix)
      const matchElement = viewModel.find((el) => (R.equals(el.position, randomElementPosition)))

      assert.equal(randomElement, matchElement.text)
      done()
    })

    it('viewModel should contain right next and previous positions\' info', (done) => {
      const matrix = twoBytwoMatrix
      const element = matrix[0][1]
      const nextPosition = {
        x: 1,
        y: 1,
      }
      const prevPosition = {
        x: 0,
        y: 0,
      }

      const viewModel = generateViewModel(matrix)
      const matchElement = viewModel.find((el) => (el.text === element))

      assert(R.equals(nextPosition, matchElement.nextPosition), 'Next position is not matching')
      assert(R.equals(prevPosition, matchElement.prevPosition), 'Prev position is not matching')
      done()
    })
  })

  describe('#nextViewModel()', () => {
    it('should change all positions to positions of next element', (done) => {
      const ROWS = 5
      const COLUMNS = 7
      const matrix = generateMatrix(ROWS, COLUMNS)
      const viewModel = generateViewModel(matrix)
      const nextModel = nextViewModel(viewModel)

      const randomElement = viewModel[Math.floor(Math.random() * viewModel.length)]
      const matchElement = nextModel.find((el) => (el.id === randomElement.id))

      assert(R.equals(randomElement.nextPosition, matchElement.position))
      done()
    })
  })
})
