import { Box, Typography } from '@mui/material';
import React from 'react';
import background from './images/playingSymbol.gif';
import PropTypes from 'prop-types';
import { PlayPauseButtons } from './PlayPauseButtons';
import { usePlayControls } from './usePlayControls';
//get the song using label from the list of songs
//mp3s.json have the list of songs
//Users/swethakambham/Documents/GitHub/MusicPlayer/frontend/src/mp3s.json

export const SongDetails = ({ label }) => {
  //const {} = usePlayControls(label);

  //
  //create a state variable sound which is having current sond

  //howler is used to play the song
  // const
  //sound.play() sound.pause() sound.stop() sound.seek();
  //create a path using label and songName(fetchsong())

  //call the hook which is all the play controls

  const { isPlaying, onPlayClick, onPauseClick, label: labelToShow } = usePlayControls(label);

  return (
    <Box sx={{ width: 400, height: 240, position: 'fixed', right: 16, top: '20%' }}>
      {labelToShow ? (
        <Typography
          sx={{
            fontFamily: 'fantasy',
            fontSize: '2rem',
            fontWeight: 400,
            color: 'white',
            marginLeft: 'auto',
            whiteSpace: 'pre',
            textAlign: 'center'
          }}>{`Feeling ${labelToShow}? \n here is a song for you...`}</Typography>
      ) : null}
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
            onPlayClick={onPlayClick}
            onPauseClick={onPauseClick}
          />
        </Box>
      </Box>
    </Box>
  );
};

SongDetails.propTypes = {
  label: PropTypes.string
};
