import React from 'react';
import {
  Box,
  Card,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  FormControl,
  InputLabel,
  Typography,
  Divider
} from '@mui/material';
import PlayerControls from './PlayerControls';
import { usePlayControls } from './usePlayControls';
import Webcam from './Webcam';
import songsMap from './mp3s.json';

export const SongCard = () => {
  const {
    label,
    onLabelChange,
    selectedSong,
    selectedGroup,
    handlePlayPause,
    handleGroupChange,
    handleNext,
    handlePrevious,
    handleSongSelect,
    isPlaying
  } = usePlayControls();

  return (
    <>
      <Box sx={{ padding: 2, height: '60vh', position: 'fixed', right: 16, top: '10%' }}>
        {label ? (
          <Typography
            sx={{
              fontFamily: 'fantasy',
              fontSize: '1.5rem',
              fontWeight: 400,
              color: 'white',
              marginLeft: 'auto',
              whiteSpace: 'pre',
              textAlign: 'left'
            }}>{`Feeling ${label}? \nhere is a song for you...`}</Typography>
        ) : null}
        {label ? (
          <Divider variant="fullWidth" sx={{ backgroundColor: 'white', marginBottom: '24px' }} />
        ) : null}
        <Card
          sx={{
            backgroundColor: 'transparent',
            color: 'white',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            width: '320px'
          }}>
          <FormControl fullWidth variant="standard" sx={{ marginBottom: 2, marginLeft: '8px' }}>
            <InputLabel sx={{ color: 'white' }}>Mood</InputLabel>
            <Select
              value={selectedGroup}
              onChange={handleGroupChange}
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
              {Object.keys(songsMap).map((group) => (
                <MenuItem key={group} value={group} sx={{ color: 'black' }}>
                  {group}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ flex: '1 1 auto', overflowY: 'auto' }}>
            <List>
              {songsMap[selectedGroup].map((song) => (
                <ListItem
                  key={song}
                  button
                  selected={selectedSong === song}
                  onClick={() => handleSongSelect(song)}
                  sx={{
                    backgroundColor:
                      selectedSong === song ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                    color: isPlaying && selectedSong === song ? 'yellow' : 'white'
                  }}>
                  <ListItemText primary={song} sx={{ fontSize: '0.75rem' }} />
                </ListItem>
              ))}
            </List>
          </Box>
          <Divider variant="fullWidth" sx={{ backgroundColor: 'white' }} />
          {selectedSong && (
            <Typography variant="h6" sx={{ color: 'white', textAlign: 'center', marginTop: 2 }}>
              Now Playing: {selectedSong}
            </Typography>
          )}

          <Box sx={{ marginTop: 'auto', backgroundColor: 'transparent' }}>
            <PlayerControls
              onPlayPause={handlePlayPause}
              onNext={handleNext}
              onPrevious={handlePrevious}
              isPlaying={isPlaying}
            />
          </Box>
        </Card>
      </Box>
      <Box sx={{ position: 'absolute', top: 10, left: 10 }}>
        <Webcam onLabelChange={onLabelChange} />
      </Box>
    </>
  );
};
