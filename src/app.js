(function ($) {
    'use strict'
    const CONTAINER_ID = '#matrix-container'
    const CELL_PROPS = {
                cellTemplate: (cell) => (`<div class="cell">${cell.text}</cell>`),
                cellSize: 30
            }
		
    let ROWS = 3
    let COLUMNS = 3
    const GUTTER = 10
    
    function findNextPosition(position, matrix) {
        const nextPosition = {}
        if(position.x === 0) {
            
        }    
    }
    
	function generateMatrix(ROWS, COLUMNS) {
		let matrix = []
        let count = 0
		for (let i = 0; i < ROWS; i++) {
			let row = []
			for (let j = 0; j < COLUMNS; j++) {
                row.push(++count)
			}
            matrix.push(row)
		}
        
        return matrix
	}

    function generateMatrixModel(matrix) {
        const model = []
        
        for (let i = 0; i < matrix.length; i++) {
			for (let j = 0; j < matrix[i].length; j++) {
                model.push({
                    text: matrix[i][j],
                    position: {
                        x: i,
                        y: j
                    },
                    nextPosition: findNextPosition({x: i, y: i}, matrix)
                })
			}
		}
        
        return model
    }
    
    function createCellViews(container, matrixModel) {
        const { cellTemplate, cellSize } = CELL_PROPS
        
        for(let i = 0; i < matrixModel.length; i++) {
            const newCellView = $(cellTemplate({text: i}))
            newCellView.css({
                top: (matrixModel[i].position.x * (cellSize + GUTTER)) + (matrixModel[i].position.x + GUTTER),
                left: (matrixModel[i].position.y * (cellSize + GUTTER)) + (matrixModel[i].position.x + GUTTER)
            })
            
            container.append(newCellView)
        }
    }
    
	$(function () {
		const container = $(CONTAINER_ID)
        
        container.width( (CELL_PROPS.cellSize + GUTTER) * ROWS + GUTTER) 
        container.height( (CELL_PROPS.cellSize + GUTTER) * COLUMNS + GUTTER)
        
		let matrix = generateMatrix(ROWS, COLUMNS)
        let matrixModel = generateMatrixModel(matrix)
        
        createCellViews(container, matrixModel)
	})
    
}(jQuery))