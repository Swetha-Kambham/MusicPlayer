import { Box, Typography } from '@mui/material';
import React from 'react';
import background from './images/playingSymbol.gif';
import { PlayPauseButtons } from './PlayPauseButtons';
import { usePlayControls } from './usePlayControls';
import Webcam from './Webcam';

export const SongDetails = () => {
  const {
    isPlaying,
    isPaused,
    onPlayClick,
    onPauseClick,
    onStopClick,
    label,
    onLabelChange,
    currTime
  } = usePlayControls();

  return (
    <>
      <Box sx={{ width: 400, height: 240, position: 'fixed', right: 16, top: '20%' }}>
        <Typography
          sx={{
            fontFamily: 'fantasy',
            fontSize: '2rem',
            fontWeight: 400,
            color: 'white',
            marginLeft: 'auto',
            whiteSpace: 'pre',
            textAlign: 'center'
          }}>
          {label
            ? `Detected emotion is ${label} \n here is a song for you...`
            : 'No human face detected.'}
        </Typography>
        <Box
          sx={{
            display: 'flex'
          }}>
          <img
            src={background}
            style={{ width: '150px', height: '150px', marginLeft: 'auto', marginRight: 'auto' }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex'
          }}>
          <Box sx={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <PlayPauseButtons
              isPlaying={isPlaying}
              isPaused={isPaused}
              onPlayClick={onPlayClick}
              onPauseClick={onPauseClick}
              onStopClick={onStopClick}
            />
          </Box>
        </Box>
        {currTime ? (
          <Box
            sx={{
              display: 'flex',
              marginTop: '8px'
            }}>
            <Typography
              sx={{
                fontFamily: 'fantasy',
                fontSize: '1rem',
                fontWeight: 400,
                color: 'white',
                marginLeft: 'auto',
                marginRight: 'auto',
                whiteSpace: 'pre'
              }}>
              {`${currTime.min} min`} : {`${currTime.sec} sec`}
            </Typography>
          </Box>
        ) : null}
      </Box>
      <Box sx={{ position: 'absolute', top: 10, left: 10 }}>
        <Webcam onLabelChange={onLabelChange} />
      </Box>
    </>
  );
};
