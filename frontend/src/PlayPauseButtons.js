import React from 'react';
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai';
import { FaStopCircle } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import PropTypes from 'prop-types';

export const PlayPauseButtons = ({
  isPlaying,
  isPaused,
  onPlayClick,
  onPauseClick,
  onStopClick
}) => {
  return (
    <>
      {!isPlaying ? (
        <button className="playButton" onClick={onPlayClick}>
          <IconContext.Provider value={{ size: '4em', color: '#27AE60' }}>
            <AiFillPlayCircle />
          </IconContext.Provider>
        </button>
      ) : (
        <button className="playButton" onClick={onPauseClick}>
          <IconContext.Provider value={{ size: '4em', color: '#27AE60' }}>
            <AiFillPauseCircle />
          </IconContext.Provider>
        </button>
      )}
      {isPlaying || isPaused ? (
        <button className="stopButton" onClick={onStopClick}>
          <IconContext.Provider value={{ size: '4em', color: '#27AE60' }}>
            <FaStopCircle />
          </IconContext.Provider>
        </button>
      ) : null}
    </>
  );
};

PlayPauseButtons.propTypes = {
  isPlaying: PropTypes.bool,
  isPaused: PropTypes.bool,
  onPrevClick: PropTypes.func,
  onPlayClick: PropTypes.func,
  onPauseClick: PropTypes.func,
  onNextClick: PropTypes.func,
  onStopClick: PropTypes.func
};
