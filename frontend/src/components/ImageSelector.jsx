import PropTypes from 'prop-types'
import '../styles/ImageSelector.css'

const images = [
  { id: 'none', name: 'No Background', url: '' },
  { id: 'turtle', name: 'Turtle', url: '/images/turtle.jpg' },
  { id: 'tiger', name: 'Tiger', url: '/images/tiger.jpg' },
  { id: 'sheep', name: 'Sheep', url: '/images/sheep.jpg' },
  { id: 'rabbit', name: 'Rabbit', url: '/images/rabbit.jpg' },
  { id: 'pig', name: 'Pig', url: '/images/pig.jpg' },
  { id: 'penguin', name: 'Penguin', url: '/images/penguin.jpg' },
  { id: 'panda', name: 'Panda', url: '/images/panda.jpg' },
  { id: 'owl', name: 'Owl', url: '/images/owl.jpg' },
  { id: 'lion', name: 'Lion', url: '/images/lion.jpg' },
  { id: 'hamster', name: 'Hamster', url: '/images/hamster.jpg' },
  { id: 'frog', name: 'Frog', url: '/images/frog.jpg' },
  { id: 'duck', name: 'Duck', url: '/images/duck.jpg' },
  { id: 'deer', name: 'Deer', url: '/images/deer.jpg' },
  { id: 'cow', name: 'Cow', url: '/images/cow.jpg' },
  { id: 'horse', name: 'Horse', url: '/images/horse.jpg' },
  { id: 'elephant', name: 'Elephant', url: '/images/elephant.jpg' },
  { id: 'giraffe', name: 'Giraffe', url: '/images/giraffe.jpg' },
  { id: 'fish', name: 'Fish', url: '/images/fish.jpg' },
  { id: 'whale', name: 'Whale', url: '/images/whale.jpg' },
  { id: 'bird', name: 'Bird', url: '/images/bird.jpg' },
  { id: 'cat', name: 'Cat', url: '/images/cat.jpg' },
  { id: 'dog', name: 'Dog', url: '/images/dog.jpg' }
]

function ImageSelector({ selectedImage, onImageSelect }) {
  return (
    <div className="image-selector">
      <select 
        value={selectedImage} 
        onChange={(e) => onImageSelect(e.target.value)}
        className="image-select"
      >
        {images.map((image) => (
          <option key={image.id} value={image.url}>
            {image.name}
          </option>
        ))}
      </select>
    </div>
  )
}

ImageSelector.propTypes = {
  selectedImage: PropTypes.string.isRequired,
  onImageSelect: PropTypes.func.isRequired
}

export default ImageSelector