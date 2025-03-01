import React, { useEffect, useState, useRef } from 'react';
import { Box, Button, Grid, Paper, Slider, Select, MenuItem, Snackbar, Alert } from '@mui/material';
import { guideImages } from '../constants/images';
import useColorStore from '../store/colorStore';

const ControlPanel = ({ 
  brushSize, 
  onBrushSizeChange, 
  onEraser, 
  isEraser, 
  onClear,
  onSave,
  confirmSave,
  saveDialogOpen,
  guideImage,
  onGuideSelect,
  selectedGuideId
}) => {
  const { uploadImage, setImageData, uploadStatus } = useColorStore();
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [previousUploadStatus, setPreviousUploadStatus] = useState(null);
  const saveInProgressRef = useRef(false);
  const saveConfirmedRef = useRef(false);

  // This function now handles saving after confirmation
  const handleSave = () => {
    // Prevent duplicate saves
    if (saveInProgressRef.current) return;
    
    saveInProgressRef.current = true;
    
    const canvas = document.querySelector('canvas'); // Get canvas element
    if (!canvas) {
      saveInProgressRef.current = false;
      return;
    }

    const image = canvas.toDataURL('image/png'); // Convert to base64
    setImageData(image);
    uploadImage();
    setShowSnackbar(true); // Show snackbar when upload starts
  };

  // We'll use this effect to handle save confirmation
  useEffect(() => {
    // Only run this effect when dialog closes with confirmation
    if (saveDialogOpen === false && confirmSave && !saveConfirmedRef.current) {
      const confirmed = document.activeElement?.textContent === 'Save';
      if (confirmed) {
        saveConfirmedRef.current = true;
        handleSave();
      }
    }
    
    // Reset the confirmation flag when dialog opens again
    if (saveDialogOpen === true) {
      saveConfirmedRef.current = false;
    }
  }, [saveDialogOpen, confirmSave]);

  // Track upload status changes to detect when save is complete
  useEffect(() => {
    // If status changes to success and was previously something else
    if (uploadStatus?.includes('successful') && uploadStatus !== previousUploadStatus) {
      // Clear the canvas
      const boardRef = document.querySelector('canvas')?.__reactProps$?.onRef?.__reactProps;
      if (boardRef?.clearCanvas) {
        boardRef.clearCanvas();
      }
      
      // Reset guide image to "None" (ID 1)
      if (selectedGuideId !== 1) {
        // Create a synthetic event to pass to onGuideSelect
        const event = { target: { value: 1 } };
        onGuideSelect(event);
      }
      
      // Reset save in progress flag
      saveInProgressRef.current = false;
    }
    
    setPreviousUploadStatus(uploadStatus);
  }, [uploadStatus, onGuideSelect, selectedGuideId]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowSnackbar(false);
  };

  // Determine severity based on upload status
  const getSeverity = () => {
    if (!uploadStatus) return 'info';
    if (uploadStatus.includes('successful')) return 'success';
    if (uploadStatus.includes('Error') || uploadStatus.includes('failed')) return 'error';
    return 'info';
  };

  return (
    <Grid 
      item xs={2}
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center'
      }}
    >
      {/* Rest of component remains unchanged */}
      <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
        {/* Box content unchanged */}
        <Box 
          sx={{ 
            height: 150, 
            backgroundColor: '#f0f0f0', 
            marginBottom: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        >
          {guideImage ? (
            <img 
              src={guideImage} 
              alt="Color Guide" 
              style={{ 
                maxWidth: '200%', 
                maxHeight: '200%',
                objectFit: 'contain' 
              }} 
            />
          ) : (
            "No guide image"
          )}
        </Box>
        <Select
          value={selectedGuideId}
          onChange={onGuideSelect}
          sx={{ width: '150px', marginBottom: 2 }}
        >
          {guideImages.map((guide) => (
            <MenuItem key={guide.id} value={guide.id}>
              {guide.name}
            </MenuItem>
          ))}
        </Select>
        <Box sx={{ marginBottom: 2, marginTop: 2 }}>
          <p style={{ margin: '0 0 8px 0' }}>Brush Size</p>
          <Slider
            value={brushSize}
            onChange={onBrushSizeChange}
            min={1}
            max={20}
            valueLabelDisplay="auto"
            sx={{ width: '150px' }}
          />
        </Box>
        <Button 
          variant={isEraser ? "contained" : "outlined"} 
          color="primary" 
          sx={{ marginBottom: 1, width: '150px' }}
          onClick={onEraser}
        >
          {isEraser ? "Drawing Mode" : "Eraser"}
        </Button>
        <Button 
          variant="contained" 
          color="success" 
          sx={{ marginBottom: 1, width: '150px' }}
          onClick={onSave}
          disabled={saveInProgressRef.current}
        >
          Save
        </Button>
        <Button 
          variant="contained" 
          color="error" 
          sx={{ width: '150px' }}
          onClick={onClear}
        >
          Clear
        </Button>
      </Paper>

      {/* Status Snackbar */}
      <Snackbar
        open={showSnackbar && uploadStatus !== null}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={getSeverity()} 
          sx={{ width: '100%' }}
        >
          {uploadStatus}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default ControlPanel;