import PropTypes from 'prop-types'
import '../styles/ColorPalette.css'

const COLORS = [
  '#000000', '#FF0000', '#00FF00', '#0000FF', 
  '#FFFF00', '#FF00FF', '#00FFFF', '#FFFFFF',
  '#808080', '#800000', '#808000', '#008000',
  '#800080', '#008080', '#C0C0C0', '#404040'
]

function ColorPalette({ selectedColor, onColorSelect }) {
  return (
    <div className="color-palette">
      {COLORS.map((color) => (
        <div
          key={color}
          className={`color-option ${selectedColor === color ? 'selected' : ''}`}
          style={{ backgroundColor: color }}
          onClick={() => onColorSelect(color)}
        />
      ))}
    </div>
  )
}

ColorPalette.propTypes = {
  selectedColor: PropTypes.string.isRequired,
  onColorSelect: PropTypes.func.isRequired
}

export default ColorPalette