import { useCallback, useEffect, useState } from 'react';
import songList from './mp3s.json';
import { Howl } from 'howler';

const fetchSong = (label) => {
  const items = (label && songList[label]) || [];

  if (items.length > 0) {
    return items[Math.floor(Math.random() * items.length)];
  }
};

export const usePlayControls = (label) => {
  const [id, setId] = useState(undefined);
  const [isPlaying, setIsPlaying] = useState(false);
  const [internalLabel, setInternalLabel] = useState(null);

  const [sound, setSound] = useState(null);

  const onPlayClick = useCallback(() => {
    const id = sound.play();
    setId(id);
  }, [sound]);

  const onPauseClick = useCallback(() => {
    sound.pause(id || undefined);
  }, [id, sound]);

  useEffect(() => {
    if (label !== internalLabel && !isPlaying) {
      if (sound) {
        sound.unload();
      }

      const s = new Howl({
        src: require(`./assets/mp3-songs/${label}/${fetchSong(label)}`),
        onplay: () => {
          setIsPlaying(true);
        },
        onpause: () => {
          setIsPlaying(false);
        },
        onend: () => {
          setIsPlaying(false);
        }
      });

      const id = s.play();
      setId(id);
      setSound(s);
      setInternalLabel(label);
    }
  }, [internalLabel, isPlaying, label, sound]);

  return {
    isPlaying,
    onPlayClick,
    onPauseClick,
    label: internalLabel
  };
};
