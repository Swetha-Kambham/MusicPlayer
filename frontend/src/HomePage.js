import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function HomePage() {
  return (
    <Box
      sx={{
        padding: '50px', // Padding around the content
        borderRadius: '10px', // Rounded corners
        maxWidth: '800px', // Maximum width for content
        margin: 'auto', // Center align content
        textAlign: 'center', // Center align text
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Shadow effect
        color: '#ffffff' // Text color (white)
      }}>
      <Typography variant="h3" gutterBottom>
        Welcome to MoodTunes
      </Typography>
      <Typography variant="body1" gutterBottom>
        MoodTunes is your personalized music companion that matches your mood with the perfect song.
        Whether you&apos;re feeling happy, sad, surprised, or somewhere in between, MoodTunes has a
        curated playlist just for you.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Simply select your current mood, and let MoodTunes do the rest. Explore new music,
        rediscover old favorites, and experience the power of music tailored to your emotions.
      </Typography>
      <Typography variant="body1">Start your musical journey with MoodTunes today!</Typography>
    </Box>
  );
}

export default HomePage;
