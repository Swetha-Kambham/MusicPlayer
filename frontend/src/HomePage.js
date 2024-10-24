import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function HomePage() {
  return (
    <Box
      sx={{
        padding: '50px',
        borderRadius: '10px',
        maxWidth: '800px',
        margin: 'auto',
        textAlign: 'center',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        color: '#ffffff'
      }}>
      <Typography variant="h3" gutterBottom>
        Welcome to Emotion Based Music Player System
      </Typography>
      <Typography variant="body1" gutterBottom>
        Emotion Based Music Player System is your personalized music companion that matches your
        mood with the perfect song. Whether you&apos;re feeling happy, sad, surprised, or somewhere
        in between, Emotion Based Music Player System has a curated playlist just for you.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Simply select your current mood, and let Emotion Based Music Player System do the rest.
        Explore new music, rediscover old favorites, and experience the power of music tailored to
        your emotions.
      </Typography>
      <Typography variant="body1">Start your musical journey with MoodTunes today!</Typography>
    </Box>
  );
}

export default HomePage;
