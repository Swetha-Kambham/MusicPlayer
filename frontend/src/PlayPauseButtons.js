import React from 'react';
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai';
import { IconContext } from 'react-icons';
import PropTypes from 'prop-types';

export const PlayPauseButtons = ({ isPlaying, onPlayClick, onPauseClick }) => {
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
    </>
  );
};

PlayPauseButtons.propTypes = {
  isPlaying: PropTypes.bool,
  onPrevClick: PropTypes.func,
  onPlayClick: PropTypes.func,
  onPauseClick: PropTypes.func,
  onNextClick: PropTypes.func
};
