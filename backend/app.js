import express from 'express';
import cors from 'cors';
import imageRoutes from './routes/image.route.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increase limit for base64 images
app.use('/api/images', imageRoutes);

export default app;