import { Box, Typography, Grid } from '@mui/material';
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
    <Grid container spacing={0}>
      {labelToShow ? (
        <Grid item xs={12} sx={{ display: 'flex' }}>
          <Typography
            sx={{
              fontFamily: 'fantasy',
              fontSize: '3rem',
              fontWeight: 600,
              color: 'white',
              marginLeft: 'auto'
            }}>{`Feeling ${labelToShow}? \n here is a song for you....`}</Typography>
        </Grid>
      ) : null}
      <Grid item xs={12}>
        <Box
          sx={{
            backgroundImage: `url(${background})`,
            backgroundPosition: 'center',
            height: '150px',
            width: '150px',
            backgroundSize: 'cover',
            marginLeft: 'auto'
          }}
        />
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex' }}>
        <Box
          sx={{
            marginLeft: 'auto',
            marginBottom: 'auto'
          }}>
          <PlayPauseButtons
            isPlaying={isPlaying}
            onPlayClick={onPlayClick}
            onPauseClick={onPauseClick}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

SongDetails.propTypes = {
  label: PropTypes.string
};
