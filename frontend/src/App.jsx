import { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import toast from 'react-hot-toast'
import ColorPalette from './components/ColorPalette'
import ColoringGrid from './components/ColoringGrid'
import ImageSelector from './components/ImageSelector'
import { uploadImage } from './utils/api'
import './styles/App.css'

function App() {
  const [selectedColor, setSelectedColor] = useState('#000000')
  const [selectedImage, setSelectedImage] = useState('')
  const [grid, setGrid] = useState(Array(32).fill().map(() => Array(32).fill('transparent')))

  const handleClear = () => {
    toast((t) => (
      <div className="toast-confirm">
        <p>Are you sure you want to clear the grid?</p>
        <div className="toast-buttons">
          <button
            className="toast-button confirm"
            onClick={() => {
              setGrid(Array(32).fill().map(() => Array(32).fill('#FFFFFF')))
              toast.dismiss(t.id)
            }}
          >
            Yes
          </button>
          <button
            className="toast-button cancel"
            onClick={() => toast.dismiss(t.id)}
          >
            No
          </button>
        </div>
      </div>
    ), {
      duration: Infinity,
    })
  }

  const handleSave = async () => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const cellSize = 16;
      
      canvas.width = grid[0].length * cellSize;
      canvas.height = grid.length * cellSize;
      
      // Draw the grid onto the canvas
      grid.forEach((row, i) => {
        row.forEach((color, j) => {
          ctx.fillStyle = color;
          ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
        });
      });
      
      // Convert canvas to base64 image data
      const imageData = canvas.toDataURL('image/png');
      
      // Upload to server
      const result = await uploadImage(imageData);
      
      if (result.success) {
        toast.success('Image saved successfully!');
      } else {
        toast.error('Failed to save image');
      }
    } catch (error) {
      console.error('Error saving image:', error);
      toast.error('Failed to save image');
    }
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h2>Tools</h2>
        <ImageSelector 
          selectedImage={selectedImage}
          onImageSelect={setSelectedImage}
        />
        <ColorPalette 
          selectedColor={selectedColor} 
          onColorSelect={setSelectedColor} 
        />
        <button className="save-button" onClick={handleSave}>
          Save Image
        </button>
        <button className="clear-button" onClick={handleClear}>
          Clear Grid
        </button>
      </aside>
      <main className="main-content">
        <ColoringGrid 
          selectedColor={selectedColor} 
          grid={grid}
          setGrid={setGrid}
          backgroundImage={selectedImage} 
        />
      </main>
      <Toaster 
        position="bottom-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
    </div>
  )
}

export default App