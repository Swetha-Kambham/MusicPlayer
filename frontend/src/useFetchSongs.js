import { useCallback, useEffect, useState } from 'react';
import { fetchSongs } from './fetchSongs';

export const useFetchSongs = (label) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    setLoading(true);
    fetchSongs(label, 10)
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch(() => {
        setData(null);
        setLoading(false);
      });
  }, [label]);

  const refetchSongsWithNewLabel = useCallback(async (newLabel) => {
    setLoading(true);
    setData(undefined);
    const data = await fetchSongs(newLabel, 10);
    setLoading(false);
    const songs = (data?.songs || [])
      .map(({ key, url }) => ({
        key: key.replace(`${newLabel}/`, ''),
        url: url
      }))
      .filter(({ key }) => Boolean(key));

    setData({
      songs,
      nextToken: data.nextToken
    });

    return songs;
  }, []);
  return {
    loading,
    songs: (data?.songs || [])
      .map(({ key, url }) => ({
        key: key.replace(`${label}/`, ''),
        url: url
      }))
      .filter(({ key }) => Boolean(key)),
    refetchSongsWithNewLabel
  };
};
