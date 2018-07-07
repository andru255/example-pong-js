import SimpleHTTPServer
import SocketServer

PORT = 8000

Handler = SimpleHTTPServer.SimpleHTTPRequestHandler

httpd = SocketServer.TCPServer(("", PORT), Handler)

url = 'http://localhost:{port}'.format(port=PORT)
print "serving at port", PORT
print "go to default browser and put: {url}".format(url=url)
httpd.serve_forever()
