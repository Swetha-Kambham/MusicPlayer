import React, { useCallback, useState } from 'react';
import { Box, Button } from '@mui/material';
import background from './images/background.jpg';
import { SongCard } from './SongCard';

export const Player = () => {
  const [capture, setCapture] = useState(false);

  const onStartCaptureclick = useCallback(() => {
    setCapture(true);
  }, []);

  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${background})`,
          backgroundPosition: 'center',
          height: '100vh',
          width: '100vw',
          backgroundSize: 'cover',
          display: 'flex'
        }}>
        {capture ? <SongCard /> : null}
        <Box sx={{ margin: 'auto', marginRight: '100px', position: 'relative' }}>
          {capture ? null : (
            <Button
              onClick={onStartCaptureclick}
              variant="contained"
              sx={{
                background: 'green',
                color: 'white',
                fontSize: '1.5rem',
                fontFamily: 'fantasy'
              }}>
              Let&apos;s Go
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
};
export default Player;
