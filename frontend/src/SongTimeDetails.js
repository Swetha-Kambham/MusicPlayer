import React from 'react';
import { Slider, Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const formatTime = (timeInSeconds) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const SongTimeDetails = ({ durationInSeconds, playbackTime, onSeek }) => {
  const handleSliderChange = (event, newValue) => {
    onSeek(newValue);
  };

  return (
    <Box sx={{ width: '90%', marginX: 'auto' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="caption">{formatTime(playbackTime)}</Typography>
        <Typography variant="caption">{formatTime(durationInSeconds)}</Typography>
      </Box>
      <Slider value={playbackTime} onChange={handleSliderChange} max={durationInSeconds} />
    </Box>
  );
};

SongTimeDetails.propTypes = {
  durationInSeconds: PropTypes.number,
  playbackTime: PropTypes.number,
  onSeek: PropTypes.func
};

export default SongTimeDetails;
