import { CELL_PROPS, GUTTER } from './constants'

function getCellViewPosition(cell) {
  const { cellSize } = CELL_PROPS
  const top = (cell.position.x * (cellSize + GUTTER)) + (cell.position.x + GUTTER)
  const left = (cell.position.y * (cellSize + GUTTER)) + (cell.position.y + GUTTER)
  return {
    top: `${top}px`,
    left: `${left}px`,
  }
}

export function createCellViews(container, viewModel) {
  const { cellTemplate } = CELL_PROPS

  for (let i = 0; i < viewModel.length; i++) {
    const cell = viewModel[i]
    const newCellView = $(cellTemplate({ text: cell.text }))
    newCellView.css(getCellViewPosition(cell))
    newCellView.prop('id', cell.id)
    container.append(newCellView)
  }
}

export function updateCellPositions(viewModel) {
  viewModel.forEach((cell) => {
    $(`#${cell.id}`).animate(getCellViewPosition(cell), 700)
  })
}
