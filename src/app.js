import $ from 'jquery'

import { generateMatrix, printMatrix } from './model-controls'
import { generateViewModel, nextViewModel } from './view-model-controls'
import { createCellViews, updateCellPositions } from './view-controls'
import { CONTAINER_ID, CELL_PROPS, GUTTER } from './constants'

let animTimeInteral

function startApp() {
  clearInterval(animTimeInteral)
  const ROWS = Number($('#row-count').val())
  const COLUMNS = Number($('#column-count').val())

  const container = $(CONTAINER_ID)
  container.empty()

  const { cellSize } = CELL_PROPS
  container.width((COLUMNS * cellSize) + ((COLUMNS + 1) * GUTTER))
  container.height((ROWS * cellSize) + ((ROWS + 1) * GUTTER))

  const matrix = generateMatrix(ROWS, COLUMNS)
  printMatrix(matrix)
  let viewModel = generateViewModel(matrix)

  createCellViews(container, viewModel)

  animTimeInteral = setInterval(() => {
    viewModel = nextViewModel(viewModel)
    updateCellPositions(viewModel)
  }, 1000)
}

$(() => {
  startApp()

  const start = () => {
    startApp()
  }
  $('#reset').click(start)

  $('#row-count, #column-count').change(start)
})
