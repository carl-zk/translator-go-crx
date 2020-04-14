from sogou import translate
from http.server import BaseHTTPRequestHandler, HTTPServer
import time
import json
from urllib.parse import urlparse, parse_qs
from io import BytesIO

hostName = "localhost"
serverPort = 8090


class MyServer(BaseHTTPRequestHandler):
    def do_GET(self):
        param_keys = parse_qs(urlparse(self.path).query)
        #r = translate(param_keys['q'][0], param_keys['f'][0], param_keys['t'][0])
        r = translate(param_keys['q'][0])
        # print(r)
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header("Content-type", "application/json; charset=utf-8")
        self.end_headers()
        self.wfile.write((json.dumps(r)).encode())

    def do_POST(self):
        print(self.headers)
        content_length = int(self.headers['Content-Length'])
        body = json.loads(self.rfile.read(content_length).decode('utf-8'))
        # print(body)
        r = translate(body['q'])
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header("Content-type", "application/json; charset=utf-8")
        self.send_header('Set-Cookie', 'a=hello')
        self.end_headers()
        response = BytesIO()
        response.write(json.dumps(r).encode())
        self.wfile.write(response.getvalue())

    def do_OPTIONS(self):
        print(self.headers)
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers',
                         'X-PINGOTHER, Content-Type')
        self.end_headers()


if __name__ == "__main__":
    webServer = HTTPServer((hostName, serverPort), MyServer)
    print("Server started http://%s:%s" % (hostName, serverPort))

    try:
        webServer.serve_forever()
    except KeyboardInterrupt:
        pass

    webServer.server_close()
    print("Server stopped.")
