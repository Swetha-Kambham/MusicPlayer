import React, { useCallback, useState } from 'react';
import { Box, Button } from '@mui/material';
import background from './images/background.jpg';
import { SongDetails } from './SongDetails';
import HomePage from './HomePage';
import backgroundImage from './images/background-image.jpg';

export const Player = () => {
  const [capture, setCapture] = useState(false);

  const onStartCaptureclick = useCallback(() => {
    setCapture(true);
  }, []);

  return (
    <>
      <Box
        sx={{
          backgroundImage: capture ? `url(${background})` : `url(${backgroundImage})`,
          backgroundPosition: 'center',
          height: '100vh',
          width: '100vw',
          backgroundSize: 'cover',
          display: 'flex'
        }}>
        {capture ? <SongDetails /> : null}
        <Box sx={{ margin: 'auto' }}>
          {capture ? null : (
            <>
              <HomePage />
              <Box sx={{ textAlign: 'center' }}>
                <Button
                  onClick={onStartCaptureclick}
                  variant="contained"
                  sx={{
                    background: 'green',
                    color: 'white',
                    fontSize: '1.5rem',
                    fontFamily: 'fantasy',
                    marginTop: '20px',
                    variant: 'contained'
                  }}>
                  Let&apos;s Go
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};
export default Player;
