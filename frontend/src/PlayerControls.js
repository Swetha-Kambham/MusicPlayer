import React from 'react';
import { FaStepBackward, FaStepForward } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai';
import PropTypes from 'prop-types';
import { Box, Button } from '@mui/material';

export const PlayerControls = ({ onPlayPause, onNext, onPrevious, isPlaying }) => {
  return (
    <div style={{ display: 'flex', marginTop: '16px' }}>
      <Box sx={{ margin: 'auto' }}>
        <Button className="controlButton" onClick={onPrevious}>
          <IconContext.Provider value={{ size: '2em', color: '#27AE60' }}>
            <FaStepBackward />
          </IconContext.Provider>
        </Button>
        <Button className="controlButton" onClick={onPlayPause}>
          <IconContext.Provider value={{ size: '2em', color: '#27AE60' }}>
            {isPlaying ? <AiFillPauseCircle /> : <AiFillPlayCircle />}
          </IconContext.Provider>
        </Button>
        <Button className="controlButton" onClick={onNext}>
          <IconContext.Provider value={{ size: '2em', color: '#27AE60' }}>
            <FaStepForward />
          </IconContext.Provider>
        </Button>
      </Box>
    </div>
  );
};

PlayerControls.propTypes = {
  onPlayPause: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired
};

export default PlayerControls;
