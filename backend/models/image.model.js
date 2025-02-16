import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: false // For now, since we're not implementing auth yet
  },
  imageUrl: {
    type: String,
    required: true
  },
  cloudinaryId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Image', imageSchema);