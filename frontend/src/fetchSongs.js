//port http://localhost:4000'
export const fetchSongs = async (label, limit, nextToken) => {
  try {
    const response = await fetch('http://localhost:8080/s3', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        label,
        limit,
        nextToken
      }),
      Cache: 'default'
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error fetching songs:', error);
    return null;
  }
};
