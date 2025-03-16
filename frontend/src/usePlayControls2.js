import { useCallback, useState, useEffect, useRef } from 'react';
//import songsMap from './mp3s.json';
import { Howl } from 'howler';

const fetchSong = (songs) => {
  if (songs.length > 0) {
    return songs[Math.floor(Math.random() * songs.length)];
  }
};

export const labels = [
  { key: 'happy', label: 'Happy' },
  { key: 'sad', label: 'Sad' },
  { key: 'fear', label: 'Fear' },
  { key: 'surprise', label: 'Surprise' },
  { key: 'neutral', label: 'Neutral' },
  { key: 'angry', label: 'Angry' }
];

export const usePlayControls = ({ songs, defaultLabel, refetchSongsWithNewLabel }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [label, setLabel] = useState(null);
  const sound = useRef(null);
  const soundLoadingInProgress = useRef();
  const [playbackTime, setPlaybackTime] = useState(null);
  const [durationInSeconds, setDurationInSeconds] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(defaultLabel);
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
    ({ url }) => {
      if (!soundLoadingInProgress.current) {
        let s;

        unloadSound();

        soundLoadingInProgress.current = true;

        s = new Howl({
          src: url,
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
        refetchSongsWithNewLabel(grp);
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
    [refetchSongsWithNewLabel, unloadSound]
  );

  const handleSongSelect = useCallback(
    (song) => () => {
      setTouched(true);
      unloadSound();
      setSelectedSong(song.key);
      setPlaybackTime(null);
      setDurationInSeconds(null);
      playNewSong(song);
    },
    [playNewSong, unloadSound]
  );

  const handleNext = useCallback(() => {
    setTouched(true);
    if (songs.length > 0) {
      const currentIndex = songs.findIndex(({ key }) => key === selectedSong);
      handleSongSelect(songs[(currentIndex + 1) % songs.length])();
    }
  }, [handleSongSelect, selectedSong, songs]);

  const handlePrevious = useCallback(() => {
    setTouched(true);
    if (songs.length > 0) {
      const currentIndex = songs.findIndex(({ key }) => key === selectedSong);
      handleSongSelect(songs[(currentIndex + songs.length - 1) % songs.length])();
    }
  }, [handleSongSelect, selectedSong, songs]);

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
    async (newLabel) => {
      if (!touched && !isPlaying && !isPaused) {
        if (newLabel && labels.some(({ key }) => key === newLabel)) {
          setSelectedGroup(newLabel);
          setLabel(newLabel);
          const songs = await refetchSongsWithNewLabel(newLabel);

          const song = fetchSong(songs);

          if (song) {
            setSelectedSong(song.key);
            playNewSong(song);
          }
        }
      }
    },
    [touched, isPlaying, isPaused, refetchSongsWithNewLabel, playNewSong]
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
