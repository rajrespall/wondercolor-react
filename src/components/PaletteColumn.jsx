import React from 'react';
import { Grid } from '@mui/material';

const PaletteColumn = ({ palettes, onSelectColor, columnIndex }) => (
  <Grid 
    container 
    spacing={1} 
    sx={{ 
      flexDirection: 'column',
      alignItems: 'center',
      width: '50px',
      marginTop: columnIndex === 1 ? '30px' : '0px'
    }}
  >
    {palettes.map((palette, index) => (
      <Grid item key={index}>
        <img 
          src={palette} 
          alt={`Palette ${index + 1}`} 
          style={{ 
            width: '50px',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}
          onClick={() => onSelectColor(palette)}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
      </Grid>
    ))}
  </Grid>
);

export default PaletteColumn;