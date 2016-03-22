/*
globals describe, it
*/
import assert from 'assert'
import { generateMatrix, printMatrix } from '../src/model-controls'
import R from 'ramda'

const twoBytwoMatrix = [
  [1, 2],
  [3, 4],
]
const twoBytwoMatrixString = (
`\t1\t2
\t3\t4
`
)
const oneBythreeMatrix = [
  [1, 2, 3],
]
const oneBythreeMatrixString = (
`\t1\t2\t3
`
)
describe('#model-controls', () => {
  describe('generateMatrix()', () => {
    it('should generate a symmetric multi dimensional array', (done) => {
      const ROWS = 2
      const COLUMNS = 2
      const matrix = generateMatrix(ROWS, COLUMNS)
      assert(R.equals(twoBytwoMatrix, matrix))
      done()
    })

    it('should generate a non symmetric multi dimensional array', (done) => {
      const ROWS = 1
      const COLUMNS = 3
      const matrix = generateMatrix(ROWS, COLUMNS)
      assert(R.equals(oneBythreeMatrix, matrix))
      done()
    })
  })

  describe('printMatrix()', () => {
    it('should return a formatted string of a symmetric matrix', (done) => {
      const str = printMatrix(twoBytwoMatrix)
      assert.equal(twoBytwoMatrixString, str)
      done()
    })

    it('should return a formatted string of a non symmetric matrix', (done) => {
      const str = printMatrix(oneBythreeMatrix)
      assert.equal(oneBythreeMatrixString, str)
      done()
    })
  })
})
