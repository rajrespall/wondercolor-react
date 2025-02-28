import React, { useState } from 'react';
import { Box, Grid } from '@mui/material';
import bg from './assets/bg.png';
import board from './assets/board.png';
import logo from './assets/logo_w.png';
import PaletteContainer from './components/PaletteContainer';

import palette1 from './assets/palette/01ffff.png';
import palette2 from './assets/palette/4E3478.png';
import palette3 from './assets/palette/5FA608.png';
import palette4 from './assets/palette/8A5642.png';
import palette5 from './assets/palette/8B4617.png';
import palette6 from './assets/palette/8C7345.png';
import palette7 from './assets/palette/8D4A6E.png';
import palette8 from './assets/palette/8E8D54.png';
import palette9 from './assets/palette/9E5430.png';
import palette10 from './assets/palette/100f0d.png';
import palette11 from './assets/palette/542A29.png';
import palette12 from './assets/palette/6060A3.png';
import palette13 from './assets/palette/afbda5.png';
import palette14 from './assets/palette/c9c9c9.png';
import palette15 from './assets/palette/c28bc1.png';
import palette16 from './assets/palette/eddfcc.png';
import palette17 from './assets/palette/f7f8f3.png';
import palette18 from './assets/palette/fed700.png';
import palette19 from './assets/palette/ff6ab2.png';
import palette20 from './assets/palette/foe78c.png';

import Logo from './components/Logo';
import PaletteColumn from './components/PaletteColumn';
import DrawingBoard from './components/DrawingBoard';
import ControlPanel from './components/ControlPanel';

import { guideImages } from './constants/images';

const App = () => {
  const paletteGroup1 = [palette1, palette2, palette3, palette4, palette5, palette6, palette7];
  const paletteGroup2 = [palette8, palette9, palette10, palette11, palette12, palette13];
  const paletteGroup3 = [palette14, palette15, palette16, palette17, palette18, palette19, palette20];
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(2);
  const [isEraser, setIsEraser] = useState(false);
  const [boardRef, setBoardRef] = useState(null);
  const [selectedGuideId, setSelectedGuideId] = useState(1);
  const paletteGroups = [paletteGroup1, paletteGroup2, paletteGroup3];

  const selectedGuide = guideImages.find(guide => guide.id === selectedGuideId);

  const handleGuideSelect = (event) => {
    setSelectedGuideId(event.target.value);
  };

  const handleColorSelect = (palette) => {
    const colorCode = palette.split('/').pop().split('.')[0];
    setSelectedColor(`#${colorCode}`);
    setIsEraser(false); // Switch back to drawing mode when color is selected
  };

  const handleBrushSizeChange = (event, newValue) => {
    setBrushSize(newValue);
  };

  const toggleEraser = () => {
    setIsEraser(!isEraser);
  };

  const handleBoardRef = (ref) => {
    setBoardRef(ref);
  };

  const handleClear = () => {
    if (boardRef && boardRef.clearCanvas) {
      boardRef.clearCanvas();
    }
  };

  const handleImageSelect = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

   return (
    <Box
      sx={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <Logo logo={logo} />
      <Grid container spacing={1} sx={{ width: '90%', margin: '0 auto' }}>
        <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
          <PaletteContainer 
            paletteGroups={paletteGroups} 
            onSelectColor={handleColorSelect} 
          />
        </Grid>
        <DrawingBoard 
          selectedColor={selectedColor} 
          board={board}
          brushSize={brushSize}
          isEraser={isEraser}
          onRef={handleBoardRef}
          grayscaleImage={selectedGuide?.gray}
        />
        <ControlPanel 
          brushSize={brushSize}
          onBrushSizeChange={handleBrushSizeChange}
          onEraser={toggleEraser}
          isEraser={isEraser}
          onClear={handleClear}
          guideImage={selectedGuide?.color}
          onGuideSelect={handleGuideSelect}
          selectedGuideId={selectedGuideId}
        />
      </Grid>
    </Box>
  );
};

export default App;