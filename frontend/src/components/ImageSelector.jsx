import PropTypes from 'prop-types'
import '../styles/ImageSelector.css'

const images = [
  { id: 'none', name: 'No Background', url: '', guideUrl: '' },
  { id: 'turtle', name: 'Turtle', url: '/images/turtle.jpg', guideUrl: '/images/colored/turtle.jpg' },
  { id: 'tiger', name: 'Tiger', url: '/images/tiger.jpg', guideUrl: '/images/colored/tiger.jpg' },
  { id: 'sheep', name: 'Sheep', url: '/images/sheep.jpg', guideUrl: '/images/colored/sheep.jpg' },
  { id: 'rabbit', name: 'Rabbit', url: '/images/rabbit.jpg', guideUrl: '/images/colored/rabbit.jpg' },
  { id: 'pig', name: 'Pig', url: '/images/pig.jpg', guideUrl: '/images/colored/pig.jpg' },
  { id: 'penguin', name: 'Penguin', url: '/images/penguin.jpg', guideUrl: '/images/colored/penguin.jpg' },
  { id: 'panda', name: 'Panda', url: '/images/panda.jpg', guideUrl: '/images/colored/panda.jpg' },
  { id: 'owl', name: 'Owl', url: '/images/owl.jpg', guideUrl: '/images/colored/owl.jpg' },
  { id: 'lion', name: 'Lion', url: '/images/lion.jpg', guideUrl: '/images/colored/lion.jpg' },
  { id: 'hamster', name: 'Hamster', url: '/images/hamster.jpg', guideUrl: '/images/colored/hamster.jpg' },
  { id: 'frog', name: 'Frog', url: '/images/frog.jpg', guideUrl: '/images/colored/frog.jpg' },
  { id: 'duck', name: 'Duck', url: '/images/duck.jpg', guideUrl: '/images/colored/duck.jpg' },
  { id: 'deer', name: 'Deer', url: '/images/deer.jpg', guideUrl: '/images/colored/deer.jpg' },
  { id: 'cow', name: 'Cow', url: '/images/cow.jpg', guideUrl: '/images/colored/cow.jpg' },
  { id: 'horse', name: 'Horse', url: '/images/horse.jpg', guideUrl: '/images/colored/horse.jpg' },
  { id: 'elephant', name: 'Elephant', url: '/images/elephant.jpg', guideUrl: '/images/colored/elephant.jpg' },
  { id: 'giraffe', name: 'Giraffe', url: '/images/giraffe.jpg', guideUrl: '/images/colored/giraffe.jpg' },
  { id: 'fish', name: 'Fish', url: '/images/fish.jpg', guideUrl: '/images/colored/fish.jpg' },
  { id: 'whale', name: 'Whale', url: '/images/whale.jpg', guideUrl: '/images/colored/whale.jpg' },
  { id: 'bird', name: 'Bird', url: '/images/bird.jpg', guideUrl: '/images/colored/bird.jpg' },
  { id: 'cat', name: 'Cat', url: '/images/cat.jpg', guideUrl: '/images/colored/cat.jpg' },
  { id: 'dog', name: 'Dog', url: '/images/dog.jpg', guideUrl: '/images/colored/dog.jpg' }
]

function ImageSelector({ selectedImage, onImageSelect }) {
  const selectedImageObj = images.find(img => img.url === selectedImage) || images[0];
  
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
      {selectedImageObj.guideUrl && (
        <div className="guide-preview">
          <img 
            src={selectedImageObj.guideUrl} 
            alt={`${selectedImageObj.name} guide`} 
            className="guide-image"
          />
        </div>
      )}
    </div>
  )
}

ImageSelector.propTypes = {
  selectedImage: PropTypes.string.isRequired,
  onImageSelect: PropTypes.func.isRequired
}

export default ImageSelector