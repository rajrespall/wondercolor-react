import { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import '../styles/ColoringGrid.css'

function ColoringGrid({ selectedColor, grid, setGrid, backgroundImage }) {
  const [isDrawing, setIsDrawing] = useState(false)

  const handleCellColor = useCallback((rowIndex, colIndex) => {
    setGrid(prevGrid => {
      const newGrid = prevGrid.map(row => [...row])
      newGrid[rowIndex][colIndex] = selectedColor
      return newGrid
    })
  }, [selectedColor, setGrid])

  const handleMouseDown = (rowIndex, colIndex) => {
    setIsDrawing(true)
    handleCellColor(rowIndex, colIndex)
  }

  const handleMouseEnter = (rowIndex, colIndex) => {
    if (isDrawing) {
      handleCellColor(rowIndex, colIndex)
    }
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
  }

  return (
    <div className="coloring-grid-container">
      {backgroundImage && (
        <img 
          src={backgroundImage} 
          alt="Background template" 
          className="background-image" 
        />
      )}
      <div 
        className="coloring-grid"
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
      >
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="grid-row">
            {row.map((cell, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className="grid-cell"
                style={{ backgroundColor: cell === '#FFFFFF' ? 'transparent' : cell }}
                onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

ColoringGrid.propTypes = {
  selectedColor: PropTypes.string.isRequired,
  grid: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  setGrid: PropTypes.func.isRequired,
  backgroundImage: PropTypes.string
}

export default ColoringGrid