import { useCallback, useState, useEffect, useRef } from 'react';
import songsMap from './mp3s.json';
import { Howl } from 'howler';

const fetchSong = (label) => {
  const items = (label && songsMap[label]) || [];

  if (items.length > 0) {
    return items[Math.floor(Math.random() * items.length)];
  }
};

export const usePlayControls = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [label, setLabel] = useState(null);
  const sound = useRef(null);
  const soundLoadingInProgress = useRef();
  const [playbackTime, setPlaybackTime] = useState(null);
  const [durationInSeconds, setDurationInSeconds] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(Object.keys(songsMap)[0]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [touched, setTouched] = useState(false);

  const handleGroupDropdownOpen = useCallback(() => {
    setTouched(true);
  }, []);

  const unloadSound = useCallback(() => {
    if (sound.current) {
      sound.current.stop();
      sound.current.unload();
      sound.current = null;
    }
  }, []);

  const playNewSong = useCallback(
    (grp, songName) => {
      if (!soundLoadingInProgress.current) {
        let s;

        unloadSound();

        soundLoadingInProgress.current = true;

        s = new Howl({
          src: require('./assets/mp3-songs' + `/${grp}/${songName}`),
          onload: function () {
            setDurationInSeconds(s.duration());
            s.play();
            setIsPlaying(true);
            sound.current = s;
            soundLoadingInProgress.current = false;
          },
          onloaderror: function (id, error) {
            console.error('Failed to load audio:', error);
            soundLoadingInProgress.current = false;
          },
          onplay: () => {
            setIsPlaying(true);
            setIsPaused(false);
          },
          onpause: () => {
            setIsPlaying(false);
            setIsPaused(true);
          },
          onend: () => {
            setIsPlaying(false);
            setIsPaused(false);
            setTouched(false);
          },
          onstop: () => {
            setIsPlaying(false);
            setIsPaused(false);
          }
        });
      }
    },
    [unloadSound]
  );

  const handleGroupChange = useCallback(
    (event) => {
      const { value: grp } = event.target || {};
      if (grp) {
        setTouched(true);
        unloadSound();
        setLabel(null);
        setSelectedGroup(grp);
        setSelectedSong(null);
        setIsPlaying(false);
        setPlaybackTime(null);
        setDurationInSeconds(null);
      }
    },
    [unloadSound]
  );

  const handleSongSelect = useCallback(
    (song) => () => {
      setTouched(true);
      unloadSound();
      setSelectedSong(song);
      setPlaybackTime(null);
      setDurationInSeconds(null);
      playNewSong(selectedGroup, song);
    },
    [playNewSong, selectedGroup, unloadSound]
  );

  const handleNext = useCallback(() => {
    setTouched(true);
    const songs = songsMap[selectedGroup];
    if (songs.length > 0) {
      const currentIndex = songs.indexOf(selectedSong);
      handleSongSelect(songs[(currentIndex + 1) % songs.length])();
    }
  }, [handleSongSelect, selectedGroup, selectedSong]);

  const handlePrevious = useCallback(() => {
    setTouched(true);
    const songs = songsMap[selectedGroup];
    if (songs.length > 0) {
      const currentIndex = songs.indexOf(selectedSong);
      handleSongSelect(songs[(currentIndex + songs.length - 1) % songs.length])();
    }
  }, [handleSongSelect, selectedGroup, selectedSong]);

  const onPlayClick = useCallback(() => {
    setTouched(true);
    if (sound.current) {
      sound.current.play();
    }
  }, [sound]);

  const onPauseClick = useCallback(() => {
    setTouched(true);
    if (sound.current) {
      sound.current.pause();
    }
  }, [sound]);

  const onStopClick = useCallback(() => {
    if (sound.current) {
      sound.current.stop();
    }
  }, [sound]);

  const onLabelChange = useCallback(
    (newLabel) => {
      if (!touched && !isPlaying && !isPaused) {
        if (newLabel && Object.hasOwn(songsMap, newLabel)) {
          setSelectedGroup(newLabel);
          setLabel(newLabel);

          const songName = fetchSong(newLabel);

          if (songName) {
            setSelectedSong(songName);
            playNewSong(newLabel, songName);
          }
        }
      }
    },
    [touched, isPlaying, isPaused, playNewSong]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound.current && isPlaying) {
        setPlaybackTime(sound.current.seek());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, sound]);

  const onSeek = useCallback(
    (value) => {
      if (sound.current && !isNaN(value)) {
        sound.current.seek(value);
        setPlaybackTime(value);
      }
    },
    [sound]
  );

  const handlePlayPause = useCallback(() => {
    if (isPlaying) {
      onPauseClick();
    } else {
      onPlayClick();
    }
  }, [isPlaying, onPauseClick, onPlayClick]);

  return {
    isPlaying,
    onStopClick,
    label,
    onLabelChange,
    durationInSeconds,
    playbackTime,
    onSeek,
    isPaused,
    handlePlayPause,
    handleGroupChange,
    handleGroupDropdownOpen,
    handleNext,
    handlePrevious,
    selectedSong,
    selectedGroup,
    handleSongSelect,
    touched
  };
};
