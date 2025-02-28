import React from 'react';
import { Grid, Box } from '@mui/material';
import PaletteColumn from './PaletteColumn';

const PaletteContainer = ({ paletteGroups, onSelectColor }) => (
  <Box
    sx={{
      background: 'rgba(255, 255, 255, 0.2)',
      borderRadius: '8px',
      padding: '15px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backdropFilter: 'blur(5px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      height: 'fit-content',
      margin: '0 auto',
      marginTop: '100px'
    }}
  >
    <Grid 
      container 
      spacing={1} 
      sx={{ 
        width: 'auto',
        justifyContent: 'center',
        '& > *': {
          display: 'flex',
          justifyContent: 'center'
        }
      }}
    >
      {paletteGroups.map((group, index) => (
        <Grid item key={index}>
          <PaletteColumn 
            palettes={group} 
            onSelectColor={onSelectColor}
            columnIndex={index}
          />
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default PaletteContainer;