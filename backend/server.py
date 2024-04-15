import time
import json

from http.server import CGIHTTPRequestHandler, HTTPServer
from predict_result import get_emotion_predictions_from_base64_image

hostName = "localhost"
serverPort = 8080

class MyServer(CGIHTTPRequestHandler):
    def do_Headers(self):
        self.send_header('Content-Type','application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Request-Method', 'GET, POST, PUT')
        self.send_header('Access-Control-Allow-Credentials', 'true')
        self.send_header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers")
        self.end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.do_Headers()
       

    def do_GET(self):
        self.send_response(200)
        self.do_Headers()
        self.wfile.write(bytes('ok', "utf8"))

    def do_POST(self):
        self.send_response(200)
        self.do_Headers()
        content_len = int(self.headers.get('Content-Length'))
        post_body = self.rfile.read(content_len)
        jsonBody = json.loads(post_body)
        base64String = jsonBody['base64']
        result = get_emotion_predictions_from_base64_image(base64String)
        if result is None or len(result)==0:
            return self.wfile.write(bytes('{}', "utf8"))
        
        data = {}
        data['label'] = result[0]
        response = json.dumps(data)
        self.wfile.write(bytes(response, "utf8"))

if __name__ == "__main__":        
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")