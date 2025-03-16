import React from 'react';
import {
  Box,
  Card,
  Select,
  MenuItem,
  List,
  ListItemButton,
  ListItemText,
  FormControl,
  InputLabel,
  Typography,
  Divider,
  CircularProgress
} from '@mui/material';
import PlayerControls from './PlayerControls';
import { usePlayControls } from './usePlayControls2';
import Webcam from './Webcam';
//import songsMap from './mp3s.json';
import { SongTimeDetails } from './SongTimeDetails';
import { useFetchSongs } from './useFetchSongs';

export const labels = [
  { key: 'happy', label: 'Happy' },
  { key: 'sad', label: 'Sad' },
  { key: 'fear', label: 'Fear' },
  { key: 'surprise', label: 'Surprise' },
  { key: 'neutral', label: 'Neutral' },
  { key: 'angry', label: 'Angry' }
];

const defaultLabel = labels[0].key;

export const SongCard = () => {
  const { songs, loading, refetchSongsWithNewLabel } = useFetchSongs(defaultLabel);
  const {
    label,
    onLabelChange,
    durationInSeconds,
    playbackTime,
    onSeek,
    selectedSong,
    selectedGroup,
    handlePlayPause,
    handleGroupChange,
    handleGroupDropdownOpen,
    handleNext,
    handlePrevious,
    handleSongSelect,
    isPlaying,
    touched
  } = usePlayControls({ defaultLabel, songs, refetchSongsWithNewLabel });

  return (
    <>
      <Box
        sx={{
          padding: 2,
          height: '75vh',
          position: 'fixed',
          right: 16,
          top: '5%',
          boxShadow: '5px 5px 15px green, inset 6px 6px 12px green'
        }}>
        {!touched ? (
          <Typography
            sx={{
              fontFamily: 'fantasy',
              fontSize: '1.5rem',
              fontWeight: 400,
              color: 'white',
              marginLeft: 'auto',
              whiteSpace: 'pre',
              textAlign: 'left'
            }}>
            {label ? `Feeling ${label}? \nhere is a song for you...` : `No Emotion detected`}
          </Typography>
        ) : null}
        {!touched ? (
          <Divider variant="fullWidth" sx={{ backgroundColor: 'white', marginBottom: '24px' }} />
        ) : null}
        <Card
          sx={{
            backgroundColor: 'transparent',
            color: 'white',
            height: touched ? '100%' : '80%',
            display: 'flex',
            flexDirection: 'column',
            width: '320px'
          }}>
          <FormControl fullWidth variant="standard" sx={{ marginBottom: 2, marginLeft: '8px' }}>
            <InputLabel sx={{ color: 'white' }}>Mood</InputLabel>
            <Select
              value={selectedGroup}
              onChange={handleGroupChange}
              onOpen={handleGroupDropdownOpen}
              sx={{
                color: 'white',
                '&:before': {
                  borderBottom: '1px solid white'
                },
                '&:hover:before': {
                  borderBottom: '2px solid lightgray'
                },
                '&.Mui-focused:before': {
                  borderBottom: '2px solid lightgray'
                },
                '& .MuiSelect-icon': {
                  color: 'white'
                }
              }}>
              {labels.map(({ key, label }) => (
                <MenuItem key={key} value={key} sx={{ color: 'black' }}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ flex: '1 1 auto', overflowY: 'auto' }}>
            {loading ? (
              <CircularProgress size={36} />
            ) : (
              <List>
                {songs.map(({ key, url }) => (
                  <ListItemButton
                    key={key}
                    selected={selectedSong === key}
                    onClick={handleSongSelect({ key, url })}
                    sx={{
                      overflowWrap: 'anywhere',
                      backgroundColor:
                        selectedSong === key ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                      color: isPlaying && selectedSong === key ? 'yellow' : 'white'
                    }}>
                    <ListItemText primary={key} sx={{ fontSize: '0.75rem' }} />
                  </ListItemButton>
                ))}
              </List>
            )}

            {songs.length === 0 ? (
              <ListItemText primary="No song found for the mood...." sx={{ fontSize: '0.75rem' }} />
            ) : null}
          </Box>
          <Divider variant="fullWidth" sx={{ backgroundColor: 'white' }} />
          {selectedSong ? (
            <Typography variant="body2" sx={{ color: 'white', textAlign: 'center', marginY: 2 }}>
              Now Playing: {selectedSong}
            </Typography>
          ) : null}
          {selectedSong ? (
            <SongTimeDetails
              durationInSeconds={durationInSeconds}
              playbackTime={playbackTime}
              onSeek={onSeek}
            />
          ) : null}
          {selectedSong ? (
            <Box sx={{ marginTop: 'auto', backgroundColor: 'transparent' }}>
              <PlayerControls
                onPlayPause={handlePlayPause}
                onNext={handleNext}
                onPrevious={handlePrevious}
                isPlaying={isPlaying}
              />
            </Box>
          ) : null}
        </Card>
      </Box>
      <Box sx={{ position: 'absolute', top: 10, left: 10 }}>
        <Webcam onLabelChange={onLabelChange} />
      </Box>
    </>
  );
};
