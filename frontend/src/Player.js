import React, { useCallback, useState } from 'react';
import { Box, Button } from '@mui/material';
import background from './images/background.jpg';
import Webcam from './Webcam';
import { SongDetails } from './SongDetails';

export const Player = () => {
  const [capture, setCapture] = useState(false);

  //state for emotion
  const [label, setLabel] = useState(null);

  const onStartCaptureclick = useCallback(() => {
    setCapture(true);
  }, []);
  //newLabel will change for every second
  //check webcam useeffect
  const onLabelChange = useCallback((newLabel) => {
    //set the specific condition as it changes for every second
    //if the song is alredy in running state then we should not setthe newlabel
    setLabel(newLabel);
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
        {capture ? <SongDetails label={'sad'} /> : null}
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
      {capture ? (
        <Box sx={{ position: 'absolute', top: 10, left: 10 }}>
          {/* <Webcam onLabelChange={onLabelChange} /> */}
        </Box>
      ) : null}
    </>
  );
};
export default Player;
