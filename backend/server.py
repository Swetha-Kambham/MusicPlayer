import json
import boto3
from http.server import CGIHTTPRequestHandler, HTTPServer
from botocore.exceptions import NoCredentialsError
from predict_result import get_emotion_predictions_from_base64_image

# AWS S3 Configuration
s3 = boto3.client('s3', 
                  aws_access_key_id='YOUR_AWS_ACCESS_KEY_ID', 
                  aws_secret_access_key='YOUR_AWS_SECRET_ACCESS_KEY', 
                  region_name='YOUR_AWS_REGION')

BUCKETNAME = 'your-bucket-name'

hostName = "localhost"
serverPort = 8080

def get_presigned_url(song_key, expiry_time=300):
    try:
        url = s3.generate_presigned_url('get_object', 
                                       Params={'Bucket': BUCKETNAME, 'Key': song_key}, 
                                       ExpiresIn=expiry_time)
        return url
    except NoCredentialsError:
        print("AWS credentials not found")
        return None

class MyServer(CGIHTTPRequestHandler):

    def do_Headers(self):
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Request-Method', 'GET, POST, PUT')
        self.send_header('Access-Control-Allow-Credentials', 'true')
        self.send_header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
        self.end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.do_Headers()

    def do_GET(self):
        self.send_response(200)
        self.do_Headers()
        self.wfile.write(bytes('ok', "utf8"))

    def do_POST(self):
        # Extract the URL path to handle different POST requests
        if self.path == "/predict":
            self.handle_predict_post()
        elif self.path == "/s3":
            self.handle_s3_post()
        else:
            self.send_response(404)
            self.wfile.write(bytes(json.dumps({"error": "Not Found"}), "utf8"))

    def handle_predict_post(self):
        """Handle POST requests for emotion predictions"""
        self.send_response(200)
        self.do_Headers()

        content_len = int(self.headers.get('Content-Length'))
        post_body = self.rfile.read(content_len)
        jsonBody = json.loads(post_body)
        
        base64String = jsonBody['base64']
        result = get_emotion_predictions_from_base64_image(base64String)
        if result is None or len(result) == 0:
            return self.wfile.write(bytes('{}', "utf8"))
        
        highest_percentage = [item for item in result if item['percentage'] == max(d['percentage'] for d in result)]
        most_frequent_emotion = max(set(d['label'] for d in result), key=lambda e: sum(1 for d in result if d['label'] == e))
        
        data = {
            'label': highest_percentage[0]['label']
        }
        response = json.dumps(data)
        self.wfile.write(bytes(response, "utf8"))

    def handle_s3_post(self):
        """Handle POST requests for S3 object fetching"""
        self.send_response(200)
        self.do_Headers()

        content_len = int(self.headers.get('Content-Length'))
        post_body = self.rfile.read(content_len)
        jsonBody = json.loads(post_body)
        
        label = jsonBody['label']
        limit = jsonBody.get('limit', 10)  # Default to 10 items per request
        next_token = jsonBody.get('nextToken', None)

        try:
            params = {
                'Bucket': BUCKETNAME,
                'Prefix': f'{label}/',  # This filters objects that start with 'label/' (e.g., "rock/")
                'MaxKeys': limit,
                'ContinuationToken': next_token
            }
            # List S3 objects with optional pagination
            response = s3.list_objects_v2(**params)
            song_list = []

            if 'Contents' in response:
                for song in response['Contents']:
                    song_key = song['Key']
                    presigned_url = get_presigned_url(song_key)
                    if presigned_url:
                        song_list.append({
                            'key': song_key,
                            'url': presigned_url
                        })
            
            # Prepare response with songs and pagination token
            result = {
                'songs': song_list,
                'nextToken': response.get('NextContinuationToken', None)
            }
            
            self.wfile.write(bytes(json.dumps(result), "utf8"))

        except Exception as e:
            error_message = f"Error fetching songs from S3: {str(e)}"
            self.send_response(500)
            self.wfile.write(bytes(json.dumps({"error": error_message}), "utf8"))
            print(error_message)


if __name__ == "__main__":        
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")
