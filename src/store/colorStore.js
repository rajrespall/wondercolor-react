import { create } from 'zustand';
import axios from 'axios';
import imageCompression from 'browser-image-compression';



const useColorStore = create((set, get) => ({
  imageData: null,
  uploadStatus: null,

  setImageData: (image) => set({ imageData: image }),

  uploadImage: async () => {
    const { imageData } = get();

    if (!imageData) {
      set({ uploadStatus: 'No image selected' });
      return;
    }

    try {
      set({ uploadStatus: 'Compressing image...' });

      // Convert Base64 to Blob
      const blob = await (await fetch(imageData)).blob();

      // Compress image
      const compressedBlob = await imageCompression(blob, {
        maxSizeMB: 0.5,  // Max size 0.5MB
        maxWidthOrHeight: 1000, // Resize if needed
        useWebWorker: true, // Optimize performance
      });

      // Convert Blob back to Base64
      const reader = new FileReader();
      reader.readAsDataURL(compressedBlob);
      reader.onloadend = async () => {
        const compressedBase64 = reader.result;

        set({ uploadStatus: 'Uploading...' });

        // Send compressed image to backend
        const response = await axios.post(
          'http://localhost:5000/api/color/upload',
          { imageData: compressedBase64 },
          { withCredentials: true }
        );

        if (response.data.success) {
          set({
            uploadStatus: 'Upload successful!',
            imageData: null,
          });
        } else {
          set({ uploadStatus: 'Upload failed' });
        }
      };
    } catch (error) {
      console.error('Upload Error:', error);
      set({ uploadStatus: 'Error uploading image' });
    }
  }
}));


export default useColorStore;
