import AWS from "aws-sdk";
import { delimiter } from "path";

const BUCKETNAME= process.env.AWS_S3_BUCKET_NAME || '';
// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Function to generate a pre-signed URL
const getPresignedUrl = (songKey:string, expiryTime = 300) => {
  const params = {
    Bucket: BUCKETNAME,
    Key: songKey,
    Expires: expiryTime, // URL valid for 5 minutes
  };

  return s3.getSignedUrl("getObject", params);
};

// Optimized function to get songs using S3 Prefix filtering and pagination
export const getSongsForLabel = async (
  parent: any,
  args: { label: string; limit?: number; nextToken?: string }
) => {
  const limit = args.limit || 10; // Default to 10 songs per page

  try {
    const params = {
      Bucket: BUCKETNAME,
      Prefix: `${args.label}/`, // Filters objects that start with 'label/' (e.g., "rock/"),
      ContinuationToken: args.nextToken || undefined, // Handle pagination
      MaxKeys: limit, // Limit results per request
    };

    const data = await s3.listObjectsV2(params).promise();
    // Convert S3 objects to response format
    const songList = data.Contents?.map((song) => ({
      key: song.Key,
      url: getPresignedUrl(song.Key || ''),
    })) || [];
    return {
      songs: songList,
      nextToken: data.NextContinuationToken || null, // Pagination token for next request
    };
  } catch (error) {
    console.error("Error fetching songs from S3:", error);
    throw new Error("Failed to fetch songs.");
  }
};