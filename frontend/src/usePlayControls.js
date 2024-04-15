import { useCallback, useState, useMemo, useEffect } from 'react';
import songList from './mp3s.json';
import { Howl } from 'howler';

const fetchSong = (label) => {
  const items = (label && songList[label]) || [];

  if (items.length > 0) {
    return items[Math.floor(Math.random() * items.length)];
  }
};

export const usePlayControls = () => {
  const [id, setId] = useState(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [label, setLabel] = useState(null);
  const [sound, setSound] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [currTime, setCurrTime] = useState({
    min: 0,
    sec: 0
  });

  const onPlayClick = useCallback(() => {
    if (sound) {
      const id = sound.play();
      setId(id);
    }
  }, [sound]);

  const onPauseClick = useCallback(() => {
    if (sound) {
      sound.pause(id || undefined);
    }
  }, [id, sound]);

  const onStopClick = useCallback(() => {
    if (sound) {
      sound.stop(id || undefined);
    }
  }, [id, sound]);

  const onLabelChange = useCallback(
    (newLabel) => {
      if (!isPlaying && !isPaused) {
        if (sound) {
          sound.unload();
        }

        if (newLabel && fetchSong(newLabel)) {
          const s = new Howl({
            src: require('./assets/mp3-songs' + `/${newLabel}/${fetchSong(newLabel)}`),
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
            },
            onstop: () => {
              setIsPlaying(false);
              setIsPaused(false);
            }
          });

          const id = s.play();
          setId(id);
          setSound(s);
          setLabel(newLabel);
        }
      }
    },
    [isPaused, isPlaying, sound]
  );

  const time = useMemo(() => {
    if (sound && id) {
      const _duration = sound.duration();

      const sec = Math.floor(_duration % 60);
      const min = Math.floor(_duration / 60);

      return {
        min,
        sec,
        duration: Math.floor(_duration)
      };
    }

    return null;
  }, [sound, id]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound && id) {
        setSeconds(sound.seek(id));
        const min = Math.floor(sound.seek(id) / 60);
        const sec = Math.floor(sound.seek(id) % 60);

        setCurrTime({
          min,
          sec
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound, id]);

  const onSeek = useCallback(
    (e) => {
      if (sound && id) {
        sound.seek(id);
        setSeconds(e.target.value);
      }
    },
    [id, sound]
  );

  return {
    isPlaying,
    onPlayClick,
    onPauseClick,
    onStopClick,
    label,
    onLabelChange,
    time,
    seconds,
    currTime,
    onSeek,
    isPaused
  };
};
