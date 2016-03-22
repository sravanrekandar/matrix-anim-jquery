import { CELL_PROPS, GUTTER } from './constants'

function getCellViewPosition(cell) {
  const { cellSize } = CELL_PROPS
  const top =  (cellSize * cell.position.x) + ((cell.position.x + 1 ) * GUTTER)
  const left = (cellSize * cell.position.y) + ((cell.position.y + 1 ) * GUTTER)
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
