import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Grid } from '@mui/material';

const DrawingBoard = ({ selectedColor, board, brushSize, isEraser, onRef, grayscaleImage }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);
  const [drawLayer, setDrawLayer] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [grayImage, setGrayImage] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = 1000;
    canvas.height = 800;
    
    // Create drawing layer
    const drawingCanvas = document.createElement('canvas');
    drawingCanvas.width = canvas.width;
    drawingCanvas.height = canvas.height;
    const drawCtx = drawingCanvas.getContext('2d');
    setDrawLayer(drawCtx);
    
    // Load background and grayscale images
    const bgImage = new Image();
    const grayImageObj = new Image();
    
    bgImage.src = board;
    grayImageObj.src = grayscaleImage;
    
    bgImage.onload = () => {
      setBackgroundImage(bgImage);
      ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
      
      // Load grayscale image after background
      grayImageObj.onload = () => {
        setGrayImage(grayImageObj);
        const scale = 2.0;
        const width = 1330.33;
        const height = 800;
        const x = (canvas.width - width) / 2;
        const y = -40;


        // Set opacity for grayscale image
        ctx.globalAlpha = 0.5; // Adjust this value between 0 and 1
        ctx.drawImage(grayImageObj, x, y, width, height);
        ctx.globalAlpha = 1.0; // Reset opacity
      };
    };
    
    setContext(ctx);
  }, [board, grayscaleImage]);

  // Function to redraw the entire canvas
  const redrawCanvas = () => {
    if (!context || !backgroundImage) return;
    
    // Clear and draw background
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    context.drawImage(backgroundImage, 0, 0, canvasRef.current.width, canvasRef.current.height);
    
    // Draw grayscale image
    if (grayImage) {
      const scale = 0.6;
      const width = 1330.33;
      const height = 800;
      const x = (canvasRef.current.width - width) / 2;
      const y = -40;
      

      context.globalAlpha = 0.5; // Set opacity for grayscale image
      context.drawImage(grayImage, x, y, width, height);
      context.globalAlpha = 1.0; // Reset opacity
    }
    
    // Draw user's drawing layer
    if (drawLayer) {
      context.drawImage(drawLayer.canvas, 0, 0);
    }
  };

  const startDrawing = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    
    drawLayer.beginPath();
    drawLayer.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const scaleX = canvasRef.current.width / rect.width;
    const scaleY = canvasRef.current.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    
    drawLayer.lineTo(x, y);
    drawLayer.stroke();
    
    redrawCanvas();
  };

  const stopDrawing = () => {
    drawLayer.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = useCallback(() => {
    if (drawLayer) {
      drawLayer.clearRect(0, 0, drawLayer.canvas.width, drawLayer.canvas.height);
      
      // Make sure redrawCanvas is called with the current state
      if (context && backgroundImage) {
        // Clear and draw background
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        context.drawImage(backgroundImage, 0, 0, canvasRef.current.width, canvasRef.current.height);
        
        // Draw grayscale image
        if (grayImage) {
          const width = 1333.33;
          const height = 800;
          const x = (canvasRef.current.width - width) / 2;
          const y = -40;

          context.globalAlpha = 0.5; // Set opacity for grayscale image
          context.drawImage(grayImage, x, y, width, height);
          context.globalAlpha = 1.0; // Reset opacity
        }
      }
    }
  }, [drawLayer, context, backgroundImage, grayImage]);

  useEffect(() => {
    if (drawLayer) {
      drawLayer.strokeStyle = isEraser ? '#FFFFFF' : selectedColor;
      drawLayer.lineWidth = brushSize;
      drawLayer.lineCap = 'round';
      
      if (isEraser) {
        drawLayer.globalCompositeOperation = 'destination-out';
      } else {
        drawLayer.globalCompositeOperation = 'source-over';
      }
    }
  }, [selectedColor, brushSize, isEraser]);

  useEffect(() => {
    if (onRef) {
      onRef({ clearCanvas });
    }
  }, [clearCanvas, onRef]);

  return (
    <Grid 
      item xs={8} 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: '20px'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          border: '1px solid #ccc',
          borderRadius: '4px',
          maxWidth: '100%',
          height: 'auto',
          width: '1000px'
        }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
      />
    </Grid>
  );
};

export default DrawingBoard;