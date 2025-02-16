import express from 'express';
import cloudinary from '../config/cloudinary.js';
import Image from '../models/image.model.js';

const router = express.Router();

router.post('/upload', async (req, res) => {
  try {
    const { imageData } = req.body;
    
    if (!imageData) {
      return res.status(400).json({
        success: false,
        message: 'No image data provided'
      });
    }

    // Upload to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(imageData, {
      folder: 'colorbook',
      resource_type: 'image',
      format: 'png'
    });

    if (!uploadResponse || !uploadResponse.secure_url) {
      throw new Error('Failed to upload to Cloudinary');
    }

    // Save to MongoDB
    const image = new Image({
      userId: '', // Leave blank for now
      imageUrl: uploadResponse.secure_url,
      cloudinaryId: uploadResponse.public_id
    });

    await image.save();

    res.status(201).json({
      success: true,
      image: {
        id: image._id,
        url: image.imageUrl,
        createdAt: image.createdAt
      }
    });

  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error uploading image'
    });
  }
});

export default router;