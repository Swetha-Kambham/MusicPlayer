export const fetchSongs = async (label, limit, nextToken) => {
  try {
    const response = await fetch('http://localhost:4000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        query: `
            query GetSongsForLabel($label: String!, $limit: Int, $nextToken: String) {
              getSongsForLabel(label: $label, limit: $limit, nextToken: $nextToken) {
                songs {
                  key
                  url
                }
                nextToken
              }
            }
          `,
        variables: { label, limit, nextToken }
      })
    });

    const result = await response.json();
    return result.data?.getSongsForLabel;
  } catch (error) {
    console.error('Error fetching songs:', error);
    return null;
  }
};
