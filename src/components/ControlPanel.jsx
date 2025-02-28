import React from 'react';
import { Box, Button, Grid, Paper, Slider, Select, MenuItem } from '@mui/material';
import { guideImages } from '../constants/images';

const ControlPanel = ({ 
  brushSize, 
  onBrushSizeChange, 
  onEraser, 
  isEraser, 
  onClear,
  guideImage,
  onGuideSelect,
  selectedGuideId
}) => (
  <Grid 
    item xs={2}
    sx={{ 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center'
    }}
  >
    <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
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
              maxWidth: '100%', 
              maxHeight: '100%',
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
  </Grid>
);

export default ControlPanel;